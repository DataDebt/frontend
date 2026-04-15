const ACCESS_TOKEN_KEY = "datadebt.auth.accessToken";
const REFRESH_TOKEN_KEY = "datadebt.auth.refreshToken";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined";
}

function getLocalStorage(): Storage | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readValue(key: string): string | null {
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

function writeValue(key: string, value: string | null | undefined): void {
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

function clearValue(key: string): void {
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

export function getAccessToken(): string | null {
  return readValue(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return readValue(REFRESH_TOKEN_KEY);
}

export function setAccessToken(token: string | null): void {
  writeValue(ACCESS_TOKEN_KEY, token);
}

export function setRefreshToken(token: string | null): void {
  writeValue(REFRESH_TOKEN_KEY, token);
}

export interface AuthTokens {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export function setAuthTokens({ accessToken = null, refreshToken = null }: AuthTokens = {}): void {
  setAccessToken(accessToken ?? null);
  setRefreshToken(refreshToken ?? null);
}

export function getAuthTokens(): { accessToken: string | null; refreshToken: string | null } {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  };
}

export function clearAccessToken(): void {
  clearValue(ACCESS_TOKEN_KEY);
}

export function clearRefreshToken(): void {
  clearValue(REFRESH_TOKEN_KEY);
}

export function clearAuthTokens(): void {
  clearAccessToken();
  clearRefreshToken();
}

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };
