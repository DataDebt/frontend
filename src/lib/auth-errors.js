export const AUTH_ERROR_MESSAGES = {
  400: "We could not process your sign-in request.",
  401: "The email or password you entered is incorrect.",
  403: "Please verify your email address before signing in.",
  404: "We could not find the authentication endpoint.",
  409: "An account with those credentials already exists.",
  422: "Please check the highlighted fields and try again.",
  429: "Too many attempts. Please wait a moment and try again.",
  500: "The server had a problem completing your sign-in.",
};

function extractBackendDetail(responseOrDetail) {
  if (!responseOrDetail) {
    return null;
  }

  if (typeof responseOrDetail === "string") {
    return responseOrDetail;
  }

  if (typeof responseOrDetail === "object") {
    return (
      responseOrDetail.detail ||
      responseOrDetail.message ||
      responseOrDetail.error ||
      (Array.isArray(responseOrDetail.non_field_errors) ? responseOrDetail.non_field_errors[0] : null)
    );
  }

  return null;
}

function isGenericForbiddenDetail(detail) {
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
  status,
  responseOrDetail,
  fallback = "Something went wrong during authentication. Please try again."
) {
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
