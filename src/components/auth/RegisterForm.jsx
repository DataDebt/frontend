"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { C } from "@/constants/colors";
import { validateRegisterFields } from "./auth-form-utils.mjs";

function formInputStyle(hasError, padding = "12px 14px") {
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

export default function RegisterForm({
  error,
  isSubmitting,
  onResendVerification,
  onSubmit,
  onSwitchToLogin,
  successMessage,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
  }

  async function handleSubmit() {
    const nextErrors = validateRegisterFields({
      name,
      email,
      password,
      confirmPassword,
    });

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setResendMessage("");
      triggerShake();
      return;
    }

    setFieldErrors({});
    setResendMessage("");

    try {
      await onSubmit({ name, email, password });
    } catch {
      triggerShake();
    }
  }

  async function handleResendVerification() {
    const nextErrors = {};

    if (!email) {
      nextErrors.email = "Ingresa el correo de tu cuenta";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors((current) => ({
        ...current,
        ...nextErrors,
      }));
      return;
    }

    try {
      const response = await onResendVerification({ email });
      setResendMessage(
        response?.message || response?.detail || "We sent another verification email if the account exists."
      );
    } catch {
      return;
    }
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setFieldErrors({});
            setResendMessage("");
          }}
          style={formInputStyle(Boolean(fieldErrors.name))}
        />
        {fieldErrors.name && <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{fieldErrors.name}</p>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setFieldErrors({});
            setResendMessage("");
          }}
          style={formInputStyle(Boolean(fieldErrors.email))}
        />
        {fieldErrors.email && <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{fieldErrors.email}</p>}
      </div>

      <div style={{ marginBottom: 16, position: "relative" }}>
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setFieldErrors({});
            setResendMessage("");
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

      <div style={{ marginBottom: 20, position: "relative" }}>
        <input
          placeholder="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setFieldErrors({});
            setResendMessage("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
          style={formInputStyle(Boolean(fieldErrors.confirmPassword), "12px 40px 12px 14px")}
        />
        <span
          onClick={() => setShowConfirmPassword((current) => !current)}
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
          {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
        {fieldErrors.confirmPassword && (
          <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{fieldErrors.confirmPassword}</p>
        )}
      </div>

      {error && <p style={{ color: C.danger, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{error}</p>}
      {successMessage && (
        <p style={{ color: C.success, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{successMessage}</p>
      )}
      {resendMessage && (
        <p style={{ color: C.success, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{resendMessage}</p>
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
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <button
        type="button"
        onClick={handleResendVerification}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: 12,
          background: "rgba(45,159,101,0.08)",
          color: C.accent,
          border: `1px solid ${C.cardBorder}`,
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Resend verification email
      </button>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.textMuted }}>
        Already have an account?{" "}
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
          Sign in
        </button>
      </p>
    </>
  );
}
