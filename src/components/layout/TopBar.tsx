import { C } from "@/constants/colors";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <div style={{ padding: "24px 36px 0", marginBottom: 4 }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{title}</h1>
      {subtitle && <p style={{ margin: "4px 0 0", color: C.textMuted, fontSize: 14 }}>{subtitle}</p>}
    </div>
  );
}
