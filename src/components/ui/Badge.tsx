interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  const map: Record<string, [string, string]> = {
    Activa: ["#e3f8ed", "#1a7a4a"],
    Cerrada: ["#ebebeb", "#666"],
    Borrador: ["#fff8e3", "#9a7000"],
    Completada: ["#e3f8ed", "#1a7a4a"],
    Pendiente: ["#fff3e0", "#c06b00"],
  };
  const [bg, fg] = map[label] || ["#eee", "#555"];
  return (
    <span style={{ background: bg, color: fg, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
      {label}
    </span>
  );
}
