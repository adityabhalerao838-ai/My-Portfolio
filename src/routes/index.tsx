import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import portraitAsset from "@/assets/aditya.png.asset.json";
import { VoxelBuddy } from "@/components/VoxelBuddy";

const portrait = portraitAsset.url;

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const EMAIL = "adityabhalerao838@gmail.com";
const GITHUB = "https://github.com/adityabhalerao838-ai";
const LINKEDIN =
  "https://www.linkedin.com/in/%F0%9D%90%80%F0%9D%90%9D%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%B2%F0%9D%90%9A-%F0%9D%90%81%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%A8-74493a39b";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "building", label: "Building" },
  { id: "contact", label: "Contact" },
];

type Project = {
  title: string;
  status: "Building" | "Live" | "Concept";
  summary: string;
  tags: string[];
  link?: string;
};
const PROJECTS: Project[] = [
  {
    title: "Assignly",
    status: "Building",
    summary:
      "A study & academic productivity website designed to help students organise assignments, deadlines and course work in one focused place.",
    tags: ["Web", "Productivity", "Students"],
  },
];

const SKILLS = [
  {
    n: "01",
    title: "Prompt Engineering",
    body: "Designing structured, context-rich prompts to get reliable, production-quality output from modern LLMs — for real product work, not just demos.",
  },
  {
    n: "02",
    title: "Programming Fundamentals",
    body: "Data structures, algorithms and clean code habits — the groundwork that carries across every language and stack.",
  },
  {
    n: "03",
    title: "AI & Generative AI",
    body: "Exploring how modern models work, where they fit in real products, and how to use them responsibly in day-to-day building.",
  },
  {
    n: "04",
    title: "Claude / AI-Assisted Development",
    body: "Pairing with AI tools like Claude to move faster, reason about architecture, and ship polished user experiences.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* Tiny SVG block icon — pixel cube */
function BlockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="2" y="4" width="12" height="10" fill="oklch(0.35 0.03 150)" />
      <rect x="2" y="4" width="12" height="3" fill="oklch(0.7 0.16 148)" />
      <rect x="2" y="4" width="12" height="1" fill="oklch(0.85 0.14 148)" />
      <rect x="2" y="13" width="12" height="1" fill="oklch(0.15 0.02 150)" />
    </svg>
  );
}

function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 md:block"
      >
        <ul className="glass-strong flex items-center gap-1 px-2 py-2 text-sm">
          <li className="px-2">
            <BlockIcon className="h-4 w-4" />
          </li>
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`pixel relative px-3 py-2 text-[15px] transition-colors ${
                  active === n.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <span
                    aria-hidden
                    className="block-btn absolute inset-0 -z-10 bg-primary/90"
                  />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile */}
      <div className="fixed inset-x-0 top-0 z-50 md:hidden">
        <div className="glass-strong m-3 flex items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-2 text-base tracking-tight">
            <BlockIcon className="h-5 w-5" />
            <span className="font-bold">
              Aditya <span className="text-primary">B.</span>
            </span>
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="block-btn bg-secondary p-2 text-foreground/80 hover:text-foreground"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" shapeRendering="crispEdges">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
        {open && (
          <ul className="glass-strong mx-3 mt-1 flex flex-col p-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`pixel block px-4 py-3 text-[16px] transition-colors ${
                    active === n.id
                      ? "bg-primary/20 text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

/* Distant blocky mountain silhouette */
function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[38vh] w-full opacity-70"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <defs>
        <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.22 0.03 155)" />
          <stop offset="1" stopColor="oklch(0.14 0.015 155)" />
        </linearGradient>
        <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.3 0.04 150)" />
          <stop offset="1" stopColor="oklch(0.18 0.02 150)" />
        </linearGradient>
      </defs>
      {/* back range — stepped voxel edges */}
      <path
        fill="url(#mtn1)"
        d="M0 180 L60 180 L60 140 L120 140 L120 110 L180 110 L180 90 L260 90 L260 120 L340 120 L340 100 L420 100 L420 130 L520 130 L520 90 L600 90 L600 120 L700 120 L700 100 L800 100 L800 140 L900 140 L900 120 L1000 120 L1000 150 L1100 150 L1100 130 L1200 130 L1200 260 L0 260 Z"
      />
      {/* front range darker */}
      <path
        fill="url(#mtn2)"
        d="M0 210 L80 210 L80 180 L160 180 L160 160 L240 160 L240 190 L340 190 L340 160 L440 160 L440 200 L540 200 L540 170 L640 170 L640 200 L760 200 L760 180 L860 180 L860 210 L960 210 L960 190 L1060 190 L1060 220 L1200 220 L1200 260 L0 260 Z"
      />
      {/* pixel trees */}
      {[80, 190, 300, 420, 560, 700, 830, 950, 1080].map((x, i) => (
        <g key={x} transform={`translate(${x} ${185 + ((i * 7) % 25)})`}>
          <rect x="4" y="10" width="4" height="14" fill="oklch(0.22 0.05 40)" />
          <rect x="-2" y="-4" width="16" height="16" fill="oklch(0.35 0.1 148)" />
          <rect x="0" y="-8" width="12" height="8" fill="oklch(0.4 0.12 148)" />
        </g>
      ))}
    </svg>
  );
}

