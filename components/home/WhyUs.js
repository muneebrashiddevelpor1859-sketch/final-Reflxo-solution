import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';
import Photo from '../ui/Photo';

const cards = [
  { img: '/images/cards/o07-c.jpg', t: 'Design and code, one team', d: 'No hand-offs between agencies. The person who designs a screen also cares how it is built.' },
  { img: '/images/cards/o06-c.jpg', t: 'Automation that fits how you work', d: 'We connect the tools you already use and keep every step visible and easy to change.' },
  { img: '/images/cards/o04-c.jpg', t: 'Fast by default', d: 'Next.js, optimised images and lean code so pages feel instant on a mid-range phone.' },
  { img: '/images/cards/o02-c.jpg', t: 'AI with a human in charge', d: 'Agents handle the repetitive part and hand over to a real person whenever it matters.' },
];

export default function WhyUs() {
  return (
    <section className="section why">
      <div className="container">
        <div className="why-head">
          <div>
            <SplitHeading lines={['Small team.', 'Senior attention.']} italicLines={[1]} className="h2" />
          </div>
          <p className="muted">Fewer projects, closer work. The people you talk to are the people who build it.</p>
        </div>
        <div className="why-grid">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1} y={50} className="why-card">
              <div className="why-photo"><Photo src={c.img} alt={c.t} /></div>
              <span className="why-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
