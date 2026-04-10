"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ApiError, fetchJson } from "@/lib/api";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { clearAuthTokens, getAuthTokens, setAuthTokens } from "@/lib/auth-storage";

const AuthContext = createContext(null);

const SESSION_EXPIRED_MESSAGE = "Your session expired. Please sign in again.";

function isUnauthorizedError(error) {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}

async function fetchCurrentUser(accessToken) {
  return fetchJson("/users/me", {
    accessToken,
  });
}

async function refreshTokens(refreshToken) {
  return fetchJson("/auth/refresh", {
    method: "POST",
    body: {
      refresh_token: refreshToken,
    },
    sendAuth: false,
  });
}

async function loginRequest(email, password) {
  return fetchJson("/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
    sendAuth: false,
  });
}

function buildAuthenticatedState({ user, accessToken, refreshToken, error = null }) {
  return {
    status: "authenticated",
    user,
    accessToken,
    refreshToken,
    error,
  };
}

const unauthenticatedState = {
  status: "unauthenticated",
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    ...unauthenticatedState,
    status: "loading",
  });

  const logout = useCallback(() => {
    clearAuthTokens();
    setAuthState(unauthenticatedState);
  }, []);

  const hydrateAuthenticatedSession = useCallback(
    async ({ accessToken, refreshToken }) => {
      try {
        const user = await fetchCurrentUser(accessToken);
        setAuthState(buildAuthenticatedState({ user, accessToken, refreshToken }));
        return {
          user,
          accessToken,
          refreshToken,
        };
      } catch (error) {
        if (!isUnauthorizedError(error) || !refreshToken) {
          throw error;
        }

        const refreshedTokens = await refreshTokens(refreshToken);
        const nextAccessToken = refreshedTokens.access_token;
        const nextRefreshToken = refreshedTokens.refresh_token;

        setAuthTokens({
          accessToken: nextAccessToken,
          refreshToken: nextRefreshToken,
        });

        const user = await fetchCurrentUser(nextAccessToken);
        setAuthState(
          buildAuthenticatedState({
            user,
            accessToken: nextAccessToken,
            refreshToken: nextRefreshToken,
          })
        );

        return {
          user,
          accessToken: nextAccessToken,
          refreshToken: nextRefreshToken,
        };
      }
    },
    []
  );

  const restoreSession = useCallback(async () => {
    const storedTokens = getAuthTokens();

    if (!storedTokens.accessToken || !storedTokens.refreshToken) {
      clearAuthTokens();
      setAuthState(unauthenticatedState);
      return null;
    }

    setAuthState((current) => ({
      ...current,
      status: "loading",
      error: null,
    }));

    try {
      return await hydrateAuthenticatedSession(storedTokens);
    } catch {
      clearAuthTokens();
      setAuthState({
        ...unauthenticatedState,
        error: SESSION_EXPIRED_MESSAGE,
      });
      return null;
    }
  }, [hydrateAuthenticatedSession]);

  const login = useCallback(
    async ({ email, password }) => {
      setAuthState((current) => ({
        ...current,
        error: null,
      }));

      try {
        const tokens = await loginRequest(email, password);
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;

        setAuthTokens({
          accessToken,
          refreshToken,
        });

        return await hydrateAuthenticatedSession({
          accessToken,
          refreshToken,
        });
      } catch (error) {
        clearAuthTokens();
        setAuthState({
          ...unauthenticatedState,
          error:
            error instanceof ApiError
              ? getAuthErrorMessage(error.status, error.data)
              : "We could not sign you in. Please try again.",
        });
        throw error;
      }
    },
    [hydrateAuthenticatedSession]
  );

  const clearError = useCallback(() => {
    setAuthState((current) => ({
      ...current,
      error: null,
    }));
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      restoreSession();
    });
  }, [restoreSession]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        clearError,
        isAuthenticated: authState.status === "authenticated",
        isRestoring: authState.status === "loading",
        login,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
