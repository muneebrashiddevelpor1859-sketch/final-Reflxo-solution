'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { nav, site } from '@/data/site';
import { services } from '@/data/services';
import Roll from '../ui/Roll';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import FixedMedia from '../ui/FixedMedia';

export default function Footer() {
  const ref = useRef(null);
  const [time, setTime] = useState('');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <>
      <FixedMedia className="cta-band rx-round" video="/videos/5725951-uhd_3840_2160_30fps.mp4" veil="fx-veil-black" aria-label="Start a project">
        <div className="container">
          <p className="kicker">Time to stop scrolling</p>
          <SplitHeading lines={['Have a product to', 'build or rethink?']} italicLines={[1]} className="h-xl" />
          <Reveal delay={0.2}>
            <p className="cta-text">Tell us where things are today, what you want to achieve and what is getting in the way. We reply within 24 hours.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="cta-actions">
              <Button href="/contact" variant="solid">Get in touch</Button>
              <Button href="/portfolio" variant="line">See our work</Button>
            </div>
          </Reveal>
        </div>
      </FixedMedia>

    <footer className="ft" ref={ref}>
      <div className="container">
        <a className="ft-mail has-roll" href={`mailto:${site.email}`}><Roll>{site.email}</Roll></a>
      </div>

      <div className="container ft-grid">
        <div>
          <h4>Studio</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="has-roll"><Roll>{n.label}</Roll></Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="has-roll"><Roll>{s.title}</Roll></Link></li>
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
              <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="has-roll"><Roll>{s.label}</Roll></a></li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div className="ft-word" style={{ y }} aria-hidden="true">
        Reflexo<span>.</span>
      </motion.div>

      <div className="container ft-bottom">
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>{time && <>Studio time <b>{time}</b></>}</span>
        <button type="button" className="ft-top has-roll" onClick={toTop}><Roll>Back to top</Roll> <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
    </>
  );
}
