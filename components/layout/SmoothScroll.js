'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';

// Lenis with a FIXED scroll time: every wheel step and every anchor jump takes the same
// amount of time (duration-based, not lerp-based), so scrolling always feels identical.
const WHEEL_DURATION = 1.15; // seconds per wheel glide
const ANCHOR_DURATION = 1.4; // seconds for any #link jump, near or far
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

export default function SmoothScroll({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: WHEEL_DURATION, easing: easeOutQuart, smoothWheel: true, wheelMultiplier: 1 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;

    const onClick = (e) => {
      const a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { duration: ANCHOR_DURATION, easing: easeOutQuart, offset: -68 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} aria-hidden="true" />
      {children}
    </>
  );
}
