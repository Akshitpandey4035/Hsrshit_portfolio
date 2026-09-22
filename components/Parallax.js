"use client";

import { useEffect, useRef } from "react";

const EASE = 0.1; // 0–1: lower = floatier trailing motion

// Moves each child with a data-speed attribute vertically as the page scrolls.
// Speed is a fraction of the element's distance from the viewport centre:
// positive drifts slower than the page, negative faster.
export default function Parallax({ as: Tag = "div", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const items = [...root.querySelectorAll("[data-speed]")].map((el) => ({
      el,
      speed: Number(el.dataset.speed),
      current: 0,
      target: 0,
    }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 600px)");
    let frame = 0;

    const measure = () => {
      const off = reduce.matches || small.matches;
      const mid = window.innerHeight / 2;
      for (const it of items) {
        if (off) {
          it.target = 0;
          continue;
        }
        // Measure without the current shift so movement doesn't feed back on itself.
        const rect = it.el.getBoundingClientRect();
        const center = rect.top - it.current + rect.height / 2;
        it.target = (center - mid) * it.speed;
      }
    };

    const tick = () => {
      frame = 0;
      measure();
      const instant = reduce.matches || small.matches;
      let moving = false;
      for (const it of items) {
        const diff = it.target - it.current;
        it.current = instant || Math.abs(diff) < 0.1 ? it.target : it.current + diff * EASE;
        if (it.current !== it.target) moving = true;
        it.el.style.setProperty("--py", `${it.current.toFixed(2)}px`);
      }
      if (moving) frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Start in place on load, then ease on scroll.
    measure();
    for (const it of items) {
      it.current = it.target;
      it.el.style.setProperty("--py", `${it.current.toFixed(2)}px`);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    small.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      small.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
}
