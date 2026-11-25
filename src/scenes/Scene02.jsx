import { motion, useTransform } from 'framer-motion';
import { Rahul } from '../assets/illustrations/characters.jsx';
import { Counter, FoodTile, PaperMenu } from '../assets/illustrations/props.jsx';
import { SceneCanvas } from './SceneCanvas.jsx';

/** Paper menus that rain down and pile up, each on its own slice of the timeline. */
const FALLING_MENUS = [
  { x: 360, y: 430, r: -8, at: 0.04 },
  { x: 396, y: 424, r: 6, at: 0.1 },
  { x: 372, y: 416, r: -2, at: 0.16 },
  { x: 836, y: 430, r: 7, at: 0.12 },
  { x: 806, y: 422, r: -9, at: 0.2 },
  { x: 832, y: 412, r: 3, at: 0.26 },
  { x: 250, y: 560, r: -18, at: 0.3 },
  { x: 950, y: 580, r: 16, at: 0.34 },
];

function FallingMenu({ p, x, y, r, at, fade }) {
  const ty = useTransform(p, [at, at + 0.1], [-560, 0]);
  const rot = useTransform(p, [at, at + 0.1], [r * 5, r]);
  const op = useTransform(p, [at, at + 0.03], [0, 1]);
  return (
    <motion.g style={{ opacity: fade }}>
      <g transform={`translate(${x} ${y})`}>
        <motion.g style={{ y: ty, rotate: rot, opacity: op }}>
          <PaperMenu w={70} h={94} worn />
        </motion.g>
      </g>
    </motion.g>
  );
}

/**
 * SCENE 02 — The problem.
 * Menus pile up, a price is crossed out and rewritten, the old food photo
 * fades and an "OUTDATED" stamp lands.
 */
export default function Scene02({ p, standalone = false }) {
  const strike = useTransform(p, [0.36, 0.44], [0, 1]);
  const newPrice = useTransform(p, [0.44, 0.52], [0, 1]);
  const tagShake = useTransform(p, [0.36, 0.4, 0.44, 0.48, 0.52], [0, -4, 4, -3, 0]);
  const photoFade = useTransform(p, [0.5, 0.72], [1, 0.32]);
  const photoSat = useTransform(p, [0.5, 0.72], ['saturate(1)', 'saturate(0.15)']);
  const stampScale = useTransform(p, [0.6, 0.68], [2.2, 1]);
  const stampOp = useTransform(p, [0.6, 0.64], [0, 1]);
  const pileFade = useTransform(p, [0.8, 1], [1, 0.45]);

  return (
    <SceneCanvas standalone={standalone} tint={0.16} label="Rahul at his counter, frustrated, surrounded by piles of printed menus, a crossed-out price and an outdated food photo.">
      {/* wall price board */}
      <g transform="translate(940 140)">
        <rect x="0" y="0" width="210" height="270" rx="10" fill="#FFFDF7" stroke="#D9CBB0" strokeWidth="3" />
        <rect x="0" y="0" width="210" height="50" rx="10" fill="#7E8C7F" />
        <rect x="0" y="40" width="210" height="10" fill="#7E8C7F" />
        <text x="105" y="34" textAnchor="middle" fontFamily="Fraunces Variable, serif" fontWeight="700" fontSize="24" fill="#FFF9EF">MENU</text>
        {[
          ['Veg Biryani', '₹160'],
          ['Masala Dosa', '₹80'],
          ['Thali', '₹150'],
        ].map(([n, pr], i) => (
          <g key={n} transform={`translate(18 ${84 + i * 38})`}>
            <text fontFamily="Manrope Variable, sans-serif" fontSize="16" fontWeight="600" fill="#8B8170">{n}</text>
            <text x="174" textAnchor="end" fontFamily="Manrope Variable, sans-serif" fontSize="16" fontWeight="700" fill="#8B8170">{pr}</text>
          </g>
        ))}
        <motion.g style={{ x: tagShake }}>
          <g transform="translate(18 214)">
            <text fontFamily="Manrope Variable, sans-serif" fontSize="16" fontWeight="700" fill="#202820">Paneer Masala</text>
            <text x="174" textAnchor="end" fontFamily="Manrope Variable, sans-serif" fontSize="16" fontWeight="700" fill="#202820">₹200</text>
            <motion.line x1="134" y1="-6" x2="176" y2="-6" stroke="#D9692A" strokeWidth="3.5" strokeLinecap="round" style={{ pathLength: strike }} />
            <motion.g style={{ opacity: newPrice }}>
              <g transform="translate(150 30) rotate(-8)">
                <rect x="-28" y="-20" width="58" height="28" rx="5" fill="#F28C45" />
                <text x="1" y="1" textAnchor="middle" fontFamily="Fraunces Variable, serif" fontStyle="italic" fontSize="18" fontWeight="700" fill="#fff">₹220</text>
              </g>
            </motion.g>
          </g>
        </motion.g>
      </g>

      {/* old food photo */}
      <g transform="translate(70 150) rotate(-6)">
        <motion.g style={{ opacity: photoFade, filter: photoSat }}>
          <rect x="0" y="0" width="160" height="186" rx="6" fill="#FFFFFF" stroke="#E0D3BC" strokeWidth="2" />
          <FoodTile kind="thali" x={12} y={12} size={136} r={4} />
          <text x="80" y="172" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontSize="14" fontWeight="700" fill="#8B8170">Photo · 2019</text>
        </motion.g>
      </g>

      {/* Rahul behind the counter */}
      <g transform="translate(600 556) scale(1.06)">
        <Rahul pose="frustrated" expression="frustrated" />
      </g>

      <g transform="translate(300 470)">
        <Counter w={600} />
      </g>

      {/* piles of menus on the counter */}
      {FALLING_MENUS.map((m, i) => (
        <FallingMenu key={i} p={p} {...m} fade={pileFade} />
      ))}

      {/* OUTDATED stamp */}
      <g transform="translate(600 560)">
        <motion.g style={{ scale: stampScale, opacity: stampOp }}>
          <g transform="rotate(-8)">
            <rect x="-120" y="-34" width="240" height="68" rx="10" fill="none" stroke="#D9692A" strokeWidth="5" />
            <text x="0" y="14" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="38" letterSpacing="6" fill="#D9692A">
              OUTDATED
            </text>
          </g>
        </motion.g>
      </g>
    </SceneCanvas>
  );
}
