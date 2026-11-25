/** Brand mark: a QR "finder" corner that doubles as a plate with a leaf. */
export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill="#173D32" />
      <rect x="12" y="12" width="18" height="18" rx="5" fill="none" stroke="#C5F36A" strokeWidth="4" />
      <rect x="18" y="18" width="6" height="6" rx="1.5" fill="#C5F36A" />
      <rect x="36" y="12" width="6" height="6" rx="1.5" fill="#FFF9EF" />
      <rect x="46" y="12" width="6" height="6" rx="1.5" fill="#FFF9EF" />
      <rect x="12" y="36" width="6" height="6" rx="1.5" fill="#FFF9EF" />
      <rect x="12" y="46" width="6" height="6" rx="1.5" fill="#FFF9EF" />
      <circle cx="42" cy="42" r="11" fill="#F28C45" />
      <path d="M36 44 Q42 32 50 36 Q46 46 36 44 Z" fill="#C5F36A" />
    </svg>
  );
}
