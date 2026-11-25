/**
 * ============================================================
 *  BUSINESS CONTACT CONFIGURATION
 * ============================================================
 *  Edit ONLY the values below to connect the website to your
 *  real business details. Every button on the site reads from
 *  this file.
 *
 *  Any value that still starts with "REPLACE_" is treated as
 *  "not configured yet", and the site falls back safely:
 *    - WhatsApp  -> opens WhatsApp's "choose a chat" screen with
 *                   the prefilled message (no number attached)
 *    - Instagram -> opens instagram.com
 *    - Email     -> opens a blank email with the subject filled in
 *    - Demo      -> opens the built-in interactive demo on this site
 * ============================================================
 */

export const business = {
  // Your brand name, shown in the navbar, footer and page title text.
  businessName: 'MyQrMenu.',

  // Shown when businessName is not configured yet.
  fallbackName: 'QR Menu Studio',

  // Short line shown in the footer.
  tagline: 'Digital QR menus for restaurants, cafés, dhabas, hotels and bakeries across India.',

  // WhatsApp number with country code, digits only. Example format: 91 + 10-digit number.
  whatsappNumber: '9739606972',

  // Full Instagram profile URL, e.g. https://www.instagram.com/<your_handle>/
  instagramUrl: 'REPLACE_WITH_INSTAGRAM_URL',

  // Text shown for the Instagram link, e.g. @your_handle
  instagramLabel: 'REPLACE_WITH_INSTAGRAM_HANDLE',

  // Business email address.
  emailAddress: 'patilsagar2309@gmail.com',

  // (Client menus shown in the "Live client menus" section live in src/config/clients.js)
  demoUrls: [],

  // Default WhatsApp message.
  defaultWhatsappMessage:
    "Hi! I saw your website and I'm interested in a Digital QR Menu for my restaurant. Please share the details.",
};

/** True when a config value has not been filled in yet. */
export const isPlaceholder = (value) =>
  !value || String(value).trim() === '' || String(value).startsWith('REPLACE_');

export const brandName = () =>
  isPlaceholder(business.businessName) ? business.fallbackName : business.businessName;

/** Build a WhatsApp link with a prefilled message. */
export function whatsappLink(message = business.defaultWhatsappMessage) {
  const text = encodeURIComponent(message);
  if (isPlaceholder(business.whatsappNumber)) {
    return `https://wa.me/?text=${text}`;
  }
  const number = String(business.whatsappNumber).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${text}`;
}

export function instagramLink() {
  return isPlaceholder(business.instagramUrl) ? 'https://www.instagram.com/' : business.instagramUrl;
}

export function instagramLabel() {
  return isPlaceholder(business.instagramLabel) ? 'Follow us on Instagram' : business.instagramLabel;
}

export function emailLink(subject = 'Digital QR Menu enquiry') {
  const s = encodeURIComponent(subject);
  const body = encodeURIComponent(
    'Hi,\n\nI would like to know more about a Digital QR Menu for my restaurant.\n\nRestaurant name:\nCity:\nApprox. number of menu items:\n\nThanks!'
  );
  const to = isPlaceholder(business.emailAddress) ? '' : business.emailAddress;
  return `mailto:${to}?subject=${s}&body=${body}`;
}

export function emailLabel() {
  return isPlaceholder(business.emailAddress) ? 'Send us an email' : business.emailAddress;
}

/** Configured live demo links (placeholders removed). */
export function liveDemos() {
  return business.demoUrls.filter((d) => !isPlaceholder(d.url));
}
