import { C } from "@/constants/colors";

export function scoreColor(s) {
  if (s < 2) return C.danger;
  if (s < 3.5) return C.warn;
  return C.success;
}
export function scoreLabel(s) {
  if (!s) return "—";
  if (s < 2) return "Deuda Alta";
  if (s < 3) return "Deuda Relevante";
  if (s < 4) return "Deuda Moderada";
  return "Deuda Baja";
}
export function scoreBg(s) {
  if (s < 2) return "#fde8e8";
  if (s < 3.5) return "#fef3e2";
  return "#e3f8ed";
}