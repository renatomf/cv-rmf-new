"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "@/lib/i18n/LocaleContext";
import { useHeroDock } from "@/hooks/useHeroDock";
import { useHeroIntroSequence } from "@/hooks/useHeroIntroSequence";
import FadeUpWords from "@/components/FadeUpWords";

// Smooth, non-snappy ease-out used across the hero's entrance sequence.
const SOFT_EASE = [0.33, 1, 0.68, 1] as const;

function ScrollArrow({ flipped }: { flipped: boolean }) {
  return (
    <span className="inline-flex shrink-0 animate-blink">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`size-3.5 text-accent transition-transform duration-300 ${
          flipped ? "rotate-180" : ""
        }`}
        aria-hidden="true"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </span>
  );
}

function ScrollHint({
  className,
  style,
  pastExperience,
  scroll,
  backToTop,
  onBackToTop,
}: {
  className: string;
  style?: React.CSSProperties;
  pastExperience: boolean;
  scroll: string;
  backToTop: string;
  onBackToTop: () => void;
}) {
  return (
    <div className={className} style={style}>
      {pastExperience ? (
        <button
          type="button"
          onClick={onBackToTop}
          className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted transition-colors hover:text-accent cursor-pointer font-bold"
        >
          {backToTop}
          <ScrollArrow flipped />
        </button>
      ) : (
        <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted font-bold text-left">
          {scroll}
          <ScrollArrow flipped={false} />
        </span>
      )}
    </div>
  );
}

export default function ScrollHero() {
  const t = useTranslations();
  const { locale } = useLocale();
  const heroRef = useRef<HTMLElement>(null);
  const [pastExperience, setPastExperience] = useState(false);
  const [atPageBottom, setAtPageBottom] = useState(false);

  const { ready, width, overlayOpacity, edgeFadeOpacity } = useHeroDock(heroRef);
  const {
    prefersReducedMotion,
    headingDone,
    quoteDone,
    yearsLine1Done,
    roleDone,
    onHeadingComplete,
    onQuoteComplete,
    onYearsLine1Complete,
    onRoleComplete,
  } = useHeroIntroSequence();

  useEffect(() => {
    const handleScroll = () => {
      const experienceEl = document.getElementById("experience");
      if (experienceEl) {
        setPastExperience(experienceEl.getBoundingClientRect().top <= 800);
      }
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      setAtPageBottom(scrolledToBottom);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Desktop/tablet: image slides + docks flush to the right as you scroll past the hero,
          then stays fixed to the viewport (doesn't scroll with the rest of the page) */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 hidden h-screen overflow-hidden md:block ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <motion.div
          style={{ top: 0, right: 0, width, height: "100%" }}
          className="absolute overflow-hidden"
        >
          <Image
            src="/images/image-5.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 35vw, 100vw"
            className="object-cover object-[center_42%] md:object-[120%_42%] lg:object-[center_42%]"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Soft fade on the leading edge instead of a hard crop line */}
          <motion.div
            style={{ opacity: edgeFadeOpacity }}
            className="absolute inset-0 bg-linear-to-r from-background via-background/10 to-transparent"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent"
        />
      </div>

      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-0 pb-0 md:pt-14 md:pb-8"
      >
        {/* Mobile: static full-bleed image, no scroll animation */}
        <div className="absolute inset-0 overflow-hidden md:hidden">
          <Image
            src="/images/image-5.png"
            alt=""
            fill
            priority
            sizes="120vw"
            className="object-cover object-center scale-120"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="@container relative mx-auto flex w-full max-w-353 flex-1 flex-col justify-between px-4 md:px-10">
          <div className="flex justify-end pt-34 opacity-0 md:opacity-100 lg:-mr-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: headingDone ? 1 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: SOFT_EASE }}
              className="max-w-xs text-start text-sm font-bold uppercase leading-5 md:max-w-xs md:text-[15px] md:pl-4"
            >
              {quoteDone ? (
                // Intro already played — a language switch after this point
                // just crossfades the text instead of replaying the cascade.
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: SOFT_EASE }}
                  >
                    “{t.hero.quote}”
                  </motion.span>
                </AnimatePresence>
              ) : (
                <FadeUpWords
                  text={`“${t.hero.quote}”`}
                  active={headingDone}
                  onAnimationComplete={onQuoteComplete}
                />
              )}
            </motion.p>
          </div>

          <div className="mt-14 mb-[8vh] md:mb-0 md:mt-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: quoteDone ? 1 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: SOFT_EASE }}
              className="font-bold text-accent text-2xl"
            >
              <p>
                <FadeUpWords
                  text="2010→2026"
                  active={quoteDone}
                  wordDuration={0.35}
                  wordStagger={0.03}
                  onAnimationComplete={onYearsLine1Complete}
                />
              </p>
              <p>
                <FadeUpWords
                  text={t.hero.years}
                  active={yearsLine1Done}
                  wordDuration={0.35}
                  wordStagger={0.03}
                />
              </p>
            </motion.div>

            <div className="mt-6">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: SOFT_EASE }}
                onAnimationComplete={onHeadingComplete}
                className="max-w-3xl text-right font-bold uppercase leading-[0.85] tracking-tight"
              >
                <span className="block text-right text-[14.2vw] sm:text-[9vw] md:text-[6.5rem] lg:text-[7.85rem]">
                  Renato
                </span>
                <span className="block text-right text-[17vw] sm:text-[13vw] md:text-[8rem] lg:text-[9.5rem]">
                  Marques
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={headingDone ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: SOFT_EASE }}
                onAnimationComplete={onRoleComplete}
                className="mt-6 max-w-lg text-muted font-semibold ml-3"
              >
                {t.hero.role}
              </motion.p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tablet: docked box hasn't reached its desktop width yet, so anchor
          to the right edge instead of matching the download-CV column */}
      <ScrollHint
        className={`fixed bottom-8 right-10 z-20 hidden transition-opacity duration-500 md:block lg:hidden ${
          roleDone ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        pastExperience={pastExperience}
        scroll={t.hero.scroll}
        backToTop={t.hero.backToTop}
        onBackToTop={scrollToTop}
      />

      <ScrollHint
        className={`fixed bottom-10 z-20 hidden transition-opacity duration-500 lg:block ${
          roleDone ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ left: "var(--cv-anchor-left, 1.5rem)" }}
        pastExperience={pastExperience}
        scroll={t.hero.scroll}
        backToTop={t.hero.backToTop}
        onBackToTop={scrollToTop}
      />

      {/* Mobile: back-to-top button, shown only once the user has scrolled
          to the end of the page. */}
      <div
        className={`fixed inset-x-0 bottom-6 z-20 transition-opacity duration-300 md:hidden ${
          atPageBottom ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-348 justify-center px-6 md:px-10">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full bg-background/90 px-5 py-2.5 text-xs uppercase tracking-wide text-muted backdrop-blur transition-colors hover:text-accent cursor-pointer font-bold"
          >
            {t.hero.backToTop}
            <ScrollArrow flipped />
          </button>
        </div>
      </div>
    </div>
  );
}
