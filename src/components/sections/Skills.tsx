"use client";

import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Skills({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="skills" index={index} title={t.skills.title}>
      <div className="flex flex-wrap gap-3">
        {t.skills.items.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-line px-4 py-1 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </Section>
  );
}
