/**
 * World backdrops. All drawn for a 1200 × 760 viewBox.
 */
import { motion } from 'framer-motion';
import { palette } from './characters.jsx';
import { Pendant, Plant } from './props.jsx';

export const VIEW_W = 1200;
export const VIEW_H = 760;
export const FLOOR_Y = 640;

/* ------------------------------------------------------------------ */
/* EXTERIOR — Rahul's Rasoi at golden hour                             */
/* ------------------------------------------------------------------ */

export function ExteriorSky() {
  return (
    <g>
      <defs>
        <linearGradient id="ext-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6D9B3" />
          <stop offset="1" stopColor="#FFF4E2" />
        </linearGradient>
      </defs>
      <rect x="-200" y="-100" width="1600" height="900" fill="url(#ext-sky)" />
      <circle cx="210" cy="250" r="90" fill="#F7B46A" opacity="0.55" />
      <circle cx="210" cy="250" r="58" fill="#F49A55" opacity="0.6" />
    </g>
  );
}

export function ExteriorCity() {
  return (
    <g fill="#EBCFAB">
      <rect x="-60" y="380" width="120" height="300" />
      <rect x="70" y="330" width="90" height="350" />
      <path d="M170 690 L170 420 Q215 360 260 420 L260 690 Z" />
      <rect x="205" y="330" width="20" height="40" />
      <rect x="1040" y="350" width="110" height="340" />
      <rect x="1150" y="300" width="120" height="390" />
      <path d="M1000 690 L1000 460 Q1030 420 1060 460 L1060 690 Z" />
      <g fill="#E2C29C">
        <rect x="-20" y="420" width="18" height="22" />
        <rect x="20" y="420" width="18" height="22" />
        <rect x="90" y="370" width="16" height="20" />
        <rect x="120" y="370" width="16" height="20" />
        <rect x="1180" y="340" width="18" height="22" />
        <rect x="1215" y="340" width="18" height="22" />
      </g>
    </g>
  );
}

export function ExteriorTrees() {
  return (
    <g>
      <g transform="translate(120 640)">
        <rect x="-8" y="-150" width="16" height="150" fill="#6E4A30" />
        <circle cx="0" cy="-190" r="70" fill="#2F6B4F" />
        <circle cx="-44" cy="-160" r="46" fill="#3D7F5E" />
        <circle cx="40" cy="-150" r="42" fill="#24584A" />
      </g>
      <g transform="translate(1120 640)">
        <rect x="-7" y="-120" width="14" height="120" fill="#6E4A30" />
        <circle cx="0" cy="-160" r="58" fill="#3D7F5E" />
        <circle cx="34" cy="-130" r="40" fill="#2F6B4F" />
      </g>
    </g>
  );
}

function ArchWindow({ x, y, w, h, fill = '#6F7569', lit, frame = palette.green }) {
  const r = w / 2;
  const d = `M${x} ${y + h} L${x} ${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} L${x + w} ${y + h} Z`;
  return (
    <g>
      <path d={d} fill={frame} />
      <path
        d={`M${x + 7} ${y + h} L${x + 7} ${y + r} A${r - 7} ${r - 7} 0 0 1 ${x + w - 7} ${y + r} L${x + w - 7} ${y + h} Z`}
        fill={fill}
      />
      {lit}
      <g stroke={frame} strokeWidth="4">
        <line x1={x + w / 2} y1={y + 8} x2={x + w / 2} y2={y + h} />
        <line x1={x + 7} y1={y + r + 20} x2={x + w - 7} y2={y + r + 20} />
      </g>
    </g>
  );
}

/**
 * Restaurant facade. `litStyle` (motion style) controls how bright the lights are.
 */
