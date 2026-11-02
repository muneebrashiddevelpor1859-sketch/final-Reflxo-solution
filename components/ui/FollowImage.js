'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

// A picture that trails the pointer while a list row is hovered (hidden on touch screens).
export default function FollowImage({ src }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div className="follow" style={{ x: sx, y: sy }} aria-hidden="true">
      <div className="follow-box">
        <AnimatePresence mode="wait">
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <motion.img
              key={src}
              src={src}
              alt=""
              initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
