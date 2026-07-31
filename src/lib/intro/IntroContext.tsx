"use client";

import { createContext, useContext, useMemo, useState } from "react";

const IntroContext = createContext<{
  heroIntroDone: boolean;
  markHeroIntroDone: () => void;
} | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [heroIntroDone, setHeroIntroDone] = useState(false);

  const value = useMemo(
    () => ({
      heroIntroDone,
      markHeroIntroDone: () => setHeroIntroDone(true),
    }),
    [heroIntroDone]
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
