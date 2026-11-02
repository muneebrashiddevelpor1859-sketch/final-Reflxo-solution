'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Shows once per browser session: a black curtain with a counter that lifts away at 100.
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('reflexo-intro');
    } catch {
      seen = true;
    }
    if (seen) return undefined;
    setShow(true);
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const total = 1500;
    let raf;
    let timer;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        timer = setTimeout(() => {
          try {
            sessionStorage.setItem('reflexo-intro', '1');
          } catch {}
          document.body.style.overflow = '';
          setShow(false);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pre"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pre-top">
            <span>Reflexo Solutions</span>
            <span>Digital systems, designed with intent</span>
          </div>
          <div className="pre-word" aria-hidden="true">
            <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              Reflexo<em>.</em>
            </motion.span>
          </div>
          <div className="pre-foot">
            <span className="pre-bar"><span style={{ transform: `scaleX(${count / 100})` }} /></span>
            <span className="pre-count">{String(count).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
