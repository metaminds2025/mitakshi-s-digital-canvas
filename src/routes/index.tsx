import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Background3D } from "@/components/portfolio/Background3D";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ResumeModal } from "@/components/portfolio/ResumeModal";
import { ProfileImage } from "@/components/portfolio/ProfileImage";
import { Counter } from "@/components/portfolio/Counter";
import { CaseStudyModal } from "@/components/portfolio/CaseStudyModal";
import { CASE_STUDIES, type CaseStudy } from "@/lib/portfolio-data";

const SITE_TITLE = "Mitakshi Sharma — Social Media Manager · Content Strategist · Designer";
const SITE_DESC =
  "Premium portfolio of Mitakshi Sharma. Social media management, content strategy, personal branding and graphic design for ambitious brands.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "keywords", content: "Mitakshi Sharma, social media manager, content strategist, graphic designer, personal branding, LinkedIn growth, portfolio" },
      { name: "theme-color", content: "#0f0820" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Mitakshi Sharma" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mitakshi Sharma",
          jobTitle: "Social Media Manager, Content Strategist, Graphic Designer",
          email: "mailto:Mitakshi2005@gmail.com",
          telephone: "+91-97582-82404",
          url: "/",
          sameAs: ["https://www.linkedin.com/in/mitakshi-sharma/"],
        }),
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "stats", label: "Impact" },
  { id: "voices", label: "Voices" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Background3D />
      <ThemeSwitcher />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <CaseStudyModal study={activeCase} onClose={() => setActiveCase(null)} />

      <Nav onResume={() => setResumeOpen(true)} />

      <main id="main" className="relative">
        <Hero onResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Services />
        <Work onOpen={setActiveCase} />
        <Stats />
        <Analytics />
        <Testimonials />
        <Contact onResume={() => setResumeOpen(true)} />
        <Footer />
      </main>
    </>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ onResume }: { onResume: () => void }) {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.6, duration: 0.7 }}
      className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
    >
      <div className="glass flex items-center gap-1 rounded-full px-2 py-2">
        <a href="#top" className="px-4 text-sm font-medium text-gradient">MS</a>
        <span className="mx-1 h-5 w-px bg-border" />
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground md:inline-block"
          >
            {n.label}
          </a>
        ))}
        <button
          onClick={onResume}
          className="ml-1 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:scale-105"
        >
          Resume
        </button>
      </div>
    </motion.nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onResume }: { onResume: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center px-6 pt-32 md:px-12">
      <motion.div style={{ y, opacity }} className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            Portfolio · 2026
          </motion.p>

          <h1 className="mt-6 text-5xl font-light leading-[1.05] md:text-7xl lg:text-8xl">
            {"Mitakshi".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.6 + i * 0.05, type: "spring", stiffness: 120, damping: 18 }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.0, type: "spring", stiffness: 120, damping: 18 }}
              className="text-gradient italic"
              style={{ fontStyle: "italic" }}
            >
              Sharma.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 0.8 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span>Social Media Manager</span>
            <span className="h-1 w-1 rounded-full bg-current" />
            <span>Content Strategist</span>
            <span className="h-1 w-1 rounded-full bg-current" />
            <span>Graphic Designer</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Helping brands transform their online presence through creativity,
            strategy, and meaningful audience engagement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#work" className="btn-luxury hover:scale-105">View Portfolio →</a>
            <button onClick={onResume} className="btn-luxury-ghost hover:scale-105">View Resume</button>
            <a href="#contact" className="btn-luxury-ghost hover:scale-105">Contact Me</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.9, duration: 0.8 }}
            className="mt-10 flex items-center gap-5 text-sm text-muted-foreground"
          >
            <a href="https://www.linkedin.com/in/mitakshi-sharma/" target="_blank" rel="noreferrer" className="hover:text-foreground transition">LinkedIn ↗</a>
            <a href="mailto:Mitakshi2005@gmail.com" className="hover:text-foreground transition">Email</a>
            <a href="tel:+919758282404" className="hover:text-foreground transition">+91 97582 82404</a>
          </motion.div>
        </div>

        {/* Floating profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.8, duration: 1, ease: "easeOut" }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-[2.5rem]" style={{
            background: "conic-gradient(from 0deg, var(--color-glow), transparent, var(--color-glow-2), transparent, var(--color-glow))",
            filter: "blur(28px)", opacity: 0.55,
          }} />
          <div className="glass relative h-full w-full overflow-hidden rounded-[2.5rem] glow-ring animate-float">
            <ProfileImage priority rounded="3xl" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Currently</p>
              <p className="mt-1 text-sm">Open to brand partnerships & freelance projects</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}

/* ---------------- Reusable Section Heading ---------------- */
function SectionHead({ kicker, title, intro }: { kicker: string; title: React.ReactNode; intro?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }} className="mb-14 max-w-3xl"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-3 text-4xl font-light leading-tight md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </motion.div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="About" title={<>Storytelling that<br /><em className="text-gradient not-italic">actually connects.</em></>} />
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="glass relative overflow-hidden rounded-3xl p-2 glow-ring"
          >
            <ProfileImage rounded="3xl" className="aspect-[4/5] w-full" />
            <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Mitakshi Sharma</p>
              <p className="mt-1 text-lg">Builder of brand presence</p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Mitakshi is a passionate Social Media Manager and Graphic Designer who specializes in
              helping brands establish a powerful online presence through strategic content,
              audience engagement, and creative storytelling.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Her expertise spans social media management, content planning, branding, graphic design,
              audience growth, and digital communication — with a love for helping businesses and
              individuals build meaningful connections.
            </motion.p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { k: "Based in", v: "India · Working globally" },
                { k: "Focus", v: "Brand-led growth" },
                { k: "Toolkit", v: "Canva · Figma · Notion" },
                { k: "Available", v: "Freelance & retainer" },
              ].map((c) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="glass rounded-2xl p-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.k}</p>
                  <p className="mt-1 text-base">{c.v}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
const SKILLS: { name: string; level: number }[] = [
  { name: "Social Media Management", level: 95 },
  { name: "Content Strategy", level: 92 },
  { name: "Personal Branding", level: 90 },
  { name: "LinkedIn Growth", level: 93 },
  { name: "Instagram Marketing", level: 88 },
  { name: "Graphic Design", level: 86 },
  { name: "Canva", level: 96 },
  { name: "Figma", level: 82 },
  { name: "Community Management", level: 89 },
  { name: "Audience Engagement", level: 91 },
  { name: "Content Planning", level: 93 },
  { name: "Brand Development", level: 87 },
];

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="Skills" title={<>A toolkit built for <span className="text-gradient">modern brands.</span></>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.04, duration: 0.6 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass group relative overflow-hidden rounded-2xl p-5 transition-shadow hover:glow-ring"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-base">{s.name}</h3>
                <span className="text-xs text-gradient">{s.level}%</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--color-glow), var(--color-glow-2))" }}
                />
              </div>
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-glow) 25%, transparent), transparent 60%)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
const EXPERIENCES = [
  {
    role: "Graphic Design Intern",
    org: "CollegeTips.in",
    when: "1 Month",
    points: [
      "Designed social media creatives across platforms",
      "Created promotional content for marketing campaigns",
      "Supported branding initiatives and visual identity",
      "Assisted in ongoing marketing initiatives",
    ],
  },
  {
    role: "Freelance Social Media Manager",
    org: "Local Businesses · Hometown",
    when: "Ongoing",
    points: [
      "Managed social media presence for local shops & studios",
      "Developed bespoke content strategies",
      "Improved audience engagement and conversation",
      "Increased local brand visibility and recall",
      "Strengthened customer interaction and trust",
    ],
  },
  {
    role: "Personal Branding & Content Creation",
    org: "Independent",
    when: "Ongoing",
    points: [
      "Built a strong professional online presence",
      "Multiple LinkedIn posts with excellent engagement",
      "Created professional and educational content",
      "Improved audience interaction through strategy",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="Experience" title={<>A timeline of <span className="text-gradient">craft.</span></>} />
        <div className="relative space-y-8 border-l border-border pl-8 md:pl-10">
          {EXPERIENCES.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="relative"
            >
              <span
                className="absolute -left-[42px] top-3 h-4 w-4 rounded-full ring-4"
                style={{
                  background: "var(--color-glow)",
                  boxShadow: "0 0 20px var(--color-glow)",
                  // @ts-expect-error css var
                  "--tw-ring-color": "color-mix(in oklab, var(--color-glow) 25%, transparent)",
                }}
              />
              <div className="glass rounded-2xl p-6 md:p-8 hover:glow-ring transition-shadow">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl">{e.role}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{e.when}</span>
                </div>
                <p className="mt-1 text-gradient">{e.org}</p>
                <ul className="mt-4 grid gap-2 text-muted-foreground sm:grid-cols-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: "var(--color-glow)" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const SERVICES = [
  { t: "Social Media Management", d: "End-to-end management of your platforms — posting, growth and conversation, every week.", sym: "◐" },
  { t: "Content Strategy", d: "Pillars, calendars and messaging tuned to your audience and your brand voice.", sym: "✦" },
  { t: "Graphic Design", d: "Polished social creatives, carousels and brand visuals that feel premium.", sym: "❖" },
  { t: "Personal Branding", d: "LinkedIn-first systems that turn founders and creators into recognised voices.", sym: "✺" },
  { t: "Content Creation", d: "Carousels, captions, scripts and reels — production-ready and on-brand.", sym: "◈" },
  { t: "Audience Growth Strategy", d: "Data-led playbooks for compounding reach, engagement and qualified leads.", sym: "✧" },
];

function Services() {
  return (
    <section id="services" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="Services"
          title={<>What we can <span className="text-gradient">build together.</span></>}
          intro="Pick a single service or combine them into a retainer — every engagement is tailored to your stage and goals."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="glass group relative overflow-hidden rounded-3xl p-7 transition-shadow hover:glow-ring"
            >
              <div className="text-4xl text-gradient">{s.sym}</div>
              <h3 className="mt-6 text-xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <div className="mt-8 flex items-center gap-2 text-sm text-gradient opacity-0 transition-opacity group-hover:opacity-100">
                Discuss this →
              </div>
              <div
                className="pointer-events-none absolute inset-x-6 -bottom-px h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--color-glow), transparent)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORK ---------------- */
const WORK_CATEGORIES = ["All", "Social Media", "Branding", "Content", "Design", "LinkedIn"] as const;

function Work({ onOpen }: { onOpen: (s: CaseStudy) => void }) {
  const [filter, setFilter] = useState<(typeof WORK_CATEGORIES)[number]>("All");
  const visible = CASE_STUDIES.filter((w) => filter === "All" || w.category === filter);
  return (
    <section id="work" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="Selected Work" title={<>Recent <span className="text-gradient">case studies.</span></>} intro="Click any project to open the full case study — gallery, role, tools and outcomes." />
        <div role="tablist" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {WORK_CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border border-border px-4 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-glow)] ${
                filter === c ? "bg-primary text-primary-foreground" : "bg-card/40 hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {visible.map((w, i) => (
            <motion.button
              key={w.slug}
              layout
              type="button"
              onClick={() => onOpen(w)}
              aria-label={`Open case study: ${w.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="glass group relative block w-full break-inside-avoid overflow-hidden rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-glow)]"
              style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "3/4" }}
            >
              <img
                src={w.cover}
                alt={`${w.title} — ${w.category} project preview`}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 30%, color-mix(in oklab, var(--color-background) 85%, transparent)), linear-gradient(135deg, ${w.tone[0]}33, ${w.tone[1]}33)`,
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <div className="glass rounded-2xl p-4 transition-transform group-hover:-translate-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{w.category}</p>
                  <p className="mt-1 text-lg">{w.title}</p>
                  <p className="mt-2 text-xs text-gradient opacity-0 transition-opacity group-hover:opacity-100">View case study →</p>
                </div>
              </figcaption>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const items = [
    { n: 24, suffix: "+", l: "Campaigns Managed" },
    { n: 180, suffix: "+", l: "Creative Designs Delivered" },
    { n: 500, suffix: "K+", l: "Audience Engagement Generated" },
    { n: 12, suffix: "", l: "Brand Growth Projects Supported" },
  ];
  return (
    <section id="stats" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-[2rem] p-8 md:p-14 glow-ring">
          <div className="grid gap-10 md:grid-cols-4">
            {items.map((it) => (
              <div key={it.l} className="text-center md:text-left">
                <div className="text-5xl font-light text-gradient md:text-6xl">
                  <Counter to={it.n} suffix={it.suffix} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{it.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ANALYTICS ---------------- */
function Analytics() {
  // simple sparkline shape
  const points = [12, 22, 18, 30, 28, 42, 38, 55, 60, 72, 68, 88];
  const max = Math.max(...points);
  const path = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${100 - (p / max) * 90}`)
    .join(" ");
  return (
    <section className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="Insights" title={<>Performance, <span className="text-gradient">at a glance.</span></>} />
        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-3xl p-6 lg:col-span-2"
          >
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Engagement Growth</p>
                <p className="mt-1 text-3xl"><Counter to={342} suffix="%" /></p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs text-gradient">last 12 weeks</span>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-6 h-44 w-full">
              <defs>
                <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-glow)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--color-glow)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.polyline
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                fill="none" stroke="var(--color-glow)" strokeWidth="0.8" points={path}
                strokeLinejoin="round" strokeLinecap="round"
              />
              <polygon points={`0,100 ${path} 100,100`} fill="url(#ag)" opacity="0.5" />
            </svg>
          </motion.div>
          {[
            { k: "Reach Performance", v: "+128%", d: "Avg. monthly impressions" },
            { k: "Content Cadence", v: "5×/week", d: "Across primary channels" },
            { k: "Audience Insights", v: "92%", d: "On-target demographic match" },
          ].map((c) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass rounded-3xl p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.k}</p>
              <p className="mt-3 text-3xl text-gradient">{c.v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const VOICES = [
  { q: "Mitakshi transformed how we show up online — the strategy is sharp and the design is gorgeous.", a: "Founder, Local Boutique" },
  { q: "Every post finally feels like us, only better. Engagement doubled in a month.", a: "Owner, Wellness Studio" },
  { q: "Easily one of the most thoughtful collaborators I've worked with on personal branding.", a: "LinkedIn Educator" },
];

function Testimonials() {
  return (
    <section id="voices" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead kicker="Voices" title={<>Kind words from <span className="text-gradient">collaborators.</span></>} />
        <div className="grid gap-4 md:grid-cols-3">
          {VOICES.map((v, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="glass relative rounded-3xl p-7 hover:glow-ring transition-shadow"
            >
              <p className="text-5xl leading-none text-gradient">"</p>
              <p className="mt-2 text-base leading-relaxed">{v.q}</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— {v.a}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact({ onResume }: { onResume: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (v: string) => {
    navigator.clipboard.writeText(v);
    setCopied(v);
    setTimeout(() => setCopied(null), 1600);
  };
  return (
    <section id="contact" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="Contact"
          title={<>Let's build something <span className="text-gradient">remarkable.</span></>}
          intro="Pitch a project, ask a question or just say hi. I read everything personally."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:Mitakshi2005@gmail.com"; }}
            className="glass space-y-4 rounded-3xl p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <Field label="Company / brand" name="company" />
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Project brief</label>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-card/40 p-4 text-foreground outline-none transition focus:border-[color:var(--color-glow)]"
                placeholder="Tell me about your brand and what you're hoping to achieve…"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="btn-luxury hover:scale-105">Send message →</button>
              <a
                href="https://wa.me/919758282404"
                target="_blank" rel="noreferrer"
                className="btn-luxury-ghost hover:scale-105"
              >
                WhatsApp
              </a>
              <button type="button" onClick={onResume} className="btn-luxury-ghost hover:scale-105">View Resume</button>
            </div>
          </motion.form>

          {/* contact card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass relative overflow-hidden rounded-3xl p-7 glow-ring"
          >
            <div className="flex items-center gap-4">
              <ProfileImage className="h-16 w-16" />
              <div>
                <p className="text-lg">Mitakshi Sharma</p>
                <p className="text-sm text-muted-foreground">Replies within 24 hours</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {[
                { l: "Email", v: "Mitakshi2005@gmail.com", h: "mailto:Mitakshi2005@gmail.com" },
                { l: "Phone", v: "+91 97582 82404", h: "tel:+919758282404" },
                { l: "LinkedIn", v: "linkedin.com/in/mitakshi-sharma", h: "https://www.linkedin.com/in/mitakshi-sharma/" },
              ].map((c) => (
                <div key={c.l} className="flex items-center justify-between rounded-2xl bg-card/40 p-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.l}</p>
                    <a href={c.h} target={c.h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-1 block text-sm hover:text-gradient transition">{c.v}</a>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(c.v)}
                    className="rounded-full bg-secondary px-3 py-1 text-xs transition hover:bg-primary hover:text-primary-foreground"
                  >
                    {copied === c.v ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>

            <div
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full"
              style={{ background: "var(--color-glow)", filter: "blur(80px)", opacity: 0.35 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        className="mt-2 w-full rounded-2xl border border-border bg-card/40 p-3.5 text-foreground outline-none transition focus:border-[color:var(--color-glow)]"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="glass flex flex-col items-center justify-between gap-6 rounded-3xl p-8 md:flex-row">
          <div>
            <p className="text-2xl text-gradient font-light">Mitakshi Sharma</p>
            <p className="mt-1 text-sm text-muted-foreground">© 2026 · All Rights Reserved.</p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { l: "LinkedIn", h: "https://www.linkedin.com/in/mitakshi-sharma/" },
              { l: "Email", h: "mailto:Mitakshi2005@gmail.com" },
              { l: "WhatsApp", h: "https://wa.me/919758282404" },
            ].map((s) => (
              <a
                key={s.l}
                href={s.h}
                target={s.h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-full bg-secondary px-4 py-2 text-sm transition hover:bg-primary hover:text-primary-foreground"
              >
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
