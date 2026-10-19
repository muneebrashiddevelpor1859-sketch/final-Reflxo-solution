'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 3D tilt that follows the pointer + a moving highlight
export default function Tilt({ children, max = 7, className = '' }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glow = useTransform([sx, sy], ([x, y]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.28), transparent 60%)`);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative', height: '100%' }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
      <motion.div style={{ background: glow, position: 'absolute', inset: 0, borderRadius: 26, pointerEvents: 'none', mixBlendMode: 'soft-light' }} />
    </motion.div>
  );
}
