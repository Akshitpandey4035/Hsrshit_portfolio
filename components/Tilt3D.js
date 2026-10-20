"use client";

import { useEffect, useRef } from "react";

const EASE = 0.08; // 0–1: lower = floatier follow

// Cursor-driven 3D tilt for the home grid, moved as ONE scene (like a camera panning around it).
// Tracks the pointer across the window and eases two CSS variables (--mx, --my in -1..1) on the
// grid; its transform (see .home-stage .grid in globals.css) turns them into a single rotation of the
// whole grid. Tiles only carry a fixed depth (--z), so near tiles shift more than far ones through
// perspective — no per-tile animation, which keeps it cheap to render.
// Off on touch screens / small screens / reduced motion: the grid stays flat.
// On wide screens the home page is a fixed single screen: the canvas is scaled to fit the stage
// (its parent) and the window width, so nothing needs scrolling and nothing is cut off.
export default function Tilt3D({ as: Tag = "div", children, ...props }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 961px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = () => fine.matches && wide.matches && !reduce.matches;

    let frame = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const wrap = wrapRef.current;
    const stage = wrap.parentElement;
    const fit = () => {
      wrap.style.scale = "";
      wrap.style.removeProperty("--fit");
      if (!wide.matches) return;
      // Fit the whole canvas inside the stage with room to spare so nothing is cut off at the window
      // edge while the scene tilts (side margin 100px, vertical 90px), and never blow it up past 1.2x.
      const w0 = root.offsetWidth;
      const h0 = root.offsetHeight;
      const ratio = Math.min((window.innerWidth - 200) / w0, (stage.clientHeight - 90) / h0, 1.2);
      wrap.style.scale = ratio.toFixed(4);
      wrap.style.setProperty("--fit", ratio.toFixed(4));
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(stage);
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);

    const apply = () => {
      root.style.setProperty("--mx", cx.toFixed(4));
      root.style.setProperty("--my", cy.toFixed(4));
    };

    const tick = () => {
      frame = 0;
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      if (Math.abs(tx - cx) < 0.001 && Math.abs(ty - cy) < 0.001) {
        cx = tx;
        cy = ty;
      } else {
        frame = requestAnimationFrame(tick);
      }
      apply();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!enabled()) return;
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      schedule();
    };
    const onChange = () => {
      if (!enabled()) onLeave();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    fine.addEventListener("change", onChange);
    wide.addEventListener("change", onChange);
    reduce.addEventListener("change", onChange);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      fine.removeEventListener("change", onChange);
      wide.removeEventListener("change", onChange);
      reduce.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div ref={wrapRef} className="tilt-stage">
      <Tag ref={ref} {...props}>
        {children}
      </Tag>
    </div>
  );
}
