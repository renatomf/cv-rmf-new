import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/sections/Section";
import { useTranslations } from "@/lib/i18n/LocaleContext";

export function Contact({ index }: { index: string }) {
  const t = useTranslations();

  return (
    <Section
      id="contact"
      index={index}
      title={t.contact.title}
      footer={
        <div className="mt-32">
          <p className="wrap-break-word text-[3.3rem] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[7rem] lg:text-[10rem]">
            {t.contact.thanks}
          </p>
          <p className="mt-6 max-w-xl whitespace-pre-line text-3xl md:text-3xl md:justify-end md:flex font-bold text-accent ">
            {t.contact.tagline}
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm text-muted">{t.contact.phoneLabel}</p>
          <a href="https://wa.me/5511972550341" className="mt-1 block font-extrabold text-xl hover:text-accent">
            +55 11 97255-0341
          </a>
        </div>
        <div>
          <p className="text-sm text-muted">{t.contact.emailLabel}</p>
          <a
            href="mailto:renatomardev@gmail.com"
            className="mt-1 block font-extrabold text-xl hover:text-accent"
          >
            renatomardev@gmail.com
          </a>
        </div>
        <div>
          <p className="text-sm text-muted">{t.contact.linkedinLabel}</p>
          <a href="https://www.linkedin.com/in/renatomf/" className="mt-1 block font-extrabold text-xl hover:text-accent">
            linkedin.com/in/renatomf
          </a>
        </div>
        <div>
          <p className="text-sm text-muted">{t.contact.githubLabel}</p>
          <a href="https://github.com/renatomf" className="mt-1 block font-extrabold text-xl hover:text-accent">
            github.com/renatomf
          </a>
        </div>
        <div className="mt-12 border-t border-line pt-20">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
