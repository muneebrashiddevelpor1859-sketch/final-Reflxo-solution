'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { SLIDES } from './HeroIris';
import './hero.css';

// ---- VIDEOS: yahan se video badlein (file ko /public/videos/ mein rakhein) ----
const HERO_VIDEO = '/videos/hero-office.mp4'; // hero ke peeche wali video
const REEL_VIDEO = 'https://assets.mixkit.co/videos/46680/46680-720.mp4'; // hero ke neeche wali (scroll par khulne wali) video (Mixkit link)
const REEL_FALLBACK = '/videos/reel-office.mp4'; // Mixkit link na chale to ye chalegi
const REEL_POSTER = '/videos/hero-poster.jpg'; // video load hone tak dikhne wali tasveer
const REEL_START = 0; // reel video kitne second se shuru ho

const lines = [
  { text: 'Make your', cls: '' },
  { text: 'next move', cls: 'is-grad' },
  { text: 'count.', cls: '' },
];

// plays only while it is on screen (saves battery and keeps scrolling smooth)
function useVideoInView(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

// Opening screen: office-meeting video behind the headline, a dark brand gradient on top,
// and below it a video "frame" that opens up to full screen as you scroll.
export default function Hero() {
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState('');
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  useVideoInView(videoRef);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('reflexo-intro');
    } catch {}
    const t = setTimeout(() => setReady(true), seen ? 200 : 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    t();
    const id = setInterval(t, 30000);
    return () => clearInterval(id);
  }, []);

  // the header sits on a dark video here, so it switches to light text until you scroll past the hero
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const h = heroRef.current ? heroRef.current.offsetHeight : 600;
      if (window.scrollY < h - 90) root.setAttribute('data-hero', 'dark');
      else root.removeAttribute('data-hero');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      root.removeAttribute('data-hero');
    };
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

  // video drifts slower than the page, content fades as you leave the hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <>
      <section className="hx" ref={heroRef} aria-labelledby="home-hero-title">
        {/* background: office video + gradient + soft moving light */}
        <motion.div className="hx-bg" style={{ y: bgY, scale: bgScale }} aria-hidden="true">
          <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/videos/hero-poster.jpg">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </motion.div>
        <div className="hx-grad" aria-hidden="true" />
        <div className="hx-orb hx-orb-a" aria-hidden="true" />
        <div className="hx-orb hx-orb-b" aria-hidden="true" />
        <div className="hx-dots" aria-hidden="true" />

        <motion.div className="hx-inner" style={{ y: copyY, opacity: copyOpacity }}>
        
          <div className="container hx-main">
            <div className="hx-copy">
             
              <motion.h1
                id="home-hero-title"
                className="hx-title"
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } }}
                aria-label="Make your next move count."
              >
                {lines.map((l) => (
                  <span className="hx-line" key={l.text} aria-hidden="true">
                    <motion.span
                      className={`hx-line-in ${l.cls}`}
                      variants={{
                        hidden: { y: '110%', filter: 'blur(14px)' },
                        show: { y: '0%', filter: 'blur(0px)' },
                      }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {l.text}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.p className="hx-sub" {...rise(0.7)}>
                Websites, visual identities and useful automations, built around the people who use them.
              </motion.p>
              <motion.div className="hx-actions" {...rise(0.85)}>
                <Button href="/contact" variant="signal">Start a project</Button>
                <Button href="/services" variant="line">What we do</Button>
              </motion.div>
            </div>

            <motion.aside className="hx-panel" aria-label="Focus areas" {...rise(0.95)}>
              <div className="hx-panel-media" aria-hidden="true">
                {SLIDES.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s.src} src={s.src} alt="" className={i === active ? 'is-on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
                ))}
                <span className="hx-panel-count"><b>{SLIDES[active].n}</b> / {String(SLIDES.length).padStart(2, '0')}</span>
              </div>
              <ul className="hx-index">
                {SLIDES.map((s, i) => (
                  <li key={s.n} className={i === active ? 'is-active' : ''}>
                    <button type="button" onClick={() => pick(i)} onMouseEnter={() => pick(i)} aria-pressed={i === active}>
                      <i>{s.n}</i>
                      <span>{s.label}</span>
                      <em aria-hidden="true">{i === active && <u key={`${active}-${tick}`} />}</em>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>

          <div className="container hx-foot">
            <motion.span className="hx-scroll" {...rise(1.1)} aria-hidden="true">
              <i /> Scroll
            </motion.span>
          </div>
        </motion.div>
      </section>

      <HeroReel />
    </>
  );
}

// The video starts as a small rounded window and opens to the full screen while you scroll through.
function HeroReel() {
  const ref = useRef(null);
  const tc = useRef(null);
  const videoRef = useRef(null);
  useVideoInView(videoRef);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const inset = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const top = useTransform(inset, (v) => `${v * 12}%`);
  const side = useTransform(inset, (v) => `${v * 22}%`);
  const round = useTransform(inset, (v) => `${v * 26}px`);
  const clip = useMotionTemplate`inset(${top} ${side} ${top} ${side} round ${round})`;
  const zoom = useTransform(scrollYProgress, [0, 0.6], [1.25, 1]);
  const hud = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);
  const cue = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const outline = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
    <section className="hx-reel" ref={ref} aria-label="Studio reel">
      <div className="hx-reel-stick">
        <div className="hx-reel-bg" aria-hidden="true" />

        {/* thin light frame that sits around the small window and fades as it opens */}
        <motion.div className="hx-reel-outline" style={{ top, bottom: top, left: side, right: side, opacity: outline }} aria-hidden="true" />

        <motion.div className="hx-reel-frame" style={{ clipPath: clip }}>
          <motion.div className="hx-reel-video" style={{ scale: zoom }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={REEL_POSTER}
              aria-hidden="true"
              onLoadedMetadata={(e) => {
                try {
                  e.currentTarget.currentTime = REEL_START;
                } catch {}
              }}
            >
              <source src={REEL_VIDEO} type="video/mp4" />
              <source src={REEL_FALLBACK} type="video/mp4" />
            </video>
          </motion.div>
          <div className="hx-reel-shade" aria-hidden="true" />
          <div className="hx-reel-tint" aria-hidden="true" />

          <motion.div className="hx-reel-hud" style={{ opacity: hud }} aria-hidden="true">
            <span className="hud-rec"><i /> REC</span>
            <span className="hud-tc" ref={tc}>00:00:00:00</span>
            <span className="hud-meta">ISO 400 &nbsp;/&nbsp; f 2.8 &nbsp;/&nbsp; 1/125</span>
            <span className="hud-title">The studio reel <em>2026</em></span>
            <i className="hud-c hud-c-tl" /><i className="hud-c hud-c-tr" /><i className="hud-c hud-c-bl" /><i className="hud-c hud-c-br" />
            <span className="hud-bar"><motion.i style={{ scaleX: bar }} /></span>
          </motion.div>
        </motion.div>

        <motion.p className="hx-reel-cue" style={{ opacity: cue }} aria-hidden="true">
          <i /> Scroll to open the reel
        </motion.p>
      </div>
    </section>
  );
}
