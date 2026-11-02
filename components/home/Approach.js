import { process as steps } from '@/data/site';
import SplitHeading from '../ui/SplitHeading';

const extras = [
  ['Kick-off call', 'Written brief', 'Scope & timeline'],
  ['Wireframes', 'Visual direction', 'Clickable prototype'],
  ['Staging link', 'Weekly demos', 'Testing & QA'],
  ['Deployment', 'Monitoring', 'Ongoing support'],
];

// Cards stack on top of each other as you scroll (pure CSS sticky, no JS).
export default function Approach() {
  return (
    <section className="section approach">
      <div className="container approach-grid">
        <div className="approach-intro">
          <p className="kicker">Our approach</p>
          <SplitHeading lines={['From first call', 'to launch.']} italicLines={[1]} className="h-lg" />
          <p className="lead">One focused team, a shared plan, and no surprises between the first conversation and launch.</p>
        </div>
        <ol className="acards">
          {steps.map((s, i) => (
            <li className={`acard acard-${i % 4}`} style={{ '--i': i }} key={s.title}>
              <span className="acard-no">{String(i + 1).padStart(2, '0')}</span>
              <div className="acard-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="acard-tags">
                  {(extras[i] || []).map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
