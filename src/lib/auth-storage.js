const ACCESS_TOKEN_KEY = "datadebt.auth.accessToken";
const REFRESH_TOKEN_KEY = "datadebt.auth.refreshToken";

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readValue(key) {
  if (!canUseLocalStorage()) {
    return null;
  }

  return window.localStorage.getItem(key);
}

function writeValue(key, value) {
  if (!canUseLocalStorage()) {
    return;
  }

  if (value == null || value === "") {
    window.localStorage.removeItem(key);
    return;
  }

  window.localStorage.setItem(key, String(value));
}

function clearValue(key) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(key);
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
