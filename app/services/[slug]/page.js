import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SxRoll from '@/components/services/SxRoll';
import SxIris from '@/components/services/SxIris';
import SxReel from '@/components/services/SxReel';
import SxNext from '@/components/services/SxNext';
import { services } from '@/data/services';
import '@/components/services/sx.css';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const service = services.find(({ slug }) => slug === params.slug);
  if (!service) return {};
  return { title: service.title, description: service.short };
}

export default function ServiceDetailPage({ params }) {
  const index = services.findIndex(({ slug }) => slug === params.slug);
  if (index === -1) notFound();

  const service = services[index];
  const number = String(index + 1).padStart(2, '0');
  const next = services[(index + 1) % services.length];

  return (
    <div className={`sx-page sx-service-page sx-service-page-${index + 1}`}>
      <section className="sx-dhero" aria-labelledby="service-title" data-service-index={number}>
        <div className="container sx-dhero-grid">
          <div className="sx-dhero-copy">
            <div className="sx-crumbs">
              <Link href="/services">Services</Link>
              <span aria-hidden="true">/</span>
              <span>{service.group}</span>
              <span className="sx-crumbs-count">{number} / {String(services.length).padStart(2, '0')}</span>
            </div>
            <SxRoll as="h1" text={service.title} className="sx-dhero-title" />
            <Reveal delay={0.9} y={18}>
              <p className="sx-dhero-summary">{service.short}</p>
              <p className="sx-dhero-long">{service.long}</p>
              <div className="sx-dhero-actions">
                <Button href={`/contact?service=${encodeURIComponent(service.title)}`}>Discuss this service</Button>
                <Link href={`/services/${next.slug}`} className="sx-textlink">
                  <span>Next: {next.title}</span>
                  <i aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
          <SxIris seed={service.slug} group={service.group} title={service.title} index={number} />
        </div>
      </section>

      <section className="sx-assurance" aria-labelledby="sx-assurance-title">
        <div className="container sx-assurance-inner">
          <h2 id="sx-assurance-title">Clear process.<br />Visible progress.</h2>
          <ul className="sx-assurance-list">
            <Reveal as="li" delay={0.04} y={16}><span>01</span><div><h3>Written brief</h3><p>Goals and constraints agreed before design.</p></div></Reveal>
            <Reveal as="li" delay={0.12} y={16}><span>02</span><div><h3>Reviewable work</h3><p>Open a staging link as the build takes shape.</p></div></Reveal>
            <Reveal as="li" delay={0.2} y={16}><span>03</span><div><h3>Weekly updates</h3><p>Know what is moving and what comes next.</p></div></Reveal>
            <Reveal as="li" delay={0.28} y={16}><span>04</span><div><h3>After-launch support</h3><p>Monitoring and support continue after go-live.</p></div></Reveal>
          </ul>
        </div>
      </section>

      <section className="sx-stack-band" aria-label="Tools and platforms">
        <div className="container sx-stack-inner">
          <p>TOOLS &amp; PLATFORMS</p>
          <ul>{service.stack.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="sx-features">
        <div className="container">
          <div className="sx-section-head">
            <h2>What this makes possible</h2>
            <p>Possible deliverables, scoped around your goals and the way your team works.</p>
          </div>
          <SxReel features={service.features} />
        </div>
      </section>

      <SxNext service={next} />
    </div>
  );
}
