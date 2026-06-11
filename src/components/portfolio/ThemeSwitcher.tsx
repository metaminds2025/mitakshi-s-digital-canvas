import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES, useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="glass mb-3 w-64 rounded-2xl p-3 glow-ring"
          >
            <p className="px-2 pb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Atmosphere
            </p>
            <div className="grid gap-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-all hover:bg-secondary ${
                    theme === t.id ? "bg-secondary" : ""
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-full ring-1 ring-white/20"
                    style={{
                      background: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})`,
                    }}
                  />
                  <span className="flex-1">{t.name}</span>
                  {theme === t.id && (
                    <span className="text-xs text-gradient">active</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="glass flex h-14 w-14 items-center justify-center rounded-full glow-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-glow)]"
        aria-label={open ? "Close theme switcher" : `Open theme switcher (current theme: ${theme})`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <motion.div
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="h-6 w-6 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-glow), var(--color-glow-2), var(--color-glow))",
          }}
        />
      </motion.button>
    </div>
  );
}
