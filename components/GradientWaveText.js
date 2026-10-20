"use client";

// Apple-style gradient wave text, ported from https://spell.sh/docs/gradient-wave-text
// (spell-ui `gradient-wave-text`). A band of colour sweeps up through the text; the base colour
// comes from --gradient-wave-base (defaults to the theme ink).
import { useRef, useEffect, useMemo, useState } from "react";

const defaultColors = ["#8d6869", "#5a8ea6", "#b9c96e", "#c7c571", "#cb706f", "#7e5e5f"];
const RANGE = 200;
const START = -25;

export default function GradientWaveText({
  children,
  className,
  speed = 1,
  paused = false,
  delay = 0,
  repeat = false,
  inView = false,
  once = true,
  radial = true,
  bottomOffset = 20,
  bandGap = 4,
  bandCount = 8,
  customColors,
  playOnHover = false,
}) {
  const elRef = useRef(null);
  const runningRef = useRef(false);
  const [isInView, setIsInView] = useState(!inView);
  const [runId, setRunId] = useState(0); // bump to replay the wave

  useEffect(() => {
    if (!inView) return;
    const node = elRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
        else if (!once) setIsInView(false);
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, once]);

  const colors = customColors?.length ? customColors : defaultColors;

  const gradient = useMemo(() => {
    const base = "var(--gradient-wave-base, var(--ink))";
    const stops = [`${base} calc((var(--gi) + 0) * 1%)`];
    for (let i = 0; i < bandCount && i < colors.length * 2; i++) {
      stops.push(`${colors[i % colors.length]} calc((var(--gi) + ${(i + 2) * bandGap}) * 1%)`);
    }
    stops.push(`${base} calc((var(--gi) + ${(bandCount + 2) * bandGap}) * 1%)`);
    const list = stops.join(", ");
    return radial ? `radial-gradient(circle at 50% bottom, ${list})` : `linear-gradient(0deg, ${list})`;
  }, [colors, bandGap, bandCount, radial]);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;
    node.style.setProperty("--gi", String(START));
    if (!isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--gi", String(RANGE));
      return;
    }

    let t = START;
    runningRef.current = true;
    let raf = 0;
    let started = false;
    let last = performance.now();
    const startAt = last + Math.max(0, delay * 1000);

    const tick = (now) => {
      if (!started) {
        if (now < startAt) { raf = requestAnimationFrame(tick); return; }
        started = true;
        last = now;
      }
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused) {
        t += (dt * speed) / 16.6667;
        if (t >= RANGE) {
          if (!repeat) { node.style.setProperty("--gi", String(RANGE)); runningRef.current = false; return; }
          t %= RANGE;
        }
        node.style.setProperty("--gi", String(t));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); runningRef.current = false; };
  }, [isInView, delay, speed, paused, repeat, runId]);

  return (
    <span
      ref={elRef}
      className={`gwt${className ? ` ${className}` : ""}`}
      onMouseEnter={playOnHover ? () => { if (!runningRef.current) setRunId((n) => n + 1); } : undefined}
      style={{
        "--gi": START,
        backgroundImage: gradient,
        paddingBottom: `${bottomOffset / 40}em`,
        marginBottom: `-${bottomOffset / 40}em`,
      }}
    >
      {children}
    </span>
  );
}
