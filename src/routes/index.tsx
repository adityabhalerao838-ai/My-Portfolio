import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import portrait from "@/assets/portrait.jpg";
import orb from "@/assets/orb.png";

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

// Placeholder-safe project list. Populate with verified repos later.
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

function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 md:block"
      >
        <ul className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 text-sm">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative rounded-full px-4 py-2 transition-colors ${
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-primary/15 ring-1 ring-primary/30"
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
        <div className="glass-strong m-3 flex items-center justify-between rounded-full px-4 py-3">
          <a href="#home" className="font-serif text-base tracking-tight">
            Aditya <span className="text-primary">B.</span>
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="rounded-full p-2 text-foreground/80 hover:text-foreground"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
        {open && (
          <ul className="glass-strong mx-3 mt-1 flex flex-col rounded-2xl p-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 transition-colors ${
                    active === n.id
                      ? "bg-primary/15 text-foreground"
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

function Decor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <img
        src={orb}
        alt=""
        className="animate-float absolute -left-24 top-40 h-72 w-72 opacity-40 blur-[2px]"
      />
      <img
        src={orb}
        alt=""
        className="animate-float absolute right-[-6rem] top-[70vh] h-96 w-96 opacity-30"
        style={{ animationDelay: "-3s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,oklch(0.4_0.22_305/0.35),transparent_55%)]" />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 md:pt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div className="reveal">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs tracking-widest text-muted-foreground uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_2px_var(--glow)]" />
            Available for collaborations
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Aditya</span>
            <br />
            <span className="italic font-light text-foreground/90">Bhalerao</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Computer Science student &amp; developer. I write software with care —
            grounding fundamentals in <span className="text-foreground">C++</span>,
            and building modern products with the help of{" "}
            <span className="text-foreground">AI-assisted tooling</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="glow-purple inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 text-sm">
            {[
              ["Year", "2nd"],
              ["Focus", "CS & AI"],
              ["Building", "Assignly"],
            ].map(([k, v]) => (
              <div key={k} className="glass rounded-2xl px-4 py-3">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-serif text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="glass-strong glow-purple relative overflow-hidden rounded-[2rem] p-2">
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <img
                src={portrait}
                alt="Aditya Bhalerao"
                width={768}
                height={1024}
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
          <div className="glass absolute -bottom-6 -left-6 rounded-2xl px-4 py-3 text-xs">
            <div className="text-muted-foreground">Currently</div>
            <div className="font-serif text-sm">Diploma · Computer Science</div>
          </div>
          <div className="glass absolute -right-4 -top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
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
    <section id={id} className="relative scroll-mt-24 py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="reveal mb-14 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/80">{eyebrow}</span>
          <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
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
          <span className="italic text-primary/90">a work in progress.</span>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="reveal glass rounded-3xl p-8 md:col-span-2">
          <p className="text-lg leading-relaxed text-foreground/85">
            I'm Aditya — a 2nd-year Diploma Computer Science student learning to
            build software the long way: from fundamentals up. My days move
            between coursework, C++ problem-solving, and shipping small products
            that make studying and everyday tasks a little easier.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            I care about clarity — in code, in interfaces, and in the way an app
            makes you feel. Right now I'm focused on strengthening my
            fundamentals while exploring how AI tools like Claude can amplify
            what a single developer can put into the world.
          </p>
        </div>
        <div className="reveal glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Currently
          </div>
          <ul className="mt-4 space-y-4 text-sm">
            <li>
              <div className="font-serif text-lg">Diploma in Computer Science</div>
              <div className="text-muted-foreground">Year 2 · in progress</div>
            </li>
            <li>
              <div className="font-serif text-lg">Building Assignly</div>
              <div className="text-muted-foreground">Study productivity for students</div>
            </li>
            <li>
              <div className="font-serif text-lg">Learning daily</div>
              <div className="text-muted-foreground">C++, AI, product craft</div>
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
          What I'm learning to <span className="italic text-primary/90">do well.</span>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {SKILLS.map((s) => (
          <article
            key={s.n}
            className="reveal group glass relative overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-5xl text-primary/70">{s.n}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Focus
              </span>
            </div>
            <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
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
          Small, honest projects — <span className="italic text-primary/90">built to learn.</span>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="reveal group glass-strong relative flex flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-primary/15 to-transparent" />
            <div className="flex items-center justify-between">
              <span className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
                {p.status}
              </span>
              <span className="text-xs text-muted-foreground">Featured</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                View on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>
        ))}

        {/* Coming soon card */}
        <article className="reveal glass relative flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-dashed p-8 text-center">
          <div className="font-serif text-2xl">More projects, soon.</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            I'd rather ship one thing carefully than list ten I didn't finish.
            New verified work will appear here as it's ready.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:text-foreground"
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
    "Strengthening C++ and DSA fundamentals",
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
          What has my <span className="italic text-primary/90">attention</span> right now.
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="reveal glass-strong relative overflow-hidden rounded-3xl p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="text-xs uppercase tracking-widest text-primary">Main build</div>
          <h3 className="mt-4 font-serif text-4xl">Assignly</h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            A study &amp; academic productivity website for students — a quiet
            place to keep assignments, deadlines and course work in order without
            the noise of a full-blown project manager.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["In progress", "For students", "Web"].map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
        <ul className="reveal glass rounded-3xl p-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Learning focus</div>
          <div className="mt-4 space-y-4">
            {focus.map((f, i) => (
              <div key={f} className="flex items-start gap-4">
                <span className="mt-1 font-serif text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground/85">{f}</span>
              </div>
            ))}
          </div>
        </ul>
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
          A little of the <span className="italic text-primary/90">person behind the code.</span>
        </>
      }
    >
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="glass-strong glow-purple overflow-hidden rounded-[2rem] p-3">
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
              <img
                src={portrait}
                alt="Aditya Bhalerao portrait"
                width={768}
                height={1024}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="glass absolute -bottom-5 left-6 rounded-2xl px-4 py-2 font-serif text-sm">
            Aditya · 2026
          </div>
        </div>
        <div className="reveal">
          <blockquote className="font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
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

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const message = msgRef.current?.value.trim() ?? "";
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = "Please share your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email.";
    if (message.length < 10) errs.message = "Message should be a little more detailed.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="glass-strong rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Name</span>
          <input
            ref={nameRef}
            type="text"
            required
            aria-invalid={!!errors.name}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
            placeholder="Your name"
          />
          {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Email</span>
          <input
            ref={emailRef}
            type="email"
            required
            aria-invalid={!!errors.email}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
            placeholder="you@domain.com"
          />
          {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email}</span>}
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Message</span>
        <textarea
          ref={msgRef}
          rows={5}
          required
          aria-invalid={!!errors.message}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          placeholder="Tell me a bit about what you're building or thinking about…"
        />
        {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
      </label>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          This opens your email app — no data is sent to a server.
        </p>
        <button
          type="submit"
          className="glow-purple inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Send via Email
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {sent && (
        <p className="mt-4 rounded-xl bg-primary/15 px-4 py-3 text-sm text-foreground">
          Your email client should have opened. If not, write directly to{" "}
          <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
    </form>
  );
}

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build <span className="italic text-primary/90">something.</span>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="reveal space-y-4">
          <p className="max-w-md text-base text-muted-foreground">
            I'm always happy to talk to other students, small teams and curious
            people. Reach out about a project, a collaboration, or just to
            share what you're working on.
          </p>
          <div className="space-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="glass flex items-center justify-between rounded-2xl px-5 py-4 transition-colors hover:bg-white/10"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="font-serif text-lg">{EMAIL}</div>
              </div>
              <span aria-hidden>↗</span>
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer noopener"
              className="glass flex items-center justify-between rounded-2xl px-5 py-4 transition-colors hover:bg-white/10"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">GitHub</div>
                <div className="font-serif text-lg">@adityabhalerao838-ai</div>
              </div>
              <span aria-hidden>↗</span>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer noopener"
              className="glass flex items-center justify-between rounded-2xl px-5 py-4 transition-colors hover:bg-white/10"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</div>
                <div className="font-serif text-lg">Aditya Bhalerao</div>
              </div>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <div className="font-serif text-xl">Aditya Bhalerao</div>
          <div className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} — Made with care.
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
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
    <main className="relative min-h-screen">
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
