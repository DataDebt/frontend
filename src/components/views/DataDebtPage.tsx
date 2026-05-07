import { C } from "@/constants/colors";
import { Card } from "../ui/Card";
import { TopBar } from "../layout/TopBar";
import { FaGithub } from "react-icons/fa";

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
    desc: "Estructuras de datos mal diseñadas que dificultan consultas, reportes y evolución del sistema.",
  },
  {
    icon: "🔗",
    title: "Integracion e interoperabilidad",
    desc: "Silos de datos desconectados que impiden tener una visión unificada de la información.",
  },
  {
    icon: "🤖",
    title: "Analítica e IA",
    desc: "Pipelines frágiles, modelos no mantenidos y sesgos que degradan los resultados analíticos.",
  },
  {
    icon: "🔒",
    title: "Cumplimiento, ética y seguridad",
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
        title="¿Deuda de Datos?"
        subtitle="Entiende el concepto detrás de la plataforma y por que es importante para tu organización"
      />

      <div style={{ padding: "20px 0" }}>
        <Card>
          <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: C.text }}>
            ¿Qué es la Deuda de Datos?
          </h3>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            La <strong style={{ color: C.text }}>deuda de datos</strong> es un concepto que describe las obligaciones
            futuras que se acumulan cuando una organización toma atajos o pospone decisiones importantes sobre como
            gestióna sus datos.
          </p>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Al igual que una deuda financiera genera intereses, las malas prácticas con los datos generan costos que
            crecen con el tiempo: reprocesos manuales, decisiones basadas en información errónea, dificultad para
            cumplir regulaciones y pérdida de oportunidades de innovacion.
          </p>
          <p style={{ margin: 0, fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Este concepto fue desarrollado por investigadoras de la{" "}
            <strong style={{ color: C.text }}>Universidad de Antioquia</strong> como una extensión de la
            deuda técnica al dominio de los datos, proponiendo una taxonomía de <strong style={{ color: C.text }}>8 categorías</strong> y
            un proceso de <strong style={{ color: C.text }}>4 fases</strong> para identificarla, valorarla y gestiónarla.
          </p>
        </Card>

        <h3 style={{ margin: "28px 0 16px", fontSize: 16, fontWeight: 800, color: C.text }}>
          Las 8 categorías de Deuda de Datos
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
            El ciclo de gestión de la Deuda de Datos
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {[
              { phase: "1", title: "Identificación", desc: "Detectar donde y cómo se acumula la deuda en los sistemas y procesos de datos." },
              { phase: "2", title: "Valoración", desc: "Medir el impacto en costos, riesgos y oportunidades perdidas para priorizar acciones." },
              { phase: "3", title: "Ejecución", desc: "Implementar mejoras: limpiar datos, documentar, modernizar infraestructura y automatizar." },
              { phase: "4", title: "Gobernanza", desc: "Establecer políticas y controles para evitar que la deuda se acumule nuevamente." },
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
            ¿Por qué te importa?
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Como usuario de <strong style={{ color: C.text }}>DataDebt</strong>, tus evaluaciónes ayudan a
            identificar dónde se acumula la deuda de datos en tu organización. Cada respuesta que das permite
            a los administradores priorizar inversiones, reducir riesgos y acelerar la transformacion digital
            basada en datos confiables. Tu participación es clave para construir una cultura de datos
            saludable.
          </p>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: C.text }}>
            Sobre este proyecto
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>
            Este es un <strong style={{ color: C.text }}>proyecto integrador</strong> desarrollado como parte del
            programa académico de la{" "}
            <strong style={{ color: C.text }}>Universidad de Antioquia</strong>, orientado a conceptualizar,
            diagnosticar y gestiónar la deuda de datos en las organizaciónes.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 8 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: C.text }}>
                 Desarrolladores
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  "Miguel Angel Gallego",
                  "Julián Vanegas López",
                  "Diego Carvajal",
                ].map((name) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textMuted }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
                    {name}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: C.text }}>
                 Docente
              </h4>
              <p style={{ margin: 0, fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                <strong style={{ color: C.text }}>Gina Paola Maestre Góngora</strong>
                <br />
                Docente asesora del proyecto integrador
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: `1px solid ${C.cardBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <FaGithub size={20} style={{ color: C.text, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: C.textMuted }}>Repositorio:</span>
            <a
              href="https://github.com/DataDebt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: C.accent,
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
            >
              github.com/DataDebt
            </a>
            <span style={{ fontSize: 11, color: "#aaa", marginLeft: "auto" }}>
              Proyecto Integrador &middot; Universidad de Antioquia
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
