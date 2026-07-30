"use client";

import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Publications({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="publications" index={index} title={t.publications.title}>
      <div className="flex flex-col divide-y divide-line">
        {t.publications.items.map((pub) => (
          <a
            key={pub.title}
            href="#"
            className="group flex flex-col gap-1 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <span className="font-medium">{pub.title}</span>
            <span className="flex shrink-0 items-center gap-2 text-sm text-muted">
              {pub.meta}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