export function ExteriorBuilding({ litStyle, name = "RAHUL'S RASOI" }) {
  const warm = '#FFD98A';
  return (
    <g>
      {/* main block */}
      <rect x="380" y="200" width="640" height="440" fill="#FFF1DC" />
      <rect x="380" y="200" width="640" height="16" fill={palette.green} />
      {/* scalloped parapet */}
      <g fill={palette.green}>
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d={`M${380 + i * 40} 200 Q${400 + i * 40} 172 ${420 + i * 40} 200 Z`} />
        ))}
      </g>
      <rect x="640" y="140" width="120" height="40" rx="6" fill={palette.green} />
      <path d="M640 140 Q700 96 760 140 Z" fill={palette.green} />
      <circle cx="700" cy="120" r="7" fill={palette.lime} />

      {/* upper windows */}
      <ArchWindow x={430} y={230} w={90} h={110} fill="#7C8277" />
      <ArchWindow x={655} y={230} w={90} h={110} fill="#7C8277" />
      <ArchWindow x={880} y={230} w={90} h={110} fill="#7C8277" />
      <motion.g style={litStyle}>
        <ArchWindow x={430} y={230} w={90} h={110} fill={warm} />
        <ArchWindow x={655} y={230} w={90} h={110} fill={warm} />
        <ArchWindow x={880} y={230} w={90} h={110} fill={warm} />
      </motion.g>

      {/* sign board */}
      <rect x="470" y="362" width="460" height="64" rx="10" fill={palette.green} />
      <rect x="478" y="370" width="444" height="48" rx="7" fill="none" stroke="#D9A441" strokeWidth="2" />
      <text x="700" y="404" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="700" fontSize="30" letterSpacing="4" fill="#7E8C7F">
        {name}
      </text>
      <motion.text style={litStyle} x="700" y="404" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="700" fontSize="30" letterSpacing="4" fill={palette.lime}>
        {name}
      </motion.text>

      {/* awning */}
      <g>
        <rect x="400" y="440" width="600" height="38" fill={palette.cream} />
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={400 + i * 60} y="440" width="30" height="38" fill={palette.green} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <path key={i} d={`M${400 + i * 30} 478 Q${415 + i * 30} 496 ${430 + i * 30} 478 Z`} fill={i % 2 ? palette.cream : palette.green} />
        ))}
      </g>

      {/* ground floor windows */}
      <rect x="430" y="510" width="170" height="110" rx="8" fill={palette.green} />
      <rect x="438" y="518" width="154" height="94" rx="5" fill="#6F7569" />
      <rect x="800" y="510" width="170" height="110" rx="8" fill={palette.green} />
      <rect x="808" y="518" width="154" height="94" rx="5" fill="#6F7569" />
      <motion.g style={litStyle}>
        <rect x="438" y="518" width="154" height="94" rx="5" fill={warm} />
        <rect x="808" y="518" width="154" height="94" rx="5" fill={warm} />
        {/* diner silhouettes */}
        <g fill="#E2A85A">
          <circle cx="480" cy="560" r="12" />
          <rect x="466" y="572" width="28" height="40" rx="10" />
          <circle cx="550" cy="562" r="11" />
          <rect x="537" y="573" width="26" height="40" rx="10" />
          <rect x="455" y="590" width="120" height="8" rx="3" fill="#C98C46" />
          <circle cx="860" cy="560" r="12" />
          <rect x="846" y="572" width="28" height="40" rx="10" />
          <rect x="835" y="590" width="100" height="8" rx="3" fill="#C98C46" />
        </g>
      </motion.g>

      {/* door */}
      <path d="M640 640 L640 540 A60 60 0 0 1 760 540 L760 640 Z" fill={palette.green} />
      <path d="M650 640 L650 542 A50 50 0 0 1 750 542 L750 640 Z" fill="#5E645B" />
      <motion.path style={litStyle} d="M650 640 L650 542 A50 50 0 0 1 750 542 L750 640 Z" fill={warm} />
      <line x1="700" y1="494" x2="700" y2="640" stroke={palette.green} strokeWidth="4" />
      <rect x="626" y="636" width="148" height="8" fill="#9C8A6E" />

      {/* door lanterns */}
      {[612, 788].map((x) => (
        <g key={x} transform={`translate(${x} 520)`}>
          <rect x="-3" y="-20" width="6" height="14" fill="#3E3A33" />
          <path d="M-12 -6 L12 -6 L9 22 L-9 22 Z" fill="#3E3A33" />
          <motion.circle style={litStyle} cx="0" cy="8" r="26" fill="#FFD98A" opacity="0.35" />
          <rect x="-7" y="-2" width="14" height="20" rx="3" fill="#8A7E6A" />
          <motion.rect style={litStyle} x="-7" y="-2" width="14" height="20" rx="3" fill="#FFE7A8" />
        </g>
      ))}
    </g>
  );
}

/** Festive string lights between two posts. */
export function StringLights({ litStyle }) {
  const bulbs = [];
  const span = (x1, y1, x2, y2, sag, n) => {
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * sag;
      bulbs.push([x, y]);
    }
    return `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 2} ${x2} ${y2}`;
  };
  const a = span(240, 430, 400, 440, 30, 6);
  const b = span(1000, 440, 1160, 430, 30, 6);
  const colors = ['#FFE7A8', '#F9B27A', '#E6F7B8'];
  return (
    <g>
      <rect x="236" y="430" width="8" height="210" fill="#3E3A33" />
      <rect x="1156" y="430" width="8" height="210" fill="#3E3A33" />
      <path d={a} stroke="#3E3A33" strokeWidth="2" fill="none" />
      <path d={b} stroke="#3E3A33" strokeWidth="2" fill="none" />
      {bulbs.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 6} r="6" fill="#8A7E6A" />
          <motion.g style={litStyle}>
            <circle cx={x} cy={y + 6} r="16" fill={colors[i % 3]} opacity="0.35" />
            <circle cx={x} cy={y + 6} r="6" fill={colors[i % 3]} />
          </motion.g>
        </g>
      ))}
    </g>
  );
}

export function Street() {
  return (
    <g>
      <rect x="-200" y="640" width="1600" height="200" fill="#E7CFA8" />
      <rect x="-200" y="640" width="1600" height="10" fill="#D6BA90" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={-120 + i * 110} y="700" width="60" height="6" rx="3" fill="#D9BE94" />
      ))}
    </g>
  );
}

