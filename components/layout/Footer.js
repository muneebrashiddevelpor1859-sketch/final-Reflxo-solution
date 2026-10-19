'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { nav, site } from '@/data/site';
import { services } from '@/data/services';
import Button from '../ui/Button';
import Roll from '../ui/Roll';
import SplitHeading from '../ui/SplitHeading';

export default function Footer() {
  const ref = useRef(null);
  const [time, setTime] = useState('');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.06em', '-0.045em']);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <footer className="footer" ref={ref}>
      <div className="container footer-cta">
        <p className="kicker kicker-inv">Contact</p>
        <SplitHeading lines={['What are you', 'trying to make?']} className="display" italicLines={[1]} />
        <div className="footer-cta-row">
          <a className="footer-mail has-roll" href={`mailto:${site.email}`}>
            <Roll>{site.email}</Roll>
          </a>
          <Button href="/contact" variant="signal">Tell us about it</Button>
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <h4>Studio</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="has-roll"><Roll>{n.label}</Roll></Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="has-roll"><Roll>{s.title}</Roll></Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.phone}</li>
            <li>{site.location}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="has-roll"><Roll>{s.label}</Roll></a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div className="footer-word" style={{ y, letterSpacing: spacing }} aria-hidden="true">
        Reflexo<span>.</span>
      </motion.div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="footer-time">{time && <>Studio time <b>{time}</b></>}</span>
        <button type="button" className="footer-top has-roll" onClick={toTop}>
          <Roll>Back to top</Roll> <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
