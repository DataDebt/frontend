import { C } from "@/constants/colors";

export default function GeoBg() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {(
        [
          [900, 80, 1060, 200, 1010, 340],
          [760, 10, 870, 180, 680, 210],
          [1050, 260, 1180, 380, 1100, 480],
          [820, 330, 960, 420, 870, 530],
          [1120, 80, 1240, 160, 1180, 280],
          [660, 350, 790, 480, 700, 560],
          [1000, 440, 1130, 560, 1050, 630],
          [740, 500, 840, 610, 760, 680],
          [1180, 380, 1280, 480, 1220, 560],
          [880, 580, 980, 660, 900, 730],
        ] as [number, number, number, number, number, number][]
      ).map(([x1, y1, x2, y2, x3, y3], i) => (
        <polygon
          key={i}
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill={i % 3 === 0 ? C.accent : i % 3 === 1 ? C.accentLight : "#ffffff"}
          opacity={0.5 + (i % 3) * 0.15}
        />
      ))}
    </svg>
  );
}
