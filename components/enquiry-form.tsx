"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry, type EnquiryState } from "@/lib/actions";
import type { Locale } from "@/lib/locale";
import type { NavService } from "@/lib/site";

const initialState: EnquiryState = { status: "idle", message: "" };

/**
 * Underline-only fields — the handoff uses no boxes or borders on the form.
 * Focus carries a faint Mist glow beneath the line, the accent's one
 * appearance in the form — everything else on it stays Carbon and Porcelain.
 */
const fieldClass =
  "w-full border-0 border-b border-carbon/25 bg-transparent py-3.5 text-base text-carbon outline-none transition-[color,border-color,box-shadow] duration-300 placeholder:text-carbon/40 focus:border-carbon focus:shadow-[0_5px_14px_-9px_rgba(171,191,199,0.85)]";

const labelClass =
  "mb-2.5 block text-[11px] uppercase tracking-[0.08em] text-carbon/60";
const labelClassAr = "mb-2.5 block font-arabic text-[0.8125rem] text-carbon/60";
/** Russian keeps English's Latin-style label treatment — same uppercase/tracking, only the strings differ. */
const labelClassRu = labelClass;

function SubmitButton({ isAr, isRu }: { isAr: boolean; isRu: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-3 cursor-pointer self-start rounded-full bg-carbon px-10 py-4 text-porcelain transition-colors duration-500 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 ${isAr ? "font-arabic text-[0.8125rem]" : "text-xs uppercase tracking-[0.08em]"}`}
    >
      {isAr
        ? pending
          ? "جارٍ الإرسال…"
          : "إرسال الرسالة"
        : isRu
          ? pending
            ? "Отправка…"
            : "Отправить сообщение"
          : pending
            ? "Sending…"
            : "Send Message"}
    </button>
  );
}

/** `services` is passed in from the server-rendered Contact page as its
 *  trimmed `navServices()` form — see `lib/site.ts` for why this "use
 *  client" component never imports `services` directly. */
export function EnquiryForm({
  locale = "en",
  services,
}: {
  locale?: Locale;
  services: NavService[];
}) {
  const isAr = locale === "ar";
  const isRu = locale === "ru";
  const [state, formAction] = useActionState(submitEnquiry, initialState);
  const label = isAr ? labelClassAr : isRu ? labelClassRu : labelClass;

  /*
   * Service pages link here as `?service=<name>`, so the dropdown opens on the
   * service the visitor was reading about. Matched against the catalogue
   * rather than trusted, so a hand-edited URL cannot inject an option value.
   * The form is wrapped in a Suspense boundary on the page, which keeps the
   * rest of the route prerendered.
   */
  const requested = useSearchParams().get("service") ?? "";
  const nameField = isAr ? "nameAr" : isRu ? "nameRu" : "name";
  const preselected =
    services.find(
      (service) =>
        service.name === requested || service.nameAr === requested || service.nameRu === requested,
    )?.[nameField] ?? "";

  if (state.status === "success") {
    return (
      <div className="border-t border-carbon pt-8" role="status">
        <p className={isAr ? "font-arabic text-[1.625rem] font-bold" : "font-display text-[1.875rem] font-normal"}>
          {state.message}
        </p>
        <p className={`mt-4 max-w-md text-carbon/70 ${isAr ? "font-arabic" : ""}`}>
          {isAr
            ? "إذا كان الأمر عاجلاً، اتصلوا بنا وسنتعامل معه بسرعة أكبر."
            : isRu
              ? "Если вопрос срочный, позвоните нам — так мы ответим быстрее."
              : "If it is urgent, call us and we will pick it up sooner."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 wide:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {isAr ? "الاسم" : isRu ? "Имя" : "Name"}
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder={isAr ? "اسمكم الكامل" : isRu ? "Ваше полное имя" : "Your full name"}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            aria-invalid={state.errors?.name ? true : undefined}
            className={fieldClass}
          />
          {state.errors?.name && (
            <p id="name-error" className={`mt-2 text-[0.85rem] text-carbon ${isAr ? "font-arabic" : ""}`}>
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={label}>
            {isAr ? "البريد الإلكتروني" : "Email"}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            dir="ltr"
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            aria-invalid={state.errors?.email ? true : undefined}
            className={fieldClass}
          />
          {state.errors?.email && (
            <p id="email-error" className={`mt-2 text-[0.85rem] text-carbon ${isAr ? "font-arabic" : ""}`}>
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 wide:grid-cols-2">
        <div>
          <label htmlFor="company" className={label}>
            {isAr ? "الشركة" : isRu ? "Компания" : "Company"}
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder={
              isAr
                ? "اسم الشركة أو العلامة التجارية"
                : isRu
                  ? "Название компании или бренда"
                  : "Company or brand name"
            }
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            {isAr ? "الهاتف" : isRu ? "Телефон" : "Phone"}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+971 50 000 0000"
            dir="ltr"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={label}>
          {isAr
            ? "الخدمة التي تهتمون بها"
            : isRu
              ? "Какая услуга вас интересует"
              : "Service You Are Interested In"}
        </label>
        {/*
         * A leading empty option. Without it the control submits the first
         * service for every visitor who never opened it, and the enquiry data
         * stops meaning anything.
         */}
        <select
          id="service"
          name="service"
          defaultValue={preselected}
          key={preselected}
          className={`${fieldClass} select-field appearance-none rounded-none ${isAr ? "font-arabic" : ""}`}
        >
          <option value="">
            {isAr
              ? "اختاروا مجال الاهتمام"
              : isRu
                ? "Выберите интересующее направление"
                : "Select an area of interest"}
          </option>
          {services.map((service) => (
            <option
              key={service.slug}
              value={isAr ? service.nameAr : isRu ? service.nameRu : service.name}
            >
              {isAr ? service.nameAr : isRu ? service.nameRu : service.name}
            </option>
          ))}
          <option value={isAr ? "لست متأكداً بعد" : isRu ? "Пока не уверены" : "Not sure yet"}>
            {isAr ? "لست متأكداً بعد" : isRu ? "Пока не уверены" : "Not sure yet"}
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          {isAr ? "الرسالة" : isRu ? "Сообщение" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={
            isAr
              ? "ما الذي تديرونه حالياً، وما الذي تحتاجونه منه"
              : isRu
                ? "Что у вас сейчас работает и что должно измениться"
                : "What you’re running now, and what you need it to do"
          }
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          aria-invalid={state.errors?.message ? true : undefined}
          className={`${fieldClass} resize-none ${isAr ? "font-arabic" : ""}`}
        />
        {state.errors?.message && (
          <p id="message-error" className={`mt-2 text-[0.85rem] text-carbon ${isAr ? "font-arabic" : ""}`}>
            {state.errors.message}
          </p>
        )}
      </div>

      {state.status === "error" && (
        <p
          role="alert"
          className={
            isAr
              ? "border-r-2 border-carbon pr-4 font-arabic text-carbon"
              : "border-l-2 border-carbon pl-4 text-carbon"
          }
        >
          {state.message}
        </p>
      )}

      <SubmitButton isAr={isAr} isRu={isRu} />
    </form>
  );
}
