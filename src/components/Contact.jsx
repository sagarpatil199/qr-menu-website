import { AtSign, Mail, MessageCircle } from 'lucide-react';
import { emailLabel, emailLink, instagramLabel, instagramLink, whatsappLink } from '../config/business.js';

export default function Contact() {
  const cards = [
    {
      id: 'whatsapp',
      Icon: MessageCircle,
      title: 'WhatsApp',
      text: 'Fastest reply — chat with us now',
      href: whatsappLink(),
      primary: true,
    },
    { id: 'instagram', Icon: AtSign, title: 'Instagram', text: instagramLabel(), href: instagramLink() },
    { id: 'email', Icon: Mail, title: 'Email', text: emailLabel(), href: emailLink() },
  ];
  return (
    <ul className="contact-cards" aria-label="Contact options">
      {cards.map(({ id, Icon, title, text, href, primary }) => (
        <li key={id}>
          <a
            className={`contact-card ${primary ? 'contact-card--primary' : ''}`}
            href={href}
            target={id === 'email' ? undefined : '_blank'}
            rel={id === 'email' ? undefined : 'noopener noreferrer'}
          >
            <span className="contact-card__icon">
              <Icon size={22} aria-hidden="true" />
            </span>
            <span>
              <strong>{title}</strong>
              <small>{text}</small>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
