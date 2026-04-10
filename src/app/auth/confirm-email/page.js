"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import AuthStatusCard from "@/components/auth/AuthStatusCard";
import { useAuth } from "@/context/AuthContext";

export default function ConfirmEmailPage() {
  const { clearError, confirmEmail, error } = useAuth();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("We're validating your confirmation link and activating your account.");
  const attemptedTokenRef = useRef(null);
  const token = searchParams.get("token") || "";
  const missingToken = !token;

  useEffect(() => {
    clearError();

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
        setMessage(response?.message || response?.detail || "Your email has been confirmed. You can sign in now.");
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setStatus("error");
        setMessage("We could not confirm this email link. It may have expired or already been used.");
      });

    return () => {
      isActive = false;
    };
  }, [clearError, confirmEmail, missingToken, token]);

  if (missingToken) {
    return (
      <AuthShell title="Confirm your email" subtitle="We're checking your verification link">
        <AuthStatusCard
          status="error"
          title="Confirmation link required"
          message="This confirmation link is missing its token. Request a new verification email and try again."
          primaryAction={{ href: "/", label: "Go to sign in" }}
          secondaryAction={{ href: "/", label: "Back to authentication" }}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Confirm your email" subtitle="We're checking your verification link">
      <AuthStatusCard
        status={status}
        title={
          status === "success"
            ? "Email confirmed"
            : status === "error"
              ? "Confirmation failed"
              : "Confirming your email"
        }
        message={message}
        detail={status === "error" ? error : null}
        primaryAction={status === "loading" ? null : { href: "/", label: "Go to sign in" }}
        secondaryAction={
          status === "error" ? { href: "/", label: "Back to authentication" } : null
        }
      />
    </AuthShell>
  );
}
