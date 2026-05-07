export const AUTH_ERROR_MESSAGES: Record<number, string> = {
  400: "No pudimos procesar tu solicitud de inicio de sesión.",
  401: "El correo o la contraseña que ingresaste son incorrectos.",
  403: "Verifica tu correo electrónico antes de iniciar sesión.",
  404: "No pudimos encontrar el servicio de autenticación.",
  409: "Ya existe una cuenta con esas credenciales.",
  422: "Revisa los campos marcados e intenta de nuevo.",
  429: "Demasiados intentos. Espera un momento e intenta de nuevo.",
  500: "El servidor tuvo un problema al completar tu inicio de sesión.",
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
  fallback = "Algo salió mal durante la autenticación. Intenta de nuevo."
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
