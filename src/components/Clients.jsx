import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, MessageCircle } from 'lucide-react';
import { clients } from '../config/clients.js';
import { whatsappLink } from '../config/business.js';

/** Real menus already live for real restaurants — the strongest proof for new clients. */
export default function Clients() {
  return (
    <section id="clients" className="clients" aria-labelledby="clients-title">
      <div className="container">
        <motion.header
          className="section-head section-head--center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">
            <b><BadgeCheck size={14} aria-hidden="true" /></b> Live client menus
          </span>
          <h2 id="clients-title" className="section-title">
            Don’t just take our word for it. <em>See real menus.</em>
          </h2>
          <p className="section-sub">
            These restaurants already use our Digital QR Menus. Open any of them on your phone — this is exactly what
            your customers will see.
          </p>
        </motion.header>

        <ul className="clients__grid">
          {clients.map((c, i) => (
            <motion.li
              key={c.url}
              className="client-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="client-card__shot" href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Open the live menu of ${c.name}`}>
                <span className="client-card__frame">
                  <img src={c.image} alt={`Screenshot of the ${c.name} digital QR menu`} loading="lazy" decoding="async" width="280" height="620" />
                </span>
                <span className="client-card__live">
                  <i aria-hidden="true" /> Live
                </span>
              </a>
              <div className="client-card__body">
                <h3>{c.name}</h3>
                <p>{c.type}</p>
                <ul className="client-card__tags">
                  {c.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <a className="btn btn--green btn--block" href={c.url} target="_blank" rel="noopener noreferrer">
                  View live menu <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="clients__cta">
          <p>Want your restaurant here next?</p>
          <a
            className="btn btn--lime"
            href={whatsappLink("Hi! I saw your clients' QR menus on your website. I'd like one like this for my restaurant.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" /> Get a menu like these
          </a>
        </div>
      </div>
    </section>
  );
}
