import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Languages({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="languages" index={index} title={t.languages.title}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.languages.items.map((lang) => (
          <div
            key={lang.name}
            className="rounded-xl border border-b-2 border-line/40 px-6 py-6"
          >
            <h3 className="font-semibold">{lang.name}</h3>
            <p className="mt-1 text-sm text-muted">{lang.level}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
