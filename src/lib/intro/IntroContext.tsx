"use client";

import { createContext, useContext, useMemo, useState } from "react";

const IntroContext = createContext<{
  // Hero asked the header to fade in.
  heroIntroDone: boolean;
  markHeroIntroDone: () => void;
  // Header finished fading in, so the hero can continue its sequence.
  headerShown: boolean;
  markHeaderShown: () => void;
} | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [heroIntroDone, setHeroIntroDone] = useState(false);
  const [headerShown, setHeaderShown] = useState(false);

  const value = useMemo(
    () => ({
      heroIntroDone,
      markHeroIntroDone: () => setHeroIntroDone(true),
      headerShown,
      markHeaderShown: () => setHeaderShown(true),
    }),
    [heroIntroDone, headerShown]
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
