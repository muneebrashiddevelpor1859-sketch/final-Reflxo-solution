'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { process as steps } from '@/data/site';
import FixedMedia from '../ui/FixedMedia';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';

const extras = [
  ['Kick-off call', 'Written brief', 'Scope & timeline'],
  ['Wireframes', 'Visual direction', 'Clickable prototype'],
  ['Staging link', 'Weekly demos', 'Testing & QA'],
  ['Deployment', 'Monitoring', 'Ongoing support'],
];

function Step({ s, i }) {
  const ref = useRef(null);
  const lit = useInView(ref, { margin: '-45% 0px -45% 0px' });
  return (
    <li ref={ref} className={`rx-tl-step${lit ? ' is-on' : ''}`}>
      <span className="rx-tl-dot" aria-hidden="true" />
      <Reveal dir={i % 2 === 0 ? 'left' : 'right'} className="rx-tl-card">
        <span className="rx-tl-no">{String(i + 1).padStart(2, '0')}</span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
        <ul className="rx-tl-tags">
          {(extras[i] || []).map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Reveal>
    </li>
  );
}

// Dark timeline: a gold line fills as you scroll and each step lights up when it reaches the centre.
export default function Approach() {
  const wrap = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  return (
    <FixedMedia className="rx-dark rx-round rx-process" image="/images/office/o10.jpg" veil="fx-veil-black" glow={false} aria-label="Our process">
      <div className="container">
        <div className="sec-head">
          <div>
            <SplitHeading lines={['From first call', 'to launch.']} italicLines={[1]} className="h-lg" />
          </div>
          <p className="lead">One focused team, a shared plan, and no surprises between the first conversation and launch.</p>
        </div>

        <div className="rx-tl" ref={wrap}>
          <span className="rx-tl-line" aria-hidden="true">
            <motion.span className="rx-tl-fill" style={{ scaleY: fill }} />
          </span>
          <ol className="rx-tl-list">
            {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
          </ol>
        </div>
      </div>
    </FixedMedia>
  );
}
