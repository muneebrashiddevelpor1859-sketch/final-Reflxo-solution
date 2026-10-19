import SplitHeading from '@/components/ui/SplitHeading';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SxRadar from '@/components/services/SxRadar';
import SxPanels from '@/components/services/SxPanels';
import SxLoop from '@/components/services/SxLoop';
import SxCta from '@/components/services/SxCta';
import { services } from '@/data/services';
import { process as steps } from '@/data/site';
import '@/components/services/sx.css';

export const metadata = {
  title: 'Services',
  description: 'Web development, graphic design, UI/UX, AI automation, AI agents and more from Reflexo Solutions.',
};

export default function ServicesPage() {
  return (
    <div className="sx-page">
      <section className="sx-hero">
        <div className="container sx-hero-grid">
          <div className="sx-hero-copy">
            <SplitHeading
              as="h1"
              lines={['Make the next', 'move matter.']}
              italicLines={[1]}
              immediate
              delay={0.15}
              className="sx-hero-title"
            />
            <Reveal delay={0.5} y={20}>
              <p className="sx-hero-text">Brand, web and AI, connected into one clear digital direction for your business.</p>
              <a href="#sx-panels" className="sx-hero-link">
                <span>Explore capabilities</span>
                <i aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <Reveal className="sx-hero-visual" delay={0.25} y={0}>
            <SxRadar labels={services.map((s) => s.title)} />
          </Reveal>
        </div>
      </section>

      <section className="sx-trust-section" aria-labelledby="sx-trust-title">
        <div className="container sx-trust-grid">
          <div className="sx-trust-intro">
            <p className="sx-trust-kicker"><span aria-hidden="true" /> A CLEARER WAY TO BUILD</p>
            <h2 id="sx-trust-title">You stay in the loop, at every step.</h2>
            <p className="sx-trust-summary">See the plan, shape the direction, and review the work before it goes live.</p>
            <Link href="/portfolio" className="sx-trust-link">
              <span>See selected work</span>
              <i aria-hidden="true" />
            </Link>
          </div>
          <ul className="sx-trust-points">
            <li>
              <span className="sx-trust-number">01</span>
              <div><h3>Start with a written brief</h3><p>Goals, audience and constraints are clear before design begins.</p></div>
            </li>
            <li>
              <span className="sx-trust-number">02</span>
              <div><h3>Shape the direction together</h3><p>Review wireframes and a visual direction, then refine before build.</p></div>
            </li>
            <li>
              <span className="sx-trust-number">03</span>
              <div><h3>Review real working progress</h3><p>Get a staging link you can open, with weekly project updates.</p></div>
            </li>
            <li>
              <span className="sx-trust-number">04</span>
              <div><h3>Keep improving after launch</h3><p>Deployment, monitoring and ongoing support are part of the process.</p></div>
            </li>
          </ul>
        </div>
      </section>

      <section id="sx-panels" className="sx-panels-section">
        <div className="container">
          <div className="sx-section-head">
            <h2>What we do for you</h2>
            <p>Point at a panel to open it. Each one is a complete service, built to work on its own or together.</p>
          </div>
          <SxPanels services={services} />
        </div>
      </section>

      <section className="sx-loop-section">
        <div className="container">
          <div className="sx-section-head sx-section-head-wide">
            <h2>How a project unfolds</h2>
            <p>One focused team, a shared plan, and no surprises between the first conversation and launch.</p>
          </div>
          <SxLoop steps={steps} />
        </div>
      </section>

      <SxCta
        title="Not sure which one you need?"
        text="Tell us what you are trying to achieve. We will point you to the right starting place."
        services={services}
      />
    </div>
  );
}
