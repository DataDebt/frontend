import { CSSProperties, ReactNode } from "react";
import { C } from "@/constants/colors";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, style = {} }: CardProps) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.cardBorder}`,
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,60,30,0.07)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
