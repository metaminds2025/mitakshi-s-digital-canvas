import { useEffect, useState } from "react";

/** Adaptive performance tier for heavy graphics (e.g. Three.js scenes). */
export type PerfTier = "low" | "medium" | "high";

export function usePerfTier(): PerfTier {
  const [tier, setTier] = useState<PerfTier>("medium");

  useEffect(() => {
    const compute = (): PerfTier => {
      if (typeof window === "undefined") return "medium";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return "low";
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const w = window.innerWidth;
      // Hardware hints
      const cores = navigator.hardwareConcurrency ?? 4;
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData;

      if (saveData) return "low";
      if (w < 640 || coarse || cores <= 4 || mem <= 2) return "low";
      if (w < 1280 || cores <= 6 || mem <= 4) return "medium";
      return "high";
    };

    setTier(compute());
    const onResize = () => setTier(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return tier;
}

/** True when the browser tab is currently visible. */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden,
  );
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return visible;
}

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}
