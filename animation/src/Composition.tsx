import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";

const ACCENT = "#c9ff4a";
const INK = "#0b0d0c";
const PAPER = "#eff0e8";
const MUTED = "#8d9288";
const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const SignalField: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [74, 128, 196, 278, 346, 412];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(239,240,232,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(239,240,232,.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: `${interpolate(frame, [0, 168], [0, 72])}px ${interpolate(frame, [0, 168], [0, 72])}px`,
        }}
      />

      {lines.map((top, index) => (
        <div
          key={top}
          style={{
            position: "absolute",
            left: index % 2 === 0 ? 500 : 650,
            right: -80,
            top,
            height: 1,
            opacity: 0.18 + index * 0.025,
            background: index === 2 ? ACCENT : PAPER,
            scale: `${interpolate(
              frame,
              [0, 32],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
            )} 1`,
            transformOrigin: "right center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -4,
              left: `${(index * 149 + (frame / 168) * 1200) % 1100}px`,
              width: 9,
              height: 9,
              background: index === 2 ? ACCENT : PAPER,
            }}
          />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const slices = [
    { top: 0, bottom: 67, offset: -90 },
    { top: 33, bottom: 33, offset: 70 },
    { top: 67, bottom: 0, offset: -45 },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 8, 38, 48], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 72,
          color: MUTED,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.18em",
          opacity: interpolate(frame, [10, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `0 ${interpolate(frame, [10, 22], [18, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}px`,
        }}
      >
        LUCASDUYS.COM
      </div>

      {slices.map((slice) => (
        <div
          key={slice.top}
          style={{
            position: "absolute",
            left: 58,
            top: 122,
            color: PAPER,
            fontSize: 150,
            fontWeight: 900,
            letterSpacing: "-0.075em",
            lineHeight: 0.9,
            whiteSpace: "nowrap",
            clipPath: `inset(${slice.top}% 0 ${slice.bottom}% 0)`,
            translate: `${interpolate(frame, [2, 24], [slice.offset, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            })}px 0`,
          }}
        >
          LUCAS DUYS
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: 64,
          bottom: 72,
          width: interpolate(frame, [16, 34], [0, 530], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          }),
          height: 10,
          background: ACCENT,
        }}
      />
    </AbsoluteFill>
  );
};

const Forge: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 7, 38, 46], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "38%",
          background: ACCENT,
          translate: `${interpolate(frame, [0, 14], [-460, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}px 0`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 62,
          top: 64,
          color: INK,
          fontSize: 116,
          fontWeight: 950,
          letterSpacing: "-0.07em",
          lineHeight: 0.9,
          translate: `0 ${interpolate(frame, [4, 18], [48, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}px`,
        }}
      >
        FORGE
      </div>

      <div
        style={{
          position: "absolute",
          left: 505,
          top: 108,
          maxWidth: 610,
          color: PAPER,
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: "-0.045em",
          lineHeight: 1.04,
          translate: `${interpolate(frame, [8, 23], [70, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}px 0`,
        }}
      >
        ONE IDEA IN.
        <br />
        TESTED, REVIEWED,
        <br />
        COMMITTED CODE OUT.
      </div>

      <div
        style={{
          position: "absolute",
          left: 508,
          bottom: 64,
          color: ACCENT,
          fontSize: 22,
          fontWeight: 750,
          letterSpacing: "0.12em",
          opacity: interpolate(frame, [18, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        GITHUB.COM/LUCASDUYS/FORGE
      </div>
    </AbsoluteFill>
  );
};

const Stacklink: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 7, 38, 47], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 52,
          color: PAPER,
          fontSize: 102,
          fontWeight: 950,
          letterSpacing: "-0.075em",
          lineHeight: 0.95,
          clipPath: `inset(0 ${interpolate(frame, [0, 18], [100, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}% 0 0)`,
        }}
      >
        STACKLINK
      </div>

      <div
        style={{
          position: "absolute",
          left: 64,
          top: 170,
          width: 520,
          color: MUTED,
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: "0.04em",
          opacity: interpolate(frame, [9, 19], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        EU-SOVEREIGN AGENTIC RUNTIME
        <div style={{ width: 390, height: 8, marginTop: 25, background: ACCENT }} />
      </div>

      <div
        style={{
          position: "absolute",
          right: 64,
          top: 116,
          color: ACCENT,
          fontSize: 104,
          fontWeight: 950,
          letterSpacing: "-0.07em",
          lineHeight: 0.85,
          textAlign: "right",
          translate: `${interpolate(frame, [7, 22], [80, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}px 0`,
        }}
      >
        2ND / 70
      </div>

      <div
        style={{
          position: "absolute",
          right: 70,
          top: 228,
          color: PAPER,
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textAlign: "right",
          opacity: interpolate(frame, [16, 27], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        TU/e CONTEST 2026
        <br />
        FIRST RUNNER-UP
      </div>
    </AbsoluteFill>
  );
};

const Website: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: interpolate(frame, [0, 8, 33, 44], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          color: PAPER,
          fontSize: 98,
          fontWeight: 900,
          letterSpacing: "-0.065em",
          lineHeight: 1,
          clipPath: `inset(0 ${interpolate(frame, [0, 18], [100, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          })}% 0 0)`,
        }}
      >
        LUCASDUYS.COM
      </div>

      <div
        style={{
          position: "absolute",
          top: 310,
          left: 194,
          width: interpolate(frame, [8, 26], [0, 812], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          }),
          height: 12,
          background: ACCENT,
        }}
      />
    </AbsoluteFill>
  );
};

export const ProfileIntro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: INK,
        color: PAPER,
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <SignalField />
      <Sequence name="Lucas Duys" durationInFrames={48}>
        <Intro />
      </Sequence>
      <Sequence name="Forge" from={42} durationInFrames={46}>
        <Forge />
      </Sequence>
      <Sequence name="Stacklink" from={84} durationInFrames={47}>
        <Stacklink />
      </Sequence>
      <Sequence name="Website" from={124} durationInFrames={44}>
        <Website />
      </Sequence>
    </AbsoluteFill>
  );
};
