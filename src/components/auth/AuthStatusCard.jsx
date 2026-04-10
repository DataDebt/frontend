"use client";

import Link from "next/link";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { C } from "@/constants/colors";

const statusConfig = {
  idle: {
    icon: FaSpinner,
    iconColor: C.textMuted,
    iconAnimation: "none",
  },
  loading: {
    icon: FaSpinner,
    iconColor: C.accent,
    iconAnimation: "spin 1s linear infinite",
  },
  success: {
    icon: FaCheckCircle,
    iconColor: C.success,
    iconAnimation: "none",
  },
  error: {
    icon: FaExclamationTriangle,
    iconColor: C.danger,
    iconAnimation: "none",
  },
};

function actionButtonStyle(variant) {
  if (variant === "secondary") {
    return {
      width: "100%",
      padding: "12px 14px",
      borderRadius: 10,
      border: `1px solid ${C.cardBorder}`,
      background: "rgba(45,159,101,0.08)",
      color: C.accent,
      fontSize: 14,
      fontWeight: 600,
      textDecoration: "none",
      textAlign: "center",
      boxSizing: "border-box",
      display: "inline-block",
    };
  }

  return {
    width: "100%",
    padding: "14px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #1a5c3a, #2d9f65)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    textDecoration: "none",
    textAlign: "center",
    boxSizing: "border-box",
    display: "inline-block",
  };
}

function StatusAction({ action, variant = "primary" }) {
  if (!action) {
    return null;
  }

  if (action.href) {
    return (
      <Link href={action.href} style={actionButtonStyle(variant)}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} style={actionButtonStyle(variant)}>
      {action.label}
    </button>
  );
}

export default function AuthStatusCard({
  status = "idle",
  title,
  message,
  detail,
  primaryAction,
  secondaryAction,
}) {
  const config = statusConfig[status] || statusConfig.idle;
  const Icon = config.icon;

  return (
    <>
      <div
        style={{
          border: `1px solid ${C.cardBorder}`,
          borderRadius: 16,
          background: "rgba(255,255,255,0.74)",
          padding: "28px 24px",
          textAlign: "center",
          boxShadow: "0 12px 32px rgba(13, 61, 38, 0.08)",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            margin: "0 auto 18px",
            display: "grid",
            placeItems: "center",
            background:
              status === "error" ? "rgba(224,82,82,0.12)" : status === "success" ? "rgba(58,173,107,0.12)" : "rgba(45,159,101,0.12)",
          }}
        >
          <Icon size={26} color={config.iconColor} style={{ animation: config.iconAnimation }} />
        </div>

        <h3 style={{ margin: "0 0 10px", color: C.text, fontSize: 22, fontWeight: 700 }}>{title}</h3>
        <p style={{ margin: 0, color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>{message}</p>
        {detail ? <p style={{ margin: "12px 0 0", color: C.text, fontSize: 13, lineHeight: 1.6 }}>{detail}</p> : null}
      </div>

      <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
        <StatusAction action={primaryAction} />
        <StatusAction action={secondaryAction} variant="secondary" />
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
