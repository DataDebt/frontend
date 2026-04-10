"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { C } from "@/constants/colors";
import { validateResetPasswordFields } from "./auth-form-utils.mjs";

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

export default function ResetPasswordForm({ error, isSubmitting, onSubmit, token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
  }

  async function handleSubmit() {
    const nextErrors = validateResetPasswordFields({
      token,
      password,
      confirmPassword,
    });

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      triggerShake();
      return;
    }

    setFieldErrors({});

    try {
      await onSubmit({
        token,
        newPassword: password,
      });
    } catch {
      triggerShake();
    }
  }

  return (
    <>
      <div style={{ marginBottom: 16, position: "relative" }}>
        <input
          placeholder="New password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setFieldErrors({});
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
          placeholder="Confirm new password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setFieldErrors({});
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

      <button
        type="button"
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
        {isSubmitting ? "Updating password..." : "Save new password"}
      </button>
    </>
  );
}
