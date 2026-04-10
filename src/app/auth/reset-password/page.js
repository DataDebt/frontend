"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import AuthStatusCard from "@/components/auth/AuthStatusCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useAuth } from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const { clearError, error, resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [notice, setNotice] = useState("");
  const token = searchParams.get("token") || "";

  async function handleResetPassword({ token: resetToken, newPassword }) {
    setIsSubmitting(true);
    setNotice("");
    clearError();

    try {
      const response = await resetPassword({
        token: resetToken,
        newPassword,
      });

      setIsComplete(true);
      setNotice(response?.message || response?.detail || "Your password has been updated.");
      return response;
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <AuthShell title="Reset your password" subtitle="Open the full reset link from your email to continue">
        <AuthStatusCard
          status="error"
          title="Reset link required"
          message="This password reset page needs the token from your email link. Open the latest reset email and try again."
          primaryAction={{ href: "/", label: "Back to sign in" }}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={isComplete ? "Password updated" : "Choose a new password"}
      subtitle={
        isComplete ? "Your credentials are ready to use" : "Enter a secure password to finish resetting your account"
      }
    >
      {isComplete ? (
        <AuthStatusCard
          status="success"
          title="Password reset complete"
          message={notice || "Your password has been updated successfully."}
          primaryAction={{ href: "/", label: "Sign in" }}
        />
      ) : (
        <ResetPasswordForm
          error={error}
          isSubmitting={isSubmitting}
          onSubmit={handleResetPassword}
          token={token}
        />
      )}

      {!isComplete ? (
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#5a8a72" }}>
          Remembered your password?{" "}
          <Link
            href="/"
            style={{
              color: "#2d9f65",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to login
          </Link>
        </p>
      ) : null}

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </AuthShell>
  );
}
