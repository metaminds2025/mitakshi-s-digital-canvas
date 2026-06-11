import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ProfileImage } from "./ProfileImage";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduce ? 400 : 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--bg-grad), var(--color-background)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full"
                style={{
                  background: "var(--color-glow)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: "0 0 12px var(--color-glow)",
                }}
                animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative h-28 w-28 rounded-full glow-ring"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, var(--color-glow), transparent)",
                  filter: "blur(2px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
              <ProfileImage priority className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)]" />
            </motion.div>

            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl md:text-4xl text-gradient font-light"
              >
                Mitakshi Sharma
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground"
              >
                Social Media · Content Strategy · Design
              </motion.p>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{ delay: 0.5, duration: 1.6, ease: "easeInOut" }}
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-glow), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
