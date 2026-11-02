import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import SplitHeading from '@/components/ui/SplitHeading';
import ServiceRows from '@/components/services/ServiceRows';
import Process from '@/components/home/Process';
import ToolsBand from '@/components/home/ToolsBand';

export const metadata = {
  title: 'Services',
  description: 'Web development, graphic design, UI/UX, AI automation, AI agents and more from Reflexo Solutions.',
};

const trust = [
  ['Start with a written brief', 'Goals, audience and constraints are clear before design begins.'],
  ['Shape the direction together', 'Review wireframes and a visual direction, then refine before build.'],
  ['Review real working progress', 'Get a staging link you can open, with weekly project updates.'],
  ['Keep improving after launch', 'Deployment, monitoring and ongoing support are part of the process.'],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        lines={['Make the next', 'move matter.']}
        italicLines={[1]}
        text="Brand, web and AI, connected into one clear digital direction for your business."
      />

      <section className="section srv-list">
        <div className="container">
          <ServiceRows />
        </div>
      </section>

      <section className="section trust">
        <div className="container trust-grid">
          <div>
            <p className="kicker">A clearer way to build</p>
            <SplitHeading lines={['You stay in the loop,', 'at every step.']} italicLines={[1]} className="h-lg" />
            <p className="lead">See the plan, shape the direction, and review the work before it goes live.</p>
            <Link href="/portfolio" className="textlink">See selected work <span aria-hidden="true">↗</span></Link>
          </div>
          <ul className="trust-list">
            {trust.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.06} y={24}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <ToolsBand />
    </>
  );
}
