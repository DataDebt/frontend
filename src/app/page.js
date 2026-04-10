"use client";

import LoginScreen from "@/components/views/LoginScreen";
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

export default function Page() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return <SessionRestoreGate />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <UserLayout />;
}
