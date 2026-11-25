import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, MessageCircle, Phone, Star, Leaf } from 'lucide-react';
import { FoodArt } from '../assets/illustrations/props.jsx';
import { sampleRestaurant } from '../config/sampleMenu.js';

const ACTIONS = [
  { id: 'call', label: 'Call', Icon: Phone, note: 'Opens the phone dialer with the restaurant’s number.' },
  { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, note: 'Opens a WhatsApp chat with the restaurant.' },
  { id: 'map', label: 'Directions', Icon: MapPin, note: 'Opens the restaurant location in Google Maps.' },
  { id: 'review', label: 'Review', Icon: Star, note: 'Opens the restaurant’s Google Review page.' },
];

function ItemRow({ item, index, p, scripted }) {
  const start = 0.22 + index * 0.035;
  const op = useTransform(p, [start, start + 0.08], scripted ? [0, 1] : [1, 1]);
  const y = useTransform(p, [start, start + 0.08], scripted ? [18, 0] : [0, 0]);
  const imgStart = 0.3 + index * 0.03;
  const imgScale = useTransform(p, [imgStart, imgStart + 0.08], scripted ? [0.6, 1] : [1, 1]);
  const imgOp = useTransform(p, [imgStart, imgStart + 0.06], scripted ? [0, 1] : [1, 1]);
  return (
    <motion.li className="menu-item" style={{ opacity: op, y }} layout={!scripted}>
      <motion.div className="menu-item__img" style={{ scale: imgScale, opacity: imgOp }}>
        <FoodArt kind={item.art} title={`Illustration of ${item.name}`} />
      </motion.div>
      <div className="menu-item__body">
        <div className="menu-item__top">
          <span className="veg-dot" aria-label={item.veg ? 'Vegetarian' : 'Non-vegetarian'} />
          <h4>{item.name}</h4>
        </div>
        <p>{item.desc}</p>
        <strong>₹{item.price}</strong>
      </div>
    </motion.li>
  );
}

/**
 * Realistic smartphone with a sample digital QR menu.
 *  - Scripted mode (pass `progress`): the screen loads, chips and photos appear,
 *    and the list scrolls in sync with the page scroll.
 *  - Interactive mode: real scrolling, category filter and demo action buttons.
 */
export default function SmartphoneMockup({ progress, interactive = false, className = '', restaurant = sampleRestaurant }) {
  const fallback = useMotionValue(1);
  const p = progress || fallback;
  const scripted = Boolean(progress) && !interactive;

  const [cat, setCat] = useState('All');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const items = useMemo(
    () => (cat === 'All' ? restaurant.items : restaurant.items.filter((i) => i.category === cat)),
    [cat, restaurant.items]
  );

  const skeleton = useTransform(p, [0.04, 0.16], scripted ? [1, 0] : [0, 0]);
  const headerY = useTransform(p, [0.08, 0.2], scripted ? ['-100%', '0%'] : ['0%', '0%']);
  const chipsOp = useTransform(p, [0.16, 0.26], scripted ? [0, 1] : [1, 1]);
  const chipsX = useTransform(p, [0.16, 0.26], scripted ? [30, 0] : [0, 0]);
  const listY = useTransform(p, [0.46, 0.96], scripted ? ['0em', '-34em'] : ['0em', '0em']);
  const activeChip = useTransform(p, [0, 0.62, 0.64, 0.8, 0.82], [0, 0, 1, 1, 3]);
  const [scriptChip, setScriptChip] = useState(0);
  const lastChip = useRef(0);
  useEffect(() => {
    if (!scripted) return undefined;
    // Only re-render when the highlighted chip actually changes.
    return activeChip.on('change', (v) => {
      const r = Math.round(v);
      if (r !== lastChip.current) {
        lastChip.current = r;
        setScriptChip(r);
      }
    });
  }, [activeChip, scripted]);

  const cats = ['All', ...restaurant.categories];

  return (
    <div className={`phone ${interactive ? 'phone--interactive' : ''} ${className}`}>
      <div className="phone__frame">
        <span className="phone__btn phone__btn--a" aria-hidden="true" />
        <span className="phone__btn phone__btn--b" aria-hidden="true" />
        <div className="phone__screen">
          <div className="phone__status" aria-hidden="true">
            <span>9:41</span>
            <span className="phone__island" />
            <span className="phone__signal">
              <i /><i /><i />
            </span>
          </div>
          <div className="menu-app" aria-hidden={scripted ? 'true' : undefined}>
            <motion.header className="menu-app__header" style={{ y: headerY }}>
              <div className="menu-app__logo" aria-hidden="true">{restaurant.initials}</div>
              <div>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.tagline}</p>
                <span className="menu-app__open">
                  <Leaf size="1em" aria-hidden="true" /> {restaurant.hours}
                </span>
              </div>
            </motion.header>

            <motion.div className="menu-app__cats" style={{ opacity: chipsOp, x: chipsX }} role={interactive ? 'tablist' : undefined}>
              {cats.map((c, i) => {
                const on = scripted ? i === scriptChip : c === cat;
                return interactive ? (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className={`chip ${on ? 'is-on' : ''}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </button>
                ) : (
                  <span key={c} className={`chip ${on ? 'is-on' : ''}`}>
                    {c}
                  </span>
                );
              })}
            </motion.div>

            <div className="menu-app__list" tabIndex={interactive ? 0 : undefined} aria-label={interactive ? 'Menu items' : undefined}>
              <motion.ul style={{ y: listY }}>
                {items.map((item, i) => (
                  <ItemRow key={item.name} item={item} index={i} p={p} scripted={scripted} />
                ))}
              </motion.ul>
            </div>

            <div className="menu-app__bar">
              {ACTIONS.map(({ id, label, Icon, note }) =>
                interactive ? (
                  <button key={id} type="button" onClick={() => setToast(note)}>
                    <Icon size="1.25em" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ) : (
                  <span key={id}>
                    <Icon size="1.25em" aria-hidden="true" />
                    <span>{label}</span>
                  </span>
                )
              )}
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  className="menu-app__toast"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <strong>Demo:</strong> {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {scripted && (
            <motion.div className="menu-app__skeleton" style={{ opacity: skeleton }} aria-hidden="true">
              <i /><i /><i /><i />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
