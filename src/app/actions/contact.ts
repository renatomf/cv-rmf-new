"use server";

import { Resend } from "resend";
import { contactEmailHtml } from "@/lib/email/contact-template";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "missingFields" };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "invalidEmail" };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Novo contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
      html: contactEmailHtml({ name, email, message }),
    });

    if (error) {
      return { status: "error", message: "sendFailed" };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: "sendFailed" };
  }
}
