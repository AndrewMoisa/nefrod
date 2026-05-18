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
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function clearError(name: FieldName) {
    setErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setServerError(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Partial<Record<FieldName, boolean>> = {};

    const values: Record<FieldName, string> = {
      name: "",
      company: "",
      email: "",
      market: "",
      message: "",
    };
    for (const name of fieldOrder) {
      const value = String(data.get(name) ?? "").trim();
      values[name] = value;
      if (!value) next[name] = true;
      else if (name === "email" && !isEmail(value)) next[name] = true;
    }

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstError = fieldOrder.find((n) => next[n]);
      if (firstError) {
        const el = form.elements.namedItem(firstError);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(data.get("website") ?? ""),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        return;
      }
      let message = "Something went wrong. Please try again in a moment.";
      try {
        const body = await response.json();
        if (typeof body?.error === "string") message = body.error;
      } catch {
        // ignore body parse errors
      }
      setServerError(message);
    } catch {
      setServerError(
        "We could not reach the server. Please check your connection and try again.",
      );
    } finally {
      setPending(false);
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
          Thank you — a Nordic Entrepreneur Forum Rød lead will be in touch
          within two business days with an initial corridor assessment.
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
      {/* honeypot — hidden from humans, bots tend to fill every field */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

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

      <Button
        type="submit"
        variant="white"
        size="lg"
        className="mt-2 w-full"
        disabled={pending}
        aria-busy={pending ? true : undefined}
      >
        {pending ? "Sending…" : "Request a corridor assessment"}
      </Button>
      {serverError && (
        <p
          role="alert"
          aria-live="assertive"
          className="text-[0.82rem] text-[#e89a89]"
        >
          {serverError}
        </p>
      )}
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
