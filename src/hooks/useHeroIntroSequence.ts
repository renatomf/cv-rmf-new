"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIntro } from "@/lib/intro/IntroContext";

// One-time entrance sequence, in the order it reads on screen:
// heading -> (quote + role in parallel) -> role's scroll hint -> years
// (once the quote finishes) -> header. Each step only starts once the one
// feeding it actually finishes animating, via onAnimationComplete, so the
// timing stays correct regardless of how long the PT/EN text is.
export function useHeroIntroSequence() {
  const { markHeroIntroDone } = useIntro();
  const prefersReducedMotion = useReducedMotion();

  const [headingDone, setHeadingDone] = useState(false);
  // Quote and role animate in parallel once the heading finishes.
  const [quoteDone, setQuoteDone] = useState(false);
  const [yearsLine1Done, setYearsLine1Done] = useState(false);
  const [roleDone, setRoleDone] = useState(false);

  return {
    prefersReducedMotion,
    headingDone,
    quoteDone,
    yearsLine1Done,
    roleDone,
    onHeadingComplete: () => setHeadingDone(true),
    onQuoteComplete: () => setQuoteDone(true),
    onYearsLine1Complete: () => {
      setYearsLine1Done(true);
      markHeroIntroDone();
    },
    onRoleComplete: () => setRoleDone(true),
  };
}