/** Outdoor café table with two chairs. Origin = floor centre. */
export function OutdoorTable() {
  return (
    <g>
      <rect x="-4" y="-80" width="8" height="80" fill="#3E3A33" />
      <ellipse cx="0" cy="-82" rx="54" ry="10" fill={palette.green} />
      <rect x="-30" y="-2" width="60" height="4" rx="2" fill="#3E3A33" />
      {[-80, 80].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect x="-20" y="-56" width="40" height="8" rx="3" fill={palette.orange} />
          <rect x={x < 0 ? -20 : 14} y="-110" width="6" height="58" rx="3" fill={palette.orange} />
          <rect x="-18" y="-48" width="4" height="48" fill="#3E3A33" />
          <rect x="14" y="-48" width="4" height="48" fill="#3E3A33" />
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* INTERIOR — the dining room (shared by scenes 2–6)                   */
/* ------------------------------------------------------------------ */

function JaliWindow({ x, w = 170 }) {
  const y = 96;
  const h = 300;
  const r = w / 2;
  const outer = `M${x} ${y + h} L${x} ${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} L${x + w} ${y + h} Z`;
  const inner = `M${x + 12} ${y + h} L${x + 12} ${y + r} A${r - 12} ${r - 12} 0 0 1 ${x + w - 12} ${y + r} L${x + w - 12} ${y + h} Z`;
  const clip = `jali-${x}`;
  return (
    <g>
      <path d={outer} fill={palette.green} />
      <clipPath id={clip}>
        <path d={inner} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={w} height={h} fill="#E4F2C9" />
        <circle cx={x + w * 0.3} cy={y + h * 0.75} r={60} fill="#B5D98A" />
        <circle cx={x + w * 0.8} cy={y + h * 0.82} r={70} fill="#9CCB74" />
        <g stroke="#FFF9EF" strokeWidth="3" fill="none" opacity="0.85">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={x + w / 2} cy={y + 20 + i * 38} r="19" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={`b${i}`} cx={x + w / 2 - 38} cy={y + 39 + i * 38} r="19" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={`c${i}`} cx={x + w / 2 + 38} cy={y + 39 + i * 38} r="19" />
          ))}
        </g>
      </g>
      <rect x={x - 10} y={y + h} width={w + 20} height="12" rx="4" fill="#0F2B23" />
    </g>
  );
}

function WallMotif({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="46" fill="none" stroke={palette.orange} strokeWidth="3" />
      <circle r="34" fill={palette.orange} opacity="0.14" />
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="0" cy="-26" rx="6" ry="13" fill={palette.orange} opacity="0.75" transform={`rotate(${i * 30})`} />
      ))}
      <circle r="9" fill={palette.green} />
    </g>
  );
}

/**
 * Interior dining room. Drawn 1500 wide so it can pan horizontally.
 * `glowStyle` controls the lamp glow (motion style).
 */
export function InteriorBackdrop({ glowStyle }) {
  return (
    <g>
      <rect x="-150" y="-20" width="1500" height="520" fill="#F7E8D0" />
      {/* subtle wall stripes */}
      <g fill="#F2DFC2">
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={-150 + i * 80} y="0" width="40" height="470" />
        ))}
      </g>
      <rect x="-150" y="-20" width="1500" height="36" fill={palette.green} />
      <JaliWindow x={40} />
      <JaliWindow x={515} />
      <JaliWindow x={990} />
      <WallMotif x={360} y={220} />
      <WallMotif x={835} y={220} />
      {/* shelf with pots */}
      <g transform="translate(300 330)">
        <rect x="-10" y="0" width="140" height="8" rx="3" fill="#8C5532" />
        <path d="M10 0 Q8 -30 26 -34 Q44 -30 42 0 Z" fill={palette.orange} />
        <path d="M56 0 L60 -40 L80 -40 L84 0 Z" fill="#E3B341" />
        <circle cx="108" cy="-16" r="16" fill={palette.green} />
      </g>
      {/* wainscot */}
      <rect x="-150" y="470" width="1500" height="170" fill={palette.green} />
      <rect x="-150" y="470" width="1500" height="8" fill="#D9A441" />
      <g fill="#1E4A3D">
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={-130 + i * 100} y="494" width="80" height="126" rx="6" />
        ))}
      </g>
      {/* floor */}
      <rect x="-150" y="640" width="1500" height="200" fill="#E9D3AE" />
      <g stroke="#DCC197" strokeWidth="3">
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={i} x1={-150 + i * 80} y1="640" x2={-260 + i * 90} y2="800" />
        ))}
        <line x1="-150" y1="690" x2="1350" y2="690" />
      </g>
      {/* lamps */}
      <motion.g style={glowStyle}>
        <g transform="translate(250 -10)"><Pendant drop={120} /></g>
        <g transform="translate(720 -10)"><Pendant drop={150} /></g>
        <g transform="translate(1180 -10)"><Pendant drop={120} /></g>
      </motion.g>
      <g transform="translate(1300 640)"><Plant scale={0.9} /></g>
      <g transform="translate(-60 640)"><Plant scale={0.9} flip /></g>
    </g>
  );
}
