import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Experience({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="experience" index={index} title={t.experience.title}>
      <div className="flex flex-col gap-12">
        {t.experience.items.map((item) => (
          <div key={item.role + item.meta}>
            <p className="text-sm text-muted">{item.meta}</p>
            <h3 className="mt-1 text-xl font-semibold md:text-2xl">
              {item.role}
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-muted">{item.description}</p>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-sm text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
