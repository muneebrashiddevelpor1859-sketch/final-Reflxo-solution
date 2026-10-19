'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

function Step({ step, i, total, progress }) {
  const t = (i + 0.12) / total;
  const lit = useTransform(progress, [t - 0.05, t], [0, 1], { clamp: true });
  const opacity = useTransform(progress, [t - 0.14, t], [0.28, 1], { clamp: true });
  const shift = useTransform(progress, [t - 0.14, t], [28, 0], { clamp: true });
  return (
    <li className={`sx-loop-step${i % 2 ? ' is-right' : ''}`}>
      <motion.span className="sx-loop-node" style={{ scale: useTransform(lit, [0, 1], [0.55, 1]) }}>
        <motion.i style={{ opacity: lit }} />
      </motion.span>
      <motion.div className="sx-loop-card" style={{ opacity, y: shift }}>
        <span className="sx-loop-no">{String(i + 1).padStart(2, '0')}</span>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </motion.div>
    </li>
  );
}

// A line draws down the page as you scroll; each stage lights up when the line reaches it.
export default function SxLoop({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 62%', 'end 58%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const head = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <ol ref={ref} className="sx-loop">
      <span className="sx-loop-rail" aria-hidden="true" />
      <motion.span className="sx-loop-fill" aria-hidden="true" style={{ scaleY: progress }} />
      <motion.span className="sx-loop-head" aria-hidden="true" style={{ top: head }} />
      {steps.map((s, i) => (
        <Step key={s.title} step={s} i={i} total={steps.length} progress={progress} />
      ))}
    </ol>
  );
}
