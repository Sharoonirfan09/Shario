"use server";

import { services, site } from "@/lib/site";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by input name. */
  errors?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: FormDataEntryValue | null, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** English/Arabic pairs for every status and validation message this action can return. */
const copy = {
  honeypotSuccess: { en: "Thank you — we will be in touch.", ar: "شكراً لكم — سنتواصل معكم قريباً." },
  nameRequired: { en: "Enter your name.", ar: "أدخلوا اسمكم." },
  emailRequired: { en: "Enter your email address.", ar: "أدخلوا بريدكم الإلكتروني." },
  emailInvalid: { en: "Enter a valid email address.", ar: "أدخلوا بريداً إلكترونياً صحيحاً." },
  messageRequired: { en: "Tell us briefly what you need.", ar: "أخبرونا باختصار عما تحتاجونه." },
  checkFields: { en: "Check the highlighted fields and send again.", ar: "راجعوا الحقول المُظلَّلة وأرسلوا مجدداً." },
  deliveryError: (locale: "en" | "ar") =>
    locale === "ar"
      ? `حدث خطأ أثناء إرسال استفساركم. يرجى مراسلتنا على ${site.email} أو الاتصال بنا على ${site.phone}.`
      : `Something went wrong sending your enquiry. Please email ${site.email} or call ${site.phone}.`,
  success: { en: "Thank you — we will respond within one business day.", ar: "شكراً لكم — سنرد خلال يوم عمل واحد." },
} as const;

function t(pair: { en: string; ar: string }, locale: "en" | "ar") {
  return locale === "ar" ? pair.ar : pair.en;
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const locale = clean(formData.get("locale")) === "ar" ? "ar" : "en";

  // Honeypot: real people never fill a hidden field.
  if (clean(formData.get("website"))) {
    return { status: "success", message: t(copy.honeypotSuccess, locale) };
  }

  const name = clean(formData.get("name"), 120);
  const company = clean(formData.get("company"), 120);
  const email = clean(formData.get("email"), 160);
  const phone = clean(formData.get("phone"), 60);
  const service = clean(formData.get("service"), 120);
  const message = clean(formData.get("message"));

  const errors: Record<string, string> = {};
  if (!name) errors.name = t(copy.nameRequired, locale);
  if (!email) errors.email = t(copy.emailRequired, locale);
  else if (!EMAIL.test(email)) errors.email = t(copy.emailInvalid, locale);
  if (!message) errors.message = t(copy.messageRequired, locale);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: t(copy.checkFields, locale),
      errors,
    };
  }

  const known = services.some((s) => s.name === service || s.nameAr === service);
  const interest = known ? service : "Not specified";

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;

  if (!apiKey || !from) {
    // Delivery is not provisioned yet. Fail loudly in the log rather than
    // telling the visitor their enquiry was sent when it was not.
    console.error(
      "Enquiry received but email delivery is not configured. Set RESEND_API_KEY and ENQUIRY_FROM_EMAIL."
    );
    return {
      status: "error",
      message: copy.deliveryError(locale),
    };
  }

  const body = [
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Service of interest: ${interest}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Enquiry from ${name}${company ? ` · ${company}` : ""}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the enquiry:", await response.text());
      return {
        status: "error",
        message: copy.deliveryError(locale),
      };
    }
  } catch (error) {
    console.error("Could not reach the email provider:", error);
    return {
      status: "error",
      message: copy.deliveryError(locale),
    };
  }

  return {
    status: "success",
    message: t(copy.success, locale),
  };
}
