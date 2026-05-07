"use client";

import { ReactNode } from "react";
import GeoBg from "@/components/ui/GeoBg";
import { C } from "@/constants/colors";

const featureHighlights: [string, string][] = [
  [
    "Evaluación guiada en 5 etapas",
    "usando evaluaciónes con escala Likert para un diagnóstico profundo y estructurado de la salud de tu organización.",
  ],
  [
    "Indexación cualitativa por dominio",
    "que calcula una puntuación de 1 a 5 para Calidad, Arquitectura, Gobernanza y Uso.",
  ],
  [
    "Reportes visuales y automatizados",
    "que traducen tu índice de deuda de datos en información clara y accionable para la toma de decisiones.",
  ],
];

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
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
          Tu herramienta web para diagnosticar la deuda de datos
        </p>
        <p style={{ fontSize: 15, color: "#2a5c3f", lineHeight: 1.7, maxWidth: 460, marginBottom: 20 }}>
          DataDebt es la plataforma web que guia a las organizaciónes a través de un proceso estructurado para analizar
          su deuda de datos interna.
        </p>
        <p style={{ fontSize: 15, color: "#2a5c3f", lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
          La deuda de datos abarca problemas de calidad, arquitectura, gobernanza y uso, derivados de atajos técnicos,
          arquitecturas fragmentadas, gobernanza inmadura, baja alfabetización de datos y falta de apoyo ejecutivo.
        </p>
        {featureHighlights.map(([bold, rest]) => (
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
          {title}
        </h2>
        <p style={{ textAlign: "center", color: C.textMuted, marginBottom: 32, fontSize: 14 }}>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
