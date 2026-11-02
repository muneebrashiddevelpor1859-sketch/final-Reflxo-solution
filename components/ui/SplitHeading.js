'use client';
import { motion } from 'framer-motion';

// Headline that rises line by line from behind a mask. `italicLines` keeps its old name but now
// renders those lines in a softer tone (a common agency look) instead of italics.
export default function SplitHeading({
  as = 'h2',
  lines,
  className = '',
  delay = 0,
  immediate = false,
  italicLines = [],
}) {
  const Tag = motion[as] || motion.h2;
  const anim = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag
      className={`split ${className}`}
      initial="hide"
      {...anim}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
      aria-label={lines.join(' ')}
    >
      {lines.map((line, li) => (
        <span className={`split-line ${italicLines.includes(li) ? 'is-dim' : ''}`} key={li} aria-hidden="true">
          <span className="split-mask">
            <motion.span
              className="split-word"
              variants={{ hide: { y: '112%' }, show: { y: '0%' } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          </span>
        </span>
      ))}
    </Tag>
  );
}
