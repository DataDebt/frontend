export interface AuthenticatedRegisterResult {
  status: "authenticated";
  user: unknown;
  accessToken: string;
  refreshToken: string;
}

export interface PendingVerificationRegisterResult {
  status: "pending_verification";
  message: string;
}

export type RegisterResult = AuthenticatedRegisterResult | PendingVerificationRegisterResult;

export function normalizeRegisterResult(payload: Record<string, unknown>): RegisterResult {
  const accessToken =
    (typeof payload?.accessToken === "string" ? payload.accessToken : null) ||
    (typeof payload?.access_token === "string" ? payload.access_token : null);
  const refreshToken =
    (typeof payload?.refreshToken === "string" ? payload.refreshToken : null) ||
    (typeof payload?.refresh_token === "string" ? payload.refresh_token : null);
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
    message:
      (typeof payload?.message === "string" ? payload.message : null) ||
      (typeof payload?.detail === "string" ? payload.detail : null) ||
      "Check your inbox to verify your email before signing in.",
  };
}

export function getRegisterAuthenticationTokens(
  result: RegisterResult | null | undefined
): { accessToken: string; refreshToken: string } | null {
  if (result?.status !== "authenticated" || !result.accessToken || !result.refreshToken) {
    return null;
  }

  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  };
}
