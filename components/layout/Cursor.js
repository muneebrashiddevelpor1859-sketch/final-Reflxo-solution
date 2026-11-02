'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Small ball that follows the pointer. It grows over links/buttons and shows a label
// when the element has data-cursor-label="View". Only on devices with a real mouse.
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target instanceof Element ? e.target.closest('[data-cursor-label],a,button,summary,[data-cursor]') : null;
      if (!t) {
        setHover(false);
        setLabel('');
        return;
      }
      setHover(true);
      setLabel(t.getAttribute('data-cursor-label') || '');
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!on) return null;
  return (
    <motion.div className={`cur${hover ? ' is-hover' : ''}${label ? ' has-label' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <span className="cur-ball">
        <span className="cur-label">{label}</span>
      </span>
    </motion.div>
  );
}
