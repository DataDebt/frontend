export function resolveLayoutRole(user: unknown): "admin" | "user" {
  if (user && typeof user === "object" && (user as { role?: unknown }).role === "admin") {
    return "admin";
  }

  return "user";
}
