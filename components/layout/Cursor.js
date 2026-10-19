'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Focus reticle: a precise dot + a ring that "locks on" to links/buttons, shows a label on [data-cursor-label]
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState('idle'); // idle | link | label
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const lab = e.target.closest?.('[data-cursor-label]');
      if (lab) {
        setLabel(lab.getAttribute('data-cursor-label'));
        setMode('label');
        return;
      }
      if (e.target.closest?.('a, button, input, textarea, select, [data-cursor]')) setMode('link');
      else setMode('idle');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className="cursor-ring" style={{ x: sx, y: sy }}>
        <div className={`cursor-ring-inner is-${mode}`}>{mode === 'label' && <span className="cursor-label">{label}</span>}</div>
      </motion.div>
    </>
  );
}
