"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ApiError, fetchJson } from "@/lib/api";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { clearAuthTokens, getAuthTokens, setAuthTokens } from "@/lib/auth-storage";
import { getRegisterAuthenticationTokens, normalizeRegisterResult, RegisterResult } from "./register-result";

interface User {
  id?: string | number;
  username?: string | null;
  email?: string | null;
  role?: string | null;
  [key: string]: unknown;
}

interface AuthTokenPair {
  accessToken: string;
  refreshToken: string;
}

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  clearError: () => void;
  confirmEmail: (data: { token: string }) => Promise<unknown>;
  isAuthenticated: boolean;
  isRestoring: boolean;
  login: (data: { email: string; password: string }) => Promise<AuthTokenPair & { user: User }>;
  logout: () => void;
  register: (data: { username: string; email: string; password: string }) => Promise<unknown>;
  resetPassword: (data: { token: string; newPassword: string }) => Promise<unknown>;
  resendVerification: (data: { email: string }) => Promise<unknown>;
  requestPasswordReset: (data: { email: string }) => Promise<unknown>;
  restoreSession: () => Promise<(AuthTokenPair & { user: User; status: "authenticated" }) | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_EXPIRED_MESSAGE = "Your session expired. Please sign in again.";

function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && (error.status === 401 || error.status === 403);
}

function createNormalizedAuthActionError(error: unknown, fallbackMessage: string): Error {
  const message =
    error instanceof ApiError ? getAuthErrorMessage(error.status, error.data, fallbackMessage) : fallbackMessage;

  return new Error(message, { cause: error });
}

async function fetchCurrentUser(accessToken: string): Promise<User> {
  return fetchJson("/users/me", { accessToken }) as Promise<User>;
}

async function refreshTokens(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
  return fetchJson("/auth/refresh", {
    method: "POST",
    body: { refresh_token: refreshToken },
    sendAuth: false,
  }) as Promise<{ access_token: string; refresh_token: string }>;
}

async function loginRequest(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
  return fetchJson("/auth/login", {
    method: "POST",
    body: { email, password },
    sendAuth: false,
  }) as Promise<{ access_token: string; refresh_token: string }>;
}