/* Drifting pixel particles */
function Particles() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: (i * 53) % 100,
        size: 3 + (i % 4),
        delay: (i * 0.7) % 12,
        duration: 14 + (i % 8),
        color:
          i % 3 === 0
            ? "oklch(0.78 0.16 148)"
            : i % 3 === 1
              ? "oklch(0.78 0.14 85)"
              : "oklch(0.85 0.02 150)",
        opacity: 0.35 + ((i % 5) * 0.08),
      })),
    [],
  );
  return (
    <>
      {items.map((p, i) => (
        <span
          key={i}
          className="voxel"
          style={{
            left: `${p.left}%`,
            bottom: `-10vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animation: `drift-particle ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function Decor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* moon */}
      <div className="absolute right-[8%] top-[8%] h-24 w-24 bg-[oklch(0.92_0.04_90)] shadow-[0_0_80px_30px_oklch(0.9_0.05_90/0.25)]" style={{ imageRendering: "pixelated", boxShadow: "inset 4px 4px 0 oklch(1 0 0 / 0.3), inset -4px -4px 0 oklch(0 0 0 / 0.15), 0 0 80px 20px oklch(0.9 0.05 90 / 0.3)" }} />
      {/* stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute bg-white"
          style={{
            top: `${(i * 137) % 60}%`,
            left: `${(i * 91) % 100}%`,
            width: i % 5 === 0 ? 3 : 2,
            height: i % 5 === 0 ? 3 : 2,
            opacity: 0.25 + ((i % 4) * 0.12),
          }}
        />
      ))}
      {/* floating voxel clusters */}
      <div className="animate-float absolute left-[6%] top-[30%] hidden md:block">
        <VoxelCluster hue="grass" />
      </div>
      <div
        className="animate-float absolute right-[4%] top-[55%] hidden md:block"
        style={{ animationDelay: "-3s" }}
      >
        <VoxelCluster hue="gold" />
      </div>
      <MountainSilhouette />
      <Particles />
    </div>
  );
}

function VoxelCluster({ hue }: { hue: "grass" | "gold" }) {
  const top = hue === "grass" ? "oklch(0.7 0.16 148)" : "oklch(0.78 0.14 85)";
  const side = hue === "grass" ? "oklch(0.5 0.14 148)" : "oklch(0.55 0.12 85)";
  const dark = "oklch(0.25 0.02 150)";
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" shapeRendering="crispEdges">
      <g opacity="0.75">
        <rect x="20" y="40" width="40" height="40" fill={dark} />
        <rect x="20" y="40" width="40" height="8" fill={top} />
        <rect x="20" y="40" width="40" height="2" fill="oklch(0.9 0.1 148)" />
        <rect x="55" y="70" width="40" height="30" fill={side} />
        <rect x="55" y="70" width="40" height="6" fill={top} />
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 md:pt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div className="reveal">
          <p data-perch className="pixel mb-5 inline-flex items-center gap-2 glass px-3 py-1 text-[13px] text-muted-foreground">
            <span className="voxel animate-flicker h-2 w-2" style={{ background: "oklch(0.78 0.14 85)" }} />
            Available for collaborations
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Aditya</span>
            <br />
            <span className="font-light text-foreground/90">Bhalerao</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Computer Science student &amp; developer. I write software with care —
            grounding fundamentals in <span className="text-foreground">programming</span>,
            and building modern products through{" "}
            <span className="text-foreground">prompt engineering</span> and{" "}
            <span className="text-foreground">AI-assisted tooling</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="block-btn pixel inline-flex items-center gap-2 bg-primary px-6 py-3 text-[15px] text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" shapeRendering="crispEdges">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="block-btn pixel inline-flex items-center gap-2 bg-secondary px-6 py-3 text-[15px] text-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Contact Me
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-3 text-sm">
            {[
              ["Year", "2nd"],
              ["Focus", "CS & AI"],
              ["Building", "Assignly"],
            ].map(([k, v]) => (
              <div key={k} className="glass px-3 py-3">
                <dt className="pixel text-[11px] text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-base font-bold sm:text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="glass-strong glow-purple relative overflow-hidden p-2">
            {/* grass top strip */}
            <div className="grass-top-bar absolute inset-x-0 top-0 h-2 z-10" />
            <div className="relative overflow-hidden">
              <img
                src={portrait}
                alt="Aditya Bhalerao"
                width={768}
                height={1024}
                className="h-auto w-full object-cover"
                style={{ imageRendering: "auto" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </div>
          <div data-perch className="glass absolute -bottom-4 -left-4 px-4 py-3 text-xs">
            <div className="pixel text-muted-foreground">Currently</div>
            <div className="mt-1 text-sm font-semibold">Diploma · Computer Science</div>
          </div>
          <div className="glass pixel absolute -right-3 -top-3 px-3 py-1 text-[11px] text-muted-foreground">
            2026
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="reveal mb-12 flex flex-col gap-3">
          <span className="pixel inline-flex w-fit items-center gap-2 text-[12px] text-primary">
            <span className="voxel h-2 w-2" style={{ background: "oklch(0.7 0.16 148)" }} />
            {eyebrow}
          </span>
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A student, a builder,{" "}
          <span className="text-primary">a work in progress.</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div data-perch className="reveal glass p-7 md:col-span-2">
          <p className="text-lg leading-relaxed text-foreground/85">
            I'm Aditya — a 2nd-year Diploma Computer Science student learning to
            build software the long way: from fundamentals up. My days move
            between coursework, sharpening my prompt engineering craft, and
            shipping small products that make studying and everyday tasks a
            little easier.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            I care about clarity — in code, in interfaces, and in the way an app
            makes you feel. Right now I'm focused on strengthening my
            fundamentals while exploring how AI tools like Claude can amplify
            what a single developer can put into the world.
          </p>
        </div>
        <div data-perch className="reveal glass p-7">
          <div className="pixel text-[12px] text-muted-foreground">Currently</div>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
              <div>
                <div className="text-base font-semibold">Diploma in Computer Science</div>
                <div className="text-muted-foreground">Year 2 · in progress</div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
              <div>
                <div className="text-base font-semibold">Building Assignly</div>
                <div className="text-muted-foreground">Study productivity for students</div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
              <div>
                <div className="text-base font-semibold">Learning daily</div>
                <div className="text-muted-foreground">Prompt engineering, AI, product craft</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          What I'm learning to <span className="text-primary">do well.</span>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((s, i) => (
          <article
            key={s.n}
            data-perch className="reveal group glass relative overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* advancement corner icon */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="block-btn grid h-10 w-10 place-items-center bg-secondary">
                  <BlockIcon className="h-5 w-5" />
                </div>
                <span className="pixel text-3xl text-primary/80">{s.n}</span>
              </div>
              <span className="pixel text-[11px] text-muted-foreground">
                Advancement · {String(i + 1).padStart(2, "0")}/{String(SKILLS.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-bold sm:text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            {/* progress row of pixel blocks */}
            <div className="mt-6 flex gap-1">
              {Array.from({ length: 10 }).map((_, k) => (
                <span
                  key={k}
                  className="h-1.5 flex-1"
                  style={{
                    background:
                      k < 7
                        ? "oklch(0.7 0.16 148)"
                        : "oklch(1 0 0 / 0.08)",
                  }}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={
        <>
          Small, honest projects — <span className="text-primary">built to learn.</span>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            data-perch className="reveal group glass-strong relative flex flex-col overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="grass-top-bar absolute inset-x-0 top-0 h-1.5" />
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-primary/15 to-transparent" />
            <div className="flex items-center justify-between">
              <span className="block-btn pixel bg-primary/20 px-3 py-1 text-[11px] text-primary">
                {p.status}
              </span>
              <span className="pixel text-[11px] text-muted-foreground">Featured</span>
            </div>
            <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="pixel border border-white/10 bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer noopener"
                className="block-btn pixel inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-[14px] text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                View on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" shapeRendering="crispEdges">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </article>
        ))}

        {/* Coming soon card — unfinished build in the fog */}
        <article data-perch className="reveal glass relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden p-8 text-center">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            {/* fog gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.35_0.02_150/0.6),transparent_70%)]" />
            {/* stacked stones */}
            <svg viewBox="0 0 200 80" className="absolute bottom-0 left-1/2 h-16 w-48 -translate-x-1/2" shapeRendering="crispEdges" aria-hidden>
              <rect x="20" y="50" width="30" height="30" fill="oklch(0.3 0.02 150)" />
              <rect x="50" y="30" width="30" height="50" fill="oklch(0.35 0.02 150)" />
              <rect x="50" y="30" width="30" height="4" fill="oklch(0.5 0.14 148)" />
              <rect x="90" y="40" width="30" height="40" fill="oklch(0.32 0.02 150)" />
              <rect x="130" y="55" width="30" height="25" fill="oklch(0.28 0.02 150)" />
            </svg>
          </div>
          <div className="relative text-2xl font-bold">More projects, soon.</div>
          <p className="relative mt-3 max-w-sm text-sm text-muted-foreground">
            I'd rather ship one thing carefully than list ten I didn't finish.
            New verified work will appear here as it's ready.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="pixel relative mt-6 inline-flex items-center gap-2 text-[13px] text-primary hover:text-foreground"
          >
            Follow along on GitHub →
          </a>
        </article>
      </div>
    </Section>
  );
}

function Building() {
  const focus = [
    "Sharpening prompt engineering and AI workflows",
    "Exploring practical AI / generative AI workflows",
    "Designing calmer, more focused student software",
    "Learning to ship — end-to-end, small and often",
  ];
  return (
    <Section
      id="building"
      eyebrow="Currently Building"
      title={
        <>
          What has my <span className="text-primary">attention</span> right now.
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <div data-perch className="reveal glass-strong relative overflow-hidden p-8 md:p-10">
          <div className="grass-top-bar absolute inset-x-0 top-0 h-2" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          {/* crafting-slot grid */}
          <div className="pointer-events-none absolute right-4 top-4 grid grid-cols-3 gap-1 opacity-40">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="h-5 w-5 border border-white/10 bg-black/30"
                style={{
                  boxShadow:
                    "inset 1px 1px 0 oklch(0 0 0 / 0.4), inset -1px -1px 0 oklch(1 0 0 / 0.06)",
                }}
              />
            ))}
          </div>
          <div className="pixel text-[12px] text-primary">Main build</div>
          <h3 className="mt-4 text-3xl font-extrabold sm:text-4xl">Assignly</h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            A study &amp; academic productivity website for students — a quiet
            place to keep assignments, deadlines and course work in order without
            the noise of a full-blown project manager.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["In progress", "For students", "Web"].map((t) => (
              <span key={t} className="pixel glass px-3 py-1 text-[11px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div data-perch className="reveal glass p-7">
          <div className="pixel text-[12px] text-muted-foreground">Learning focus</div>
          <ul className="mt-4 space-y-4">
            {focus.map((f, i) => (
              <li key={f} className="flex items-start gap-3">
                <span className="pixel mt-0.5 block-btn grid h-6 min-w-6 place-items-center bg-secondary px-1.5 text-[11px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function PhotoSection() {
  return (
    <Section
      id="photo"
      eyebrow="Off Screen"
      title={
        <>
          A little of the <span className="text-primary">person behind the code.</span>
        </>
      }
    >
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="glass-strong glow-purple overflow-hidden p-3">
            <div className="grass-top-bar absolute inset-x-3 top-3 z-10 h-1.5" />
            <div className="overflow-hidden ring-1 ring-white/10">
              <img
                src={portrait}
                alt="Aditya Bhalerao portrait"
                width={768}
                height={1024}
                loading="lazy"
                className="h-auto w-full object-cover"
                style={{ imageRendering: "auto" }}
              />
            </div>
          </div>
          <div data-perch className="glass pixel absolute -bottom-4 left-6 px-4 py-2 text-sm text-foreground">
            Aditya · 2026
          </div>
        </div>
        <div className="reveal">
          <blockquote className="text-xl font-semibold leading-snug text-foreground/90 sm:text-2xl md:text-3xl">
            "I don't want to build fast. I want to build things that feel
            considered — even if I'm the only one who notices."
          </blockquote>
          <p className="mt-6 text-base text-muted-foreground">
            Outside class, I spend time reading about design, exploring what new
            AI tools can actually do, and slowly turning small ideas into
            software people can use.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build <span className="text-primary">something.</span>
        </>
      }
    >
      <div className="reveal mx-auto max-w-2xl space-y-4">
        <div data-perch className="glass relative mt-14 px-5 py-5 sm:mt-16">
          <div className="voxel-divider mb-4 w-16" aria-hidden />
          <p className="text-base text-muted-foreground">
            I'm always happy to talk to other students, small teams and curious
            people. Reach out about a project, a collaboration, or just to share
            what you're working on.
          </p>
        </div>
        <div className="space-y-3">

          <a
            href={`mailto:${EMAIL}`}
            data-perch className="glass card-lift flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/10"
          >
            <div className="min-w-0">
              <div className="pixel text-[11px] text-muted-foreground">Email</div>
              <div className="mt-1 truncate text-base font-semibold sm:text-lg">{EMAIL}</div>
            </div>
            <span aria-hidden className="pixel text-primary">↗</span>
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            data-perch className="glass card-lift flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/10"
          >
            <div className="min-w-0">
              <div className="pixel text-[11px] text-muted-foreground">GitHub</div>
              <div className="mt-1 truncate text-base font-semibold sm:text-lg">@adityabhalerao838-ai</div>
            </div>
            <span aria-hidden className="pixel text-primary">↗</span>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer noopener"
            data-perch className="glass card-lift flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/10"
          >
            <div className="min-w-0">
              <div className="pixel text-[11px] text-muted-foreground">LinkedIn</div>
              <div className="mt-1 truncate text-base font-semibold sm:text-lg">Aditya Bhalerao</div>
            </div>
            <span aria-hidden className="pixel text-primary">↗</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <BlockIcon className="h-6 w-6" />
          <div>
            <div className="text-lg font-bold">Aditya Bhalerao</div>
            <div className="pixel mt-1 text-[11px] text-muted-foreground">
              © {new Date().getFullYear()} — Made with care.
            </div>
          </div>
        </div>
        <div className="pixel flex flex-wrap gap-4 text-[13px]">
          <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-foreground">
            Email
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">
            LinkedIn
          </a>
          <a href="#home" className="text-muted-foreground hover:text-foreground">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  useReveal();
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Decor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Building />
      <PhotoSection />
      <Contact />
      <Footer />
    </main>
  );
}
