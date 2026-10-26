'use client';
import { motion } from 'framer-motion';

// "Mirror flip": each word swings down from a hinge on its top edge, like the mirror in a reflex
// camera, while snapping from blurry to sharp. `lines` = array of strings, one per visual line.
export default function SplitHeading({
  lines = [],
  as = 'h2',
  className = '',
  delay = 0,
  immediate = false,
  italicLines = [],
}) {
  const Tag = motion[as] || motion.h2;
  const words = lines.map((l) => l.split(' '));
  let n = 0;

  const anim = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag
      className={`split ${className}`}
      initial="hide"
      {...anim}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={lines.join(' ')}
    >
      {words.map((line, li) => (
        <span className={`split-line ${italicLines.includes(li) ? 'is-italic' : ''}`} key={li} aria-hidden="true">
          {line.map((w, wi) => {
            n += 1;
            return (
              <span className="split-mask" key={`${li}-${wi}-${n}`}>
                <motion.span
                  className="split-word"
                  variants={{
                    hide: { y: '70%', rotateX: -100, filter: 'blur(12px)', opacity: 0, transformOrigin: '50% 0%' },
                    show: { y: '0%', rotateX: 0, filter: 'blur(0px)', opacity: 1, transformOrigin: '50% 0%' },
                  }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
                {'\u00A0'}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
