import FixedMedia from '../ui/FixedMedia';
import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';

// Mid-page band: the picture stays fixed while the content glides over it.
export default function Showcase() {
  return (
    <FixedMedia className="showcase" image="/images/office/o07.jpg" veil="fx-veil" aria-label="Why teams choose us">
      <div className="container showcase-in">
        <div className="showcase-copy">
          <SplitHeading lines={['Design that feels', 'considered. Code that', 'stays out of the way.']} italicLines={[2]} className="showcase-quote" />
          <Reveal delay={0.2}>
            <p className="lead">Every page is designed, built and tested by the same small team, so the finished product feels like one thought, not a stack of hand-offs.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button href="/about" variant="line">About the studio</Button>
          </Reveal>
        </div>
        <div className="showcase-cards">
          {[
            ['1 team', 'Strategy, design and engineering under one roof'],
            ['Weekly', 'Working demos on a staging link you can open any day'],
            ['100%', 'Mobile-first, responsive and search-ready'],
            ['24/7', 'AI assistants that answer when your team is away'],
          ].map(([a, b], i) => (
            <Reveal key={a} delay={i * 0.08} y={30}>
              <div className="glass">
                <strong>{a}</strong>
                <span>{b}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </FixedMedia>
  );
}
