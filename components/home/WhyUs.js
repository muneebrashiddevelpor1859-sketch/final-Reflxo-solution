import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';

const cards = [
  { t: 'Design and code, one team', d: 'No hand-offs between agencies. The person who designs a screen also cares how it is built.' },
  { t: 'Automation that fits how you work', d: 'We connect the tools you already use and keep every step visible and easy to change.' },
  { t: 'Fast by default', d: 'Next.js, optimised images and lean code so pages feel instant on a mid-range phone.' },
  { t: 'AI with a human in charge', d: 'Agents handle the repetitive part and hand over to a real person whenever it matters.' },
];

export default function WhyUs() {
  return (
    <section className="section why">
      <div className="container">
        <div className="why-head">
          <div>
            <p className="kicker">Why Reflexo</p>
            <SplitHeading lines={['Small team.', 'Senior attention.']} italicLines={[1]} className="h-lg" />
          </div>
          <p className="lead">Fewer projects, closer work. The people you talk to are the people who build it.</p>
        </div>
        <div className="why-grid">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={(i % 2) * 0.08} y={40} className="why-card">
              <span className="why-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
              <span className="why-arrow" aria-hidden="true">↗</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
