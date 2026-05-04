"use client";

import { C } from "@/constants/colors";

interface DataDebtInfoBannerProps {
  onNavigate: (key: string) => void;
}

export default function DataDebtInfoBanner({ onNavigate }: DataDebtInfoBannerProps) {
  return (
    <div
      style={{
        padding: "20px 32px 24px 32px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(45,159,101,0.14)",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -4px 24px rgba(0,40,20,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${C.accent}10, ${C.accent}20)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          📊
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 2 }}>
            Sabes que es la Deuda de Datos?
          </div>
          <p style={{ margin: 0, fontSize: 13, color: C.textMuted, lineHeight: 1.55 }}>
            Costos y riesgos ocultos por decisiones postergadas en la gestion de datos.
            Identificarla ayuda a priorizar mejoras y evitar reprocesos.
          </p>
        </div>
      </div>
      <button
        onClick={() => onNavigate("datadebt")}
        style={{
          padding: "10px 22px",
          background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
          boxShadow: "0 4px 14px rgba(45,159,101,0.3)",
        }}
      >
        Saber mas &rarr;
      </button>
    </div>
  );
}
