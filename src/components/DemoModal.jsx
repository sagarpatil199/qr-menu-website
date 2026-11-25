import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import SmartphoneMockup from './SmartphoneMockup.jsx';
import { whatsappLink } from '../config/business.js';

/** Full-screen interactive demo of the digital menu. */
export default function DemoModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="modal__panel"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Close demo">
              <X size={22} />
            </button>
            <div className="modal__copy">
              <span className="kicker">Live demo</span>
              <h2 id="demo-title">This is what your guests see after scanning.</h2>
              <p>
                Tap the categories to filter dishes, scroll the menu, and try the Call, WhatsApp, Directions and Review
                buttons. Your menu gets your own dishes, photos, prices, logo and colours.
              </p>
              <div className="modal__actions">
                <a className="btn btn--green" href={whatsappLink("Hi! I just tried your QR menu demo. I'd like one for my restaurant.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} aria-hidden="true" /> I want this for my restaurant
                </a>
                <a className="btn btn--outline" href="#clients" onClick={onClose}>
                  See real client menus
                </a>
              </div>
            </div>
            <div className="modal__phone">
              <SmartphoneMockup interactive />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
