export function normalizeRegisterResult(payload) {
  if (payload?.accessToken && payload?.refreshToken && payload?.user) {
    return {
      status: "authenticated",
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
  }

  return {
    status: "pending_verification",
    message: payload?.message || payload?.detail || "Check your inbox to verify your email before signing in.",
  };
}
