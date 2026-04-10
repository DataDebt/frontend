export function normalizeRegisterResult(payload) {
  const accessToken = payload?.accessToken || payload?.access_token || null;
  const refreshToken = payload?.refreshToken || payload?.refresh_token || null;
  const user = payload?.user || null;

  if (accessToken && refreshToken && user) {
    return {
      status: "authenticated",
      user,
      accessToken,
      refreshToken,
    };
  }

  return {
    status: "pending_verification",
    message: payload?.message || payload?.detail || "Check your inbox to verify your email before signing in.",
  };
}

export function getRegisterAuthenticationTokens(result) {
  if (result?.status !== "authenticated" || !result.accessToken || !result.refreshToken) {
    return null;
  }

  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  };
}
