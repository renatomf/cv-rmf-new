"use client";

import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function References({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="references" index={index} title={t.references.title}>
      <div className="flex flex-col gap-12">
        {t.references.items.map((ref) => (
          <div key={ref.name} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-line/10 text-sm font-semibold">
                {getInitials(ref.name)}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{ref.name}</h3>
                <p className="text-sm text-muted ">{ref.role}</p>
              </div>
            </div>
            <p className="max-w-md leading-6 text-sm font-light">
              {ref.quote}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