async function registerRequest({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<Record<string, unknown>> {
  return fetchJson("/auth/register", {
    method: "POST",
    body: { username, email, password },
    sendAuth: false,
  }) as Promise<Record<string, unknown>>;
}

async function resendVerificationRequest(email: string): Promise<unknown> {
  return fetchJson("/auth/resend-verification", {
    method: "POST",
    body: { email },
    sendAuth: false,
  });
}

async function requestPasswordResetRequest(email: string): Promise<unknown> {
  return fetchJson("/auth/request-password-reset", {
    method: "POST",
    body: { email },
    sendAuth: false,
  });
}

async function confirmEmailRequest(token: string): Promise<unknown> {
  return fetchJson(`/auth/confirm-email?token=${encodeURIComponent(token)}`, { sendAuth: false });
}

async function resetPasswordRequest(token: string, newPassword: string): Promise<unknown> {
  return fetchJson("/auth/reset-password", {
    method: "POST",
    body: { token, new_password: newPassword },
    sendAuth: false,
  });
}

function buildAuthenticatedState({
  user,
  accessToken,
  refreshToken,
  error = null,
}: AuthTokenPair & { user: User; error?: string | null }): AuthState {
  return { status: "authenticated", user, accessToken, refreshToken, error };
}

const unauthenticatedState: AuthState = {
  status: "unauthenticated",
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    ...unauthenticatedState,
    status: "loading",
  });

  const logout = useCallback(() => {
    clearAuthTokens();
    setAuthState(unauthenticatedState);
  }, []);

  const hydrateAuthenticatedSession = useCallback(async ({ accessToken, refreshToken }: AuthTokenPair) => {
    try {
      const user = await fetchCurrentUser(accessToken);
      setAuthState(buildAuthenticatedState({ user, accessToken, refreshToken }));
      return { status: "authenticated" as const, user, accessToken, refreshToken };
    } catch (error) {
      if (!isUnauthorizedError(error) || !refreshToken) {
        throw error;
      }

      const refreshedTokens = await refreshTokens(refreshToken);
      const nextAccessToken = refreshedTokens.access_token;
      const nextRefreshToken = refreshedTokens.refresh_token;

      setAuthTokens({ accessToken: nextAccessToken, refreshToken: nextRefreshToken });

      const user = await fetchCurrentUser(nextAccessToken);
      setAuthState(buildAuthenticatedState({ user, accessToken: nextAccessToken, refreshToken: nextRefreshToken }));

      return { status: "authenticated" as const, user, accessToken: nextAccessToken, refreshToken: nextRefreshToken };
    }
  }, []);

  const restoreSession = useCallback(async () => {
    const storedTokens = getAuthTokens();

    if (!storedTokens.accessToken || !storedTokens.refreshToken) {
      clearAuthTokens();
      setAuthState(unauthenticatedState);
      return null;
    }

    setAuthState((current) => ({ ...current, status: "loading", error: null }));

    try {
      return await hydrateAuthenticatedSession({
        accessToken: storedTokens.accessToken,
        refreshToken: storedTokens.refreshToken,
      });
    } catch {
      clearAuthTokens();
      setAuthState({ ...unauthenticatedState, error: SESSION_EXPIRED_MESSAGE });
      return null;
    }
  }, [hydrateAuthenticatedSession]);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setAuthState((current) => ({ ...current, error: null }));

      try {
        const tokens = await loginRequest(email, password);
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;

        setAuthTokens({ accessToken, refreshToken });
        return await hydrateAuthenticatedSession({ accessToken, refreshToken });
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

  const completeAuthentication = useCallback(
    async (result: RegisterResult) => {
      const tokens = getRegisterAuthenticationTokens(result);

      if (!tokens) {
        setAuthState((current) => ({ ...current, error: null }));
        return result;
      }

      setAuthTokens({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
      return hydrateAuthenticatedSession({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
    },
    [hydrateAuthenticatedSession]
  );

  const register = useCallback(
    async ({ username, email, password }: { username: string; email: string; password: string }) => {
      setAuthState((current) => ({ ...current, error: null }));

      try {
        const registerResult = normalizeRegisterResult(await registerRequest({ username, email, password }));
        return await completeAuthentication(registerResult);
      } catch (error) {
        setAuthState({
          ...unauthenticatedState,
          error:
            error instanceof ApiError
              ? getAuthErrorMessage(error.status, error.data, "We could not create your account right now.")
              : "We could not create your account right now.",
        });
        throw error;
      }
    },
    [completeAuthentication]
  );

  const resendVerification = useCallback(async ({ email }: { email: string }) => {
    setAuthState((current) => ({ ...current, error: null }));

    try {
      return await resendVerificationRequest(email);
    } catch (error) {
      setAuthState((current) => ({
        ...current,
        error:
          error instanceof ApiError
            ? getAuthErrorMessage(error.status, error.data, "We could not resend the verification email.")
            : "We could not resend the verification email.",
      }));
      throw error;
    }
  }, []);

  const requestPasswordReset = useCallback(async ({ email }: { email: string }) => {
    setAuthState((current) => ({ ...current, error: null }));

    try {
      return await requestPasswordResetRequest(email);
    } catch (error) {
      setAuthState((current) => ({
        ...current,
        error:
          error instanceof ApiError
            ? getAuthErrorMessage(error.status, error.data, "We could not send the reset instructions.")
            : "We could not send the reset instructions.",
      }));
      throw error;
    }
  }, []);

  const confirmEmail = useCallback(async ({ token }: { token: string }) => {
    try {
      return await confirmEmailRequest(token);
    } catch (error) {
      throw createNormalizedAuthActionError(error, "We could not confirm your email.");
    }
  }, []);

  const resetPassword = useCallback(async ({ token, newPassword }: { token: string; newPassword: string }) => {
    try {
      return await resetPasswordRequest(token, newPassword);
    } catch (error) {
      throw createNormalizedAuthActionError(error, "We could not reset your password.");
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState((current) => ({ ...current, error: null }));
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
        confirmEmail,
        isAuthenticated: authState.status === "authenticated",
        isRestoring: authState.status === "loading",
        login,
        logout,
        register,
        resetPassword,
        resendVerification,
        requestPasswordReset,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
