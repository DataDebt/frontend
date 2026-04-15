interface User {
  username?: string | null;
  email?: string | null;
}

export function getUserDisplayName(user: User | null | undefined, role: string): string {
  if (user?.username) {
    return user.username;
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return role === "admin" ? "Administrador" : "Usuario";
}

export function getUserInitials(user: User | null | undefined, role: string): string {
  const source = user?.username || user?.email || (role === "admin" ? "Administrador" : "Usuario");
  const words = source
    .replace(/[@._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (
    words
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() || "")
      .join("") || "U"
  );
}

export function getUserEmailLabel(user: User | null | undefined): string {
  return user?.email || "No email available";
}
