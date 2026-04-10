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
      name: "",
      email: "person@example.com",
      password: "password1",
      confirmPassword: "password2",
    }),
    {
      name: "Ingresa tu nombre",
      confirmPassword: "Las contraseñas no coinciden",
    }
  );
});

test("validatePasswordResetRequest accepts a valid email", () => {
  assert.deepEqual(validatePasswordResetRequest({ email: "person@example.com" }), {});
});
