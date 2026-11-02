'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Every navigation: a black curtain wipes up and the new page rises in.
// (Skipped on the very first load so it never collides with the preloader.)
export default function Template({ children }) {
  const [wipe, setWipe] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem('reflexo-intro')) setWipe(true);
    } catch {}
  }, []);
  return (
    <>
      {wipe && (
        <>
          <motion.div
            className="wipe wipe-lime"
            initial={{ y: '0%' }}
            animate={{ y: '-101%' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className="wipe"
            initial={{ y: '0%' }}
            animate={{ y: '-101%' }}
            transition={{ duration: 0.85, delay: 0.04, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          />
        </>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: wipe ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
