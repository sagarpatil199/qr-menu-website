import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config/business.js';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      className="fab-whatsapp"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <MessageCircle size={26} aria-hidden="true" />
      <span className="fab-whatsapp__label">Chat on WhatsApp</span>
    </motion.a>
  );
}
