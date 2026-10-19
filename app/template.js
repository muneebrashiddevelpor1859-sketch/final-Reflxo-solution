'use client';
import { motion } from 'framer-motion';

// Re-mounts on every navigation: two shutter blades (signal + ink) lift away, then the page eases in.
export default function Template({ children }) {
  return (
    <>
      <motion.div
        className="page-wipe page-wipe-signal"
        initial={{ y: '0%' }}
        animate={{ y: '-101%' }}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="page-wipe"
        initial={{ y: '0%' }}
        animate={{ y: '-101%' }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
