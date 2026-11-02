import { process as steps } from '@/data/site';
import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';

// Numbered process list. `tone="lime"` paints the section in the accent colour.
export default function Process({ tone = 'lime' }) {
  return (
    <section className={`section process process-${tone}`}>
      <div className="container process-grid">
        <div className="process-intro">
          <p className="kicker">Our process</p>
          <SplitHeading lines={['How a project', 'unfolds']} italicLines={[1]} className="h-lg" />
          <p className="lead">One focused team, a shared plan, and no surprises between the first conversation and launch.</p>
        </div>
        <ol className="process-list">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} y={30} className="process-row">
              <span className="process-no">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
