import test from "node:test";
import assert from "node:assert/strict";
import { resolveLayoutRole } from "./layout-role.ts";

test("returns admin for admin role", () => {
  assert.equal(resolveLayoutRole({ role: "admin" }), "admin");
});

test("returns user for non-admin role", () => {
  assert.equal(resolveLayoutRole({ role: "user" }), "user");
});

test("returns user when role is missing", () => {
  assert.equal(resolveLayoutRole({}), "user");
});

test("returns user when value is null", () => {
  assert.equal(resolveLayoutRole(null), "user");
});
