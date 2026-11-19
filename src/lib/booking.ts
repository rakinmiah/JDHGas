// Online booking runs on Jamie's QuoteLion account (the "BookLion" widget by
// GrowthLion / Off The Tools Ltd). Only the annual boiler service is publicly
// bookable there; every other job still comes through call, WhatsApp or the
// enquiry form. Pricing, arrival windows and the business name shown in the
// widget are all set in QuoteLion, not here.

// The canonical host, as configured in QuoteLion's own embed script
// (quotelion.co.uk/widget/booklion.js). www also serves, but messages from the
// widget are checked against this exact origin.
export const BOOKING_ORIGIN = "https://quotelion.co.uk";

/** The standalone booking page (fallback link, opens in a new tab). */
export const BOOKING_PAGE_URL = `${BOOKING_ORIGIN}/book/jdhgasservices`;

/** The same page in embed mode, for the iframe on /book. */
export const BOOKING_EMBED_URL = `${BOOKING_PAGE_URL}?embed=1`;

/** Our own booking page, which every "Book online" CTA points to. */
export const BOOK_HREF = "/book";
