import test from "node:test";
import assert from "node:assert/strict";
import { normalizeRegisterResult } from "./register-result.mjs";

test("normalizeRegisterResult returns pending verification when tokens are missing", () => {
  assert.deepEqual(normalizeRegisterResult({ message: "Verify your email" }), {
    status: "pending_verification",
    message: "Verify your email",
  });
});

test("normalizeRegisterResult returns authenticated when tokens and user are present", () => {
  const user = { id: 1, username: "tester" };

  assert.deepEqual(
    normalizeRegisterResult({
      user,
      accessToken: "access",
      refreshToken: "refresh",
    }),
    {
      status: "authenticated",
      user,
      accessToken: "access",
      refreshToken: "refresh",
    }
  );
});

test("normalizeRegisterResult normalizes raw backend authenticated fields", () => {
  const user = { id: 2, username: "backend-user" };

  assert.deepEqual(
    normalizeRegisterResult({
      user,
      access_token: "raw-access",
      refresh_token: "raw-refresh",
    }),
    {
      status: "authenticated",
      user,
      accessToken: "raw-access",
      refreshToken: "raw-refresh",
    }
  );
});
