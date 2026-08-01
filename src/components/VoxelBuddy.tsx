import { useEffect, useState } from "react";

/**
 * Tiny voxel character that sits on the top edge of its parent container.
 * Parent must be `relative`. One variant is picked at random per page load
 * and stays stable for the session.
 */

type Palette = {
  name: string;
  skin: string;
  skinDark: string;
  body: string;
  bodyDark: string;
  legs: string;
  eye: string;
  eyeGlow?: boolean;
  mouth?: "creeper" | "skeleton" | "none";
  hair?: string;
  tall?: boolean;
};

const VARIANTS: Palette[] = [
  {
    name: "Creeper",
    skin: "oklch(0.72 0.15 148)",
    skinDark: "oklch(0.52 0.13 148)",
    body: "oklch(0.66 0.14 148)",
    bodyDark: "oklch(0.46 0.12 148)",
    legs: "oklch(0.58 0.13 148)",
    eye: "oklch(0.12 0.01 150)",
    mouth: "creeper",
  },
  {
    name: "Steve",
    skin: "oklch(0.78 0.07 60)",
    skinDark: "oklch(0.62 0.07 55)",
    body: "oklch(0.62 0.11 235)",
    bodyDark: "oklch(0.45 0.1 235)",
    legs: "oklch(0.42 0.09 265)",
    eye: "oklch(0.35 0.09 250)",
    hair: "oklch(0.32 0.04 50)",
  },
  {
    name: "Alex",
    skin: "oklch(0.82 0.06 65)",
    skinDark: "oklch(0.66 0.06 60)",
    body: "oklch(0.64 0.11 150)",
    bodyDark: "oklch(0.47 0.1 150)",
    legs: "oklch(0.45 0.06 60)",
    eye: "oklch(0.4 0.08 150)",
    hair: "oklch(0.62 0.14 55)",
  },
  {
    name: "Enderman",
    skin: "oklch(0.18 0.01 300)",
    skinDark: "oklch(0.12 0.01 300)",
    body: "oklch(0.16 0.01 300)",
    bodyDark: "oklch(0.1 0.01 300)",
    legs: "oklch(0.14 0.01 300)",
    eye: "oklch(0.8 0.2 310)",
    eyeGlow: true,
    tall: true,
  },
  {
    name: "Skeleton",
    skin: "oklch(0.88 0.005 120)",
    skinDark: "oklch(0.7 0.005 120)",
    body: "oklch(0.84 0.005 120)",
    bodyDark: "oklch(0.66 0.005 120)",
    legs: "oklch(0.8 0.005 120)",
    eye: "oklch(0.15 0.01 150)",
    mouth: "skeleton",
  },
];

function Character({ p }: { p: Palette }) {
  const headY = p.tall ? 0 : 1;
  return (
    <svg
      viewBox="0 0 16 24"
      className="voxel-buddy-svg h-full w-full"
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Tiny voxel ${p.name} sitting on the card`}
    >
      {/* legs */}
      <g className="vb-legs">
        <rect x="4" y={headY + 17} width="3" height="6" fill={p.legs} />
        <rect x="9" y={headY + 17} width="3" height="6" fill={p.legs} />
        <rect x="4" y={headY + 22} width="8" height="1" fill={p.bodyDark} />
      </g>
      {/* arms */}
      <g className="vb-arm-l">
        <rect x="1" y={headY + 10} width="3" height="7" fill={p.skinDark} />
      </g>
      <g className="vb-arm-r">
        <rect x="12" y={headY + 10} width="3" height="7" fill={p.skinDark} />
      </g>
      {/* torso */}
      <rect x="4" y={headY + 10} width="8" height="7" fill={p.body} />
      <rect x="4" y={headY + 10} width="8" height="1" fill={p.skin} opacity="0.5" />
      <rect x="4" y={headY + 16} width="8" height="1" fill={p.bodyDark} />
      {/* head */}
      <g className="vb-head">
        <rect x="3" y={headY + 1} width="10" height="9" fill={p.skin} />
        <rect x="3" y={headY + 1} width="10" height="1" fill="oklch(1 0 0 / 0.18)" />
        <rect x="3" y={headY + 9} width="10" height="1" fill={p.skinDark} />
        {p.hair && (
          <>
            <rect x="3" y={headY + 1} width="10" height="2" fill={p.hair} />
            <rect x="3" y={headY + 1} width="1" height="5" fill={p.hair} />
            <rect x="12" y={headY + 1} width="1" height="5" fill={p.hair} />
          </>
        )}
        {/* eyes */}
        <rect
          x="4.5"
          y={headY + 4}
          width="2.5"
          height="2"
          fill={p.eye}
          className={p.eyeGlow ? "vb-glow" : undefined}
        />
        <rect
          x="9"
          y={headY + 4}
          width="2.5"
          height="2"
          fill={p.eye}
          className={p.eyeGlow ? "vb-glow" : undefined}
        />
        {p.mouth === "creeper" && (
          <>
            <rect x="6.5" y={headY + 6} width="3" height="2" fill={p.eye} />
            <rect x="5.5" y={headY + 7} width="1.5" height="2" fill={p.eye} />
            <rect x="9" y={headY + 7} width="1.5" height="2" fill={p.eye} />
          </>
        )}
        {p.mouth === "skeleton" && (
          <rect x="6" y={headY + 7} width="4" height="1" fill={p.skinDark} />
        )}
      </g>
    </svg>
  );
}

export function VoxelBuddy({ className = "" }: { className?: string }) {
  const [variant, setVariant] = useState<Palette | null>(null);

  useEffect(() => {
    setVariant(VARIANTS[Math.floor(Math.random() * VARIANTS.length)]!);
  }, []);

  if (!variant) return null;

  return (
    <div
      className={`voxel-buddy pointer-events-none absolute select-none ${className}`}
      aria-hidden={false}
    >
      <div className="voxel-buddy-inner h-full w-full">
        <Character p={variant} />
      </div>
      <span className="voxel-buddy-shadow" aria-hidden />
    </div>
  );
}
