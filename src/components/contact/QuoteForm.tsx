"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ImagePlus, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { compressImage } from "@/lib/compress-image";
import { trackEvent } from "@/lib/analytics";

/**
 * One-page quote form (27 Nov 2026), replacing the three-step wizard with its
 * icon tiles and progress bar. Same fields and endpoint as HomeEnquiryForm
 * (/api/contact): service, name, phone, email, postcode, message, photo,
 * consent, plus the "company" honeypot. Plain labelled fields, flat inputs,
 * one orange button.
 */

const SERVICES = [
  "Boiler servicing",
  "Boiler or heating repair",
  "New boiler or heating installation",
  "Landlord gas safety certificate (CP12)",
  "Gas hob or cooker install",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

const label = "block text-sm font-semibold text-navy";
const field =
  "mt-1.5 w-full rounded-[4px] border border-border-input bg-white px-3.5 py-3 text-base text-navy outline-none transition-colors placeholder:text-neutral/70 focus:border-navy focus:ring-2 focus:ring-navy/15";
const err = "mt-1 text-sm text-feedback-danger";

export function QuoteForm({ formName = "quote_form", compact = false }: { formName?: string; compact?: boolean }) {
  // compact: tighter spacing, a two-line message box, and the photo link
  // beside the send button (the closing section, kept short).
  const id = useId();
  const f = (n: string) => `${id}-${n}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const compressed = useRef<Promise<File> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setErrors((p) => ({ ...p, photo: "" }));
    if (!file) return clearPhoto();
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, photo: "Please choose an image file." }));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrors((p) => ({ ...p, photo: "That image is too large. Please pick one under 20MB." }));
      return;
    }
    setPhotoName(file.name);
    compressed.current = compressImage(file);
  }

  function clearPhoto() {
    setPhotoName(null);
    compressed.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "").trim();
    const local: Record<string, string> = {};
    if (!v("service")) local.service = "Please choose what you need.";
    if (!v("name")) local.name = "Please add your name.";
    if (!v("phone")) local.phone = "Please add a phone number.";
    if (!v("postcode")) local.postcode = "Please add your postcode.";
    if (!(form.elements.namedItem("consent") as HTMLInputElement)?.checked) local.consent = "Please tick so we can reply.";
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFormError(null);
    try {
      const data = new FormData(form);
      if (compressed.current) {
        try {
          data.set("photo", await compressed.current);
        } catch {
          /* send the original file */
        }
      }
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        trackEvent("enquiry_submit", { form: formName });
        formRef.current?.reset();
        clearPhoto();
      } else if (json.errors) {
        setErrors(json.errors);
        setStatus("error");
      } else {
        setFormError(json.error || `Something went wrong. Please call ${SITE.phoneDisplay} or WhatsApp us.`);
        setStatus("error");
      }
    } catch {
      setFormError(`Something went wrong sending that. Please call ${SITE.phoneDisplay} or WhatsApp us.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6">
        <CheckCircle2 className="h-10 w-10 text-whatsapp" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-navy">Thanks, your enquiry is in.</h3>
        <p className="mt-2 max-w-md text-neutral">
          We&apos;ll get back to you with honest advice and a clear price. Need us sooner? Call{" "}
          <a href={SITE.phoneHref} className="font-semibold text-navy underline underline-offset-4">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const fld = compact ? field.replace("py-3", "py-2.5") : field;

  const photoBlock = (
    <>
        <input ref={fileRef} id={f("photo")} name="photo" type="file" accept="image/*" onChange={onPhoto} className="sr-only" />
        {photoName ? (
          <p className="flex items-center gap-2 text-sm text-navy">
            <ImagePlus className="h-4 w-4 text-neutral" aria-hidden />
            <span className="truncate font-semibold">{photoName}</span>
            <button type="button" onClick={clearPhoto} className="ml-1 grid h-7 w-7 place-items-center rounded-full hover:bg-grey" aria-label="Remove photo">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </p>
        ) : (
          <label htmlFor={f("photo")} className="group inline-flex cursor-pointer items-center gap-2 text-sm text-navy">
            <ImagePlus className="h-4 w-4" aria-hidden />
            <span className="font-semibold underline underline-offset-4 group-hover:text-action-text">Add a photo of the boiler</span>
            <span className="text-neutral">(optional)</span>
          </label>
        )}
        {errors.photo && <p className={err}>{errors.photo}</p>}
    </>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`grid sm:grid-cols-2 ${compact ? "gap-x-5 gap-y-4" : "gap-5"}`}>
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={f("service")} className={label}>
          What do you need?
        </label>
        <div className="relative">
          <select
            id={f("service")}
            name="service"
            defaultValue=""
            aria-invalid={!!errors.service}
            className={`${fld} appearance-none pr-10`}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 mt-[3px] h-4 w-4 -translate-y-1/2 text-navy" aria-hidden />
        </div>
        {errors.service && <p className={err}>{errors.service}</p>}
      </div>

      <div>
        <label htmlFor={f("name")} className={label}>
          Name
        </label>
        <input id={f("name")} name="name" autoComplete="name" className={fld} aria-invalid={!!errors.name} />
        {errors.name && <p className={err}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={f("phone")} className={label}>
          Phone
        </label>
        <input id={f("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={fld} aria-invalid={!!errors.phone} />
        {errors.phone && <p className={err}>{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor={f("postcode")} className={label}>
          Postcode
        </label>
        <input id={f("postcode")} name="postcode" autoComplete="postal-code" className={fld} aria-invalid={!!errors.postcode} />
        {errors.postcode && <p className={err}>{errors.postcode}</p>}
      </div>
      <div>
        <label htmlFor={f("email")} className={label}>
          Email <span className="font-normal text-neutral">(optional)</span>
        </label>
        <input id={f("email")} name="email" type="email" inputMode="email" autoComplete="email" className={fld} aria-invalid={!!errors.email} />
        {errors.email && <p className={err}>{errors.email}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={f("message")} className={label}>
          About the job <span className="font-normal text-neutral">(optional)</span>
        </label>
        <textarea
          id={f("message")}
          name="message"
          rows={compact ? 2 : 3}
          placeholder="The boiler make, any fault code, or what's happening"
          className={`${fld} resize-y`}
        />
      </div>

      {!compact && <div className="sm:col-span-2">{photoBlock}</div>}

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input id={f("consent")} name="consent" type="checkbox" value="yes" className="mt-0.5 h-5 w-5 shrink-0 accent-navy" />
          <label htmlFor={f("consent")} className="text-sm text-neutral">
            I&apos;m happy for JDH Gas to contact me about this enquiry. See the{" "}
            <Link href="/privacy-policy" className="font-semibold text-navy underline underline-offset-4">
              privacy policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && <p className={err}>{errors.consent}</p>}
      </div>

      {formError && (
        <p role="alert" className="text-sm text-feedback-danger sm:col-span-2">
          {formError}
        </p>
      )}

      <div className={`sm:col-span-2 ${compact ? "flex flex-wrap items-center gap-x-6 gap-y-3" : ""}`}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[4px] bg-action px-7 font-bold text-navy transition-colors hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        {compact && <div>{photoBlock}</div>}
      </div>
    </form>
  );
}
