'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Re-mounts on every navigation. An aperture closes onto the spot you clicked (the new page
// "develops" underneath), then the page eases in.
export default function Template({ children }) {
  const [at] = useState(() => {
    if (typeof window === 'undefined' || !window.__iris) return '50% 50%';
    return `${window.__iris.x}px ${window.__iris.y}px`;
  });
  const shut = `circle(150vmax at ${at})`;
  const dot = `circle(0px at ${at})`;
  return (
    <>
      <motion.div
        className="page-iris page-iris-signal"
        initial={{ clipPath: shut }}
        animate={{ clipPath: dot }}
        transition={{ duration: 0.95, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="page-iris"
        initial={{ clipPath: shut }}
        animate={{ clipPath: dot }}
        transition={{ duration: 0.95, delay: 0.06, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
