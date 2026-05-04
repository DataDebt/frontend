"use client";

import { useCallback, useEffect, useState } from "react";
import { C } from "@/constants/colors";
import { Card } from "../ui/Card";
import { TopBar } from "../layout/TopBar";
import { Badge } from "../ui/Badge";
import { fetchJson, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface UserItem {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  is_verified: boolean;
  role: string;
  created_at: string;
  last_login_at: string | null;
}

function getUserInitials(user: UserItem): string {
  const source = user.username || user.email;
  const words = source.replace(/[@._-]+/g, " ").trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("") || "U";
}

export default function AdminUsersView() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson("/users", { accessToken: accessToken || undefined, sendAuth: true }) as UserItem[];
      setUsers(data);
    } catch (err) {
      setError(err instanceof ApiError ? String(err.data || err.message) : "No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      loadUsers();
    }
  }, [accessToken, loadUsers]);

  async function handleMakeAdmin(userId: string) {
    setActionError(null);
    try {
      await fetchJson(`/users/${userId}/make-admin`, {
        method: "POST",
        accessToken: accessToken || undefined,
        sendAuth: true,
      });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: "admin" } : u)));
    } catch (err) {
      setActionError(err instanceof ApiError ? String(err.data || err.message) : "No se pudo cambiar el rol.");
    }
  }

  async function handleRemoveAdmin(userId: string) {
    setActionError(null);
    try {
      await fetchJson(`/users/${userId}/admin-role`, {
        method: "DELETE",
        accessToken: accessToken || undefined,
        sendAuth: true,
      });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: "user" } : u)));
    } catch (err) {
      setActionError(err instanceof ApiError ? String(err.data || err.message) : "No se pudo cambiar el rol.");
    }
  }

  const adminCount = users.filter((u) => u.role === "admin").length;

  if (loading) {
    return (
      <div style={{ padding: "60px 36px", textAlign: "center" }}>
        <p style={{ color: C.textMuted, fontSize: 15 }}>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 36px 36px" }}>
      <TopBar title="Gestion de Usuarios" subtitle="Administra roles y permisos de las cuentas registradas" />

      <div style={{ padding: "20px 0" }}>
        {error && (
          <div style={{ padding: "14px 18px", background: "#fff3f3", borderRadius: 10, border: "1px solid #ffd0d0", marginBottom: 16, fontSize: 14, color: C.danger }}>
            {error}
            <button onClick={loadUsers} style={{ marginLeft: 12, background: "none", border: "none", color: C.accent, cursor: "pointer", fontWeight: 600 }}>
              Reintentar
            </button>
          </div>
        )}

        {actionError && (
          <div style={{ padding: "10px 14px", background: "#fff3f3", borderRadius: 8, border: "1px solid #ffd0d0", marginBottom: 12, fontSize: 13, color: C.danger }}>
            {actionError}
            <button onClick={() => setActionError(null)} style={{ marginLeft: 10, background: "none", border: "none", color: C.accent, cursor: "pointer", fontWeight: 600 }}>
              Cerrar
            </button>
          </div>
        )}

        <div style={{ marginBottom: 14, fontSize: 13, color: C.textMuted }}>
          {users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {users.map((u) => (
            <Card key={u.id}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.accent}, #1a5c3a)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {getUserInitials(u)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{u.username}</span>
                      <Badge label={u.role === "admin" ? "Admin" : "Usuario"} />
                      {!u.is_verified && (
                        <span style={{ fontSize: 11, color: C.warn, background: "#fff7ed", padding: "2px 8px", borderRadius: 99 }}>
                          Sin verificar
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{u.email}</div>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {u.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(u.id)}
                      disabled={adminCount <= 1}
                      title={adminCount <= 1 ? "No se puede remover el ultimo admin" : "Quitar rol de administrador"}
                      style={{
                        padding: "7px 16px",
                        background: adminCount <= 1 ? "#f5f5f5" : "#fff3f3",
                        border: `1px solid ${adminCount <= 1 ? "#e0e0e0" : "#ffd0d0"}`,
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: adminCount <= 1 ? "#aaa" : C.danger,
                        cursor: adminCount <= 1 ? "not-allowed" : "pointer",
                        opacity: adminCount <= 1 ? 0.6 : 1,
                      }}
                    >
                      Quitar Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(u.id)}
                      style={{
                        padding: "7px 16px",
                        background: "#f0f9f4",
                        border: `1px solid ${C.cardBorder}`,
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.accent,
                        cursor: "pointer",
                      }}
                    >
                      Hacer Admin
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {users.length === 0 && !error && (
          <p style={{ textAlign: "center", color: C.textMuted, fontSize: 14, marginTop: 32 }}>
            No hay usuarios registrados.
          </p>
        )}
      </div>
    </div>
  );
}
