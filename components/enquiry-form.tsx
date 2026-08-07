"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { services } from "@/lib/site";

const initialState: EnquiryState = { status: "idle", message: "" };

const fieldClass =
  "mt-3 w-full border-b border-rule bg-transparent pb-3 text-[1.05rem] text-carbon outline-none transition-colors duration-300 placeholder:text-carbon-40 focus:border-carbon";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="label border border-carbon bg-carbon px-8 py-4 text-porcelain transition-colors duration-500 hover:bg-transparent hover:text-carbon disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Sending…" : "Send your details"}
    </button>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="border-t border-carbon pt-8" role="status">
        <p className="title text-[1.9rem]">{state.message}</p>
        <p className="mt-4 max-w-md text-carbon-60">
          If it is urgent, call or send a message on WhatsApp and we will pick
          it up sooner.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-sm text-carbon-40">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
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
          <label htmlFor="company" className="label-sm text-carbon-40">
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="label-sm text-carbon-40">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
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

        <div>
          <label htmlFor="phone" className="label-sm text-carbon-40">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className="label-sm text-carbon-40">
            Service you are interested in
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={`${fieldClass} select-field appearance-none rounded-none`}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="label-sm text-carbon-40">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            aria-describedby={
              state.errors?.message ? "message-error" : undefined
            }
            aria-invalid={state.errors?.message ? true : undefined}
            className={`${fieldClass} resize-y`}
            placeholder="What are you trying to achieve, and by when?"
          />
          {state.errors?.message && (
            <p id="message-error" className="mt-2 text-[0.85rem] text-carbon">
              {state.errors.message}
            </p>
          )}
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-8 border-l-2 border-carbon pl-4 text-carbon">
          {state.message}
        </p>
      )}

      <div className="mt-10">
        <SubmitButton />
      </div>
    </form>
  );
}
