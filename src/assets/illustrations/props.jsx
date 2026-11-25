/**
 * Shared SVG props: QR code, printed menus, phone, tables, counter and food art.
 */
import { palette } from './characters.jsx';

/* ------------------------------------------------------------------ */
/* QR code (decorative, deterministic pattern)                         */
/* ------------------------------------------------------------------ */
const QR_N = 21;
const qrModules = (() => {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const inFinder = (x, y) =>
    (x < 8 && y < 8) || (x > QR_N - 9 && y < 8) || (x < 8 && y > QR_N - 9);
  const cells = [];
  for (let y = 0; y < QR_N; y++) {
    for (let x = 0; x < QR_N; x++) {
      if (inFinder(x, y)) continue;
      if (y === 6 || x === 6) {
        if ((x + y) % 2 === 0) cells.push([x, y]);
        continue;
      }
      if (rnd() > 0.52) cells.push([x, y]);
    }
  }
  return cells;
})();

function Finder({ x, y, fg, bg }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" rx="1.4" fill={fg} />
      <rect x="1" y="1" width="5" height="5" rx="1" fill={bg} />
      <rect x="2" y="2" width="3" height="3" rx="0.6" fill={fg} />
    </g>
  );
}

/** QR code drawn in a size×size box at (x,y). */
export function QRCode({ x = 0, y = 0, size = 100, fg = palette.green, bg = '#FFFFFF', pad = 2 }) {
  const total = QR_N + pad * 2;
  const s = size / total;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect width={total} height={total} rx="2" fill={bg} />
      <g transform={`translate(${pad} ${pad})`}>
        {qrModules.map(([cx, cy]) => (
          <rect key={`${cx}-${cy}`} x={cx + 0.06} y={cy + 0.06} width="0.88" height="0.88" rx="0.22" fill={fg} />
        ))}
        <Finder x={0} y={0} fg={fg} bg={bg} />
        <Finder x={QR_N - 7} y={0} fg={fg} bg={bg} />
        <Finder x={0} y={QR_N - 7} fg={fg} bg={bg} />
      </g>
    </g>
  );
}

