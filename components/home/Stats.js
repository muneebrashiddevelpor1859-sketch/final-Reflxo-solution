import { stats } from '@/data/site';
import Counter from '../ui/Counter';
import Reveal from '../ui/Reveal';

export default function Stats() {
  return (
    <section className="stats" aria-label="Studio numbers">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={24} className="stat">
            <span className="stat-value">
              <Counter to={s.value} suffix={s.suffix} />
            </span>
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
