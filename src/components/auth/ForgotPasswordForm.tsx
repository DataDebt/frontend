"use client";

import { useState } from "react";
import { C } from "@/constants/colors";
import { validatePasswordResetRequest } from "./auth-form-utils";

interface ForgotPasswordFormProps {
  error?: string | null;
  isSubmitting: boolean;
  onSubmit: (data: { email: string }) => Promise<unknown>;
  onSwitchToLogin: () => void;
  successMessage?: string | null;
}

export default function ForgotPasswordForm({
  error,
  isSubmitting,
  onSubmit,
  onSwitchToLogin,
  successMessage,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
  }

  async function handleSubmit() {
    const nextErrors = validatePasswordResetRequest({ email });

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors as Record<string, string>);
      triggerShake();
      return;
    }

    setFieldErrors({});

    try {
      await onSubmit({ email });
    } catch {
      triggerShake();
    }
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setFieldErrors({});
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: `1.5px solid ${fieldErrors.email ? C.danger : "#d0e8dc"}`,
            borderRadius: 10,
            fontSize: 15,
            outline: "none",
            background: "#fff",
          }}
        />
        {fieldErrors.email && <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{fieldErrors.email}</p>}
      </div>

      {error && <p style={{ color: C.danger, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{error}</p>}
      {successMessage && (
        <p style={{ color: C.success, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{successMessage}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #1a5c3a, #2d9f65)",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 700,
          cursor: isSubmitting ? "wait" : "pointer",
          opacity: isSubmitting ? 0.85 : 1,
          transition: "opacity .2s",
          animation: shake ? "shake .4s" : "none",
        }}
      >
        {isSubmitting ? "Sending..." : "Send reset instructions"}
      </button>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.textMuted }}>
        Remembered your password?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{
            color: C.accent,
            cursor: "pointer",
            fontWeight: 600,
            background: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          Back to login
        </button>
      </p>
    </>
  );
}
