import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import { formatINR, packageMessage, packages } from '../config/pricing.js';
import { whatsappLink } from '../config/business.js';

export default function Pricing() {
  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <motion.header
          className="section-head section-head--center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">
            <b>₹</b> Simple pricing
          </span>
          <h2 id="pricing-title" className="section-title">
            Pick a package. <em>Pay once.</em>
          </h2>
          <p className="section-sub">All prices are one-time setup prices. Choose a package and send us a WhatsApp enquiry.</p>
        </motion.header>

        <div className="pricing__grid">
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              className={`price-card ${pkg.recommended ? 'price-card--featured' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              aria-labelledby={`pkg-${pkg.id}`}
            >
              {pkg.recommended && <span className="price-card__badge">Recommended</span>}
              <h3 id={`pkg-${pkg.id}`}>{pkg.name}</h3>
              <p className="price-card__tag">{pkg.tagline}</p>
              <p className="price-card__price">
                <span>{formatINR(pkg.price)}</span>
                <small>one-time setup</small>
              </p>
              <ul>
                {pkg.features.map((f) => (
                  <li key={f}>
                    <Check size={18} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${pkg.recommended ? 'btn--lime' : 'btn--green'} btn--block`}
                href={whatsappLink(packageMessage(pkg))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" /> Enquire on WhatsApp
              </a>
            </motion.article>
          ))}
        </div>
        <p className="pricing__note">Not sure which one fits? Message us your menu and we’ll suggest the right package.</p>
      </div>
    </section>
  );
}
