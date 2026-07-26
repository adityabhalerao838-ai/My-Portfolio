import { useEffect, useState } from "react";

export function Splash() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Skip splash if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDone(true);
      setHidden(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DURATION = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        setTimeout(() => setHidden(true), 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  // 20 discrete "blocks" like Minecraft loading bar
  const TOTAL = 20;
  const filled = Math.round(progress * TOTAL);
  const pct = Math.round(progress * 100);

  return (
    <div
      aria-hidden={done}
      role="status"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: done ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: done ? "none" : "auto",
        backgroundImage:
          "linear-gradient(oklch(1 0 0 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.03) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* AB block logo */}
      <div
        className="mb-8 flex h-24 w-24 items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.7 0.16 148), oklch(0.5 0.14 148))",
          boxShadow:
            "inset 3px 3px 0 oklch(1 0 0 / 0.25), inset -3px -3px 0 oklch(0 0 0 / 0.4), 0 6px 0 oklch(0 0 0 / 0.5), 0 0 60px oklch(0.7 0.18 148 / 0.4)",
          imageRendering: "pixelated",
        }}
      >
        <span
          className="text-4xl font-black tracking-tight text-[oklch(0.14_0.02_150)]"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "3.5rem",
            lineHeight: 1,
            textShadow: "2px 2px 0 oklch(1 0 0 / 0.2)",
          }}
        >
          AB
        </span>
      </div>

      {/* Loading bar — Minecraft style */}
      <div
        className="flex gap-[3px] p-[3px]"
        style={{
          background: "oklch(0.1 0.01 150)",
          border: "2px solid oklch(0.35 0.03 150)",
          boxShadow:
            "inset 2px 2px 0 oklch(0 0 0 / 0.5), 0 4px 0 oklch(0 0 0 / 0.4)",
        }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 16,
              background:
                i < filled
                  ? "linear-gradient(180deg, oklch(0.78 0.16 148), oklch(0.55 0.14 148))"
                  : "oklch(0.18 0.02 150)",
              boxShadow:
                i < filled
                  ? "inset 1px 1px 0 oklch(1 0 0 / 0.3), inset -1px -1px 0 oklch(0 0 0 / 0.4)"
                  : "inset 1px 1px 0 oklch(0 0 0 / 0.4)",
              transition: "background 0.05s linear",
            }}
          />
        ))}
      </div>

      <p
        className="mt-5 text-[13px] uppercase tracking-[0.2em] text-muted-foreground"
        style={{ fontFamily: "'VT323', monospace", fontSize: "1rem" }}
      >
        Loading world… {pct}%
      </p>
    </div>
  );
}
