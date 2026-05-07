"use client";

import Link from "next/link";
import { useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import AuthStatusCard from "@/components/auth/AuthStatusCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useAuth } from "@/context/AuthContext";

interface ResetPasswordClientProps {
  token: string;
}

export default function ResetPasswordClient({ token }: ResetPasswordClientProps) {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleResetPassword({ token: resetToken, newPassword }: { token: string; newPassword: string }) {
    setIsSubmitting(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await resetPassword({ token: resetToken, newPassword });
      const r = response as Record<string, unknown> | null;
      setIsComplete(true);
      setNotice(
        (typeof r?.message === "string" ? r.message : null) ||
        (typeof r?.detail === "string" ? r.detail : null) ||
        "Tu contraseña ha sido actualizada."
      );
      return response;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No pudimos restablecer tu contraseña.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <AuthShell title="Restablece tu contraseña" subtitle="Abre el enlace completo de restablecimiento desde tu correo para continuar">
        <AuthStatusCard
          status="error"
          title="Enlace de restablecimiento requerido"
          message="Esta pagina necesita el token del enlace de tu correo. Abre el último correo de restablecimiento e intenta de nuevo."
          primaryAction={{ href: "/", label: "Volver al inicio de sesión" }}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={isComplete ? "Contraseña actualizada" : "Elige una nueva contraseña"}
      subtitle={
        isComplete ? "Tus credenciales están listas para usar" : "Ingresa una contraseña segura para terminar de restablecer tu cuenta"
      }
    >
      {isComplete ? (
        <AuthStatusCard
          status="success"
          title="Restablecimiento completado"
          message={notice || "Tu contraseña se actualizó exitosamente."}
          primaryAction={{ href: "/", label: "Iniciar sesión" }}
        />
      ) : (
        <ResetPasswordForm
          error={errorMessage}
          isSubmitting={isSubmitting}
          onSubmit={handleResetPassword}
          token={token}
        />
      )}

      {!isComplete ? (
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#5a8a72" }}>
           ¿Recordaste tu contraseña?{" "}
          <Link
            href="/"
            style={{
              color: "#2d9f65",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Volver al inicio de sesión
          </Link>
        </p>
      ) : null}

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </AuthShell>
  );
}
