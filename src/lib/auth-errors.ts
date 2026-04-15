export const AUTH_ERROR_MESSAGES: Record<number, string> = {
  400: "We could not process your sign-in request.",
  401: "The email or password you entered is incorrect.",
  403: "Please verify your email address before signing in.",
  404: "We could not find the authentication endpoint.",
  409: "An account with those credentials already exists.",
  422: "Please check the highlighted fields and try again.",
  429: "Too many attempts. Please wait a moment and try again.",
  500: "The server had a problem completing your sign-in.",
};

function extractBackendDetail(responseOrDetail: unknown): string | null {
  if (!responseOrDetail) {
    return null;
  }

  if (typeof responseOrDetail === "string") {
    return responseOrDetail;
  }

  function getStringValue(value: unknown): string | null {
    return typeof value === "string" ? value : null;
  }

  if (typeof responseOrDetail === "object" && responseOrDetail !== null) {
    const r = responseOrDetail as Record<string, unknown>;
    return (
      getStringValue(r.detail) ||
      getStringValue(r.message) ||
      getStringValue(r.error) ||
      (Array.isArray(r.non_field_errors) ? getStringValue(r.non_field_errors[0]) : null)
    );
  }

  return null;
}

function isGenericForbiddenDetail(detail: string): boolean {
  if (!detail) {
    return false;
  }

  const normalizedDetail = detail.trim().toLowerCase();

  return (
    normalizedDetail === "forbidden" ||
    normalizedDetail === "access denied" ||
    normalizedDetail === "permission denied" ||
    normalizedDetail.includes("do not have permission") ||
    normalizedDetail.includes("does not have permission") ||
    normalizedDetail.includes("not have permission") ||
    normalizedDetail.includes("permission to perform this action") ||
    normalizedDetail.includes("permission to access this resource") ||
    normalizedDetail.includes("not allowed")
  );
}

export function getAuthErrorMessage(
  status: number,
  responseOrDetail?: unknown,
  fallback = "Something went wrong during authentication. Please try again."
): string {
  const backendDetail = extractBackendDetail(responseOrDetail);

  if (status === 403) {
    if (!backendDetail || isGenericForbiddenDetail(backendDetail)) {
      return AUTH_ERROR_MESSAGES[status] || fallback;
    }
  }

  if (backendDetail) {
    return backendDetail;
  }

  return AUTH_ERROR_MESSAGES[status] || fallback;
}
