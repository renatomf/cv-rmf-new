"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";

// Scroll-linked dock/parallax behavior for the hero image: it starts full
// width, then slides + narrows into a panel docked flush against the right
// edge as the hero scrolls past. Unrelated to the hero's one-time entrance
// sequence, which lives in useHeroIntroSequence.
export function useHeroDock(heroRef: RefObject<HTMLElement | null>) {
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Docked box stays flush top/right/bottom (full height, no vertical inset) —
  // only the width narrows as it slides right.
  const dockWidth = viewport.width * 0.35;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Lags a beat behind raw scroll so the dock glides instead of snapping
  // 1:1 with the wheel/touch delta.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
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
    // Jump the spring too, otherwise it would animate from 0 up to
    // `progress` on load instead of starting there already docked.
    smoothProgress.jump(progress);

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
  }, [scrollYProgress, smoothProgress]);

  const width = useTransform(smoothProgress, [0, 1], [viewport.width, dockWidth]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 0.3, 0]);

  return { ready, width, overlayOpacity, edgeFadeOpacity: 1 };
}
