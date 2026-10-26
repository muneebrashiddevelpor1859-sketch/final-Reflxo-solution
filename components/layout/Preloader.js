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
  const open = Math.max(0.04, count / 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)', pointerEvents: 'none' }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="pre-blade pre-blade-top" />
          <div className="pre-blade pre-blade-bottom" />

          <motion.div className="preloader-inner" exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.45 }}>
            <span className="preloader-tag">REC <i aria-hidden="true" /> Reflexo Solutions</span>

            {/* aperture: the ring turns and the opening widens as the count climbs */}
            <svg className="pre-aperture" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="92" className="pre-ap-ring" />
              <g className="pre-ap-spin">
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <line key={a} x1="100" y1="100" x2="100" y2="8" transform={`rotate(${a} 100 100)`} className="pre-ap-spoke" />
                ))}
              </g>
              <circle cx="100" cy="100" r={14 + open * 62} className="pre-ap-eye" />
            </svg>

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
