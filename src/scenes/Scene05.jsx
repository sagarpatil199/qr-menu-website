import { motion, useTransform } from 'framer-motion';
import { FoodTile, Sparkle } from '../assets/illustrations/props.jsx';
import SmartphoneMockup from '../components/SmartphoneMockup.jsx';
import { SceneCanvas } from './SceneCanvas.jsx';

const FLOATERS = [
  { kind: 'biryani', x: 150, y: 110, s: 120, d: -60 },
  { kind: 'dosa', x: 110, y: 470, s: 104, d: -110 },
  { kind: 'paneer', x: 950, y: 90, s: 112, d: -80 },
  { kind: 'thali', x: 980, y: 470, s: 124, d: -130 },
];

function Floater({ p, kind, x, y, s, d, i }) {
  const fy = useTransform(p, [0, 1], [40, d]);
  const op = useTransform(p, [0.26 + i * 0.03, 0.36 + i * 0.03], [0, 1]);
  const rot = useTransform(p, [0, 1], [i % 2 ? -8 : 8, i % 2 ? 4 : -4]);
  return (
    <motion.g style={{ y: fy, opacity: op }}>
      <g transform={`translate(${x + s / 2} ${y + s / 2})`}>
        <motion.g style={{ rotate: rot }}>
          <rect x={-s / 2 - 8} y={-s / 2 - 8} width={s + 16} height={s + 16} rx="22" fill="#FFFFFF" />
          <FoodTile kind={kind} x={-s / 2} y={-s / 2} size={s} r={16} />
        </motion.g>
      </g>
    </motion.g>
  );
}

const CALLOUTS = [
  { text: 'Menu categories', side: 'left', top: '33%', at: 0.18 },
  { text: 'Food photos', side: 'left', top: '55%', at: 0.3 },
  { text: 'Descriptions & prices', side: 'right', top: '44%', at: 0.36 },
];

function Callout({ p, text, side, top, at }) {
  const op = useTransform(p, [at, at + 0.08], [0, 1]);
  const x = useTransform(p, [at, at + 0.08], [side === 'left' ? -16 : 16, 0]);
  return (
    <motion.span className={`callout callout--${side}`} style={{ opacity: op, x, top }}>
      {text}
    </motion.span>
  );
}

/**
 * SCENE 05 — Explore.
 * A large, realistic phone shows the actual sample menu loading and scrolling.
 */
export default function Scene05({ p, standalone = false }) {
  const phoneY = useTransform(p, [0, 0.12], ['8%', '0%']);
  const glow = useTransform(p, [0, 0.2], [0.12, 0.3]);
  return (
    <SceneCanvas
      standalone={standalone}
      tint={0}
      className="scene05"
      label="A smartphone showing the sample digital menu with categories, food photos, descriptions and prices."
      html={
        <>
          <motion.div className="scene05__phone" style={{ y: phoneY }}>
            <SmartphoneMockup progress={p} />
          </motion.div>
          {CALLOUTS.map((c) => (
            <Callout key={c.text} p={p} {...c} />
          ))}
        </>
      }
    >
      <rect x="-20" y="-20" width="1240" height="800" fill="#FFF9EF" opacity="0.72" />
      <motion.circle cx="600" cy="390" r="330" fill="#C5F36A" style={{ opacity: glow }} />
      <circle cx="600" cy="390" r="250" fill="#FFF9EF" />
      {FLOATERS.map((f, i) => (
        <Floater key={f.kind} p={p} i={i} {...f} />
      ))}
      <g transform="translate(860 330)"><Sparkle size={16} color="#F28C45" /></g>
      <g transform="translate(330 640)"><Sparkle size={20} /></g>
    </SceneCanvas>
  );
}
