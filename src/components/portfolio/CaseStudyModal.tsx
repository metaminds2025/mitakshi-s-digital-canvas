import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { CaseStudy } from "@/lib/portfolio-data";

export function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!study) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [study, onClose]);

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-background/60 p-4 backdrop-blur-2xl md:p-10"
          onClick={onClose}
        >
          <motion.article
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative my-6 w-full max-w-5xl overflow-hidden rounded-[2rem] glow-ring"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-glow)]"
            >
              ✕
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={study.cover}
                alt={`${study.title} — cover`}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 30%, color-mix(in oklab, var(--color-background) 92%, transparent))`,
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  {study.category}
                </p>
                <h2 id="case-title" className="mt-2 text-3xl font-light md:text-5xl">
                  {study.title}
                </h2>
              </div>
            </div>

            <div className="grid gap-10 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground">{study.summary}</p>

                <h3 className="mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Gallery
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {study.gallery.map((src, i) => (
                    <figure
                      key={src + i}
                      className="overflow-hidden rounded-2xl border border-border"
                    >
                      <img
                        src={src}
                        alt={`${study.title} — sample ${i + 1}`}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </figure>
                  ))}
                </div>
              </div>

              <aside className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Role
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {study.roles.map((r) => (
                      <li
                        key={r}
                        className="rounded-full border border-border bg-card/40 px-3 py-1 text-sm"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Tools used
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {study.tools.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-secondary px-3 py-1 text-sm text-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Outcomes
                  </h3>
                  <dl className="mt-3 grid gap-2">
                    {study.outcomes.map((o) => (
                      <div
                        key={o.label}
                        className="flex items-baseline justify-between rounded-xl bg-card/40 px-4 py-3"
                      >
                        <dt className="text-sm text-muted-foreground">{o.label}</dt>
                        <dd className="text-lg text-gradient">{o.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="btn-luxury w-full hover:scale-[1.02]"
                >
                  Start a project →
                </a>
              </aside>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
