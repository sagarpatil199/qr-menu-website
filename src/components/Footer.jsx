import { AtSign, Mail, MessageCircle } from 'lucide-react';
import { brandName, business, emailLink, instagramLink, whatsappLink } from '../config/business.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={40} />
          <div>
            <strong>{brandName()}</strong>
            <p>{business.tagline}</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="footer__links">
            <li><a href="#story">Our Story</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#demo">Demo</a></li>
            <li><a href="#clients">Clients</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <ul className="footer__social" aria-label="Contact">
          <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a></li>
          <li><a href={instagramLink()} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><AtSign size={20} /></a></li>
          <li><a href={emailLink()} aria-label="Email"><Mail size={20} /></a></li>
        </ul>
      </div>
      <div className="container footer__base">
        <p>© {year} {brandName()}. Serving restaurants across India.</p>
        <p>Rahul and Rahul’s Rasoi are fictional characters used for illustration.</p>
      </div>
    </footer>
  );
}
