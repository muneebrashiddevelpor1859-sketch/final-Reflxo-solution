'use client';
import { stats } from '@/data/site';
import ScrollText from '../ui/ScrollText';
import Counter from '../ui/Counter';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

// Editorial opener: sticky label on the left, words that light up as you scroll, numbers underneath.
export default function Manifesto() {
  return (
    <section className="section rx-man" id="intro">
      <div className="container">
        <div className="rx-man-grid">
          <Reveal dir="left" className="rx-man-side">
            <span className="rx-label"><b>01</b> The studio</span>
          </Reveal>
          <div>
            <ScrollText
              className="rx-man-text"
              text="Good digital work starts with the problem, not the platform. First we get clear on what needs to change, then we design and build what helps."
            />
            <Reveal delay={0.1} className="rx-man-cta">
              <Button href="/about" variant="line">Meet the studio</Button>
            </Reveal>
          </div>
        </div>

        <div className="rx-stats" aria-label="Studio numbers">
          {stats.map((s, i) => (
            <Reveal key={s.label} dir={i < 2 ? 'left' : 'right'} delay={(i % 2) * 0.08} className="rx-stat">
              <span className="rx-stat-v"><Counter to={s.value} suffix={s.suffix} /></span>
              <span className="rx-stat-l">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
