"use client";

import { useState } from "react"; 
import GeoBg from "@/components/ui/GeoBg";
import { C } from "@/constants/colors";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Dirección de correo inválida";
    if (pass.length < 8) e.pass = "La contraseña debe tener al menos 8 caracteres";
    return e;
  };

  const handleLogin = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); setShake(true); setTimeout(() => setShake(false), 600); return; }
    // Demo: admin@demo.com → admin, else user
    if (email === "admin@demo.com") onLogin("admin");
    else onLogin("user");
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #c8edd8 0%, #e8f7ef 50%, #d0eedf 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <GeoBg />
      {/* Left copy */}
      <div style={{ flex: 1, padding: "0 80px", zIndex: 1 }}>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: "#0d3d26", letterSpacing: -1, marginBottom: 8 }}>Data Debt</h1>
        <p style={{ fontSize: 20, color: C.accent, fontWeight: 600, marginBottom: 28 }}>Your web tool to diagnosis data deb</p>
        <p style={{ fontSize: 15, color: "#2a5c3f", lineHeight: 1.7, maxWidth: 460, marginBottom: 20 }}>
          Data Deb is the web platform that guides organizations through a structured process to analize the internal data deb.
        </p>
        <p style={{ fontSize: 15, color: "#2a5c3f", lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
          Data debt encompasses issues with quality, architecture, governance, and usage, stemming from technical shortcuts, fragmented architectures, immature governance, low data literacy, and a lack of executive support. 
        </p>
        {[
          ["5-stage guided evaluation", "using Likert-scale assessments for a deep, structured diagnosis of your organization's health."],
          ["Domain-specific qualitative indexing", "that calculates a score from 1 to 5 for Quality, Architecture, Governance, and Usage."],
          ["Visual and automated reporting", "that translates your data debt index into clear, actionable insights for executive decision-making."],
        ].map(([bold, rest]) => (
          <div key={bold} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.accent, marginTop: 5, flexShrink: 0 }} />
            <p style={{ margin: 0, color: "#1a3d2a", fontSize: 15 }}><strong>{bold}</strong> {rest}</p>
          </div>
        ))}
      </div>

      {/* Card */}
      <div style={{ width: 420, marginRight: 80, zIndex: 1, background: "rgba(255,255,255,0.78)", backdropFilter: "blur(20px)", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,80,40,0.18)", padding: "44px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 6 }}>Welcome Back</h2>
        <p style={{ textAlign: "center", color: C.textMuted, marginBottom: 32, fontSize: 14 }}>Sign in to your account</p>

        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors({}); }}
            style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: `1.5px solid ${errors.email ? C.danger : "#d0e8dc"}`, borderRadius: 10, fontSize: 15, outline: "none", background: "#fff" }}
          />
          {errors.email && <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: 20, position: "relative" }}>
          <input
            placeholder="Password"
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={e => { setPass(e.target.value); setErrors({}); }}
            style={{ width: "100%", boxSizing: "border-box", padding: "12px 40px 12px 14px", border: `1.5px solid ${errors.pass ? C.danger : "#d0e8dc"}`, borderRadius: 10, fontSize: 15, outline: "none", background: "#fff" }}
          />
          <span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: C.textMuted, fontSize: 18 }}>
          {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
          {errors.pass && <p style={{ color: C.danger, fontSize: 12, marginTop: 4 }}>{errors.pass}</p>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.text, cursor: "pointer" }}>
            <input type="checkbox" /> Remember me
          </label>
          <span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Forgot your password?</span>
        </div>

        {errors.cred && <p style={{ color: C.danger, fontSize: 13, textAlign: "center", marginBottom: 12 }}>{errors.cred}</p>}

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg, #1a5c3a, #2d9f65)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "opacity .2s", animation: shake ? "shake .4s" : "none" }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: C.textMuted }}>
          Don&apost;t have an account? <span style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }}>Sign Up Now</span>
        </p>
        <p style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "#aaa" }}>Demo: admin@demo.com / cualquier contraseña ≥8 chars → Admin</p>
      </div>

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </div>
  );
}
