import { Section } from "@/components/sections/Section";
import { ExternalLinkIcon } from "@/components/ExternalLinkIcon";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Awards({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="awards" index={index} title={t.awards.title}>
      <div className="flex flex-col divide-y divide-line">
        {t.awards.items.map((award) => (
          <a
            key={award.title}
            href="#"
            className="group flex items-center justify-between gap-4 py-5 first:pt-0"
          >
            <span className="font-medium">{award.title}</span>
            <span className="flex items-center gap-2 text-sm text-muted">
              {award.meta}
              <ExternalLinkIcon />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
