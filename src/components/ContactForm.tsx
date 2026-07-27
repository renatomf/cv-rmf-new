"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactFormState } from "@/app/actions/contact";
import { useTranslations } from "@/lib/i18n/LocaleContext";

const initialState: ContactFormState = { status: "idle" };

const fieldClasses =
  "w-full rounded-md border border-line/15 bg-foreground/5 px-4 py-3 font-semibold text-base outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-accent/60 focus:bg-foreground/8";

const labelClasses = "text-xs font-bold uppercase tracking-wide text-muted";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 flex w-full items-center justify-center gap-2.5 rounded-md bg-accent px-4 py-2 font-extrabold text-xs text-black uppercase tracking-tight transition-opacity hover:opacity-85 disabled:opacity-50 cursor-pointer sm:w-fit sm:self-end"
    >
      {pending ? pendingLabel : label}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 transition-transform group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations();
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  const feedback =
    state.status === "success"
      ? t.contact.form.success
      : state.status === "error"
        ? t.contact.form[state.message as keyof typeof t.contact.form] ?? t.contact.form.sendFailed
        : null;

  return (
    <div>
      <p className="text-xl font-extrabold uppercase tracking-tight md:text-2xl">
        {t.contact.form.heading}
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted">{t.contact.form.subheading}</p>

      <form action={formAction} className="mt-8 flex flex-col gap-5">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            {t.contact.form.nameLabel}
          </label>
          <input id="contact-name" name="name" type="text" required className={`mt-2 h-10 ${fieldClasses}`} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            {t.contact.form.emailLabel}
          </label>
          <input id="contact-email" name="email" type="email" required className={`mt-2 h-10 ${fieldClasses}`} />
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            {t.contact.form.messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className={`mt-2 resize-none ${fieldClasses}`}
          />
        </div>

        <SubmitButton label={t.contact.form.submit} pendingLabel={t.contact.form.sending} />

        {feedback && (
          <p
            role="status"
            className={`text-sm font-bold ${state.status === "success" ? "text-accent" : "text-muted"}`}
          >
            {feedback}
          </p>
        )}
      </form>
    </div>
  );
}
