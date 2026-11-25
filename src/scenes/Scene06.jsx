import { motion, useTransform } from 'framer-motion';
import { BiryaniPlate, CustomerArjun, CustomerPriya, HandPhone, Rahul, Waiter } from '../assets/illustrations/characters.jsx';
import { ChairBack, DiningTable, PaperMenu, QRStandee, Sparkle } from '../assets/illustrations/props.jsx';
import { SceneCanvas } from './SceneCanvas.jsx';

const OLD_MENUS = [
  { x: 880, y: 600, r: -10, dx: -80, dy: -380 },
  { x: 910, y: 594, r: 6, dx: 30, dy: -420 },
  { x: 895, y: 586, r: -3, dx: 140, dy: -360 },
];

function VanishingMenu({ p, x, y, r, dx, dy, i }) {
  const start = 0.24 + i * 0.05;
  const tx = useTransform(p, [start, start + 0.22], [0, dx]);
  const ty = useTransform(p, [start, start + 0.22], [0, dy]);
  const rot = useTransform(p, [start, start + 0.22], [r, r + 120]);
  const sc = useTransform(p, [start, start + 0.22], [1, 0.2]);
  const op = useTransform(p, [start + 0.1, start + 0.22], [1, 0]);
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g style={{ x: tx, y: ty, rotate: rot, scale: sc, opacity: op }}>
        <PaperMenu w={64} h={86} worn />
      </motion.g>
    </g>
  );
}

const SPARKS = [
  [940, 210, 16, '#C5F36A'],
  [1110, 280, 12, '#F28C45'],
  [880, 360, 10, '#F28C45'],
  [560, 230, 14, '#C5F36A'],
  [300, 300, 11, '#F28C45'],
  [1140, 150, 18, '#C5F36A'],
];

function Spark({ p, x, y, s, c, i }) {
  const start = 0.42 + i * 0.04;
  const op = useTransform(p, [start, start + 0.06, start + 0.3], [0, 1, 0.75]);
  const sc = useTransform(p, [start, start + 0.08], [0, 1]);
  const rot = useTransform(p, [start, 1], [0, 140]);
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g style={{ opacity: op, scale: sc, rotate: rot }}>
        <Sparkle size={s} color={c} />
      </motion.g>
    </g>
  );
}

/**
 * SCENE 06 — Transformation.
 * The room brightens, the waiter brings food, guests browse the menu on their
 * phones, Rahul smiles and the old paper menus fly away.
 */
export default function Scene06({ p, standalone = false }) {
  const waiterX = useTransform(p, [0, 0.4], [-160, 230]);
  const swing = useTransform(p, (v) => (v > 0.4 ? 0 : Math.sin(v * Math.PI * 18) * 13));
  const rahulScale = useTransform(p, [0, 0.2], [0.92, 1]);
  const rahulOp = useTransform(p, [0, 0.12], [0, 1]);
  const warm = useTransform(p, [0, 0.5], [0, 0.18]);

  const phoneA = (
    <HandPhone w={30} h={54}>
      <rect x="5" y="8" width="20" height="5" rx="2" fill="#C5F36A" />
      <rect x="5" y="17" width="20" height="10" rx="2" fill="#F28C45" />
      <rect x="5" y="31" width="20" height="10" rx="2" fill="#E8A33D" />
    </HandPhone>
  );

  return (
    <SceneCanvas standalone={standalone} tint={0} label="A bright, happy restaurant: guests browse the digital menu on their phones, the waiter serves biryani and a smiling Rahul watches as old paper menus fly away.">
      <motion.rect x="-20" y="-20" width="1240" height="800" fill="#FFE7A8" style={{ opacity: warm }} />

      <g transform="translate(470 600)"><ChairBack /></g>
      <g transform="translate(720 600)"><ChairBack /></g>
      <g transform="translate(470 600)">
        <CustomerPriya expression="smile" armL={[8, 40]} armR={[36, -112]} handItem={phoneA} />
      </g>
      <g transform="translate(720 600)">
        <CustomerArjun expression="smile" armL={[36, -112]} armR={[8, 40]} handItem={phoneA} />
      </g>
      <g transform="translate(595 560)"><DiningTable w={520} /></g>
      <g transform="translate(600 548)"><QRStandee scale={0.8} /></g>
      <g transform="translate(470 552)"><BiryaniPlate scale={0.9} /></g>

      {/* Rahul, beaming */}
      <g transform="translate(1030 652)">
        <motion.g style={{ scale: rahulScale, opacity: rahulOp, originY: 1 }}>
          <Rahul pose="welcome" expression="smile" />
        </motion.g>
      </g>

      {/* paper menus fly away */}
      {OLD_MENUS.map((m, i) => (
        <VanishingMenu key={i} p={p} i={i} {...m} />
      ))}

      {/* waiter walks in with biryani */}
      <motion.g style={{ x: waiterX }}>
        <g transform="translate(0 652)">
          <Waiter expression="smile" swing={swing} trayItem={<BiryaniPlate scale={0.8} />} />
        </g>
      </motion.g>

      {SPARKS.map(([x, y, s, c], i) => (
        <Spark key={i} p={p} i={i} x={x} y={y} s={s} c={c} />
      ))}
    </SceneCanvas>
  );
}
