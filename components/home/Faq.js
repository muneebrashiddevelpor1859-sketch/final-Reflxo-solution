'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

const faqs = [
  { q: 'What does Reflexo Solutions specialise in?', a: 'Web design and development is our core, supported by SEO, paid advertising, AI automation, AI agents, branding and short-form video. We bring in each of these only when it makes sense for your business.' },
  { q: 'What kinds of websites do you build?', a: 'Custom Next.js sites, WordPress builds for content-heavy businesses, Shopify and custom e-commerce stores, and full redesigns of sites that have outgrown their purpose.' },
  { q: 'Do I need to know which service I need before contacting you?', a: 'No. Most clients arrive with a problem, such as too few enquiries or too much manual work. Describe it in your own words and we will recommend the right path, even if that means doing less.' },
  { q: 'Do you work only with local businesses?', a: 'No. We work remotely with businesses around the world, using video calls, shared boards and weekly updates so distance never slows the project.' },
  { q: 'How long does a typical project take?', a: 'A website usually takes two to four weeks and an automation one to two weeks. We confirm the exact timeline after a short discovery call.' },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section rx-faq">
      <div className="container rx-faq-grid">
        <div className="rx-faq-side">
          <p className="kicker">FAQ</p>
          <SplitHeading lines={['A few things people', 'usually ask.']} italicLines={[1]} className="h-lg" />
          <Reveal delay={0.15} className="rx-faq-card">
            <strong>Still have a question?</strong>
            <span>Tell us what you are working on. We reply within 24 hours.</span>
            <Button href="/contact" variant="solid">Ask the team</Button>
          </Reveal>
        </div>

        <Reveal dir="right">
          <ul className="rx-faq-list">
            {faqs.map((f, i) => (
              <li key={f.q} className={open === i ? 'is-open' : ''}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span className="rx-faq-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rx-faq-q">{f.q}</span>
                  <i aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
