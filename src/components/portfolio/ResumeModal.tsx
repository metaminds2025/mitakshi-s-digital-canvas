import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ProfileImage } from "./ProfileImage";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-2xl"
            style={{ background: "color-mix(in oklab, var(--color-background) 70%, transparent)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="glass relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-8 md:p-12 glow-ring"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition hover:bg-primary hover:text-primary-foreground"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-6 border-b border-border pb-8 md:flex-row md:items-start md:gap-8">
              <ProfileImage className="h-32 w-32 ring-2 ring-[color:var(--color-glow)]/40" rounded="full" />
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Curriculum Vitae</p>
                <h2 className="mt-2 text-4xl md:text-5xl text-gradient font-light">Mitakshi Sharma</h2>
                <p className="mt-2 text-muted-foreground">
                  Social Media Manager · Content Strategist · Graphic Designer
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm md:justify-start">
                  <a href="mailto:Mitakshi2005@gmail.com" className="rounded-full bg-secondary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition">Mitakshi2005@gmail.com</a>
                  <a href="tel:+919758282404" className="rounded-full bg-secondary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition">+91 97582 82404</a>
                  <a href="https://www.linkedin.com/in/mitakshi-sharma/" target="_blank" rel="noreferrer" className="rounded-full bg-secondary px-3 py-1 hover:bg-primary hover:text-primary-foreground transition">LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Summary */}
            <Section title="Professional Summary">
              <p className="text-muted-foreground leading-relaxed">
                Creative and results-driven Social Media Manager with experience in content strategy,
                social media growth, audience engagement, graphic design, and personal branding.
                Passionate about helping businesses strengthen their digital presence through impactful
                storytelling and strategic content planning.
              </p>
            </Section>

            <Section title="Core Skills">
              <div className="flex flex-wrap gap-2">
                {[
                  "Social Media Management", "Content Strategy", "Personal Branding",
                  "LinkedIn Growth", "Instagram Marketing", "Graphic Design",
                  "Canva", "Figma", "Community Management",
                  "Content Planning", "Brand Development", "Audience Engagement",
                ].map((s) => (
                  <span key={s} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Experience">
              <Timeline
                items={[
                  {
                    title: "Graphic Design Intern",
                    org: "CollegeTips.in",
                    when: "1 Month",
                    points: [
                      "Designed social media creatives across platforms",
                      "Created promotional content for marketing pushes",
                      "Supported branding initiatives end-to-end",
                      "Assisted ongoing marketing campaigns",
                    ],
                  },
                  {
                    title: "Freelance Social Media Manager",
                    org: "Local Businesses · Hometown",
                    when: "Ongoing",
                    points: [
                      "Managed full social media presence for local shops",
                      "Built content strategies tailored to each brand",
                      "Improved audience engagement and conversation",
                      "Increased local brand visibility and recall",
                    ],
                  },
                  {
                    title: "Personal Branding & Content Creation",
                    org: "Independent",
                    when: "Ongoing",
                    points: [
                      "Built a strong professional presence on LinkedIn",
                      "Multiple posts achieving high engagement and reach",
                      "Created professional and educational long-form content",
                    ],
                  },
                ]}
              />
            </Section>

            <Section title="Achievements">
              <ul className="grid gap-2 md:grid-cols-2">
                {[
                  "Supported local business growth initiatives",
                  "Created impactful social media campaigns",
                  "Built strong audience engagement",
                  "Delivered creative branding solutions",
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2 rounded-xl bg-card/60 p-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-glow)" }} />
                    {a}
                  </li>
                ))}
              </ul>
            </Section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Timeline({ items }: { items: { title: string; org: string; when: string; points: string[] }[] }) {
  return (
    <div className="relative space-y-6 border-l border-border pl-6">
      {items.map((it) => (
        <div key={it.title} className="relative">
          <span
            className="absolute -left-[31px] top-2 h-3 w-3 rounded-full"
            style={{ background: "var(--color-glow)", boxShadow: "0 0 14px var(--color-glow)" }}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-lg">{it.title}</h4>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{it.when}</span>
          </div>
          <p className="text-sm text-gradient">{it.org}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {it.points.map((p) => <li key={p}>— {p}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
