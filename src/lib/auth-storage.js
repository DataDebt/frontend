const ACCESS_TOKEN_KEY = "datadebt.auth.accessToken";
const REFRESH_TOKEN_KEY = "datadebt.auth.refreshToken";

function canUseLocalStorage() {
  return typeof window !== "undefined";
}

function getLocalStorage() {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readValue(key) {
  const storage = getLocalStorage();

  if (!storage) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeValue(key, value) {
  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  try {
    if (value == null || value === "") {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, String(value));
  } catch {
    return;
  }
}

function clearValue(key) {
  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(key);
  } catch {
    return;
  }
}

export function getAccessToken() {
  return readValue(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return readValue(REFRESH_TOKEN_KEY);
}

export function setAccessToken(token) {
  writeValue(ACCESS_TOKEN_KEY, token);
}

export function setRefreshToken(token) {
  writeValue(REFRESH_TOKEN_KEY, token);
}

export function setAuthTokens({ accessToken = null, refreshToken = null } = {}) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

export function getAuthTokens() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  };
}

export function clearAccessToken() {
  clearValue(ACCESS_TOKEN_KEY);
}

export function clearRefreshToken() {
  clearValue(REFRESH_TOKEN_KEY);
}

export function clearAuthTokens() {
  clearAccessToken();
  clearRefreshToken();
}

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };
