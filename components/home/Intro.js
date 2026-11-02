'use client';
import { stats } from '@/data/site';
import ScrollText from '../ui/ScrollText';
import Counter from '../ui/Counter';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function Intro() {
  return (
    <section className="section intro" id="intro">
      <div className="container">
        <p className="kicker">What we do</p>
        <ScrollText className="intro-text" text="Good digital work starts with the problem, not the platform. First we get clear on what needs to change, then we design and build what helps." />
        <Reveal className="intro-cta">
          <Button href="/about" variant="line">Meet the studio</Button>
        </Reveal>

        <div className="stats" aria-label="Studio numbers">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={24} className="stat">
              <span className="stat-value"><Counter to={s.value} suffix={s.suffix} /></span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
