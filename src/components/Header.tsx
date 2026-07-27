"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "@/lib/i18n/LocaleContext";
import translations from "@/data/translations.json";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-8 translate-x-1.5" fill="currentColor">
      {open ? (
        <path d="M6.4 4.98 4.98 6.4 10.59 12l-5.61 5.6 1.42 1.42L12 13.41l5.6 5.61 1.42-1.42L13.41 12l5.61-5.6-1.42-1.42L12 10.59Z" />
      ) : (
        <>
          <rect x="4" y="6" width="16" height="2" rx="1" />
          <rect x="4" y="11" width="16" height="2" rx="1" />
          <rect x="4" y="16" width="16" height="2" rx="1" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = useTranslations();
  const cvRef = useRef<HTMLAnchorElement>(null);

  const toggleLocale = () => setLocale(locale === "pt" ? "en" : "pt");

  // Publishes the "download cv" link's viewport x-position as a CSS variable so
  // the scroll indicator (a separate, unrelated component) can anchor to it
  // exactly instead of guessing at matching widths.
  useLayoutEffect(() => {
    const el = cvRef.current;
    if (!el) return;

    const update = () => {
      document.documentElement.style.setProperty(
        "--cv-anchor-left",
        `${el.getBoundingClientRect().left}px`
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [locale]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-10 transition-all duration-500 ease-out md:hidden ${
          open
            ? "pointer-events-auto bg-black/40 backdrop-blur-md opacity-100"
            : "pointer-events-none bg-black/0 backdrop-blur-none opacity-0"
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-20 h-40 bg-linear-to-b from-black via-black/60 to-transparent">
        <div className="mx-auto flex max-w-348 items-start justify-between px-6 py-4 md:px-10">
          <div className="flex flex-col gap-1 text-md font-medium md:flex-row md:items-center md:gap-4">
            <span className="font-semibold tracking-tight">Renato Marques</span>
            <span className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-accent text-sm">{t.header.availableForWork}</span>
            </span>
          </div>

          <nav
            aria-label={t.header.mainNav}
            className="hidden flex-col items-start gap-1 text-sm md:flex"
          >
            <div className="flex items-center gap-6 md:gap-30">
              <div className="grid">
                <a
                  ref={cvRef}
                  href="#"
                  className="col-start-1 row-start-1 font-medium text-[15px] transition-colors hover:text-accent"
                >
                  {t.header.downloadCv}
                </a>
                <span
                  aria-hidden="true"
                  className="invisible col-start-1 row-start-1 font-medium text-[15px]"
                >
                  {locale === "pt"
                    ? translations.en.header.downloadCv
                    : translations.pt.header.downloadCv}
                </span>
              </div>
              <button type="button" onClick={toggleLocale} className="text-muted cursor-pointer">
                <span
                  className={`font-bold transition-colors hover:text-accent ${
                    locale === "pt" ? "text-accent" : ""
                  }`}
                >
                  PT
                </span>
                {" - "}
                <span
                  className={`font-bold transition-colors hover:text-accent ${
                    locale === "en" ? "text-accent" : ""
                  }`}
                >
                  EN
                </span>
              </button>
            </div>
            <div className="grid">
              <a
                href="#contact"
                className="col-start-1 row-start-1 font-medium transition-colors hover:text-accent text-[15px]"
              >
                {t.header.contact}
              </a>
              <span
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 font-medium text-[15px]"
              >
                {locale === "pt" ? translations.en.header.contact : translations.pt.header.contact}
              </span>
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            className="relative z-20 flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-accent md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>

        <nav
          id="mobile-menu"
          aria-label={t.header.mainNav}
          aria-hidden={!open}
          className={`relative z-20 mx-6 mt-2 flex flex-col gap-1 rounded-2xl border border-line bg-background/95 p-2 text-sm backdrop-blur transition-all duration-300 ease-out md:hidden ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 font-medium transition-colors hover:text-accent"
          >
            {t.header.downloadCv}
          </a>
          <button
            type="button"
            onClick={() => {
              toggleLocale();
              setOpen(false);
            }}
            className="rounded-xl px-4 py-3 text-left font-medium transition-colors hover:text-accent"
          >
            <span className={locale === "pt" ? "text-accent" : undefined}>PT</span>
            {" - "}
            <span className={locale === "en" ? "text-accent" : undefined}>EN</span>
          </button>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 font-medium transition-colors hover:text-accent"
          >
            {t.header.contact}
          </a>
        </nav>
      </header>
    </>
  );
}
