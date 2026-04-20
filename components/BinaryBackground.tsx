"use client";

import { useEffect, useMemo, useState } from "react";

type LineToken = { text: string; hot: boolean };

const FONT_SIZE_PX = 12;
const LINE_HEIGHT_PX = 16;
const CHAR_WIDTH_PX = Math.ceil(FONT_SIZE_PX * 0.62);

function makeLine(charCount: number, hotChance = 0.08): LineToken[] {
  const chunks: LineToken[] = [];
  let i = 0;

  while (i < charCount) {
    const chunkLen = 6 + Math.floor(Math.random() * 14);
    const len = Math.min(chunkLen, charCount - i);

    let s = "";
    for (let j = 0; j < len; j++) {
      s += Math.random() > 0.5 ? "1" : "0";
    }

    chunks.push({
      text: s,
      hot: Math.random() < hotChance,
    });

    i += len;
  }

  return chunks;
}

export default function BinaryBackground() {
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    setMounted(true);

    const update = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { lines, duration } = useMemo(() => {
    if (!mounted) {
      return { lines: [] as LineToken[][], duration: 35 };
    }

    const charCount = Math.ceil(dims.w / CHAR_WIDTH_PX) + 30;
    const lineCount = Math.ceil(dims.h / LINE_HEIGHT_PX) + 12;
    const hotChance = 0.08;

    const generated = Array.from({ length: lineCount }, () =>
      makeLine(charCount, hotChance)
    );

    return {
      lines: generated,
      duration: 35,
    };
  }, [mounted, dims.w, dims.h]);

  if (!mounted) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{ background: "#000" }}
      />
    );
  }

  const renderBlock = (keyPrefix: string) => (
    <div>
      {lines.map((row, idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          style={{
            width: "100vw",
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: `${FONT_SIZE_PX}px`,
            lineHeight: `${LINE_HEIGHT_PX}px`,
            whiteSpace: "pre",
            userSelect: "none",
          }}
        >
          {row.map((t, j) => (
            <span
              key={`${keyPrefix}-${idx}-${j}`}
              style={
                t.hot
                  ? {
                      color: "rgba(236, 72, 153, 0.98)",
                      textShadow:
                        "0 0 8px rgba(236,72,153,0.75), 0 0 18px rgba(236,72,153,0.35)",
                    }
                  : {
                      color: "rgba(236, 72, 153, 0.28)",
                      textShadow: "0 0 6px rgba(236,72,153,0.12)",
                    }
              }
            >
              {t.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "#000" }}
    >
      <div
        className="absolute left-1/2 top-[-180px] h-[520px] w-[780px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(236,72,153,0.15)" }}
      />
      <div
        className="absolute right-[-180px] top-[320px] h-[420px] w-[620px] rounded-full blur-3xl"
        style={{ background: "rgba(236,72,153,0.12)" }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div
          style={{
            animationName: "binaryWallUp",
            animationDuration: `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            willChange: "transform",
          }}
        >
          {renderBlock("a")}
          {renderBlock("b")}
        </div>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}