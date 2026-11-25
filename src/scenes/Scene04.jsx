import { motion, useTransform } from 'framer-motion';
import { CustomerArjun, CustomerPriya, HandPhone, Waiter } from '../assets/illustrations/characters.jsx';
import { ChairBack, DiningTable, MiniMenuScreen, QRCode, QRStandee } from '../assets/illustrations/props.jsx';
import { SceneCanvas } from './SceneCanvas.jsx';

function Glass({ x }) {
  return (
    <g transform={`translate(${x} 548)`}>
      <path d="M-12 -40 L12 -40 L9 0 L-9 0 Z" fill="#DDEFF2" opacity="0.9" />
      <path d="M-10 -24 L10 -24 L9 0 L-9 0 Z" fill="#BFE3EA" />
    </g>
  );
}

/**
 * SCENE 04 — Scan.
 * Priya lifts her phone, the camera view zooms in, a scan line sweeps the QR,
 * a tick appears and the digital menu opens.
 */
export default function Scene04({ p, standalone = false }) {
  const shoulder = useTransform(p, [0.04, 0.26], [16, 36]);
  const elbow = useTransform(p, [0.04, 0.26], [30, -105]);
  const insetOp = useTransform(p, [0.22, 0.3], [0, 1]);
  const insetScale = useTransform(p, [0.22, 0.32], [0.6, 1]);
  const scanY = useTransform(p, [0.3, 0.4, 0.5, 0.6], [-72, 72, -72, 72]);
  const scanOp = useTransform(p, [0.28, 0.32, 0.6, 0.62], [0, 1, 1, 0]);
  const tickOp = useTransform(p, [0.6, 0.64, 0.7, 0.74], [0, 1, 1, 0]);
  const tickScale = useTransform(p, [0.6, 0.66], [0.4, 1]);
  const menuY = useTransform(p, [0.7, 0.86], [300, -10]);
  const linkLen = useTransform(p, [0.22, 0.32], [0, 1]);
  const arjunCurious = useTransform(p, [0.72, 0.8], [1, 0]);
  const arjunHappy = useTransform(p, [0.72, 0.8], [0, 1]);
  const priyaHappy = useTransform(p, [0.7, 0.78], [0, 1]);
  const priyaNeutral = useTransform(p, [0.7, 0.78], [1, 0]);

  const phone = (
    <HandPhone w={30} h={54} screen="#173D32">
      <rect x="6" y="14" width="18" height="18" rx="2" fill="#C5F36A" opacity="0.9" />
    </HandPhone>
  );

  return (
    <SceneCanvas standalone={standalone} tint={0.04} label="Two customers at a table; one lifts her phone and scans the QR code on the table stand, and the digital menu opens.">
      {/* waiter in the background */}
      <g transform="translate(120 652) scale(0.9)">
        <Waiter tray={false} expression="smile" />
      </g>

      <g transform="translate(470 600)"><ChairBack /></g>
      <g transform="translate(740 600)"><ChairBack /></g>

      {/* Priya — two expression layers share the same animated arm values */}
      <g transform="translate(470 600)">
        <motion.g style={{ opacity: priyaNeutral }}>
          <CustomerPriya expression="neutral" armL={[8, 40]} armR={[shoulder, elbow]} handItem={phone} />
        </motion.g>
        <motion.g style={{ opacity: priyaHappy }}>
          <CustomerPriya expression="smile" armL={[8, 40]} armR={[shoulder, elbow]} handItem={phone} />
        </motion.g>
      </g>
      <g transform="translate(740 600)">
        <motion.g style={{ opacity: arjunCurious }}>
          <CustomerArjun expression="curious" armL={[10, 60]} armR={[8, 40]} />
        </motion.g>
        <motion.g style={{ opacity: arjunHappy }}>
          <CustomerArjun expression="smile" armL={[10, 60]} armR={[8, 40]} />
        </motion.g>
      </g>

      <g transform="translate(605 560)"><DiningTable w={560} /></g>
      <g transform="translate(616 548)"><QRStandee scale={0.85} /></g>
      <Glass x={400} />
      <Glass x={820} />

      {/* link from phone to the camera view */}
      <motion.path
        d="M590 430 Q720 300 860 290"
        stroke="#173D32"
        strokeWidth="3"
        strokeDasharray="4 10"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: linkLen }}
      />

      {/* camera view inset */}
      <g transform="translate(990 250)">
        <motion.g style={{ opacity: insetOp, scale: insetScale }}>
          <circle r="156" fill="#FFF9EF" />
          <circle r="146" fill="#173D32" />
          <clipPath id="s4-inset">
            <circle r="146" />
          </clipPath>
          <g clipPath="url(#s4-inset)">
            <QRCode x={-75} y={-75} size={150} fg="#173D32" bg="#FFFFFF" />
            {/* camera brackets */}
            <g stroke="#C5F36A" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M-92 -60 L-92 -92 L-60 -92" />
              <path d="M92 -60 L92 -92 L60 -92" />
              <path d="M-92 60 L-92 92 L-60 92" />
              <path d="M92 60 L92 92 L60 92" />
            </g>
            <motion.g style={{ y: scanY, opacity: scanOp }}>
              <rect x="-96" y="-3" width="192" height="6" rx="3" fill="#C5F36A" />
              <rect x="-96" y="-22" width="192" height="20" fill="#C5F36A" opacity="0.18" />
            </motion.g>
            <motion.g style={{ opacity: tickOp, scale: tickScale }}>
              <circle r="52" fill="#C5F36A" />
              <path d="M-22 2 L-6 18 L24 -16" stroke="#173D32" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </motion.g>
            <motion.g style={{ y: menuY }}>
              <g transform="translate(-100 -110)">
                <MiniMenuScreen w={200} h={360} />
              </g>
            </motion.g>
          </g>
          <circle r="146" fill="none" stroke="#C5F36A" strokeWidth="4" />
        </motion.g>
      </g>
    </SceneCanvas>
  );
}
