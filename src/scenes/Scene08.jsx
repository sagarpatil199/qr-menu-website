import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Rahul } from '../assets/illustrations/characters.jsx';
import { ExteriorBuilding, StringLights, Street } from '../assets/illustrations/backdrops.jsx';
import { Plant, QRCode, Sparkle } from '../assets/illustrations/props.jsx';
import Contact from '../components/Contact.jsx';
import { whatsappLink } from '../config/business.js';
import { sampleRestaurant } from '../config/sampleMenu.js';
import { clients } from '../config/clients.js';

const STARS = Array.from({ length: 26 }, (_, i) => [((i * 137) % 1180) + 10, ((i * 71) % 220) + 12, (i % 3) + 1.4]);

function NightScene({ p }) {
  const lit = useMotionValue(1);
  const qrY = useTransform(p, [0, 1], [60, -30]);
  const bgX = useTransform(p, [0, 1], [30, -30]);
  return (
    <svg viewBox="60 40 1240 760" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Rahul waving outside his lit-up restaurant at night next to a large glowing QR code.">
      <rect x="0" y="0" width="1400" height="840" fill="#0F2B23" />
      <motion.g style={{ x: bgX }}>
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#FFF9EF" opacity={0.25 + (i % 4) * 0.15} />
        ))}
        <circle cx="230" cy="130" r="40" fill="#FFF3D6" />
        <circle cx="248" cy="118" r="36" fill="#0F2B23" />
      </motion.g>
      <g opacity="0.95">
        <ExteriorBuilding litStyle={{ opacity: lit }} name={sampleRestaurant.name.toUpperCase()} />
        <StringLights litStyle={{ opacity: lit }} />
      </g>
      <Street />
      <rect x="0" y="640" width="1400" height="200" fill="#0F2B23" opacity="0.35" />
      <g transform="translate(590 640)"><Plant scale={0.5} flip /></g>
      <g transform="translate(810 640)"><Plant scale={0.5} /></g>

      <g transform="translate(270 660) scale(0.9)">
        <Rahul pose="wave" expression="smile" />
      </g>

      {/* the hero QR tile */}
      <motion.g style={{ y: qrY }}>
        <g transform="translate(1140 360)">
          <circle r="180" fill="#C5F36A" opacity="0.12" />
          <circle r="130" fill="#C5F36A" opacity="0.16" />
          <g transform="rotate(-6)">
            <rect x="-108" y="-124" width="216" height="262" rx="24" fill="#FFF9EF" />
            <QRCode x={-86} y={-104} size={172} fg="#173D32" bg="#FFF9EF" />
            <rect x="-86" y="84" width="172" height="36" rx="18" fill="#173D32" />
            <text x="0" y="108" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="17" letterSpacing="2" fill="#C5F36A">
              SCAN FOR MENU
            </text>
          </g>
          <g transform="translate(-150 -130)"><Sparkle size={18} /></g>
          <g transform="translate(140 150)"><Sparkle size={14} color="#F28C45" /></g>
        </g>
      </motion.g>
    </svg>
  );
}

/**
 * SCENE 08 — Final conversion.
 */
export default function Scene08({ onOpenDemo }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return (
    <section id="contact" ref={ref} className="finale" aria-labelledby="finale-title">
      <div className="container finale__grid">
        <motion.div
          className="finale__copy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="kicker kicker--light">
            <b>08</b> Get Started
          </span>
          <h2 id="finale-title" className="finale__title">
            Your Restaurant Deserves a <em>Smarter Menu.</em>
          </h2>
          <p className="finale__sub">Give your customers a better way to explore your food menu.</p>
          <p className="finale__price">
            Get your own Digital QR Menu starting at just <strong>₹699</strong>.
          </p>
          <p className="finale__proof">
            Already live at {clients.map((c) => c.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}.{' '}
            <a href="#clients">See their menus</a>
          </p>
          <div className="finale__ctas">
            <a className="btn btn--lime btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              GET YOUR QR MENU NOW <ArrowRight size={20} aria-hidden="true" />
            </a>
            <button type="button" className="btn btn--ghost-light btn--lg" onClick={onOpenDemo}>
              <Play size={18} aria-hidden="true" /> EXPLORE DEMO
            </button>
          </div>
          <Contact />
        </motion.div>
        <motion.div
          className="finale__art"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <NightScene p={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  );
}
