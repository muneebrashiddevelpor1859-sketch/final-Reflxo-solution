'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import FixedMedia from '../ui/FixedMedia';
import { stats } from '@/data/site';

const line = {
  hide: { y: '112%' },
  show: (i) => ({ y: '0%', transition: { duration: 1.05, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] } }),
};

// Full-screen hero: a video that stays fixed while the page scrolls over it, under a soft pearl veil.
export default function Hero() {
  const [ready, setReady] = useState(false);

  // wait for the one-time preloader on the first visit of a session
  useEffect(() => {
    let seen = true;
    try {
      seen = !!sessionStorage.getItem('reflexo-intro');
    } catch {}
    const t = setTimeout(() => setReady(true), seen ? 80 : 2100);
    return () => clearTimeout(t);
  }, []);

  const state = ready ? 'show' : 'hide';

  return (
    <FixedMedia className="hero" video="/videos/reel-office.mp4" veil="fx-veil">
      <div className="container hero-main">
       

        <h1 className="hero-title" aria-label="Digital systems, designed with intent.">
          <span className="hl" aria-hidden="true">
            <motion.span className="hl-in" custom={0} variants={line} initial="hide" animate={state}>Digital systems</motion.span>
          </span>
          <span className="hl" aria-hidden="true">
            <motion.span className="hl-in" custom={1} variants={line} initial="hide" animate={state}>
              designed
              <span className="hero-pill">
                <video autoPlay muted loop playsInline preload="metadata" poster="/videos/hero-poster.jpg">
                  <source src="/videos/hero-office.mp4" type="video/mp4" />
                </video>
              </span>
            </motion.span>
          </span>
          <span className="hl" aria-hidden="true">
            <motion.span className="hl-in is-dim" custom={2} variants={line} initial="hide" animate={state}>with intent.</motion.span>
          </span>
        </h1>

        <motion.div className="hero-row" initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <p className="hero-lead">
            We are a small, senior studio designing and building websites, brands and AI automation for companies ready to move beyond the ordinary.
          </p>
          <div className="hero-actions">
            <Button href="/contact" variant="solid">Start a project</Button>
            <Button href="/services" variant="line">What we do</Button>
          </div>
        </motion.div>

      </div>

      <div className="container hero-bar-wrap">
        <motion.ul className="hero-bar" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {stats.map((st) => (
            <li key={st.label}>
              <strong>{st.value}{st.suffix}</strong>
              <span>{st.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <a href="#intro" className="hero-badge" aria-label="Scroll down" data-cursor-label="Scroll">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="hb" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
          <text><textPath href="#hb" textLength="268" lengthAdjust="spacing">Scroll down · Scroll down · Scroll down · </textPath></text>
        </svg>
        <i aria-hidden="true">↓</i>
      </a>
    </FixedMedia>
  );
}
