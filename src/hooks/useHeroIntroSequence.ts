"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIntro } from "@/lib/intro/IntroContext";

// One-time entrance sequence, in the order it reads on screen:
// heading -> (header + role in parallel) -> quote (once the header has
// faded in) -> years -> role's scroll hint. Each step only starts once the
// one feeding it actually finishes animating, via onAnimationComplete, so the
// timing stays correct regardless of how long the PT/EN text is.
export function useHeroIntroSequence() {
  const { markHeroIntroDone, headerShown } = useIntro();
  const prefersReducedMotion = useReducedMotion();

  const [headingDone, setHeadingDone] = useState(false);
  const [quoteDone, setQuoteDone] = useState(false);
  const [yearsLine1Done, setYearsLine1Done] = useState(false);
  const [roleDone, setRoleDone] = useState(false);

  return {
    prefersReducedMotion,
    headingDone,
    quoteStarted: headerShown,
    quoteDone,
    yearsLine1Done,
    roleDone,
    onHeadingComplete: () => {
      setHeadingDone(true);
      markHeroIntroDone();
    },
    onQuoteComplete: () => setQuoteDone(true),
    onYearsLine1Complete: () => setYearsLine1Done(true),
    onRoleComplete: () => setRoleDone(true),
  };
}
