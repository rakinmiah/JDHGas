"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, CheckCircle2, Phone } from "lucide-react";
import { SERVICE_OPTIONS, SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

const labelCls = "block text-sm font-semibold text-ink";
const inputCls =
  "mt-1.5 w-full rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setErrors((p) => ({ ...p, photo: "" }));
    if (!file) {
      setPhotoPreview(null);
      setPhotoName(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, photo: "Please choose an image file." }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((p) => ({ ...p, photo: "That image is too large (max 10MB)." }));
      return;
    }
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoName(file.name);
  }

  function clearPhoto() {
    setPhotoPreview(null);
    setPhotoName(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        formRef.current?.reset();
        clearPhoto();
      } else if (json.errors) {
        setErrors(json.errors);
        setStatus("error");
      } else {
        setFormError(json.error || "Something went wrong. Please call or WhatsApp me.");
        setStatus("error");
      }
    } catch {
      setFormError("Something went wrong sending that. Please call or WhatsApp me on " + SITE.phoneDisplay + ".");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold">Thanks — I&apos;ve got your message.</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          I&apos;ll be in touch shortly. Need me sooner? Call{" "}
          <a href={SITE.phoneHref} className="font-semibold text-primary">{SITE.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  const err = (k: string) => errors[k];

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Your name</label>
          <input id="name" name="name" autoComplete="name" required className={inputCls} aria-invalid={!!err("name")} aria-describedby={err("name") ? "name-e" : undefined} />
          {err("name") && <p id="name-e" className="mt-1 text-sm text-[var(--color-feedback-danger,#DC2626)]">{err("name")}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputCls} aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "phone-e" : undefined} />
          {err("phone") && <p id="phone-e" className="mt-1 text-sm text-[#DC2626]">{err("phone")}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email <span className="font-normal text-muted">(optional)</span></label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={inputCls} aria-invalid={!!err("email")} aria-describedby={err("email") ? "email-e" : undefined} />
          {err("email") && <p id="email-e" className="mt-1 text-sm text-[#DC2626]">{err("email")}</p>}
        </div>
        <div>
          <label htmlFor="postcode" className={labelCls}>Postcode</label>
          <input id="postcode" name="postcode" autoComplete="postal-code" required className={inputCls} aria-invalid={!!err("postcode")} aria-describedby={err("postcode") ? "postcode-e" : undefined} />
          {err("postcode") && <p id="postcode-e" className="mt-1 text-sm text-[#DC2626]">{err("postcode")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelCls}>What do you need?</label>
        <select id="service" name="service" required defaultValue="" className={inputCls} aria-invalid={!!err("service")} aria-describedby={err("service") ? "service-e" : undefined}>
          <option value="" disabled>Choose a service…</option>
          {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {err("service") && <p id="service-e" className="mt-1 text-sm text-[#DC2626]">{err("service")}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>Message <span className="font-normal text-muted">(optional)</span></label>
        <textarea id="message" name="message" rows={4} className={inputCls} placeholder="Tell me a bit about the job — make/model of boiler, the problem, anything useful." />
      </div>

      {/* Photo upload */}
      <div>
        <span className={labelCls}>Add a photo of the work <span className="font-normal text-muted">(optional)</span></span>
        <p className="mt-1 text-sm text-muted">A picture of your boiler or appliance helps me quote accurately.</p>
        {!photoPreview ? (
          <label htmlFor="photo" className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-border-strong bg-sunken px-4 py-8 text-center transition-colors hover:border-primary">
            <Upload className="h-7 w-7 text-primary" aria-hidden />
            <span className="text-sm font-medium text-ink">Tap to add a photo</span>
            <span className="text-xs text-muted">JPG or PNG, up to 10MB</span>
          </label>
        ) : (
          <div className="mt-2 flex items-center gap-3 rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
              <Image src={photoPreview} alt="Preview of the photo you added" fill className="object-cover" unoptimized />
            </div>
            <span className="flex-1 truncate text-sm text-ink">{photoName}</span>
            <button type="button" onClick={clearPhoto} className="grid h-9 w-9 place-items-center rounded-full hover:bg-border-subtle" aria-label="Remove photo">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        )}
        <input ref={fileRef} id="photo" name="photo" type="file" accept="image/*" onChange={onPhotoChange} className="sr-only" />
        {err("photo") && <p className="mt-1 text-sm text-[#DC2626]">{err("photo")}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input id="consent" name="consent" type="checkbox" value="yes" required className="mt-1 h-5 w-5 shrink-0 rounded border-border-strong accent-[#2563eb]" aria-describedby={err("consent") ? "consent-e" : undefined} />
        <label htmlFor="consent" className="text-sm text-muted">
          I&apos;m happy for JDH Gas to contact me about my enquiry. See our{" "}
          <a href="/privacy-policy" className="font-medium text-primary underline-offset-2 hover:underline">privacy policy</a>.
        </label>
      </div>
      {err("consent") && <p id="consent-e" className="-mt-2 text-sm text-[#DC2626]">{err("consent")}</p>}

      {formError && (
        <p role="alert" className="rounded-[var(--radius-md)] bg-[#FEECEC] px-4 py-3 text-sm text-[#DC2626]">{formError}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[var(--radius-pill)] bg-primary px-6 text-base font-semibold text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      <p className="flex items-center gap-2 text-sm text-muted">
        <Phone className="h-4 w-4" aria-hidden /> Prefer to talk? Call{" "}
        <a href={SITE.phoneHref} className="font-semibold text-primary">{SITE.phoneDisplay}</a>
      </p>
    </form>
  );
}
