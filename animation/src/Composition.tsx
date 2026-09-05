import { loadFont } from "@remotion/fonts";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/*
  The GitHub banner is the first viewport of lucasduys.com, cut to 960x384:
  the same black ground, warm-white ink, one cobalt signal, Geist with a mono
  line for the facts, and the stage dust drifting behind the name.
*/

const GROUND = "#050505";
const INK = "#f2f2ee";
const INK_DIM = "#b0b0a8";
const INK_MUTE = "#83837b";
const SIGNAL = "#5e8bff";
const EASE_STAGE = Easing.bezier(0.16, 1, 0.3, 1);

const SANS = "Geist";
const MONO = "Geist Mono";

loadFont({ family: SANS, url: staticFile("fonts/Geist-SemiBold.woff2"), weight: "600" });
loadFont({ family: SANS, url: staticFile("fonts/Geist-Medium.woff2"), weight: "500" });
loadFont({ family: MONO, url: staticFile("fonts/GeistMono-Medium.woff2"), weight: "500" });

/** Deterministic dust: the same field on every render. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2026);
const DUST = Array.from({ length: 160 }, () => ({
  x: rand(),
  y: rand(),
  r: 0.9 + rand() * 1.5,
  a: 0.18 + rand() * 0.5,
  phase: rand() * Math.PI * 2,
  drift: 4 + rand() * 8,
}));

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ProfileIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  /* Every periodic motion runs on the loop's own period, so frame 95 hands
     to frame 0 without a seam. */
  const loop = (frame / durationInFrames) * Math.PI * 2;

  const kicker = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: EASE_STAGE });
  const name = interpolate(frame, [4, 28], [0, 1], { ...clamp, easing: EASE_STAGE });
  const line = interpolate(frame, [22, 42], [0, 1], { ...clamp, easing: EASE_STAGE });
  const rail = interpolate(frame, [0, durationInFrames - 10], [0, 1], clamp);
  const exit = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: GROUND, color: INK, opacity: exit }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        {DUST.map((d, i) => {
          /* Each point falls slowly toward the light on its own phase and
             fades before it arrives: always gathering, never arriving. */
          const t = (Math.sin(loop + d.phase) + 1) / 2;
          return (
            <circle
              key={i}
              cx={d.x * width}
              cy={d.y * height - t * d.drift}
              r={d.r}
              fill={INK}
              opacity={d.a * (0.55 + 0.45 * Math.sin(loop * 2 + d.phase))}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          left: 56,
          top: 112,
          fontFamily: `${SANS}, Helvetica, Arial, sans-serif`,
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: SIGNAL,
          opacity: kicker,
          transform: `translateY(${(1 - kicker) * -8}px)`,
        }}
      >
        Founder / AI engineer
      </div>

      <div
        style={{
          position: "absolute",
          left: 52,
          top: 136,
          fontFamily: `${SANS}, Helvetica, Arial, sans-serif`,
          fontWeight: 600,
          fontSize: 118,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          clipPath: `inset(0 ${(1 - name) * 100}% 0 0)`,
          transform: `translateY(${(1 - name) * 18}px)`,
        }}
      >
        Lucas Duys
      </div>

      <div
        style={{
          position: "absolute",
          left: 56,
          top: 278,
          fontFamily: `${MONO}, ui-monospace, monospace`,
          fontWeight: 500,
          fontSize: 17,
          letterSpacing: "-0.01em",
          color: INK_DIM,
          opacity: line,
          transform: `translateY(${(1 - line) * 10}px)`,
        }}
      >
        Building Athren. Antler ONE, September 2026.
      </div>

      <div
        style={{
          position: "absolute",
          right: 56,
          bottom: 100,
          fontFamily: `${MONO}, ui-monospace, monospace`,
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: "0.02em",
          color: INK_MUTE,
          opacity: line,
        }}
      >
        lucasduys.com
      </div>

      {/* The film's progress rail, filling over one loop. */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 128,
          width: 2,
          height: 128,
          background: "rgba(242, 242, 238, 0.15)",
        }}
      >
        <div style={{ width: "100%", height: `${rail * 100}%`, background: INK, opacity: 0.75 }} />
      </div>
    </AbsoluteFill>
  );
};
