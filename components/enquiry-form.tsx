"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { services } from "@/lib/site";

const initialState: EnquiryState = { status: "idle", message: "" };

/** Underline-only fields — the handoff uses no boxes or borders on the form. */
const fieldClass =
  "w-full border-0 border-b border-carbon/25 bg-transparent py-3.5 text-base text-carbon outline-none transition-colors duration-300 placeholder:text-carbon/40 focus:border-carbon";

const labelClass =
  "mb-2.5 block text-[11px] uppercase tracking-[0.08em] text-carbon/60";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-3 cursor-pointer self-start rounded-full bg-carbon px-10 py-4 text-xs uppercase tracking-[0.08em] text-porcelain transition-colors duration-500 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);

  /*
   * Service pages can link here as `?sector=…`, so the message starts with the
   * visitor's own context already filled in. The form is wrapped in a Suspense
   * boundary on the page, which keeps the rest of the route prerendered.
   */
  const sector = useSearchParams().get("sector") ?? "";

  if (state.status === "success") {
    return (
      <div className="border-t border-carbon pt-8" role="status">
        <p className="font-display text-[1.875rem] font-normal">
          {state.message}
        </p>
        <p className="mt-4 max-w-md text-carbon/70">
          If it is urgent, call the studio and we will pick it up sooner.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 wide:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            aria-invalid={state.errors?.name ? true : undefined}
            className={fieldClass}
          />
          {state.errors?.name && (
            <p id="name-error" className="mt-2 text-[0.85rem] text-carbon">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            aria-invalid={state.errors?.email ? true : undefined}
            className={fieldClass}
          />
          {state.errors?.email && (
            <p id="email-error" className="mt-2 text-[0.85rem] text-carbon">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Company or brand name"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          Area of Interest
        </label>
        {/*
         * A leading empty option, which the prototype omits. Without it the
         * control submits "Brand Strategy" for every visitor who never opened
         * it, and the enquiry data stops meaning anything.
         */}
        <select
          id="service"
          name="service"
          defaultValue=""
          className={`${fieldClass} select-field appearance-none rounded-none`}
        >
          <option value="">Select an area of interest</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={sector ? `We are in ${sector}. ` : undefined}
          key={sector}
          rows={4}
          required
          placeholder="A little about your brand and what you’re looking to achieve"
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          aria-invalid={state.errors?.message ? true : undefined}
          className={`${fieldClass} resize-none`}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-2 text-[0.85rem] text-carbon">
            {state.errors.message}
          </p>
        )}
      </div>

      {state.status === "error" && (
        <p role="alert" className="border-l-2 border-carbon pl-4 text-carbon">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
