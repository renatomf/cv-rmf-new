"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ScrollHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });
  const [pastExperience, setPastExperience] = useState(false);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const experienceEl = document.getElementById("experience");
      if (!experienceEl) return;
      setPastExperience(experienceEl.getBoundingClientRect().top <= 800);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Docked box stays flush top/right/bottom (full height, no vertical inset) —
  // only the width narrows as it slides right.
  const dockWidth = viewport.width * 0.35;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useLayoutEffect(() => {
    let progress = 0;
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.height > 0) {
        progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      }
    }

    if (progress === 0) {
      // Default motion values already match an unscrolled page — nothing to
      // correct, so reveal immediately instead of waiting on extra frames.
      setReady(true);
      return;
    }

    scrollYProgress.jump(progress);

    // Reloading mid-scroll needs a couple of frames for framer-motion's own
    // render step (scheduled via rAF) to apply the jumped value to the DOM —
    // otherwise the very first paint shows the pre-jump (full-width) frame.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setReady(true));
      rafRef.current = raf2;
    });
    rafRef.current = raf1;
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  const width = useTransform(scrollYProgress, [0, 1], [viewport.width, dockWidth]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.3, 0]);
  const edgeFadeOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

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
            src="/image-4.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
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
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/image-4.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-120"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="@container relative mx-auto flex w-full max-w-353 flex-1 flex-col justify-between px-4 md:px-10">
          <div className="flex justify-end pt-34 opacity-0 md:opacity-100">
            <p className="max-w-xs text-start text-sm font-bold uppercase leading-5 md:max-w-xs md:text-[15px] md:pl-4">
              &ldquo;Seja desenvolvendo software ou organizando a vida, busco clareza, equilíbrio e impacto duradouro. Acredito que grandes sistemas são construídos com intenção, consistência e atenção aos detalhes.&rdquo;
            </p>
          </div>

          <div className="mt-16 mb-30 md:mb-0 md:mt-24">
            <div className="font-bold text-accent text-2xl">
              <p>2008→2026</p>
              <p>10+ anos exp.</p>
            </div>

            <div className="mt-6">
              <h1 className="max-w-3xl text-right font-bold uppercase leading-[0.9] tracking-tight">
                <span className="block text-right text-[14vw] sm:text-[9vw] md:text-[6vw] lg:text-[7.85rem]">
                  Renato
                </span>
                <span className="block text-right text-[17vw] sm:text-[13vw] md:text-[9vw] lg:text-[9.5rem]">
                  Marques
                </span>
              </h1>
              <p className="mt-6 max-w-md text-medium md:text-medium font-bold ml-3">
                Engenheiro de Software Sênior, baseado em Sao Paulo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-10 z-20 hidden md:block">
        <div className="mx-auto flex max-w-228 justify-end px-6 md:px-10">
          {pastExperience ? (
            <button
              type="button"
              onClick={scrollToTop}
              className="text-xs uppercase tracking-wide text-medium transition-colors hover:text-accent cursor-pointer font-bold" 
            >
              Back to top
            </button>
          ) : (
            <span className="text-xs uppercase tracking-wide text-medium font-bold text-lef">
              Scroll
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