/** Standalone <svg> QR for HTML usage. */
export function QRCodeSvg({ size = 120, fg = palette.green, bg = '#fff', title = 'QR code' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={title}>
      <QRCode size={100} fg={fg} bg={bg} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Table QR standee                                                     */
/* ------------------------------------------------------------------ */
export function QRStandee({ scale = 1 }) {
  return (
    <g transform={`scale(${scale})`}>
      <path d="M-30 0 L-24 -86 L24 -86 L30 0 Z" fill={palette.green} />
      <rect x="-20" y="-80" width="40" height="10" rx="2" fill={palette.lime} />
      <QRCode x={-19} y={-66} size={38} fg={palette.green} bg="#fff" pad={1} />
      <rect x="-16" y="-24" width="32" height="4" rx="2" fill="#FFF9EF" opacity="0.8" />
      <rect x="-11" y="-16" width="22" height="3" rx="1.5" fill="#FFF9EF" opacity="0.5" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Printed paper menu                                                   */
/* ------------------------------------------------------------------ */
export function PaperMenu({ w = 74, h = 100, tone = '#FFFDF7', worn = false }) {
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" fill={tone} stroke="#D9CBB0" strokeWidth="1.5" />
      <rect x={-w / 2 + 10} y={-h / 2 + 10} width={w - 20} height="7" rx="2" fill={worn ? '#B9A88A' : palette.green} opacity={worn ? 0.7 : 1} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={-w / 2 + 10} y={-h / 2 + 26 + i * 11} width={w * 0.45} height="3.6" rx="1.8" fill="#BDB09A" />
          <rect x={w / 2 - 22} y={-h / 2 + 26 + i * 11} width="12" height="3.6" rx="1.8" fill="#CDA27C" />
        </g>
      ))}
      {worn && (
        <>
          <circle cx={w / 2 - 14} cy={h / 2 - 16} r="9" fill="#E3C79A" opacity="0.6" />
          <path d={`M${-w / 2} ${h / 2 - 20} L${-w / 2 + 14} ${h / 2} `} stroke="#D9CBB0" strokeWidth="1.5" />
        </>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Furniture                                                            */
/* ------------------------------------------------------------------ */

/** Restaurant counter. Origin = top-left of the counter top. */
export function Counter({ w = 560, h = 176 }) {
  return (
    <g>
      <rect x="0" y="10" width={w} height={h - 10} fill="#B9784A" />
      {Array.from({ length: Math.floor(w / 92) }).map((_, i) => (
        <rect key={i} x={18 + i * 92} y="32" width="74" height={h - 52} rx="6" fill="#A86A3F" />
      ))}
      <rect x="0" y={h - 14} width={w} height="14" fill="#8C5532" />
      <rect x="-14" y="-4" width={w + 28} height="18" rx="4" fill={palette.charcoal} />
      <rect x="-14" y="-4" width={w + 28} height="5" rx="2" fill="#4A524C" />
    </g>
  );
}

/** Dining table seen from the front. Origin = centre of table top. */
export function DiningTable({ w = 480 }) {
  return (
    <g>
      <rect x={-w / 2 + 40} y="16" width="22" height="120" fill="#7C4C2E" />
      <rect x={w / 2 - 62} y="16" width="22" height="120" fill="#7C4C2E" />
      <rect x={-w / 2} y="-6" width={w} height="26" rx="6" fill="#9A6036" />
      <rect x={-w / 2 + 10} y="-12" width={w - 20} height="12" rx="4" fill="#F6EEDF" />
      <path d={`M${-w / 2 + 10} -2 L${w / 2 - 10} -2`} stroke={palette.orange} strokeWidth="3" />
    </g>
  );
}

/** A chair back that peeks from behind seated customers. */
export function ChairBack({ x = 0 }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="-48" y="-170" width="96" height="170" rx="20" fill="#2C5B4D" />
      <rect x="-36" y="-156" width="72" height="140" rx="14" fill="#24584A" />
    </g>
  );
}

/** Potted plant. Origin = base of pot. */
export function Plant({ scale = 1, flip = false }) {
  return (
    <g transform={`scale(${flip ? -scale : scale} ${scale})`}>
      <g fill="#2F6B4F">
        <path d="M0 -60 C-40 -90 -50 -150 -30 -190 C-10 -150 -6 -100 0 -60 Z" />
        <path d="M0 -60 C30 -100 60 -130 70 -180 C40 -160 14 -120 0 -60 Z" fill="#3D7F5E" />
        <path d="M0 -60 C-10 -110 0 -160 20 -210 C26 -160 16 -110 0 -60 Z" fill="#24584A" />
        <path d="M0 -60 C-30 -80 -70 -90 -90 -120 C-50 -120 -20 -100 0 -60 Z" fill="#3D7F5E" />
      </g>
      <path d="M-34 -64 L34 -64 L26 0 L-26 0 Z" fill={palette.orange} />
      <rect x="-38" y="-72" width="76" height="12" rx="4" fill={palette.orangeDeep} />
    </g>
  );
}

/** Hanging pendant lamp. Origin = ceiling point. `glow` element gets animated. */
export function Pendant({ drop = 130, glowOpacity = 1 }) {
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2={drop} stroke="#3E3A33" strokeWidth="2" />
      <circle cx="0" cy={drop + 34} r="70" fill="#FFD98A" opacity={0.28 * glowOpacity} />
      <path d={`M-30 ${drop + 30} Q-28 ${drop} 0 ${drop} Q28 ${drop} 30 ${drop + 30} Z`} fill={palette.green} />
      <ellipse cx="0" cy={drop + 30} rx="30" ry="5" fill="#0F2B23" />
      <circle cx="0" cy={drop + 34} r="8" fill="#FFE7A8" opacity={0.4 + 0.6 * glowOpacity} />
    </g>
  );
}

/** Little four-point sparkle. */
export function Sparkle({ size = 14, color = palette.lime }) {
  const s = size;
  return (
    <path
      d={`M0 ${-s} Q${s * 0.18} ${-s * 0.18} ${s} 0 Q${s * 0.18} ${s * 0.18} 0 ${s} Q${-s * 0.18} ${s * 0.18} ${-s} 0 Q${-s * 0.18} ${-s * 0.18} 0 ${-s} Z`}
      fill={color}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Food illustrations (used as "photos" in the digital menu)            */
/* ------------------------------------------------------------------ */
const FOOD_BG = {
  biryani: '#F7E2C2',
  paneer: '#F9DCC8',
  dosa: '#F5E7C8',
  thali: '#E4EED8',
  samosa: '#F7E0C4',
  lassi: '#E8EEF3',
  chai: '#F2E2D0',
  gulab: '#F4DDD6',
};

function FoodShapes({ kind }) {
  switch (kind) {
    case 'biryani':
      return (
        <g>
          <ellipse cx="50" cy="66" rx="38" ry="12" fill="#E9E4DA" />
          <path d="M16 62 Q18 34 50 30 Q82 34 84 62 Z" fill="#E8A33D" />
          <path d="M22 60 Q30 44 50 42 Q70 44 78 60 Z" fill="#F2C063" />
          {[[34, 48], [50, 40], [64, 50], [44, 54], [58, 58], [38, 58]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill={i % 2 ? '#F7E1A0' : '#D9822B'} />
          ))}
          <circle cx="46" cy="36" r="3" fill="#4C9A3E" />
          <circle cx="60" cy="42" r="2.6" fill="#4C9A3E" />
          <path d="M70 34 L78 26" stroke="#B5462A" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case 'paneer':
      return (
        <g>
          <ellipse cx="50" cy="60" rx="38" ry="22" fill="#2E3530" />
          <ellipse cx="50" cy="56" rx="34" ry="18" fill="#D2531F" />
          <ellipse cx="50" cy="54" rx="28" ry="13" fill="#E9742E" />
          {[[36, 52], [50, 48], [62, 54], [46, 60]].map(([x, y], i) => (
            <rect key={i} x={x - 6} y={y - 5} width="12" height="10" rx="2" fill="#FFF4DC" />
          ))}
          <path d="M40 46 Q50 42 58 46" stroke="#FFF9EF" strokeWidth="2.4" fill="none" opacity="0.8" />
          <circle cx="66" cy="46" r="2.6" fill="#4C9A3E" />
        </g>
      );
    case 'dosa':
      return (
        <g>
          <ellipse cx="50" cy="64" rx="42" ry="14" fill="#E9E4DA" />
          <path d="M10 62 Q50 38 90 50 L88 60 Q50 54 12 68 Z" fill="#D99A3A" />
          <path d="M14 62 Q50 44 86 52" stroke="#B9772A" strokeWidth="2" fill="none" />
          <circle cx="26" cy="34" r="10" fill="#E6C24A" />
          <circle cx="76" cy="32" r="9" fill="#F3F1E6" />
          <circle cx="76" cy="32" r="5" fill="#7FB45A" opacity="0.7" />
        </g>
      );
    case 'thali':
      return (
        <g>
          <circle cx="50" cy="52" r="40" fill="#C9CED0" />
          <circle cx="50" cy="52" r="36" fill="#E3E7E8" />
          <circle cx="33" cy="38" r="10" fill="#E6B84A" />
          <circle cx="56" cy="30" r="9" fill="#D2531F" />
          <circle cx="72" cy="46" r="9" fill="#7DB04E" />
          <ellipse cx="44" cy="64" rx="14" ry="9" fill="#FFF8EA" />
          <circle cx="68" cy="66" r="8" fill="#9B4B2A" />
          <path d="M22 56 Q30 50 36 58" stroke="#E2B36C" strokeWidth="7" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'samosa':
      return (
        <g>
          <ellipse cx="50" cy="68" rx="40" ry="12" fill="#E9E4DA" />
          <path d="M18 66 L36 26 L54 66 Z" fill="#D99A3A" />
          <path d="M46 66 L64 30 L82 66 Z" fill="#E6AE4D" />
          <path d="M26 58 L36 36" stroke="#B9772A" strokeWidth="2" />
          <circle cx="78" cy="38" r="7" fill="#5BA346" />
        </g>
      );
    case 'lassi':
      return (
        <g>
          <path d="M32 24 L68 24 L62 82 L38 82 Z" fill="#FFFFFF" opacity="0.9" />
          <path d="M34 34 L66 34 L62 80 L38 80 Z" fill="#FBF0D6" />
          <ellipse cx="50" cy="30" rx="18" ry="6" fill="#FFF8E7" />
          <circle cx="44" cy="28" r="2" fill="#E3B341" />
          <circle cx="54" cy="27" r="2" fill="#4C9A3E" />
        </g>
      );
    case 'chai':
      return (
        <g>
          <ellipse cx="50" cy="74" rx="32" ry="8" fill="#E9E4DA" />
          <path d="M30 40 L70 40 L66 72 L34 72 Z" fill="#F6F1E6" />
          <path d="M70 46 Q82 48 80 58 Q78 66 68 64" stroke="#F6F1E6" strokeWidth="5" fill="none" />
          <ellipse cx="50" cy="42" rx="20" ry="5" fill="#B7794A" />
          <g stroke="#B79E86" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.7">
            <path d="M44 32 Q40 24 46 16" />
            <path d="M56 32 Q52 22 58 14" />
          </g>
        </g>
      );
    case 'gulab':
    default:
      return (
        <g>
          <ellipse cx="50" cy="62" rx="36" ry="18" fill="#F6F1E6" />
          <ellipse cx="50" cy="58" rx="30" ry="12" fill="#D9A65B" opacity="0.6" />
          <circle cx="40" cy="54" r="11" fill="#7A3A1E" />
          <circle cx="60" cy="54" r="11" fill="#86411F" />
          <circle cx="37" cy="50" r="3" fill="#A65A33" />
          <circle cx="57" cy="50" r="3" fill="#A65A33" />
        </g>
      );
  }
}

/** Food "photo" as an <svg>, usable in HTML. */
export function FoodArt({ kind = 'biryani', className, title }) {
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" role="img" aria-label={title || kind}>
      <rect width="100" height="100" fill={FOOD_BG[kind] || '#F5E7C8'} />
      <circle cx="82" cy="16" r="22" fill="#FFFFFF" opacity="0.35" />
      <FoodShapes kind={kind} />
    </svg>
  );
}

/** Food art for use inside an existing SVG. */
export function FoodTile({ kind, x = 0, y = 0, size = 100, r = 14 }) {
  const id = `ft-${kind}-${Math.round(x)}-${Math.round(y)}`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={id}>
        <rect width={size} height={size} rx={r} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <g transform={`scale(${size / 100})`}>
          <rect width="100" height="100" fill={FOOD_BG[kind]} />
          <FoodShapes kind={kind} />
        </g>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* SVG phone with a tiny menu UI                                        */
/* ------------------------------------------------------------------ */
export function MiniMenuScreen({ w, h }) {
  return (
    <g>
      <rect width={w} height={h} fill="#FFF9EF" />
      <rect width={w} height={h * 0.2} fill={palette.green} />
      <circle cx={w * 0.18} cy={h * 0.1} r={w * 0.08} fill={palette.lime} />
      <rect x={w * 0.32} y={h * 0.075} width={w * 0.48} height={h * 0.025} rx="2" fill="#FFF9EF" />
      <rect x={w * 0.32} y={h * 0.115} width={w * 0.3} height={h * 0.018} rx="2" fill="#9FC2B3" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={w * 0.06 + i * w * 0.3} y={h * 0.23} width={w * 0.26} height={h * 0.045} rx={h * 0.022} fill={i === 0 ? palette.orange : '#EDE3D1'} />
      ))}
      {['biryani', 'paneer', 'dosa'].map((k, i) => (
        <g key={k}>
          <FoodTile kind={k} x={w * 0.06} y={h * 0.31 + i * h * 0.22} size={w * 0.3} r={6} />
          <rect x={w * 0.42} y={h * 0.33 + i * h * 0.22} width={w * 0.46} height={h * 0.03} rx="2" fill="#202820" />
          <rect x={w * 0.42} y={h * 0.38 + i * h * 0.22} width={w * 0.36} height={h * 0.02} rx="2" fill="#BDB09A" />
          <rect x={w * 0.42} y={h * 0.43 + i * h * 0.22} width={w * 0.18} height={h * 0.03} rx="2" fill={palette.orange} />
        </g>
      ))}
    </g>
  );
}

/** A phone frame. Origin = top-left. Pass the screen as children (drawn in a clipped box). */
export function PhoneFrame({ w = 220, h = 440, children, id = 'phone' }) {
  const bez = w * 0.05;
  return (
    <g>
      <rect x="6" y="10" width={w} height={h} rx={w * 0.14} fill="#000" opacity="0.14" />
      <rect width={w} height={h} rx={w * 0.14} fill="#151917" />
      <rect x="2" y="2" width={w - 4} height={h - 4} rx={w * 0.13} fill="#262B28" />
      <clipPath id={`${id}-clip`}>
        <rect x={bez} y={bez} width={w - bez * 2} height={h - bez * 2} rx={w * 0.1} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <g transform={`translate(${bez} ${bez})`}>{children}</g>
      </g>
      <rect x={w / 2 - w * 0.14} y={bez + 6} width={w * 0.28} height={w * 0.07} rx={w * 0.035} fill="#151917" />
    </g>
  );
}
