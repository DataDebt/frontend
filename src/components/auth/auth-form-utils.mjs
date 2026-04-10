export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLoginFields({ email, password }) {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Dirección de correo inválida";
  }

  if ((password || "").length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  return errors;
}

export function validateRegisterFields({ username, email, password, confirmPassword }) {
  const errors = {};

  if (!(username || "").trim()) {
    errors.username = "Ingresa tu usuario";
  } else if (username.trim().length < 3) {
    errors.username = "El usuario debe tener al menos 3 caracteres";
  }

  if (!isValidEmail(email)) {
    errors.email = "Dirección de correo inválida";
  }

  if ((password || "").length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if ((confirmPassword || "").length === 0) {
    errors.confirmPassword = "Confirma tu contraseña";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}

export function validatePasswordResetRequest({ email }) {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Dirección de correo inválida";
  }

  return errors;
}

export function validateResetPasswordFields({ token, password, confirmPassword }) {
  const errors = {};

  if (!(token || "").trim()) {
    errors.token = "Missing reset token";
  }

  if ((password || "").length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if ((confirmPassword || "").length === 0) {
    errors.confirmPassword = "Confirma tu contraseña";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}
