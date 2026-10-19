'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { process as steps } from '@/data/site';
import SplitHeading from '../ui/SplitHeading';

function Card({ s, i, n, progress }) {
  const scale = useTransform(progress, [i / n, 1], [1, 0.9]);
  const dim = useTransform(progress, [i / n, 1], [1, 0.55]);
  return (
    <motion.article className={`process-card tone-${i % 4}`} style={{ '--i': i, scale, opacity: i === n - 1 ? 1 : dim, transformOrigin: '50% 0%' }}>
      <span className="process-no">{String(i + 1).padStart(2, '0')}</span>
      <div>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </motion.article>
  );
}

// Cards stack on top of each other while scrolling; earlier ones shrink and fade back
export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  return (
    <section className="section process">
      <div className="container process-grid">
        <div className="process-intro">
          <SplitHeading lines={['How a project', 'unfolds']} italicLines={[1]} className="h2" />
          <p className="muted">One focused team, a shared plan, and no surprises between the first conversation and launch.</p>
        </div>
        <div className="process-stack" ref={ref}>
          {steps.map((s, i) => (
            <Card key={s.title} s={s} i={i} n={steps.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
