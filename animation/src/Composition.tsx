import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

const ACCENT = "#c9ff4a";
const INK = "#0b0d0c";
const PAPER = "#eff0e8";
const MUTED = "#8d9288";
const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const ProfileIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [3, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const exit = interpolate(frame, [84, 95], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: INK,
        color: PAPER,
        fontFamily: "Arial, Helvetica, sans-serif",
        opacity: exit,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 42,
          left: 52,
          right: 52,
          display: "flex",
          justifyContent: "space-between",
          color: MUTED,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "0.18em",
          opacity: enter,
        }}
      >
        <span>LUCASDUYS.COM</span>
        <span>FORGE&nbsp;&nbsp;/&nbsp;&nbsp;STACKLINK</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 49,
          top: 118,
          fontSize: 130,
          fontWeight: 900,
          letterSpacing: "-0.075em",
          lineHeight: 0.83,
          whiteSpace: "nowrap",
          clipPath: `inset(0 ${100 - enter * 100}% 0 0)`,
          transform: `translateY(${(1 - enter) * 22}px)`,
        }}
      >
        LUCAS DUYS
      </div>

      <div
        style={{
          position: "absolute",
          left: 52,
          bottom: 58,
          width: 856,
          height: 2,
          background: "rgba(239, 240, 232, 0.18)",
        }}
      >
        <div
          style={{
            width: `${enter * 100}%`,
            height: "100%",
            background: ACCENT,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
