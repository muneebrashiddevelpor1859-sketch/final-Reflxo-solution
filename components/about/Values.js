'use client';
import { motion } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';

const values = [
  { t: 'Craft over volume', d: 'We take fewer projects so each one gets senior attention from first call to launch.' },
  { t: 'Plain language', d: 'No jargon and no hidden scope. You always know what is being built, why and what it costs.' },
  { t: 'Built to last', d: 'Clean code, documented systems and designs that age well, so you are never locked in.' },
  { t: 'Human in the loop', d: 'Our AI work automates the repetitive part and keeps people in charge of the important decisions.' },
];

export default function Values() {
  return (
    <section className="section">
      <div className="container about-values">
        <div className="about-values-heading">
          <SplitHeading lines={['Small by design.', 'Serious about craft.']} italicLines={[1]} className="h2" />
          <p className="muted">A few principles shape every decision we make and every partnership we take on.</p>
        </div>
        <div className="values">
          {values.map((v, i) => (
            <motion.div
              className="value"
              key={v.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="value-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
              <span className="value-mark" aria-hidden="true">↗</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
