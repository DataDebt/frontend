import { ChangeEvent, useState } from "react";
import { C } from "@/constants/colors";
import { Card } from "../ui/Card";
import { DOMAINS_TECH, DOMAINS_GOV } from "@/constants/mockData";
import { TopBar } from "../layout/TopBar";

export function DomainsView() {
  const [tab, setTab] = useState<"tech" | "gov">("tech");
  const [showModal, setShowModal] = useState(false);
  const [newDomain, setNewDomain] = useState({ name: "", desc: "" });
  const domains = tab === "tech" ? DOMAINS_TECH : DOMAINS_GOV;

  return (
    <div style={{ padding: "20px 36px 36px" }}>
      <TopBar title="Dominios de Deuda" subtitle="Gestiona la taxonomía de dominios del modelo de evaluación" />
      <div style={{ padding: "20px 0" }}>
        {/* Controls row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          {/* Tab toggle */}
          <div style={{ display: "flex", background: "#e0f0e8", borderRadius: 12, padding: 4, gap: 2 }}>
            {(
              [
                ["tech", "⚙ Técnicos"],
                ["gov", "🏛 Gobernanza"],
              ] as [string, string][]
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k as "tech" | "gov")}
                style={{
                  padding: "8px 22px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                  background: tab === k ? "#fff" : "transparent",
                  color: tab === k ? C.text : C.textMuted,
                  boxShadow: tab === k ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                  transition: "all .2s",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
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
            + Agregar Dominio
          </button>
        </div>

        {/* Domain cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {domains.map((d) => (
            <Card key={d.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.active ? C.success : "#ccc" }} />
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{d.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{d.desc}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: `1px solid ${C.cardBorder}`,
                }}
              >
                <span style={{ fontSize: 12, color: C.textMuted }}>🔸 {d.questions} preguntas</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      padding: "5px 14px",
                      background: "#f0f9f4",
                      border: `1px solid ${C.cardBorder}`,
                      borderRadius: 7,
                      fontSize: 12,
                      color: C.accent,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      padding: "5px 14px",
                      background: d.active ? "#fff3f3" : "#f0f9f4",
                      border: `1px solid ${d.active ? "#ffd0d0" : C.cardBorder}`,
                      borderRadius: 7,
                      fontSize: 12,
                      color: d.active ? C.danger : C.accent,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {d.active ? "Deshabilitar" : "Habilitar"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Domain Modal */}
      {showModal && (
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
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: C.text }}>Nuevo Dominio</h2>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Nombre del dominio *
              </label>
              <input
                value={newDomain.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDomain({ ...newDomain, name: e.target.value })}
                placeholder="ej. Gestión de Acceso"
                maxLength={80}
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", border: "1.5px solid #d0e8dc", borderRadius: 9, fontSize: 14, outline: "none" }}
              />
              <div style={{ fontSize: 11, color: "#aaa", textAlign: "right", marginTop: 3 }}>{newDomain.name.length}/80</div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Descripción *
              </label>
              <textarea
                value={newDomain.desc}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewDomain({ ...newDomain, desc: e.target.value })}
                rows={3}
                maxLength={300}
                placeholder="Breve descripción del dominio..."
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", border: "1.5px solid #d0e8dc", borderRadius: 9, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }}
              />
              <div style={{ fontSize: 11, color: "#aaa", textAlign: "right", marginTop: 3 }}>{newDomain.desc.length}/300</div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "10px 22px", background: "#f5f5f5", border: "none", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#666" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "10px 22px", background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`, border: "none", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#fff" }}
              >
                Guardar Dominio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
