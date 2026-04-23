import test from "node:test";
import assert from "node:assert/strict";
import { getUserDisplayName, getUserEmailLabel, getUserInitials } from "./sidebar-user.ts";

test("getUserDisplayName falls back to a neutral role label", () => {
  assert.equal(getUserDisplayName(null, "user"), "Usuario");
  assert.equal(getUserDisplayName(null, "admin"), "Administrador");
});

test("getUserEmailLabel does not expose demo addresses when no email exists", () => {
  assert.equal(getUserEmailLabel(null), "No email available");
});

test("getUserInitials derives initials from email when needed", () => {
  assert.equal(getUserInitials({ email: "jane.doe@example.com" }, "user"), "JD");
});
