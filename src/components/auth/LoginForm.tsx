"use client";

import { CSSProperties, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { C } from "@/constants/colors";
import { validateLoginFields } from "./auth-form-utils";

function formInputStyle(hasError: boolean, padding = "12px 14px"): CSSProperties {
  return {
    width: "100%",
    boxSizing: "border-box",
    padding,
    border: `1.5px solid ${hasError ? C.danger : "#d0e8dc"}`,
    borderRadius: 10,
    fontSize: 15,
    outline: "none",
    background: "#fff",
  };
}

interface LoginFormProps {
  error?: string | null;
  isSubmitting: boolean;
  onForgotPassword: () => void;
  onSubmit: (data: { email: string; password: string }) => Promise<unknown>;
  onSwitchToRegister: () => void;
}

export default function LoginForm({
  error,
  isSubmitting,
  onForgotPassword,
  onSubmit,
  onSwitchToRegister,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
  }

  async function handleSubmit() {
    const nextErrors = validateLoginFields({ email, password });

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors as Record<string, string>);
      triggerShake();
      return;
    }

    setFieldErrors({});

    try {
      await onSubmit({ email, password });
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
          style={formInputStyle(Boolean(fieldErrors.email))}
        />
        {fieldErrors.email && <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{fieldErrors.email}</p>}
      </div>

      <div style={{ marginBottom: 20, position: "relative" }}>
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setFieldErrors({});
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          style={formInputStyle(Boolean(fieldErrors.password), "12px 40px 12px 14px")}
        />
        <span
          onClick={() => setShowPassword((current) => !current)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: C.textMuted,
            fontSize: 18,
          }}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
        {fieldErrors.password && (
          <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{fieldErrors.password}</p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <label
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.text, cursor: "pointer" }}
        >
          <input type="checkbox" />
          Remember me
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          style={{
            fontSize: 13,
            color: C.accent,
            cursor: "pointer",
            background: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          Forgot your password?
        </button>
      </div>

      {error && <p style={{ color: C.danger, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{error}</p>}

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
        {isSubmitting ? "Signing in..." : "Login"}
      </button>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.textMuted }}>
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{
            color: C.accent,
            cursor: "pointer",
            fontWeight: 600,
            background: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          Sign Up Now
        </button>
      </p>
    </>
  );
}
