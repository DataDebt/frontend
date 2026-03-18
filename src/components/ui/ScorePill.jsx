import { C } from "@/constants/colors";
import { scoreBg, scoreColor,scoreLabel } from "@/utils/score";


export function ScorePill({ score }) {
  if (!score) return <span style={{ color: "#aaa", fontSize: 13 }}>—</span>;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ background: scoreBg(score), color: scoreColor(score), padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{score.toFixed(1)}</span>
      <span style={{ color: C.textMuted, fontSize: 12 }}>{scoreLabel(score)}</span>
    </span>
  );
}