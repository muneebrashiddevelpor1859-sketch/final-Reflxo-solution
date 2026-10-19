'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import Cover from '../ui/Cover';
import Button from '../ui/Button';

// Vertical scroll drives a horizontal reel of projects (sticky stage). On small screens it
// becomes a native swipeable row.
export default function WorkScroll() {
  const featured = projects.slice(0, 4);
  const stage = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const [native, setNative] = useState(false);

  useEffect(() => {
    const measure = () => {
      const small = window.matchMedia('(max-width: 900px)').matches;
      setNative(small);
      if (small || !track.current) return setDist(0);
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 800); // after images/fonts settle
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);
  const bar = useTransform(smooth, [0, 1], [0.08, 1]);

  return (
    <section
      ref={stage}
      className={`reel${native ? ' is-native' : ''}`}
      style={native ? undefined : { height: `calc(100vh + ${dist}px)` }}
      aria-labelledby="selected-work-title"
    >
      <div className="reel-stick">
        <div className="container reel-head">
          <div>
            <h2 id="selected-work-title" className="h2">Selected work</h2>
          </div>
          <Button href="/portfolio" variant="line" magnetic={false}>View all work</Button>
        </div>

        <motion.ul className="reel-track" ref={track} style={native ? undefined : { x }}>
          {featured.map((p, i) => (
            <li className="reel-card" key={p.slug}>
              <Link href={`/portfolio/${p.slug}`} className="reel-link" data-cursor-label="View">
                <div className="reel-media crop">
                  <Cover title={p.title} hue={p.hue} image={p.image} />
                </div>
                <div className="reel-meta">
                  <span className="reel-no">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <span className="reel-cat">{p.category} <i>/</i> {p.year}</span>
                </div>
                <p className="reel-sum">{p.summary}</p>
              </Link>
            </li>
          ))}
          <li className="reel-card reel-end">
            <Link href="/portfolio" className="reel-all" data-cursor>
              <span>See every project</span>
              <b aria-hidden="true">↗</b>
            </Link>
          </li>
        </motion.ul>

        <div className="container reel-foot" aria-hidden="true">
          <span className="reel-progress"><motion.i style={{ scaleX: bar }} /></span>
          <span className="reel-hint">Keep scrolling →</span>
        </div>
      </div>
    </section>
  );
}
