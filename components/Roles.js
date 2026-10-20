"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedLetters, countLetters, itemVariants } from "./WordsStagger";

// Roles separated by square accent-coloured dots. With `animate`, every letter (and each dot)
// fades/rises/unblurs in sequence, using the WordsStagger effect.
export default function Roles({ roles, className = "", animate = false, delay = 0, stagger = 0.025, speed = 0.5, inView = true }) {
  const reduce = useReducedMotion();

  if (!animate || reduce) {
    return (
      <p className={`roles ${className}`}>
        {roles.map((r, i) => (
          <Fragment key={r}>
            {i > 0 && <span className="dot" aria-hidden="true" />}
            <span>{r}</span>
          </Fragment>
        ))}
      </p>
    );
  }

  let count = 0;
  return (
    <motion.p
      className={`roles ${className}`}
      aria-label={roles.join(", ")}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once: true }}
    >
      {roles.map((r, i) => {
        const dotAt = count;
        if (i > 0) count += 1;
        const start = count;
        count += countLetters(r);
        return (
          <span key={r} className="role-item">
            {i > 0 && (
              <motion.span
                className="dot"
                aria-hidden="true"
                variants={itemVariants(speed, delay + dotAt * stagger)}
              />
            )}
            <span>
              <AnimatedLetters text={r} start={start} delay={delay} stagger={stagger} speed={speed} />
            </span>
          </span>
        );
      })}
    </motion.p>
  );
}
