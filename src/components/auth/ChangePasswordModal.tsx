"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { C } from "@/constants/colors";
import { fetchJson, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const { accessToken } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fieldErrors: Record<string, string> = {};
  if (currentPassword && currentPassword.length < 8) fieldErrors.currentPassword = "Minimo 8 caracteres";
  if (newPassword && newPassword.length < 8) fieldErrors.newPassword = "Minimo 8 caracteres";
  if (confirmPassword && newPassword && confirmPassword !== newPassword) fieldErrors.confirmPassword = "Las contrasenas no coinciden";

  function inputStyle(hasError: boolean) {
    return {
      width: "100%",
      boxSizing: "border-box" as const,
      padding: "11px 40px 11px 14px",
      border: `1.5px solid ${hasError ? C.danger : "#d0e8dc"}`,
      borderRadius: 9,
      fontSize: 14,
      outline: "none",
      background: "#fff",
    };
  }

  async function handleSubmit() {
    setError(null);
    if (!currentPassword || currentPassword.length < 8 || !newPassword || newPassword.length < 8 || newPassword !== confirmPassword) {
      setError("Revisa los campos marcados.");
      return;
    }

    setSubmitting(true);
    try {
      await fetchJson("/users/me", {
        method: "PATCH",
        body: { current_password: currentPassword, new_password: newPassword },
        accessToken: accessToken || undefined,
        sendAuth: true,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? String(err.data || err.message) : "No se pudo cambiar la contrasena.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "32px 36px",
          width: 420,
          maxWidth: "calc(100vw - 48px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 800, color: C.text }}>
          Cambiar contrasena
        </h2>

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
            <p style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>
              Contrasena actualizada exitosamente.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "10px 28px",
                background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
                color: "#fff",
                border: "none",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div style={{ padding: "10px 14px", background: "#fff3f3", borderRadius: 8, border: "1px solid #ffd0d0", marginBottom: 16, fontSize: 13, color: C.danger }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 16, position: "relative" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Contrasena actual
              </label>
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => { setCurrentPassword(e.target.value); setError(null); }}
                placeholder="Tu contrasena actual"
                style={inputStyle(Boolean(fieldErrors.currentPassword))}
              />
              <span
                onClick={() => setShowCurrent(!showCurrent)}
                style={{ position: "absolute", right: 12, top: 34, cursor: "pointer", color: C.textMuted, fontSize: 16 }}
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </span>
              {fieldErrors.currentPassword && (
                <p style={{ color: C.danger, fontSize: 11, marginTop: 3 }}>{fieldErrors.currentPassword}</p>
              )}
            </div>

            <div style={{ marginBottom: 16, position: "relative" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Nueva contrasena
              </label>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(null); }}
                placeholder="Minimo 8 caracteres"
                style={inputStyle(Boolean(fieldErrors.newPassword))}
              />
              <span
                onClick={() => setShowNew(!showNew)}
                style={{ position: "absolute", right: 12, top: 34, cursor: "pointer", color: C.textMuted, fontSize: 16 }}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </span>
              {fieldErrors.newPassword && (
                <p style={{ color: C.danger, fontSize: 11, marginTop: 3 }}>{fieldErrors.newPassword}</p>
              )}
            </div>

            <div style={{ marginBottom: 24, position: "relative" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Confirmar nueva contrasena
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                placeholder="Repite la nueva contrasena"
                style={inputStyle(Boolean(fieldErrors.confirmPassword))}
              />
              {fieldErrors.confirmPassword && (
                <p style={{ color: C.danger, fontSize: 11, marginTop: 3 }}>{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 22px",
                  background: "#f5f5f5",
                  border: "none",
                  borderRadius: 9,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#666",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !currentPassword || !newPassword || !confirmPassword}
                style={{
                  padding: "10px 22px",
                  background: submitting ? "#aaa" : `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  cursor: submitting ? "wait" : "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Cambiando..." : "Cambiar contrasena"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
