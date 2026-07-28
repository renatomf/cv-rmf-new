import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Education({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="education" index={index} title={t.education.title}>
      <div className="flex flex-col gap-12">
        {t.education.items.map((item) => (
          <div key={item.title}>
            <p className="text-sm text-muted">{item.meta}</p>
            <h3 className="mt-1 text-xl font-semibold md:text-2xl">
              {"file" in item && item.file ? (
                <a
                  href={`/pdf/${item.file}`}
                  download
                  className="transition-colors hover:text-accent"
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>
            <p className="mt-3 max-w-2xl text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
