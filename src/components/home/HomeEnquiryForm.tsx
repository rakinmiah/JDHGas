"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Flame,
  ClipboardCheck,
  Wrench,
  Hammer,
  CookingPot,
  HelpCircle,
  Upload,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { compressImage } from "@/lib/compress-image";
import { trackEvent } from "@/lib/analytics";

const SERVICES = [
  { value: "Boiler servicing", label: "Boiler servicing", icon: Flame },
  { value: "Landlord gas safety certificate (CP12)", label: "Gas safety certificate", icon: ClipboardCheck },
  { value: "Heating system repair", label: "Heating repair", icon: Wrench },
  { value: "Boiler or heating installation", label: "Boiler installation", icon: Hammer },
  { value: "Gas hob install", label: "Gas hob install", icon: CookingPot },
  { value: "Something else", label: "Something else", icon: HelpCircle },
];

const STEP_TITLES = ["What you need", "About the job", "Your details"];
const TOTAL = 3;

const labelCls = "block text-sm font-semibold text-ink";
const inputCls =
  "mt-1.5 w-full rounded-[var(--radius-md)] border border-border-strong bg-surface px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary";
const errCls = "mt-1 text-sm text-[#DC2626]";

// which step a server-side field error belongs to
const FIELD_STEP: Record<string, number> = {
  service: 1,
  postcode: 2,
  message: 2,
  photo: 2,
  name: 3,
  phone: 3,
  email: 3,
  consent: 3,
};

type Status = "idle" | "submitting" | "success" | "error";

