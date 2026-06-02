import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const MAX_PHOTO_BYTES = 10 * 1024 * 1024; // 10MB
const UK_PHONE = /^(\+?44\s?7\d{3}|07\d{3})\s?\d{3}\s?\d{3}$/;

function clean(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields.
  if (clean(form.get("company"))) {
    return NextResponse.json({ ok: true }); // silently accept, drop
  }

  const name = clean(form.get("name"));
  const phone = clean(form.get("phone"));
  const email = clean(form.get("email"));
  const postcode = clean(form.get("postcode"));
  const service = clean(form.get("service"));
  const message = clean(form.get("message"));
  const consent = clean(form.get("consent"));

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!UK_PHONE.test(phone.replace(/\s/g, ""))) errors.phone = "Please enter a valid UK phone number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!postcode) errors.postcode = "Please enter your postcode.";
  if (!service) errors.service = "Please choose a service.";
  if (!consent) errors.consent = "Please tick the box so I can reply to you.";

  const photo = form.get("photo");
  let photoMeta: { name: string; type: string; size: number } | null = null;
  if (photo && photo instanceof File && photo.size > 0) {
    if (!photo.type.startsWith("image/")) errors.photo = "Please upload an image file.";
    else if (photo.size > MAX_PHOTO_BYTES) errors.photo = "That image is too large (max 10MB).";
    else photoMeta = { name: photo.name, type: photo.type, size: photo.size };
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const summary = [
    `New enquiry — JDH Gas`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "—"}`,
    `Postcode: ${postcode}`,
    `Service: ${service}`,
    `Message: ${message || "—"}`,
    photoMeta ? `Photo attached: ${photoMeta.name} (${Math.round(photoMeta.size / 1024)}KB)` : `Photo: none`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const attachments: { filename: string; content: string }[] = [];
      if (photo instanceof File && photoMeta) {
        const buf = Buffer.from(await photo.arrayBuffer());
        attachments.push({ filename: photoMeta.name, content: buf.toString("base64") });
      }
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "JDH Gas Website <enquiries@jdhgas.co.uk>",
          to: [process.env.CONTACT_TO_EMAIL || SITE.email],
          reply_to: email || undefined,
          subject: `New enquiry: ${service} — ${name} (${postcode})`,
          text: summary,
          attachments: attachments.length ? attachments : undefined,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch (e) {
      console.error("[contact] email send failed:", e);
      return NextResponse.json(
        { ok: false, error: "Sorry, something went wrong sending that. Please call or WhatsApp me." },
        { status: 502 }
      );
    }
  } else {
    // No email provider wired yet — log so the submission isn't lost in dev.
    console.log("[contact] enquiry received (RESEND_API_KEY not set):\n" + summary);
  }

  return NextResponse.json({ ok: true });
}
