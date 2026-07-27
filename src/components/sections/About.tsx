import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

function renderBold(text: string) {
  return text.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-normal">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export function About({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="about" index={index} title={t.about.title}>
      <div className="flex max-w-2xl flex-col gap-4 md:max-w-md">
        {t.about.paragraphs.map((paragraph, i) => (
          <p key={i} className="text-[15px] font-medium leading-snug md:text-[16px]">
            {renderBold(paragraph)}
          </p>
        ))}
      </div>
    </Section>
  );
}
