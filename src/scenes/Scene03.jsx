import { motion, useTransform } from 'framer-motion';
import { Rahul } from '../assets/illustrations/characters.jsx';
import { Counter, MiniMenuScreen, PaperMenu, PhoneFrame, QRCode, Sparkle } from '../assets/illustrations/props.jsx';
import { SceneCanvas } from './SceneCanvas.jsx';

const PW = 230;
const PH = 460;
const SW = PW - PW * 0.1;
const SH = PH - PW * 0.1;

/**
 * SCENE 03 — The discovery.
 * A smartphone rises, shows a QR code, then opens a digital menu.
 * Rahul goes from curious to delighted.
 */
export default function Scene03({ p, standalone = false }) {
  const phoneY = useTransform(p, [0.04, 0.26], [120, 0]);
  const phoneOp = useTransform(p, [0.04, 0.18], [0, 1]);
  const glow = useTransform(p, [0.1, 0.4, 0.7], [0, 0.6, 1]);
  const glowSoft = useTransform(glow, (v) => v * 0.28);
  const qrOp = useTransform(p, [0.2, 0.32, 0.5, 0.58], [0, 1, 1, 0]);
  const qrScale = useTransform(p, [0.2, 0.32], [0.6, 1]);
  const menuY = useTransform(p, [0.5, 0.66], [SH, 0]);
  const curiousOp = useTransform(p, [0.6, 0.68], [1, 0]);
  const happyOp = useTransform(p, [0.6, 0.68], [0, 1]);
  const bulbOp = useTransform(p, [0.62, 0.7], [0, 1]);
  const bulbY = useTransform(p, [0.62, 0.74], [20, 0]);
  const trail = useTransform(p, [0.28, 0.5], [0, 1]);
  const spark = useTransform(p, [0.66, 0.76], [0, 1]);
  const sparkR = useTransform(p, [0.66, 1], [0, 90]);

  return (
    <SceneCanvas standalone={standalone} tint={0.08} label="Rahul notices a glowing smartphone that shows a QR code and then opens a digital menu.">
      {/* Rahul (curious ↔ delighted) */}
      <g transform="translate(470 556) scale(1.06)">
        <motion.g style={{ opacity: curiousOp }}>
          <Rahul pose="thinking" expression="curious" />
        </motion.g>
        <motion.g style={{ opacity: happyOp }}>
          <Rahul pose="present" expression="smile" />
        </motion.g>
      </g>

      {/* idea bulb */}
      <g transform="translate(470 196)">
        <motion.g style={{ opacity: bulbOp, y: bulbY }}>
          <circle r="34" fill="#C5F36A" opacity="0.35" />
          <path d="M-14 4 Q-22 -10 -14 -22 Q0 -34 14 -22 Q22 -10 14 4 L10 12 L-10 12 Z" fill="#FFE07A" />
          <rect x="-9" y="13" width="18" height="10" rx="3" fill="#202820" />
          <g stroke="#F28C45" strokeWidth="3.5" strokeLinecap="round">
            <line x1="-36" y1="-20" x2="-26" y2="-16" />
            <line x1="36" y1="-20" x2="26" y2="-16" />
            <line x1="0" y1="-50" x2="0" y2="-40" />
          </g>
        </motion.g>
      </g>

      <g transform="translate(260 470)">
        <Counter w={470} />
      </g>
      {/* the old menu pile, now pushed aside */}
      <g opacity="0.45">
        <g transform="translate(330 424) rotate(-6)"><PaperMenu w={64} h={86} worn /></g>
        <g transform="translate(360 420) rotate(5)"><PaperMenu w={64} h={86} worn /></g>
      </g>

      {/* dotted line of attention */}
      <motion.path
        d="M520 250 Q680 140 820 260"
        stroke="#173D32"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: trail }}
      />

      {/* glowing smartphone */}
      <g transform="translate(830 130)">
        <motion.g style={{ y: phoneY, opacity: phoneOp }}>
          <motion.circle cx={PW / 2} cy={PH / 2} r="250" fill="#C5F36A" style={{ opacity: glowSoft }} />
          <motion.circle cx={PW / 2} cy={PH / 2} r="170" fill="#FFF9EF" style={{ opacity: glow }} />
          <PhoneFrame w={PW} h={PH} id="s3phone">
            <rect width={SW} height={SH} fill="#173D32" />
            <motion.g style={{ opacity: qrOp, scale: qrScale }}>
              <QRCode x={SW / 2 - 70} y={SH / 2 - 100} size={140} fg="#173D32" bg="#FFFFFF" />
              <text x={SW / 2} y={SH / 2 + 80} textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="700" fontSize="16" fill="#C5F36A">
                Scan for menu
              </text>
            </motion.g>
            <motion.g style={{ y: menuY }}>
              <MiniMenuScreen w={SW} h={SH} />
            </motion.g>
          </PhoneFrame>
          <motion.g style={{ opacity: spark }}>
            <motion.g style={{ rotate: sparkR }}>
              <g transform="translate(-30 40)"><Sparkle size={18} /></g>
            </motion.g>
            <g transform={`translate(${PW + 26} 90)`}><Sparkle size={14} color="#F28C45" /></g>
            <g transform={`translate(${PW + 14} ${PH - 60})`}><Sparkle size={20} /></g>
          </motion.g>
        </motion.g>
      </g>
    </SceneCanvas>
  );
}
