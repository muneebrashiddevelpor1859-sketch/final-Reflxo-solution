import ScrollText from '../ui/ScrollText';
import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import PheroBg from '../ui/PheroBg';

export default function AboutIntro() {
  return (
    <>
      <section className="phero about-hero">
        <PheroBg src="/images/office/o09.jpg" />
        <div className="container">
          <div className="phero-top">
            <p className="kicker">About the studio</p>
            <span className="phero-index">Independent · Working worldwide</span>
          </div>
          <SplitHeading as="h1" lines={['We ask first.', 'Then we make.']} italicLines={[1]} immediate delay={0.1} className="h-xl" />
          <Reveal delay={0.4} y={20}>
            <div className="about-hero-row">
              <p className="lead">We help businesses make their websites, brands and everyday tools work better for real people.</p>
              <Button href="/contact">Talk to the studio</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container about-story">
        <figure className="about-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/cards/o07-b.jpg" alt="People reviewing notes around a work table" />
          <figcaption>A clear brief gives everyone the same place to start.</figcaption>
        </figure>
        <div className="about-story-copy">
          <p className="kicker">What we believe</p>
          <ScrollText className="intro-text intro-text-sm" text="Good digital work should make the next step easier, for your customers and for the people doing the work." />
          <p className="lead">Direct conversations. Thoughtful decisions. No extra layers.</p>
        </div>
      </section>

      <section className="about-band" aria-label="Inside the studio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/office/o05.jpg" alt="Team standing around a planning table" />
      </section>
    </>
  );
}
