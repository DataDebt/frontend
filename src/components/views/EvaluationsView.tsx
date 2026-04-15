import { ChangeEvent, useState } from "react";
import { C } from "@/constants/colors";
import { TopBar } from "../layout/TopBar";
import { Card } from "../ui/Card";
import { ScorePill } from "../ui/ScorePill";
import { Badge } from "../ui/Badge";
import { EVALUATIONS } from "@/constants/mockData";

interface EvaluationsViewProps {
  onReport: (id: number) => void;
}

type FormField = "name" | "desc" | "deadline" | "users";

export function EvaluationsView({ onReport }: EvaluationsViewProps) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [form, setForm] = useState<Record<FormField, string>>({ name: "", desc: "", deadline: "", users: "" });

  return (
    <div style={{ padding: "20px 36px 36px" }}>
      <TopBar title="Evaluaciones" subtitle="Gestiona y supervisa todas las evaluaciones de deuda de datos" />
      <div style={{ padding: "20px 0" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button
            onClick={() => setShowNewModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(45,159,101,0.3)",
            }}
          >
            + Nueva Evaluación
          </button>
        </div>

        <Card>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e8f0ec" }}>
                {["Nombre", "Fecha", "Usuarios", "Score", "Estado", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "10px 14px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVALUATIONS.map((ev, i) => (
                <tr
                  key={ev.id}
                  style={{
                    borderBottom: i < EVALUATIONS.length - 1 ? "1px solid #f0f6f3" : "none",
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fdf9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px", fontSize: 14, fontWeight: 600, color: C.text }}>{ev.name}</td>
                  <td style={{ padding: "14px", fontSize: 13, color: C.textMuted }}>{ev.date}</td>
                  <td style={{ padding: "14px", fontSize: 13, color: C.textMuted }}>👤 {ev.users}</td>
                  <td style={{ padding: "14px" }}>
                    <ScorePill score={ev.score} />
                  </td>
                  <td style={{ padding: "14px" }}>
                    <Badge label={ev.status} />
                  </td>
                  <td style={{ padding: "14px", textAlign: "right" }}>
                    <button
                      onClick={() => onReport(ev.id)}
                      style={{
                        padding: "7px 16px",
                        background: "#f0f9f4",
                        border: `1px solid ${C.cardBorder}`,
                        borderRadius: 8,
                        fontSize: 12,
                        color: C.accent,
                        cursor: "pointer",
                        fontWeight: 700,
                        transition: "all .2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = C.accent;
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f0f9f4";
                        e.currentTarget.style.color = C.accent;
                      }}
                    >
                      Ver Reporte →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* New evaluation modal */}
      {showNewModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{ background: "#fff", borderRadius: 20, padding: 40, width: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 800, color: C.text }}>Nueva Evaluación</h2>
            {(
              [
                ["Nombre *", "name", "ej. Diagnóstico Q3 2025", "text"],
                ["Descripción", "desc", "Alcance y contexto de la evaluación...", "text"],
                ["Fecha límite", "deadline", "", "date"],
                ["Usuarios asignados", "users", "correo1@org.com, correo2@org.com", "text"],
              ] as [string, FormField, string, string][]
            ).map(([label, key, ph, type]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={ph}
                  style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", border: "1.5px solid #d0e8dc", borderRadius: 9, fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button
                onClick={() => setShowNewModal(false)}
                style={{ padding: "10px 22px", background: "#f5f5f5", border: "none", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#666" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowNewModal(false)}
                style={{ padding: "10px 22px", background: "#f0f9f4", border: `1px solid ${C.cardBorder}`, borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 700, color: C.accent }}
              >
                Guardar Borrador
              </button>
              <button
                onClick={() => setShowNewModal(false)}
                style={{ padding: "10px 22px", background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`, border: "none", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#fff" }}
              >
                Activar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
