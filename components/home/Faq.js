'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitHeading from '../ui/SplitHeading';

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
    <section className="section faq">
      <div className="container faq-grid">
        <div>
          <SplitHeading lines={['A few things people', 'usually ask.']} italicLines={[1]} className="h2" />
        </div>
        <ul className="faq-list">
          {faqs.map((f, i) => (
            <li key={f.q} className={open === i ? 'is-open' : ''}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
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
      </div>
    </section>
  );
}
