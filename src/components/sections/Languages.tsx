import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Languages({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="languages" index={index} title={t.languages.title}>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {t.languages.items.map((lang) => (
          <div key={lang.name}>
            <p className="font-semibold">{lang.name}</p>
            <p className="mt-1 text-sm text-muted">{lang.level}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
