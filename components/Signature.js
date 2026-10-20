"use client";

// Handwriting-style signature, ported from https://spell.sh/docs/signature (spell-ui `signature`).
// Each glyph of the font is turned into an SVG path and drawn in sequence with motion's pathLength.
import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { parse as parseFont } from "opentype.js";

const FONT_PATH = "/fonts/lastoria-bold.otf";
const SVG_HEIGHT = 100;
const PATH_DELAY_STEP = 0.13;
const OPACITY_DELAY_OFFSET = 0.01;

const PATH_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

let fontPromise = null;
function loadFont() {
  if (!fontPromise) {
    fontPromise = fetch(FONT_PATH)
      .then((res) => {
        if (!res.ok) throw new Error(`Font could not be loaded from ${FONT_PATH}`);
        return res.arrayBuffer();
      })
      .then((buf) => parseFont(buf))
      .catch((err) => {
        fontPromise = null;
        throw err;
      });
  }
  return fontPromise;
}

function pathTransition(index, duration, delay) {
  const pathDelay = delay + index * PATH_DELAY_STEP;
  return {
    pathLength: { delay: pathDelay, duration, ease: "easeInOut" },
    opacity: { delay: pathDelay + OPACITY_DELAY_OFFSET, duration: 0.01 },
  };
}

function MotionPaths({ paths, stroke, strokeWidth, linecap, duration, delay }) {
  return paths.map((d, index) => (
    <motion.path
      key={index}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      variants={PATH_VARIANTS}
      transition={pathTransition(index, duration, delay)}
      vectorEffect="non-scaling-stroke"
      strokeLinecap={linecap}
      strokeLinejoin="round"
    />
  ));
}

export default function Signature({
  text = "Signature",
  color = "#000",
  fontSize = 14,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
}) {
  const [paths, setPaths] = useState([]);
  const [width, setWidth] = useState(300);
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;
  const horizontalPadding = fontSize * 0.1;
  const topMargin = Math.max(5, (SVG_HEIGHT - fontSize) / 2);
  const baseline = Math.min(SVG_HEIGHT - 5, topMargin + fontSize);

  useEffect(() => {
    let cancelled = false;
    loadFont()
      .then((font) => {
        let x = horizontalPadding;
        const next = [];
        for (const char of text) {
          const glyph = font.charToGlyph(char);
          next.push(glyph.getPath(x, baseline, fontSize).toPathData(3));
          x += (glyph.advanceWidth ?? font.unitsPerEm) * (fontSize / font.unitsPerEm);
        }
        if (cancelled) return;
        setPaths(next);
        setWidth(x + horizontalPadding);
      })
      .catch(() => {
        if (cancelled) return;
        setPaths([]);
        setWidth(text.length * fontSize * 0.6);
      });
    return () => {
      cancelled = true;
    };
  }, [text, fontSize, baseline, horizontalPadding]);

  return (
    <motion.svg
      key={paths.length}
      width={width}
      height={SVG_HEIGHT}
      viewBox={`0 0 ${width} ${SVG_HEIGHT}`}
      fill="none"
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <MotionPaths paths={paths} stroke="white" strokeWidth={fontSize * 0.22} linecap="round" duration={duration} delay={delay} />
        </mask>
      </defs>
      <MotionPaths paths={paths} stroke={color} strokeWidth={Math.min(2, Math.max(0.5, fontSize * 0.04))} linecap="butt" duration={duration} delay={delay} />
      <g mask={`url(#${maskId})`}>
        {paths.map((d, index) => (
          <path key={index} d={d} fill={color} />
        ))}
      </g>
    </motion.svg>
  );
}
