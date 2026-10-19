'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

function Row({ text, i, register }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'end 8%'] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.16, 1, 1, 0.16]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [48, 0, -24]);
  const line = useTransform(scrollYProgress, [0.12, 0.5], [0, 1]);
  return (
    <li ref={(el) => { ref.current = el; register(i, el); }} className="sx-reel-row">
      <motion.p style={{ opacity, x }}>{text}</motion.p>
      <motion.span className="sx-reel-line" style={{ scaleX: line }} aria-hidden="true" />
    </li>
  );
}

// Features read like a reel: the row crossing the middle of the screen is the one in focus.
export default function SxReel({ features }) {
  const [active, setActive] = useState(0);
  const rows = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(rows.current.indexOf(e.target));
      }),
      { rootMargin: '-44% 0px -44% 0px', threshold: 0 }
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sx-reel">
      <div className="sx-reel-side">
        <div className="sx-reel-count" aria-hidden="true">
          <div className="sx-reel-digit">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={active} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                {String(active + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="sx-reel-of">of {String(features.length).padStart(2, '0')}</span>
        </div>
        <div className="sx-reel-ticks" aria-hidden="true">
          {features.map((f, i) => <i key={f} className={i === active ? 'is-on' : ''} />)}
        </div>
      </div>
      <ul className="sx-reel-list">
        {features.map((f, i) => (
          <Row key={f} text={f} i={i} register={(idx, el) => { rows.current[idx] = el; }} />
        ))}
      </ul>
    </div>
  );
}
