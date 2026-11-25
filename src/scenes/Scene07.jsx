import { motion } from 'framer-motion';
import {
  ArrowDown,
  Image,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Play,
  QrCode,
  ReceiptText,
  Smartphone,
  Star,
} from 'lucide-react';
import SmartphoneMockup from '../components/SmartphoneMockup.jsx';

const FEATURES = [
  { Icon: QrCode, title: 'Digital QR Menu Website', text: 'Your own menu page that opens instantly from a QR scan.' },
  { Icon: Image, title: 'Food Photos', text: 'Show dishes the way they look on the plate.' },
  { Icon: LayoutGrid, title: 'Menu Categories', text: 'Starters, mains, drinks — easy to browse.' },
  { Icon: ReceiptText, title: 'Item Descriptions and Prices', text: 'Clear details so guests order with confidence.' },
  { Icon: Palette, title: 'Restaurant Logo and Branding', text: 'Your logo, your colours, your style.' },
  { Icon: Smartphone, title: 'Mobile-Friendly Design', text: 'Looks sharp on every phone, no app needed.' },
  { Icon: MessageCircle, title: 'WhatsApp Button', text: 'Guests can message you in one tap.' },
  { Icon: Phone, title: 'Call Button', text: 'One tap to call for reservations or takeaway.' },
  { Icon: MapPin, title: 'Google Maps Integration', text: 'Directions to your door, straight from the menu.' },
  { Icon: Star, title: 'Google Review Integration', text: 'Make it easy for happy guests to leave a review.' },
];

const item = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: (i % 5) * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

function FeatureList({ list, offset }) {
  return (
    <ul className="features__list">
      {list.map(({ Icon, title, text }, i) => (
        <motion.li
          key={title}
          custom={i + offset}
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="features__icon">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div>
            <h3>
              <span className="features__num">{String(i + offset + 1).padStart(2, '0')}</span> {title}
            </h3>
            <p>{text}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

/**
 * SCENE 07 — Introducing our Digital QR Menu.
 * Features wrap around a fully interactive phone demo.
 */
export default function Scene07({ onOpenDemo }) {
  return (
    <section id="features" className="features" aria-labelledby="features-title">
      <div className="container">
        <motion.header
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker kicker--light">
            <b>07</b> Your QR Menu
          </span>
          <h2 id="features-title" className="section-title">
            Give Your Restaurant Its Own <em>Digital QR Menu.</em>
          </h2>
          <p className="section-sub">Everything your restaurant needs to present its menu beautifully.</p>
        </motion.header>

        <div className="features__grid">
          <FeatureList list={FEATURES.slice(0, 5)} offset={0} />
          <div id="demo" className="features__demo">
            <div className="features__phone">
              <SmartphoneMockup interactive />
            </div>
            <p className="features__hint">Try it — tap the categories and buttons.</p>
            <div className="features__demo-actions">
              <button type="button" className="btn btn--lime" onClick={onOpenDemo}>
                <Play size={18} aria-hidden="true" /> Open interactive demo
              </button>
              <a className="btn btn--ghost-light" href="#clients">
                See live client menus <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <FeatureList list={FEATURES.slice(5)} offset={5} />
        </div>
      </div>
    </section>
  );
}
