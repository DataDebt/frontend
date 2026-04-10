export const AUTH_ERROR_MESSAGES = {
  400: "We could not process your sign-in request.",
  401: "The email or password you entered is incorrect.",
  403: "Your account does not have permission to access this resource.",
  404: "We could not find the authentication endpoint.",
  409: "An account with those credentials already exists.",
  422: "Please check the highlighted fields and try again.",
  429: "Too many attempts. Please wait a moment and try again.",
  500: "The server had a problem completing your sign-in.",
};

export function getAuthErrorMessage(status, fallback = "Something went wrong during authentication. Please try again.") {
  return AUTH_ERROR_MESSAGES[status] || fallback;
}
