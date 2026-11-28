/** Public Google reviews listing for JDH Gas — shown wherever reviews appear. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=JDH+Gas+Services+Burgess+Hill+reviews";

/**
 * Homepage reviews, chosen by hand (27 Nov 2026) from JDH's Google Business
 * Profile: strong five-star reviews that speak about the business without
 * naming Jamie (the site's business-first voice). Text is copied word for
 * word from Google Maps, spelling and spacing included; never edit it.
 * Of 115 reviews then, 34 had text that didn't name Jamie.
 *
 * `photo` is the reviewer's own Google profile picture (only where they have
 * one; Google-generated letter avatars fall back to our initials). Google
 * hosts these, so one can stop loading if the reviewer changes their photo.
 */
export const FEATURED_REVIEWS: { name: string; text: string; photo?: string }[] = [
  {
    name: "Ajai Fel",
    text: "Truly helpful, in technical expertise and willingness to follow up on issues. Prompt. I will be recommending the business for any future boiler work",
    // Their Google picture is fantasy artwork, so the card shows an initial.
  },
  {
    name: "Ian A",
    text: "All good. Boiler service and replacement of some radiator valves done effectively. Tidy, quick work. Thank you.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjV2caRM00xFrITdCHeKpVFRMbPXHyEy2kYpUdJ-4tjSpVpD393E=s96-c",
  },
  {
    name: "Andrea",
    text: "Amazing service!! Highly recommend. Managed to get the parts and came back to me within 24hrs. Will definitely use again!",
  },
  {
    name: "robert newcomb",
    text: "Excellent communication, finished the job quickly and efficiently and in line with the quotation.",
  },
];

/**
 * Reviews with the reviewer's own real photo, chosen for impact (27 Nov 2026,
 * direction R2): detailed, convincing five-star reviews. These name Jamie, as
 * customers naturally do; Rakin chose impact and real photos over the
 * no-Jamie rule for this set. Word for word from Google Maps (line breaks are
 * the reviewer's own). Suriani Hulbert is the Horsham-confirmed review.
 */
export const PHOTO_REVIEWS: { name: string; text: string; photo: string }[] = [
  {
    name: "Suriani Hulbert",
    text: "Excellent service. Jamie carried out a very thorough inspection and identified issue with our external water flow that had been missed by four previous engineers during their annual services. Professional and meticulous throughout. Highly recommend.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjV1jIff4a2bkLoJh56MYOqugmJ3_NPDlwDx4UYGhi_RqAxR8KJr=s96-c",
  },
  {
    name: "Nicole Wood",
    text: "Jamie completed a boiler service and notified me of a leak. He contacted the cover provider and got authorisation to proceed with the work which he was able to do straight away. He was very friendly and professional, I wouldn't hesitate to use him again or recommend to others.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjW7Je_JpV_3rKK0bE6tzrHH6Ls0FFS3J1hD28utvgli0eCUGOJd=s96-c",
  },
  {
    name: "Sabrina Edwards",
    text: "Jamie was excellent, did a very thorough job with our boiler service & even had an unexpected replacement part to hand right away! We recommend him highly & will call him first for any issues with our system.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjUExPJ40BmBqPpUY8D9cx5B1O64g9VXeAP5Tp0noSzaPXULnHBs=s96-c",
  },
  {
    name: "Eleanor de Beaulieu",
    text: "Jamie had excellent communication advising us about the issue we had , even before he was able to get to us.\nHe worked quickly and efficiently to solve our problem.\nHe was very polite and explained everything he had done. Thank you so much!",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjW1_oL4ejexRPEXHt06n8Zn5g1q3DtsX7taNaXHgPp1qiSlKr8=s96-c",
  },
  {
    // Fifth card: covers the gas certificate (CP12) as well as servicing.
    name: "Jeff Brockett",
    text: "Jamie did boiler service and gas certificate.\nEfficient and thorough with the service and explained everything well. Jamie is very well mannered and I am more than happy to recommend.",
    photo: "https://lh3.googleusercontent.com/a-/ALV-UjWo1iDl1RRVyilCKNmQOT7IHoCkDSVWyAyX3YhLcLeBVLHLfL2sYQ=s96-c",
  },
];
