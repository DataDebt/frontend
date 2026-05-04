import { C } from "@/constants/colors";
import { Card } from "../ui/Card";
import { TopBar } from "../layout/TopBar";

const categories = [
  {
    icon: "📋",
    title: "Calidad de datos",
    desc: "Errores, inconsistencias y duplicados que hacen que los datos no sean confiables para tomar decisiones.",
  },
  {
    icon: "🏷",
    title: "Metadatos y linaje",
    desc: "Falta de documentacion sobre el origen, significado y transformaciones que sufren los datos.",
  },
  {
    icon: "🗂",
    title: "Modelo de datos",
    desc: "Estructuras de datos mal disenadas que dificultan consultas, reportes y evolucion del sistema.",
  },
  {
    icon: "🔗",
    title: "Integracion e interoperabilidad",
    desc: "Silos de datos desconectados que impiden tener una vision unificada de la informacion.",
  },
  {
    icon: "🤖",
    title: "Analitica e IA",
    desc: "Pipelines fragiles, modelos no mantenidos y sesgos que degradan los resultados analiticos.",
  },
  {
    icon: "🔒",
    title: "Cumplimiento, etica y seguridad",
    desc: "Riesgos legales y reputacionales por no proteger adecuadamente los datos personales y sensibles.",
  },
  {
    icon: "📝",
    title: "Documentacion de datos",
    desc: "Ausencia de definiciones, diccionarios y reglas de negocio documentadas para los conjuntos de datos.",
  },
  {
    icon: "🖥",
    title: "Infraestructura de datos",
    desc: "Sistemas obsoletos, sin escalabilidad o sin respaldo que ponen en riesgo la disponibilidad de los datos.",
  },
];

export default function DataDebtPage() {
  return (
    <div style={{ padding: "20px 36px 36px" }}>
      <TopBar
        title="Deuda de Datos"
        subtitle="Entiende el concepto detras de la plataforma y por que es importante para tu organizacion"
      />

      <div style={{ padding: "20px 0" }}>
        <Card>
          <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: C.text }}>
            Que es la Deuda de Datos?
          </h3>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            La <strong style={{ color: C.text }}>deuda de datos</strong> es un concepto que describe las obligaciones
            futuras que se acumulan cuando una organizacion toma atajos o pospone decisiones importantes sobre como
            gestiona sus datos.
          </p>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Al igual que una deuda financiera genera intereses, las malas practicas con los datos generan costos que
            crecen con el tiempo: reprocesos manuales, decisiones basadas en informacion erronea, dificultad para
            cumplir regulaciones y perdida de oportunidades de innovacion.
          </p>
          <p style={{ margin: 0, fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Este concepto fue desarrollado por investigadoras de la{" "}
            <strong style={{ color: C.text }}>Universidad de Antioquia</strong> como una extension de la
            deuda tecnica al dominio de los datos, proponiendo una taxonomia de <strong style={{ color: C.text }}>8 categorias</strong> y
            un proceso de <strong style={{ color: C.text }}>4 fases</strong> para identificarla, valorarla y gestionarla.
          </p>
        </Card>

        <h3 style={{ margin: "28px 0 16px", fontSize: 16, fontWeight: 800, color: C.text }}>
          Las 8 categorias de Deuda de Datos
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
          {categories.map((cat) => (
            <Card key={cat.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{cat.icon}</span>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: C.text }}>{cat.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{cat.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ marginTop: 24 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: C.text }}>
            El ciclo de gestion de la Deuda de Datos
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {[
              { phase: "1", title: "Identificacion", desc: "Detectar donde y como se acumula la deuda en los sistemas y procesos de datos." },
              { phase: "2", title: "Valoracion", desc: "Medir el impacto en costos, riesgos y oportunidades perdidas para priorizar acciones." },
              { phase: "3", title: "Ejecucion", desc: "Implementar mejoras: limpiar datos, documentar, modernizar infraestructura y automatizar." },
              { phase: "4", title: "Gobernanza", desc: "Establecer politicas y controles para evitar que la deuda se acumule nuevamente." },
            ].map((step) => (
              <div key={step.phase} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, #1a5c3a, ${C.accent})`,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                    fontWeight: 800,
                    fontSize: 16,
                  }}
                >
                  {step.phase}
                </div>
                <h4 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: C.text }}>{step.title}</h4>
                <p style={{ margin: 0, fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: C.text }}>
            Por que te importa?
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Como usuario de <strong style={{ color: C.text }}>DataDebt</strong>, tus evaluaciones ayudan a
            identificar donde se acumula la deuda de datos en tu organizacion. Cada respuesta que das permite
            a los administradores priorizar inversiones, reducir riesgos y acelerar la transformacion digital
            basada en datos confiables. Tu participacion es clave para construir una cultura de datos
            saludable.
          </p>
        </Card>
      </div>
    </div>
  );
}
