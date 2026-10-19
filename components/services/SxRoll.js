'use client';
import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const POOL = 'ABCDEFGHJKLMNOPRSTUVWXYZabcdefghjkmnoprstuvwxyz';

function Ch({ ch, i, reduce }) {
  const a = POOL[(ch.charCodeAt(0) * 7 + i * 13) % POOL.length];
  const b = POOL[(ch.charCodeAt(0) * 3 + i * 29 + 5) % POOL.length];
  return (
    <span className="sx-roll-ch">
      <motion.span
        className="sx-roll-col"
        initial={{ y: reduce ? '0em' : '2.2em' }}
        animate={{ y: '0em' }}
        transition={{ duration: 0.72, delay: 0.16 + i * 0.022, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="sx-roll-ghost sx-roll-ghost-a" aria-hidden="true">{a}</span>
        <span className="sx-roll-ghost sx-roll-ghost-b" aria-hidden="true">{b}</span>
        <span>{ch}</span>
      </motion.span>
    </span>
  );
}

// Every letter rolls down into place like a slot-machine reel.
export default function SxRoll({ text, as: Tag = 'h1', className = '' }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <Tag className={`sx-roll ${className}`.trim()} aria-label={text}>
      {text.split(' ').map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          {w > 0 && ' '}
          <span className="sx-roll-word" aria-hidden="true">
            {word.split('').map((ch) => {
              n += 1;
              return <Ch key={n} ch={ch} i={n} reduce={reduce} />;
            })}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
