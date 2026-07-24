import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function References({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="references" index={index} title={t.references.title}>
      <div className="grid gap-10 md:grid-cols-3">
        {t.references.items.map((ref) => (
          <div key={ref.name}>
            <p className="italic leading-relaxed text-muted">
              &ldquo;{ref.quote}&rdquo;
            </p>
            <p className="mt-4 font-semibold">{ref.name}</p>
            <p className="text-sm text-muted">{ref.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
