'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// "Reflex lens": a glass circle that follows the pointer and shows the page's mirror world
// (inverted light and dark) underneath it. It grows over links and buttons, shows a label on
// [data-cursor-label], pinches when you press, and sends out a ring on click.
export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState('idle'); // idle | link | label | text
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);
  const [rings, setRings] = useState([]);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    let id = 0;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      const lab = t.closest?.('[data-cursor-label]');
      if (lab) {
        setLabel(lab.getAttribute('data-cursor-label'));
        setMode('label');
      } else if (t.closest?.('input, textarea, select')) setMode('text');
      else if (t.closest?.('a, button, [data-cursor]')) setMode('link');
      else setMode('idle');
    };
    const press = (e) => {
      setDown(true);
      id += 1;
      const ring = { id, x: e.clientX, y: e.clientY };
      setRings((r) => [...r.slice(-3), ring]);
      setTimeout(() => setRings((r) => r.filter((q) => q.id !== ring.id)), 900);
    };
    const release = () => setDown(false);
    const leave = () => {
      x.set(-200);
      y.set(-200);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', press);
    window.addEventListener('mouseup', release);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', press);
      window.removeEventListener('mouseup', release);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="lens" style={{ x: sx, y: sy }} aria-hidden="true">
        <div className={`lens-body is-${mode}${down ? ' is-down' : ''}`}>
          {mode === 'label' && <span className="lens-label">{label}</span>}
        </div>
      </motion.div>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      {rings.map((r) => (
        <span key={r.id} className="lens-ring" style={{ left: r.x, top: r.y }} aria-hidden="true" />
      ))}
    </>
  );
}
