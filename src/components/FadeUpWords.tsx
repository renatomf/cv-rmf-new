"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.33, 1, 0.68, 1] as const;
const WORD_STAGGER = 0.05;
const WORD_DURATION = 0.6;

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function FadeUpWords({
  text,
  active,
  className,
  onAnimationComplete,
  wordDuration = WORD_DURATION,
  wordStagger = WORD_STAGGER,
}: {
  text: string;
  active: boolean;
  className?: string;
  onAnimationComplete?: () => void;
  wordDuration?: number;
  wordStagger?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const duration = prefersReducedMotion ? 0 : wordDuration;
  const stagger = prefersReducedMotion ? 0 : wordStagger;

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            variants={wordVariants}
            transition={{ duration, ease: EASE }}
            className="inline-block whitespace-pre"
            onAnimationComplete={isLast ? onAnimationComplete : undefined}
          >
            {word}{" "}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
