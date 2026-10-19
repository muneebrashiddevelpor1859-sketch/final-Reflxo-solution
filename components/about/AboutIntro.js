import ScrollText from '../ui/ScrollText';
import Reveal from '../ui/Reveal';
import SplitHeading from '../ui/SplitHeading';
import Button from '../ui/Button';
import ParallaxBand from '../ui/ParallaxBand';
import { process as steps } from '@/data/site';

export default function AboutIntro() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="container about-hero-layout">
          <div className="about-hero-main">
            <div className="ph-top">
              <Reveal y={12}><p className="kicker">About / Reflexo Solutions</p></Reveal>
              <span className="ph-index">(01)</span>
            </div>
            <SplitHeading
              as="h1"
              lines={['We ask first.', 'Then we make.']}
              italicLines={[1]}
              immediate
              delay={0.15}
              className="display"
            />
          </div>
          <aside className="about-hero-aside">
            <Reveal delay={0.3} y={20}>
              <span className="about-hero-aside-label">A small, hands-on digital studio</span>
              <p>We help businesses make their websites, brands and everyday tools work better for real people.</p>
              <Button href="/contact" magnetic={false}>Talk to the studio</Button>
              <span className="about-hero-coordinate">Independent <i /> Working worldwide</span>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="container about-story">
        <figure className="about-media">
          <div className="about-media-frame crop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cards/o07-b.jpg" alt="People reviewing notes around a work table" />
          </div>
          <figcaption>A clear brief gives everyone the same place to start.</figcaption>
        </figure>

        <div className="about-story-copy">
          <span className="about-story-index">01 / The way we work</span>
          <p className="about-story-note">Direct conversations. Thoughtful decisions. No extra layers.</p>
          <span className="about-story-index">02 / What we believe</span>
          <ScrollText
            className="statement-text"
            text="Good digital work should make the next step easier—for your customers and for the people doing the work."
          />
        </div>
      </section>

      <ParallaxBand
        src="/images/office/o05.jpg"
        alt="Team standing around a planning table"
        tag="Inside the studio"
        caption="Direct conversations. Thoughtful decisions. No extra layers."
      />

      <section className="about-process" aria-labelledby="about-process-title">
        <div className="container about-process-layout">
          <div className="about-process-heading">
            <p className="kicker kicker-inv">How a project moves</p>
            <h2 id="about-process-title" className="h2">You see the work as it takes shape.</h2>
            <p>Clear decisions, visible progress, and a next step you can always point to.</p>
          </div>
          <ol className="about-process-list">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} className="about-process-step" delay={index * 0.06} y={14}>
                <span className="about-process-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
