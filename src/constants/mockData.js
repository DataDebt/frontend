export const DOMAINS_TECH = [
  { id: 1, name: "Calidad de Datos", desc: "Precisión, completitud y consistencia de los datos operacionales.", questions: 5, active: true },
  { id: 2, name: "Modelo de Datos", desc: "Estructura lógica y física de los datos y sus relaciones.", questions: 4, active: true },
  { id: 3, name: "Integración e Interoperabilidad", desc: "Flujos de datos entre sistemas heterogéneos.", questions: 6, active: true },
  { id: 4, name: "Infraestructura de Datos", desc: "Plataformas, almacenamiento y procesamiento.", questions: 5, active: false },
];
export const DOMAINS_GOV = [
  { id: 5, name: "Metadatos y Linaje", desc: "Trazabilidad y catalogación del origen de los datos.", questions: 4, active: true },
  { id: 6, name: "Cumplimiento, Ética y Seguridad", desc: "Políticas de privacidad, regulación y controles.", questions: 7, active: true },
  { id: 7, name: "Analítica e IA", desc: "Capacidades analíticas y madurez de modelos predictivos.", questions: 5, active: true },
  { id: 8, name: "Documentación de Datos", desc: "Disponibilidad y calidad de documentación técnica.", questions: 3, active: true },
];

export const EVALUATIONS = [
  { id: 1, name: "Diagnóstico Q1 2025", date: "2025-03-15", status: "Cerrada", users: 3, score: 3.2, level: "Moderada" },
  { id: 2, name: "Evaluación Plataforma BI", date: "2025-05-20", status: "Activa", users: 5, score: 2.1, level: "Relevante" },
  { id: 3, name: "Revisión Migración Cloud", date: "2025-07-01", status: "Borrador", users: 2, score: null, level: null },
];

export const USER_EVALUATIONS = [
  { id: 1, name: "Diagnóstico Q1 2025", deadline: "2025-03-20", status: "Completada", progress: 100 },
  { id: 2, name: "Evaluación Plataforma BI", deadline: "2025-06-01", status: "Pendiente", progress: 40 },
];

export const radarData = [
  { domain: "Calidad", score: 2.4 },
  { domain: "Metadatos", score: 3.8 },
  { domain: "Modelo", score: 2.9 },
  { domain: "Integración", score: 1.8 },
  { domain: "Analítica", score: 3.5 },
  { domain: "Cumplimiento", score: 4.1 },
  { domain: "Documentación", score: 2.2 },
  { domain: "Infraestructura", score: 3.0 },
];

export const heatData = [
  { domain: "Integración e Interop.", score: 1.8, impact: "Alto", risk: "Alto", effort: "Alto" },
  { domain: "Calidad de Datos", score: 2.4, impact: "Alto", risk: "Medio", effort: "Medio" },
  { domain: "Documentación", score: 2.2, impact: "Medio", risk: "Alto", effort: "Bajo" },
  { domain: "Modelo de Datos", score: 2.9, impact: "Medio", risk: "Medio", effort: "Medio" },
  { domain: "Infraestructura", score: 3.0, impact: "Medio", risk: "Bajo", effort: "Alto" },
  { domain: "Analítica e IA", score: 3.5, impact: "Bajo", risk: "Bajo", effort: "Medio" },
  { domain: "Metadatos y Linaje", score: 3.8, impact: "Bajo", risk: "Bajo", effort: "Bajo" },
  { domain: "Cumplimiento", score: 4.1, impact: "Bajo", risk: "Bajo", effort: "Bajo" },
];