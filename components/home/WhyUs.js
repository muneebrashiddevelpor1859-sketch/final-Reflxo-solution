import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';

const cards = [
  { t: 'Design and code, one team', d: 'No hand-offs between agencies. The person who designs a screen also cares how it is built.' },
  { t: 'Automation that fits how you work', d: 'We connect the tools you already use and keep every step visible and easy to change.' },
  { t: 'Fast by default', d: 'Next.js, optimised images and lean code so pages feel instant on a mid-range phone.' },
  { t: 'AI with a human in charge', d: 'Agents handle the repetitive part and hand over to a real person whenever it matters.' },
];

// Sticky intro on the left, cards that slide in from the right.
export default function WhyUs() {
  return (
    <section className="section rx-why">
      <div className="container rx-why-grid">
        <div className="rx-why-side">
          <SplitHeading lines={['Small team.', 'Senior attention.']} italicLines={[1]} className="h-lg" />
          <p className="lead">Fewer projects, closer work. The people you talk to are the people who build it.</p>
          <Reveal delay={0.15}>
            <Button href="/contact" variant="line">Talk to the team</Button>
          </Reveal>
        </div>

        <div className="rx-why-list">
          {cards.map((c, i) => (
            <Reveal key={c.t} dir="right" delay={(i % 2) * 0.08} className="rx-why-card">
              <span className="rx-why-no">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
