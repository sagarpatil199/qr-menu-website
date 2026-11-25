/**
 * Pricing packages. All prices are ONE-TIME setup prices.
 * Set `recommended: true` on the package you want highlighted.
 */
export const packages = [
  {
    id: 'basic',
    name: 'Basic',
    price: 699,
    tagline: 'A clean digital menu to get started.',
    features: [
      'Digital QR Menu',
      'Up to 30 menu items',
      'Restaurant name and logo',
      'Categories and prices',
      'Mobile-friendly website',
      'QR Code',
      'One-time setup',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 999,
    recommended: true,
    tagline: 'Photos, branding and one-tap contact buttons.',
    features: [
      'Everything in Basic',
      'Up to 80 menu items',
      'Food photographs',
      'Custom branding',
      'WhatsApp button',
      'Call button',
      'Google Maps',
      'Google Review button',
      'Custom QR design',
      '3 months free updates',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1499,
    tagline: 'The full premium experience, table to review.',
    features: [
      'Everything in Standard',
      '100+ menu items',
      'Premium design',
      'Custom QR stand/card',
      'Google Review QR',
      '1 year updates',
      'Priority support',
    ],
  },
];

export const formatINR = (n) => '₹' + n.toLocaleString('en-IN');

export const packageMessage = (pkg) =>
  `Hi! I'm interested in the ${pkg.name} Digital QR Menu package (${formatINR(pkg.price)} one-time setup). Please share the next steps.`;
