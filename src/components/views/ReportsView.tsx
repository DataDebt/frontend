import { C } from "@/constants/colors";
import { useState, Fragment } from "react";
import { EVALUATIONS, heatData, radarData } from "@/constants/mockData";
import { TopBar } from "../layout/TopBar";
import { Card } from "../ui/Card";
import {
  ResponsiveContainer,
  RadarChart,
  Tooltip,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { scoreBg, scoreColor } from "@/utils/score";
import { MdBarChart } from "react-icons/md";

export function ReportsView() {
  const [selected, setSelected] = useState<number | null>(null);

  const closed = EVALUATIONS.filter((e) => e.status === "Cerrada");

  const trafficLight = heatData.map((d) => ({
    ...d,
    color: d.score < 2 ? C.danger : d.score < 3.5 ? C.warn : C.success,
    colorBg: d.score < 2 ? "#fde8e8" : d.score < 3.5 ? "#fef3e2" : "#e3f8ed",
  }));

  return (
    <div style={{ padding: "20px 36px 36px" }}>
      <TopBar title="Reportes" subtitle="Selecciona una evaluación para visualizar los resultados" />
      <div style={{ padding: "20px 0" }}>
        {/* Eval selector */}
        <Card style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 8 }}>
            Seleccionar evaluación
          </label>
          <select
            value={selected || ""}
            onChange={(e) => setSelected(Number(e.target.value) || null)}
            style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #d0e8dc", borderRadius: 9, fontSize: 14, outline: "none", color: C.text, background: "#fff", cursor: "pointer" }}
          >
            <option value="">— Selecciona una evaluación —</option>
            {closed.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.name} ({ev.date})
              </option>
            ))}
          </select>
          {!closed.length && (
            <p style={{ color: C.textMuted, fontSize: 13, marginTop: 8 }}>No hay evaluaciones cerradas disponibles.</p>
          )}
        </Card>

        {!selected ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: C.textMuted }}>
            <MdBarChart size={48} style={{ display: "block", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 16, fontWeight: 600 }}>Selecciona una evaluación para generar el reporte</p>
          </div>
        ) : (
          <>
            {/* Summary KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
              {(
                [
                  ["Índice Global", "3.2", "Deuda Moderada", C.warn],
                  ["Dominios Críticos 🔴", "2", "Intervención urgente", C.danger],
                  ["Dominios OK 🟢", "3", "Deuda baja/controlada", C.success],
                  ["Dominios en Revisión 🟡", "3", "Plan de acción", C.warn],
                ] as [string, string, string, string][]
              ).map(([label, val, sub, col]) => (
                <Card key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: col }}>{val}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginTop: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{sub}</div>
                </Card>
              ))}
            </div>

            {/* Radar + Traffic light */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <Card>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>📡 Radar de Dominios</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e0ece6" />
                    <PolarAngleAxis dataKey="domain" tick={{ fill: C.textMuted, fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9, fill: "#aaa" }} />
                    <Radar name="Score" dataKey="score" stroke={C.accent} fill={C.accent} fillOpacity={0.25} strokeWidth={2} />
                    <Tooltip formatter={(v) => [typeof v === "number" ? v.toFixed(1) : v, "Score"]} />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>🚦 Semáforo de Dominios</h3>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {(
                    [
                      ["🔴", trafficLight.filter((d) => d.score < 2).length],
                      ["🟡", trafficLight.filter((d) => d.score >= 2 && d.score < 3.5).length],
                      ["🟢", trafficLight.filter((d) => d.score >= 3.5).length],
                    ] as [string, number][]
                  ).map(([em, n]) => (
                    <div
                      key={em}
                      style={{ flex: 1, textAlign: "center", background: "#f8faf9", borderRadius: 8, padding: "6px 0", fontSize: 13, fontWeight: 700, color: C.text }}
                    >
                      {em} {n}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {trafficLight
                    .slice()
                    .sort((a, b) => a.score - b.score)
                    .map((d) => (
                      <div
                        key={d.domain}
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: d.colorBg, borderRadius: 8, cursor: "pointer" }}
                      >
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontSize: 13, color: C.text }}>{d.domain}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{d.score.toFixed(1)}</span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>

            {/* Heatmap + Bar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <Card>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>🌡 Heatmap de Dominios</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {heatData.map((d) => (
                    <div
                      key={d.domain}
                      title={`Score: ${d.score} | Impacto: ${d.impact} | Riesgo: ${d.risk} | Esfuerzo: ${d.effort}`}
                      style={{ padding: "12px 8px", borderRadius: 10, background: scoreBg(d.score), textAlign: "center", cursor: "pointer", transition: "transform .2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <div style={{ fontSize: 16, fontWeight: 800, color: scoreColor(d.score) }}>{d.score.toFixed(1)}</div>
                      <div style={{ fontSize: 9, color: C.textMuted, marginTop: 3, lineHeight: 1.3 }}>{d.domain}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>📊 Score por Dominio</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={radarData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8f0ec" />
                    <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10 }} />
                    <YAxis dataKey="domain" type="category" width={90} tick={{ fontSize: 10, fill: C.textMuted }} />
                    <Tooltip formatter={(v) => [typeof v === "number" ? v.toFixed(2) : v, "Score"]} />
                    <Bar dataKey="score" fill={C.accent} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Risk Matrix */}
            <Card>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>
                ⚠️ Matriz de Riesgos (Impacto × Riesgo de Materialización)
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", gridTemplateRows: "40px 1fr 1fr 1fr", gap: 4 }}>
                {["", "Bajo", "Medio", "Alto"].map((l, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.textMuted }}
                  >
                    {l}
                  </div>
                ))}
                {(["Alto", "Medio", "Bajo"] as string[]).map((rowLabel, ri) => (
                  <Fragment key={rowLabel}>
                    <div
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.textMuted, writingMode: "horizontal-tb" }}
                    >
                      {rowLabel}
                    </div>
                    {(["Bajo", "Medio", "Alto"] as string[]).map((col, ci) => {
                      const zone =
                        (ri === 0 && ci === 2) || (ri === 1 && ci === 2) || (ri === 2 && ci === 1) || (ri === 2 && ci === 2)
                          ? "critical"
                          : (ri === 0 && ci === 0) || (ri === 1 && ci === 0) || (ri === 0 && ci === 1)
                            ? "low"
                            : "medium";
                      const zoneBg = zone === "critical" ? "#fde8e8" : zone === "medium" ? "#fff8e3" : "#e3f8ed";
                      const items = heatData.filter((d) => d.impact === rowLabel && d.risk === col);
                      return (
                        <div
                          key={col}
                          style={{ background: zoneBg, borderRadius: 8, padding: 8, minHeight: 70, border: "1px solid rgba(0,0,0,0.06)" }}
                        >
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {items.map((d) => (
                              <div
                                key={d.domain}
                                title={d.domain}
                                style={{
                                  width: d.effort === "Alto" ? 28 : d.effort === "Medio" ? 22 : 16,
                                  height: d.effort === "Alto" ? 28 : d.effort === "Medio" ? 22 : 16,
                                  borderRadius: "50%",
                                  background: scoreColor(d.score),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 8,
                                  color: "#fff",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                }}
                              >
                                {d.domain.charAt(0)}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
              <p style={{ fontSize: 11, color: C.textMuted, marginTop: 8 }}>
                * El tamaño del círculo representa el Esfuerzo de Reembolso. Hover para ver el nombre del dominio.
              </p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
