"use client";

import { useEffect, useRef, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import AuthStatusCard from "@/components/auth/AuthStatusCard";
import { useAuth } from "@/context/AuthContext";

export default function ConfirmEmailClient({ token }) {
  const { confirmEmail } = useAuth();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("We're validating your confirmation link and activating your account.");
  const [errorMessage, setErrorMessage] = useState("");
  const attemptedTokenRef = useRef(null);
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
        setMessage(response?.message || response?.detail || "Your email has been confirmed. You can sign in now.");
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setStatus("error");
        setMessage("We could not confirm this email link.");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "This confirmation link may have expired, already been used, or is otherwise invalid."
        );
      });

    return () => {
      isActive = false;
    };
  }, [confirmEmail, missingToken, token]);

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
        detail={status === "error" ? errorMessage : null}
        primaryAction={status === "loading" ? null : { href: "/", label: "Go to sign in" }}
        secondaryAction={status === "error" ? { href: "/", label: "Back to authentication" } : null}
      />
    </AuthShell>
  );
}