export function HomeEnquiryForm() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const compressedPhotoRef = useRef<Promise<File> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const value = (name: string) =>
    (formRef.current?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value?.trim() ?? "";

  function pickService(v: string) {
    setService(v);
    setErrors((p) => ({ ...p, service: "" }));
    setStep(2);
  }

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setErrors((p) => ({ ...p, photo: "" }));
    if (!file) {
      setPhotoPreview(null);
      setPhotoName(null);
      compressedPhotoRef.current = null;
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, photo: "Please choose an image file." }));
      compressedPhotoRef.current = null;
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrors((p) => ({ ...p, photo: "That image is too large. Please pick one under 20MB." }));
      compressedPhotoRef.current = null;
      return;
    }
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoName(file.name);
    compressedPhotoRef.current = compressImage(file);
  }

  function clearPhoto() {
    setPhotoPreview(null);
    setPhotoName(null);
    compressedPhotoRef.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }

  function goNext() {
    if (step === 2) {
      if (!value("postcode")) {
        setErrors((p) => ({ ...p, postcode: "Please add your postcode." }));
        return;
      }
    }
    setStep((s) => Math.min(TOTAL, s + 1));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Enter on an earlier step advances rather than submits
    if (step < TOTAL) {
      goNext();
      return;
    }

    // validate final step
    const e3: Record<string, string> = {};
    if (!value("name")) e3.name = "Please add your name.";
    if (!value("phone")) e3.phone = "Please add a phone number.";
    if (!(formRef.current?.elements.namedItem("consent") as HTMLInputElement)?.checked)
      e3.consent = "Please tick to continue.";
    if (Object.keys(e3).length) {
      setErrors((p) => ({ ...p, ...e3 }));
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFormError(null);
    try {
      const data = new FormData(e.currentTarget);
      // Swap in the resized photo (if any) so we never blow Vercel's body limit.
      if (compressedPhotoRef.current) {
        try {
          const compressed = await compressedPhotoRef.current;
          data.set("photo", compressed);
        } catch {
          /* fall through with the original file in the form */
        }
      }
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        trackEvent("enquiry_submit", { form: "home_enquiry" });
        formRef.current?.reset();
        clearPhoto();
        setService("");
      } else if (json.errors) {
        setErrors(json.errors);
        setStatus("error");
        // jump to the earliest step with an error
        const firstStep = Math.min(
          ...Object.keys(json.errors).map((k) => FIELD_STEP[k] ?? TOTAL),
        );
        setStep(firstStep);
      } else {
        setFormError(json.error || "Something went wrong. Please call or WhatsApp me.");
        setStatus("error");
      }
    } catch {
      setFormError(`Something went wrong sending that. Please call or WhatsApp me on ${SITE.phoneDisplay}.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-bold">Thanks — I&apos;ve got your message.</h3>
        <p className="mx-auto mt-2 max-w-md text-muted">
          I&apos;ll be in touch shortly. Need me sooner? Call{" "}
          <a href={SITE.phoneHref} className="font-semibold text-primary">{SITE.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {/* progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-primary">Step {step} of {TOTAL}</span>
          <span className="text-muted">{STEP_TITLES[step - 1]}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-subtle">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <input type="hidden" name="service" value={service} />

      {/* STEP 1 — service */}
      <div className={step === 1 ? "" : "hidden"}>
        <h3 className="font-display text-lg font-semibold">What do you need?</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const on = service === s.value;
            return (
              <button
                type="button"
                key={s.value}
                onClick={() => pickService(s.value)}
                className={`flex items-center gap-3 rounded-[var(--radius-md)] border p-3.5 text-left transition-colors ${
                  on ? "border-primary bg-primary/5" : "border-border-strong hover:border-primary"
                }`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-md)] bg-sunken text-primary">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-ink">{s.label}</span>
              </button>
            );
          })}
        </div>
        {errors.service && <p className={errCls}>{errors.service}</p>}
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Phone className="h-4 w-4" aria-hidden /> Prefer to talk? Call{" "}
          <a href={SITE.phoneHref} className="font-semibold text-primary">{SITE.phoneDisplay}</a>
        </p>
      </div>

      {/* STEP 2 — job details */}
      <div className={step === 2 ? "" : "hidden"}>
        <h3 className="font-display text-lg font-semibold">About the job</h3>
        <div className="mt-4 space-y-5">
          <div>
            <label htmlFor="postcode" className={labelCls}>Postcode</label>
            <input id="postcode" name="postcode" autoComplete="postal-code" className={inputCls} aria-invalid={!!errors.postcode} />
            {errors.postcode && <p className={errCls}>{errors.postcode}</p>}
          </div>
          <div>
            <label htmlFor="message" className={labelCls}>
              Message <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className={inputCls}
              placeholder="Make/model of boiler, the problem, anything useful."
            />
          </div>
          {service === "Boiler servicing" && (
            <p className="rounded-[var(--radius-md)] border border-primary/20 bg-primary/5 px-3.5 py-2.5 text-sm leading-relaxed text-ink">
              <span className="font-semibold">New customer?</span> To claim the £85 first-service
              offer, please mention in your message that you&apos;re a new customer wanting the offer.
            </p>
          )}
          <div>
            <span className={labelCls}>
              Add a photo <span className="font-normal text-muted">(optional)</span>
            </span>
            {!photoPreview ? (
              <label
                htmlFor="photo"
                className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[var(--radius-lg)] border-2 border-dashed border-border-strong bg-sunken px-4 py-6 text-center transition-colors hover:border-primary"
              >
                <Upload className="h-6 w-6 text-primary" aria-hidden />
                <span className="text-sm font-medium text-ink">Tap to add a photo</span>
                <span className="text-xs text-muted">JPG or PNG, up to 10MB</span>
              </label>
            ) : (
              <div className="mt-2 flex items-center gap-3 rounded-[var(--radius-lg)] border border-border-subtle bg-sunken p-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                  <Image src={photoPreview} alt="Preview of the photo you added" fill className="object-cover" unoptimized />
                </div>
                <span className="flex-1 truncate text-sm text-ink">{photoName}</span>
                <button type="button" onClick={clearPhoto} className="grid h-9 w-9 place-items-center rounded-full hover:bg-border-subtle" aria-label="Remove photo">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            )}
            <input ref={fileRef} id="photo" name="photo" type="file" accept="image/*" onChange={onPhotoChange} className="sr-only" />
            {errors.photo && <p className={errCls}>{errors.photo}</p>}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
          <button type="button" onClick={goNext} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-pill)] bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            Continue <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* STEP 3 — contact details */}
      <div className={step === 3 ? "" : "hidden"}>
        <h3 className="font-display text-lg font-semibold">Your details</h3>
        <div className="mt-4 space-y-5">
          <div>
            <label htmlFor="name" className={labelCls}>Your name</label>
            <input id="name" name="name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} />
            {errors.name && <p className={errCls}>{errors.name}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={labelCls}>Phone number</label>
              <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.phone} />
              {errors.phone && <p className={errCls}>{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>
                Email <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} />
              {errors.email && <p className={errCls}>{errors.email}</p>}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input id="consent" name="consent" type="checkbox" value="yes" className="mt-1 h-5 w-5 shrink-0 rounded border-border-strong accent-[#2563eb]" />
            <label htmlFor="consent" className="text-sm text-muted">
              I&apos;m happy for JDH Gas to contact me about my enquiry. See our{" "}
              <a href="/privacy-policy" className="font-medium text-primary underline-offset-2 hover:underline">privacy policy</a>.
            </label>
          </div>
          {errors.consent && <p className={errCls}>{errors.consent}</p>}
        </div>

        {formError && (
          <p role="alert" className="mt-4 rounded-[var(--radius-md)] bg-[#FEECEC] px-4 py-3 text-sm text-[#DC2626]">{formError}</p>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-pill)] bg-primary px-6 text-sm font-semibold text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>
        </div>
      </div>
    </form>
  );
}
