import { useEffect, useRef, useState } from "react";

/**
 * A single tiny voxel character that travels between sections of the page.
 * It perches on elements marked with `data-perch` inside the currently
 * active section, walking from its old spot to the new one.
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
      aria-label={`Tiny voxel ${p.name} exploring the page`}
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

const SECTION_IDS = ["home", "about", "skills", "projects", "building", "photo", "contact"];

/**
 * Single travelling companion. Mount once per page.
 */
export function VoxelBuddy() {
  const [variant, setVariant] = useState<Palette | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const perchRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef(0.72); // horizontal fraction on the perch
  const posRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const walkingRef = useRef(false);

  useEffect(() => {
    setVariant(VARIANTS[Math.floor(Math.random() * VARIANTS.length)]!);
  }, []);

  useEffect(() => {
    if (!variant) return;
    const el = rootRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let activeSection: string | null = null;

    const onScreen = (p: HTMLElement) => {
      const r = p.getBoundingClientRect();
      return r.top > 80 && r.top < window.innerHeight - 40;
    };

    const pickPerch = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      const usable = (list: HTMLElement[]) =>
        list.filter((p) => p.offsetWidth > 60 && p.offsetHeight > 20);
      const all = usable(
        Array.from(section.querySelectorAll<HTMLElement>("[data-perch]")),
      );
      // prefer perches whose top edge is currently on screen
      let perches = all.filter(onScreen);
      if (!perches.length) {
        // tall section scrolled past its cards — seat on any visible perch
        perches = usable(
          Array.from(document.querySelectorAll<HTMLElement>("[data-perch]")),
        ).filter(onScreen);
      }
      if (!perches.length) perches = all;
      if (!perches.length) return;
      let next = perches[Math.floor(Math.random() * perches.length)]!;
      if (perches.length > 1 && next === perchRef.current) {
        next = perches[(perches.indexOf(next) + 1) % perches.length]!;
      }
      perchRef.current = next;
      anchorRef.current = 0.55 + Math.random() * 0.3;
    };



    const target = () => {
      const p = perchRef.current;
      if (!p) return null;
      const r = p.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = Math.min(
        Math.max(r.left + r.width * anchorRef.current - w / 2, 8),
        window.innerWidth - w - 8,
      );
      return { x, y: r.top - h + (h > 55 ? 11 : 9) };
    };

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const t = target();
      if (!t) {
        el.style.opacity = "0";
        return;
      }
      const visible = t.y > -80 && t.y < window.innerHeight + 40;
      el.style.opacity = visible ? "1" : "0";

      if (!posRef.current || reduced) {
        posRef.current = t;
      } else {
        const dx = t.x - posRef.current.x;
        const dy = t.y - posRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.6) {
          posRef.current = t;
        } else {
          // cap speed so long trips read as a walk, not a jump
          const step = Math.min(dist, Math.max(10, dist * 0.2));
          posRef.current = {
            x: posRef.current.x + (dx / dist) * step,
            y: posRef.current.y + (dy / dist) * step,
          };
        }
        const nowWalking = dist > 3;
        if (nowWalking !== walkingRef.current) {
          walkingRef.current = nowWalking;
          el.classList.toggle("is-walking", nowWalking);
        }
        if (nowWalking) {
          el.style.setProperty("--vb-flip", dx < -1 ? "-1" : "1");
        }
      }
      el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) `;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id;
        if (id === activeSection) return;
        activeSection = id;
        pickPerch(id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    SECTION_IDS.forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });

    // initial placement in the hero
    pickPerch("home");
    rafRef.current = requestAnimationFrame(tick);

    // if the current perch drifts off screen (tall sections), hop to a better one
    const keepVisible = window.setInterval(() => {
      const p = perchRef.current;
      if (activeSection && (!p || !onScreen(p))) pickPerch(activeSection);
    }, 500);

    const onResize = () => {
      posRef.current = null; // snap back onto the perch after reflow
      if (activeSection) pickPerch(activeSection);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      io.disconnect();
      window.clearInterval(keepVisible);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [variant]);

  if (!variant) return null;

  return (
    <div ref={rootRef} className="voxel-buddy pointer-events-none select-none" aria-hidden={false}>
      <div className="voxel-buddy-inner h-full w-full">
        <Character p={variant} />
      </div>
      <span className="voxel-buddy-shadow" aria-hidden />
    </div>
  );
}
