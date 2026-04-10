import test from "node:test";
import assert from "node:assert/strict";
import {
  validateLoginFields,
  validatePasswordResetRequest,
  validateRegisterFields,
} from "./auth-form-utils.mjs";

test("validateLoginFields flags invalid email and short password", () => {
  assert.deepEqual(validateLoginFields({ email: "bad", password: "123" }), {
    email: "Dirección de correo inválida",
    password: "La contraseña debe tener al menos 8 caracteres",
  });
});

test("validateRegisterFields requires name and matching passwords", () => {
  assert.deepEqual(
    validateRegisterFields({
      username: "ab",
      email: "person@example.com",
      password: "password1",
      confirmPassword: "password2",
    }),
    {
      username: "El usuario debe tener al menos 3 caracteres",
      confirmPassword: "Las contraseñas no coinciden",
    }
  );
});

test("validateRegisterFields requires a username", () => {
  assert.deepEqual(
    validateRegisterFields({
      username: "",
      email: "person@example.com",
      password: "password1",
      confirmPassword: "password1",
    }),
    {
      username: "Ingresa tu usuario",
    }
  );
});

test("validatePasswordResetRequest accepts a valid email", () => {
  assert.deepEqual(validatePasswordResetRequest({ email: "person@example.com" }), {});
});
