import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, MessageCircle, X } from 'lucide-react';
import { brandName, whatsappLink } from '../config/business.js';
import Logo from './Logo.jsx';

const LINKS = [
  { href: '#story', label: 'Our Story' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#demo', label: 'Demo' },
  { href: '#clients', label: 'Clients' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Only flips state when crossing the threshold — not every frame.
  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 24;
    if (next !== solid) setSolid(next);
  });

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label={`${brandName()} — back to top`}>
          <Logo />
          <span>{brandName()}</span>
        </a>
        <nav aria-label="Main">
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--green btn--sm nav__cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} aria-hidden="true" /> Get QR Menu
        </a>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="nav__mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="btn btn--lime btn--block" href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              <MessageCircle size={18} aria-hidden="true" /> Get your QR Menu on WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
