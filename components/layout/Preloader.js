'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Shows once per browser session. The "shutter" opens (two blades part) when loading hits 100.
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('reflexo-intro')) return;
    setShow(true);
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const total = 1600;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          sessionStorage.setItem('reflexo-intro', '1');
          document.body.style.overflow = '';
          setShow(false);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, []);

  const ease = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="preloader" exit={{ pointerEvents: 'none' }} transition={{ duration: 1 }}>
          <motion.div className="pre-blade pre-blade-top" exit={{ y: '-100%' }} transition={{ duration: 0.95, ease }} />
          <motion.div className="pre-blade pre-blade-bottom" exit={{ y: '100%' }} transition={{ duration: 0.95, ease }} />

          <motion.div className="preloader-inner" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.45 }}>
            <span className="preloader-tag">REC <i aria-hidden="true" /> Reflexo Solutions</span>
            <div className="preloader-mask">
              <motion.span
                className="preloader-word"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Reflexo<em>.</em>
              </motion.span>
            </div>
            <div className="preloader-foot">
              <span className="preloader-line"><span style={{ transform: `scaleX(${count / 100})` }} /></span>
              <span className="preloader-count">{String(count).padStart(3, '0')}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
