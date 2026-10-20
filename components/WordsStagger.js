"use client";

// Blur / rise / fade-in text, ported from https://spell.sh/docs/words-stagger (spell-ui `words-stagger`).
// `by="word"` is the original behaviour; `by="letter"` runs the same effect on every letter.
import { Children } from "react";
import { motion, useReducedMotion } from "motion/react";

export const itemVariants = (speed, delay = 0) => ({
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "tween", ease: "easeOut", duration: speed, delay },
  },
});

export const countLetters = (text) => text.replace(/\s/g, "").length;

// Letters of `text`, each a separate animated item. `start` is how many items came before it in
// the same block, so one stagger runs across several pieces of text. Words stay unbroken.
export function AnimatedLetters({ text, start = 0, delay = 0, stagger = 0.025, speed = 0.5 }) {
  let n = start;
  return text.split(" ").filter(Boolean).map((word, w, words) => (
    <span key={`${word}-${w}`} className="letters-word" aria-hidden="true">
      {[...word].map((char, i) => (
        <motion.span
          key={i}
          className="letters-char"
          variants={itemVariants(speed, delay + n++ * stagger)}
        >
          {char}
        </motion.span>
      ))}
      {w < words.length - 1 && <span className="letters-space">&nbsp;</span>}
    </span>
  ));
}

export default function WordsStagger({
  children,
  className = "",
  by = "word",
  delay = 0,
  stagger = by === "letter" ? 0.025 : 0.1,
  speed = 0.5,
  inView = false,
  once = true,
}) {
  const reduce = useReducedMotion();
  const text = Children.toArray(children)
    .filter((child) => typeof child === "string")
    .join("");

  if (reduce) return <span className={className}>{text}</span>;

  const common = {
    initial: "hidden",
    whileInView: inView ? "visible" : undefined,
    animate: inView ? undefined : "visible",
    viewport: { once },
    "aria-label": text,
  };

  if (by === "letter") {
    return (
      <motion.span className={`words-stagger ${className}`} {...common}>
        <AnimatedLetters text={text} delay={delay} stagger={stagger} speed={speed} />
      </motion.span>
    );
  }

  const words = text.split(" ").filter((word) => word.length > 0);
  return (
    <motion.span
      className={`words-stagger ${className}`}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...common}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} className="words-stagger-item" variants={itemVariants(speed)} aria-hidden="true">
          {word}
          {index < words.length - 1 && <span className="words-stagger-space">&nbsp;</span>}
        </motion.span>
      ))}
    </motion.span>
  );
}
