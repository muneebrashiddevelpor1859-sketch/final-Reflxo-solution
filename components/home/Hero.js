'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import HeroIris, { SLIDES } from './HeroIris';

const lines = [
  { text: 'Make your', cls: '' },
  { text: 'next move', cls: 'is-outline' },
  { text: 'count.', cls: '' },
];

// Opening screen: oversized headline next to a working lens aperture (the "reflex" of Reflexo),
// and below it a video "frame" that opens up to full screen as you scroll.
export default function Hero() {
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState('');
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem('reflexo-intro');
    const t = setTimeout(() => setReady(true), seen ? 200 : 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    t();
    const id = setInterval(t, 30000);
    return () => clearInterval(id);
  }, []);

  // pictures change by themselves (restarts the countdown after a manual pick)
  useEffect(() => {
    if (!ready) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), 4200);
    return () => clearTimeout(id);
  }, [ready, active, tick]);

  const pick = (i) => {
    setActive(i);
    setTick((n) => n + 1);
  };

  const rise = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <>
      <section className="hero hero-lens">
        <div className="container hero-top">
          <motion.p className="hero-meta" {...rise(0.1)}>
            <span className="hero-meta-dot" aria-hidden="true" /> Independent digital agency
          </motion.p>
          <motion.p className="hero-meta hero-meta-mid" {...rise(0.2)}>Working worldwide</motion.p>
          <motion.p className="hero-meta hero-meta-end" {...rise(0.3)}>
            {time && <>Studio time <b>{time}</b></>}
          </motion.p>
        </div>

        <div className="container hero-main hero-main-lens">
          <motion.h1
            id="home-hero-title"
            className="hero-title"
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } } }}
            aria-label="Make your next move count."
          >
            {lines.map((l) => (
              <span className="hero-line" key={l.text} aria-hidden="true">
                <motion.span
                  className={`hero-line-in ${l.cls}`}
                  variants={{
                    hidden: { y: '112%', filter: 'blur(16px)' },
                    show: { y: '0%', filter: 'blur(0px)' },
                  }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div className="hero-lens-wrap" initial={{ opacity: 0, scale: 0.92 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <HeroIris ready={ready} active={active} onPick={pick} />
          </motion.div>
        </div>

        <div className="container hero-foot">
          <motion.p className="hero-sub" {...rise(0.75)}>
            Websites, visual identities and useful automations, built around the people who use them.
          </motion.p>
          <motion.div className="hero-actions" {...rise(0.9)}>
            <Button href="/contact">Start a project</Button>
            <Button href="/services" variant="line">What we do</Button>
          </motion.div>
          <motion.ul className="hero-index" {...rise(1.05)}>
            {SLIDES.map((s, i) => (
              <li key={s.n} className={i === active ? 'is-active' : ''}>
                <button type="button" onClick={() => pick(i)} onMouseEnter={() => pick(i)}>
                  <i>{s.n}</i> {s.label}
                </button>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <HeroReel />
    </>
  );
}

// The video starts as a small framed window and opens to the full screen while you scroll through.
function HeroReel() {
  const ref = useRef(null);
  const tc = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const inset = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const top = useTransform(inset, (v) => `${v * 14}%`);
  const side = useTransform(inset, (v) => `${v * 24}%`);
  const clip = useMotionTemplate`inset(${top} ${side} ${top} ${side})`;
  const zoom = useTransform(scrollYProgress, [0, 0.6], [1.3, 1]);
  const hud = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  // running timecode in the corner of the frame (updates a text node directly, no re-renders)
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      if (!tc.current) return;
      const t = (performance.now() - start) / 1000;
      const h = String(Math.floor(t / 3600)).padStart(2, '0');
      const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
      const s = String(Math.floor(t % 60)).padStart(2, '0');
      const f = String(Math.floor((t % 1) * 25)).padStart(2, '0');
      tc.current.textContent = `${h}:${m}:${s}:${f}`;
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-reel" ref={ref} aria-label="Studio reel">
      <div className="hero-reel-stick">
        <motion.div className="hero-reel-frame" style={{ clipPath: clip }}>
          <motion.div className="hero-reel-video" style={{ scale: zoom }}>
            <video autoPlay muted loop playsInline preload="auto" aria-hidden="true">
              <source src="/videos/8141241-uhd_3840_2160_25fps.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="hero-reel-shade" aria-hidden="true" />
          <motion.div className="hero-reel-hud" style={{ opacity: hud }} aria-hidden="true">
            <span className="hud-rec"><i /> REC</span>
            <span className="hud-tc" ref={tc}>00:00:00:00</span>
            <span className="hud-meta">ISO 400 &nbsp;/&nbsp; f 2.8 &nbsp;/&nbsp; 1/125</span>
            <span className="hud-title">The studio reel <em>2026</em></span>
            <i className="hud-c hud-c-tl" /><i className="hud-c hud-c-tr" /><i className="hud-c hud-c-bl" /><i className="hud-c hud-c-br" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
