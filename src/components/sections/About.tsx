import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function About({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section id="about" index={index} title={t.about.title}>
      <p className="max-w-2xl text-[15px] font-medium leading-snug md:max-w-md md:text-[16px]">
        {t.about.body}
      </p>
    </Section>
  );
}
