import { useState } from "react";
import { Card } from "../ui/Card";
import { TopBar } from "../layout/TopBar";
import { Badge } from "../ui/Badge";
import { USER_EVALUATIONS } from "@/constants/mockData";
import { C } from "@/constants/colors";

interface Question {
  id: string;
  domain: string;
  text: string;
  axis: string;
}

interface LikertOption {
  v: number;
  label: string;
}

interface UserEvaluation {
  id: number;
  name: string;
  deadline: string;
  status: string;
  progress: number;
}

export function MyEvaluationsView() {
  const [activeEval, setActiveEval] = useState<UserEvaluation | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions: Question[] = [
    { id: "q1", domain: "Calidad de Datos", text: "¿Los datos tienen controles de validación definidos y automatizados?", axis: "Impacto" },
    { id: "q2", domain: "Calidad de Datos", text: "¿Existen procesos de limpieza y deduplicación periódica?", axis: "Riesgo" },
    { id: "q3", domain: "Metadatos y Linaje", text: "¿Existe un catálogo de datos corporativo actualizado?", axis: "Esfuerzo" },
    { id: "q4", domain: "Metadatos y Linaje", text: "¿Se documenta el linaje de los datos críticos?", axis: "Impacto" },
  ];
  const likert: LikertOption[] = [
    { v: 1, label: "Crítico" },
    { v: 2, label: "Alto" },
    { v: 3, label: "Moderado" },
    { v: 4, label: "Controlado" },
    { v: 5, label: "Gestionado" },
  ];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  if (activeEval) {
    if (submitted)
      return (
        <div style={{ padding: "60px 36px", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text }}>¡Evaluación enviada!</h2>
          <p style={{ color: C.textMuted, fontSize: 15, marginBottom: 32 }}>
            Tu evaluación ha sido registrada exitosamente. El administrador procesará los resultados.
          </p>
          <button
            onClick={() => {
              setActiveEval(null);
              setSubmitted(false);
              setAnswers({});
            }}
            style={{
              padding: "12px 28px",
              background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Volver a mis evaluaciones
          </button>
        </div>
      );

    return (
      <div style={{ padding: "20px 36px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button
            onClick={() => setActiveEval(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 14, fontWeight: 600 }}
          >
            ← Volver
          </button>
          <span style={{ color: "#ccc" }}>|</span>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>{activeEval.name}</h2>
        </div>

        {/* Progress bar */}
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Progreso de la evaluación</span>
            <span style={{ fontSize: 13, color: C.accent, fontWeight: 700 }}>
              {Object.keys(answers).length}/{questions.length} preguntas
            </span>
          </div>
          <div style={{ background: "#e8f0ec", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                borderRadius: 99,
                transition: "width .4s",
              }}
            />
          </div>
        </Card>

        {/* Questions */}
        {questions.map((q, i) => (
          <Card key={q.id} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: answers[q.id] ? C.accent : "#e8f0ec",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: answers[q.id] ? "#fff" : C.textMuted,
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, marginBottom: 4 }}>
                  {q.domain} · Eje: {q.axis}
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 14, color: C.text, fontWeight: 500 }}>{q.text}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {likert.map((l) => (
                    <button
                      key={l.v}
                      onClick={() => setAnswers({ ...answers, [q.id]: l.v })}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: `2px solid ${answers[q.id] === l.v ? C.accent : "#d8ece4"}`,
                        background: answers[q.id] === l.v ? C.accent : "#fff",
                        color: answers[q.id] === l.v ? "#fff" : C.text,
                        fontSize: 13,
                        fontWeight: answers[q.id] === l.v ? 700 : 400,
                        cursor: "pointer",
                        transition: "all .15s",
                      }}
                    >
                      {l.v} – {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {progress === 100 && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              onClick={() => setSubmitted(true)}
              style={{
                padding: "14px 40px",
                background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(45,159,101,0.35)",
              }}
            >
              ✓ Enviar Evaluación
            </button>
            <p style={{ color: C.textMuted, fontSize: 13, marginTop: 8 }}>
              Una vez enviada, no podrás modificar tus respuestas.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 36px 36px" }}>
      <TopBar title="Mis Evaluaciones" subtitle="Evaluaciones asignadas a tu perfil" />
      <div style={{ padding: "20px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {USER_EVALUATIONS.map((ev) => (
          <Card key={ev.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{ev.name}</span>
                  <Badge label={ev.status} />
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 10 }}>📅 Fecha límite: {ev.deadline}</div>
                <div style={{ background: "#e8f0ec", borderRadius: 99, height: 6, width: 260, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${ev.progress}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                      borderRadius: 99,
                    }}
                  />
                </div>
                <span style={{ fontSize: 11, color: C.textMuted, marginTop: 4, display: "block" }}>
                  {ev.progress}% completado
                </span>
              </div>
              {ev.status !== "Completada" && (
                <button
                  onClick={() => setActiveEval(ev)}
                  style={{
                    padding: "10px 22px",
                    background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(45,159,101,0.25)",
                    marginLeft: 20,
                  }}
                >
                  {ev.progress > 0 ? "Continuar →" : "Iniciar →"}
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
