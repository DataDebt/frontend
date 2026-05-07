"use client";

import { useEffect, useRef, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import AuthStatusCard from "@/components/auth/AuthStatusCard";
import { useAuth } from "@/context/AuthContext";

interface ConfirmEmailClientProps {
  token: string;
}

export default function ConfirmEmailClient({ token }: ConfirmEmailClientProps) {
  const { confirmEmail } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Estamos validando tu enlace de confirmación y activando tu cuenta.");
  const [errorMessage, setErrorMessage] = useState("");
  const attemptedTokenRef = useRef<string | null>(null);
  const missingToken = !token;

  useEffect(() => {
    if (missingToken) {
      return;
    }

    if (attemptedTokenRef.current === token) {
      return;
    }

    attemptedTokenRef.current = token;

    let isActive = true;

    confirmEmail({ token })
      .then((response) => {
        if (!isActive) {
          return;
        }

        setStatus("success");
        const r = response as Record<string, unknown> | null;
        setMessage(
          (typeof r?.message === "string" ? r.message : null) ||
          (typeof r?.detail === "string" ? r.detail : null) ||
          "Tu correo ha sido confirmado. Ya puedes iniciar sesión."
        );
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setStatus("error");
        setMessage("No pudimos confirmar este enlace de correo.");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Este enlace de confirmación puede haber expirado, ya fue usado o no es válido."
        );
      });

    return () => {
      isActive = false;
    };
  }, [confirmEmail, missingToken, token]);

  if (missingToken) {
    return (
      <AuthShell title="Confirma tu correo electrónico" subtitle="Estamos verificando tu enlace de confirmación">
        <AuthStatusCard
          status="error"
          title="Enlace de confirmación requerido"
          message="A este enlace le falta el token. Solicita un nuevo correo de verificación e intenta de nuevo."
          primaryAction={{ href: "/", label: "Ir al inicio de sesión" }}
          secondaryAction={{ href: "/", label: "Volver a autenticación" }}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Confirma tu correo electrónico" subtitle="Estamos verificando tu enlace de confirmación">
      <AuthStatusCard
        status={status}
        title={
          status === "success"
            ? "Correo confirmado"
            : status === "error"
              ? "Confirmación fallida"
              : "Confirmando tu correo"
        }
        message={message}
        detail={status === "error" ? errorMessage : null}
        primaryAction={status === "loading" ? null : { href: "/", label: "Ir al inicio de sesión" }}
        secondaryAction={status === "error" ? { href: "/", label: "Volver a autenticación" } : null}
      />
    </AuthShell>
  );
}
