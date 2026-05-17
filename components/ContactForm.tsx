"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";

type FieldName = "name" | "company" | "email" | "market" | "message";

const fieldOrder: FieldName[] = [
  "name",
  "company",
  "email",
  "market",
  "message",
];

const errorMessages: Record<FieldName, string> = {
  name: "Please enter your name.",
  company: "Please enter your company.",
  email: "Please enter a valid email.",
  market: "Please choose a corridor.",
  message: "Please add a short description.",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const fieldBase =
  "rounded-none border-0 border-b-[1.5px] bg-transparent px-0 py-[18px] font-body text-[1.02rem] text-white transition-colors duration-[400ms] ease-expo placeholder:text-slatelite focus:border-white focus:outline-none";

const labelBase =
  "font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-slatefaint";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="ml-1 text-nordic">
      *
    </span>
  );
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  function clearError(name: FieldName) {
    setErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Partial<Record<FieldName, boolean>> = {};

    for (const name of fieldOrder) {
      const value = String(data.get(name) ?? "").trim();
      if (!value) next[name] = true;
      else if (name === "email" && !isEmail(value)) next[name] = true;
    }

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    } else {
      // move focus to first errored field for keyboard / SR users
      const firstError = fieldOrder.find((n) => next[n]);
      if (firstError) {
        const el = form.elements.namedItem(firstError);
        if (el instanceof HTMLElement) el.focus();
      }
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-l-2 border-navyline border-l-white bg-white/[0.02] px-[30px] py-7"
      >
        <h3 className="mb-2 text-[1.3rem] font-medium">
          Your request is on its way.
        </h3>
        <p className="text-[0.92rem] text-slatefaint">
          Thank you — a Nordic Entrepreneur Forum lead will be in touch within
          two business days with an initial corridor assessment.
        </p>
      </div>
    );
  }

  const border = (name: FieldName) =>
    errors[name] ? "border-[#e89a89]" : "border-navyline";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact the forum desk"
      className="flex flex-col gap-[22px]"
    >
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelBase}>
            Full name
            <RequiredMark />
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Ingrid Halvorsen"
            onChange={() => clearError("name")}
            className={`${fieldBase} ${border("name")}`}
          />
          {errors.name && (
            <span
              id="name-error"
              role="alert"
              className="text-[0.76rem] text-[#e89a89]"
            >
              {errorMessages.name}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelBase}>
            Company
            <RequiredMark />
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            aria-required="true"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? "company-error" : undefined}
            placeholder="Fjord Grid Systems"
            onChange={() => clearError("company")}
            className={`${fieldBase} ${border("company")}`}
          />
          {errors.company && (
            <span
              id="company-error"
              role="alert"
              className="text-[0.76rem] text-[#e89a89]"
            >
              {errorMessages.company}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelBase}>
            Work email
            <RequiredMark />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="ingrid@fjordgrid.no"
            onChange={() => clearError("email")}
            className={`${fieldBase} ${border("email")}`}
          />
          {errors.email && (
            <span
              id="email-error"
              role="alert"
              className="text-[0.76rem] text-[#e89a89]"
            >
              {errorMessages.email}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="market" className={labelBase}>
            Target market
            <RequiredMark />
          </label>
          <select
            id="market"
            name="market"
            required
            aria-required="true"
            aria-invalid={errors.market ? true : undefined}
            aria-describedby={errors.market ? "market-error" : undefined}
            defaultValue=""
            onChange={() => clearError("market")}
            className={`${fieldBase} text-slatefaint [&>option]:bg-navydeep [&>option]:text-white ${border(
              "market",
            )}`}
          >
            <option value="">Select a corridor</option>
            <option>Norway &rarr; Eastern Europe</option>
            <option>Norway &rarr; China</option>
            <option>Eastern Europe &rarr; China</option>
            <option>Full corridor (all three)</option>
          </select>
          {errors.market && (
            <span
              id="market-error"
              role="alert"
              className="text-[0.76rem] text-[#e89a89]"
            >
              {errorMessages.market}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelBase}>
          What are you building?
          <RequiredMark />
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="A few lines on your venture, sector and timeline."
          onChange={() => clearError("message")}
          className={`${fieldBase} min-h-[120px] resize-none ${border("message")}`}
        />
        {errors.message && (
          <span
            id="message-error"
            role="alert"
            className="text-[0.76rem] text-[#e89a89]"
          >
            {errorMessages.message}
          </span>
        )}
      </div>

      <Button type="submit" variant="white" size="lg" className="mt-2 w-full">
        Request a corridor assessment
      </Button>
      <p className="text-[0.8rem] text-slatelite">
        <span aria-hidden="true" className="text-nordic">
          *
        </span>{" "}
        All fields required. No obligation. We sign an NDA before the first
        call on request.
      </p>
    </form>
  );
}
