"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "@/lib/i18n/LocaleContext";
import { useHeroDock } from "@/hooks/useHeroDock";
import { useHeroIntroSequence } from "@/hooks/useHeroIntroSequence";
import FadeUpWords from "@/components/FadeUpWords";
import ShaderBackdrop from "@/components/ShaderBackdrop";

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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:text-accent"
    >
      <span className="text-accent">{children}</span>
      {label}
    </a>
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
          <ShaderBackdrop />
          <Image
            src="/images/image-5-cutout.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 35vw, 100vw"
            className="object-cover object-[center_42%] brightness-60 md:object-[120%_42%] lg:object-[center_42%]"
          />
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
          <ShaderBackdrop />
          <Image
            src="/images/image-5-cutout.webp"
            alt=""
            fill
            priority
            sizes="120vw"
            className="object-cover object-center scale-120 brightness-60"
          />
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

          <div className="mt-16 mb-[9vh] md:mb-0 md:mt-24">
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
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={headingDone ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : 0.15,
                  ease: SOFT_EASE,
                }}
                className="mt-12 flex max-w-3xl flex-wrap items-center justify-end gap-x-6 gap-y-2"
              >
                <SocialLink
                  href="https://www.linkedin.com/in/renatomf/"
                  label={t.contact.linkedinLabel}
                >
                  <LinkedInIcon />
                </SocialLink>
                <SocialLink href="https://github.com/renatomf" label={t.contact.githubLabel}>
                  <GitHubIcon />
                </SocialLink>
              </motion.div>
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
