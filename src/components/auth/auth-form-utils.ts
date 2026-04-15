export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export interface LoginFields {
  email: string;
  password: string;
}

export interface RegisterFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordResetRequestFields {
  email: string;
}

export interface ResetPasswordFields {
  token: string;
  password: string;
  confirmPassword: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function validateLoginFields({ email, password }: LoginFields): FieldErrors<LoginFields> {
  const errors: FieldErrors<LoginFields> = {};

  if (!isValidEmail(email)) {
    errors.email = "Dirección de correo inválida";
  }

  if ((password || "").length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  return errors;
}

export function validateRegisterFields({
  username,
  email,
  password,
  confirmPassword,
}: RegisterFields): FieldErrors<RegisterFields> {
  const errors: FieldErrors<RegisterFields> = {};

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

export function validatePasswordResetRequest({
  email,
}: PasswordResetRequestFields): FieldErrors<PasswordResetRequestFields> {
  const errors: FieldErrors<PasswordResetRequestFields> = {};

  if (!isValidEmail(email)) {
    errors.email = "Dirección de correo inválida";
  }

  return errors;
}

export function validateResetPasswordFields({
  token,
  password,
  confirmPassword,
}: ResetPasswordFields): FieldErrors<ResetPasswordFields> {
  const errors: FieldErrors<ResetPasswordFields> = {};

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
