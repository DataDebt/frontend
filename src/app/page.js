"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GeoBg from "@/components/ui/GeoBg";
import { C } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import UserLayout from "@/layouts/UserLayout";

function SessionRestoreGate() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #c8edd8 0%, #e8f7ef 50%, #d0eedf 100%)",
        fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "calc(100vw - 48px)",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,80,40,0.18)",
          padding: "40px 36px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            margin: "0 auto 18px",
            borderRadius: "50%",
            border: "4px solid rgba(26, 92, 58, 0.14)",
            borderTopColor: C.accent,
            animation: "spin 0.9s linear infinite",
          }}
        />
        <h2 style={{ margin: 0, color: C.text, fontSize: 24, fontWeight: 700 }}>Restoring session</h2>
        <p style={{ margin: "10px 0 0", color: C.textMuted, fontSize: 14 }}>
          We are checking your saved credentials and loading your workspace.
        </p>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function LoginView() {
  const { clearError, error, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
  }

  function validate() {
    const nextErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Dirección de correo inválida";
    }

    if (password.length < 8) {
      nextErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return nextErrors;
  }

  async function handleLogin() {
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      clearError();
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    clearError();

    try {
      await login({ email, password });
    } catch {
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #c8edd8 0%, #e8f7ef 50%, #d0eedf 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      }}
    >
      <GeoBg />

      <div style={{ flex: 1, padding: "0 80px", zIndex: 1 }}>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: "#0d3d26", letterSpacing: -1, marginBottom: 8 }}>
          Data Debt
        </h1>
        <p style={{ fontSize: 20, color: C.accent, fontWeight: 600, marginBottom: 28 }}>
          Your web tool to diagnosis data deb
        </p>
        <p style={{ fontSize: 15, color: "#2a5c3f", lineHeight: 1.7, maxWidth: 460, marginBottom: 20 }}>
          Data Deb is the web platform that guides organizations through a structured process to analize the
          internal data deb.
        </p>
        <p style={{ fontSize: 15, color: "#2a5c3f", lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
          Data debt encompasses issues with quality, architecture, governance, and usage, stemming from technical
          shortcuts, fragmented architectures, immature governance, low data literacy, and a lack of executive
          support.
        </p>
        {[
          [
            "5-stage guided evaluation",
            "using Likert-scale assessments for a deep, structured diagnosis of your organization's health.",
          ],
          [
            "Domain-specific qualitative indexing",
            "that calculates a score from 1 to 5 for Quality, Architecture, Governance, and Usage.",
          ],
          [
            "Visual and automated reporting",
            "that translates your data debt index into clear, actionable insights for executive decision-making.",
          ],
        ].map(([bold, rest]) => (
          <div key={bold} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: C.accent,
                marginTop: 5,
                flexShrink: 0,
              }}
            />
            <p style={{ margin: 0, color: "#1a3d2a", fontSize: 15 }}>
              <strong>{bold}</strong> {rest}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          width: 420,
          marginRight: 80,
          zIndex: 1,
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,80,40,0.18)",
          padding: "44px 40px",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 6 }}>
          Welcome Back
        </h2>
        <p style={{ textAlign: "center", color: C.textMuted, marginBottom: 32, fontSize: 14 }}>
          Sign in to your account
        </p>

        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFieldErrors({});
              clearError();
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

        <div style={{ marginBottom: 20, position: "relative" }}>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors({});
              clearError();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 40px 12px 14px",
              border: `1.5px solid ${fieldErrors.password ? C.danger : "#d0e8dc"}`,
              borderRadius: 10,
              fontSize: 15,
              outline: "none",
              background: "#fff",
            }}
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
          <span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Forgot your password?</span>
        </div>

        {error && <p style={{ color: C.danger, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{error}</p>}

        <button
          onClick={handleLogin}
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
          <span style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }}>Sign Up Now</span>
        </p>
      </div>

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </div>
  );
}

export default function Page() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return <SessionRestoreGate />;
  }

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return <UserLayout />;
}
