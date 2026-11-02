import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import PheroBg from '@/components/ui/PheroBg';
import SplitHeading from '@/components/ui/SplitHeading';
import Photo from '@/components/ui/Photo';
import { services } from '@/data/services';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const service = services.find(({ slug }) => slug === params.slug);
  if (!service) return {};
  return { title: service.title, description: service.short };
}

const assurance = [
  ['Written brief', 'Goals and constraints agreed before design.'],
  ['Reviewable work', 'Open a staging link as the build takes shape.'],
  ['Weekly updates', 'Know what is moving and what comes next.'],
  ['After-launch support', 'Monitoring and support continue after go-live.'],
];

export default function ServiceDetailPage({ params }) {
  const index = services.findIndex(({ slug }) => slug === params.slug);
  if (index === -1) notFound();

  const service = services[index];
  const number = String(index + 1).padStart(2, '0');
  const next = services[(index + 1) % services.length];

  return (
    <>
      <section className="phero sdetail-hero">
        <PheroBg src={`/images/office/o0${(index % 9) + 1}.jpg`} />
        <div className="container">
          <div className="phero-top">
            <p className="crumbs">
              <Link href="/services">Services</Link>
              <span aria-hidden="true">/</span>
              <span>{service.group}</span>
            </p>
            <span className="phero-index">{number} / {String(services.length).padStart(2, '0')}</span>
          </div>
          <SplitHeading as="h1" lines={[service.title]} immediate delay={0.1} className="h-xl" />
          <div className="sdetail-grid">
            <Reveal delay={0.35} y={24}>
              <p className="sdetail-short">{service.short}</p>
              <p className="lead">{service.long}</p>
              <div className="sdetail-actions">
                <Button href={`/contact?service=${encodeURIComponent(service.title)}`}>Discuss this service</Button>
                <Link href={`/services/${next.slug}`} className="textlink">Next: {next.title} <span aria-hidden="true">→</span></Link>
              </div>
            </Reveal>
            <div className="sdetail-photo">
              <Photo seed={service.slug} alt={service.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="section sdetail-features">
        <div className="container">
          <div className="sec-head">
            <div>
              <SplitHeading lines={['Possible deliverables,', 'scoped around you.']} italicLines={[1]} className="h-lg" />
            </div>
          </div>
          <ol className="flist">
            {service.features.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 0.05} y={24}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{f}</strong>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sdetail-assure">
        <div className="container">
          <div className="sec-head">
            <div>
              <SplitHeading lines={['Clear process.', 'Visible progress.']} italicLines={[1]} className="h-lg" />
            </div>
          </div>
          <ul className="assure-grid">
            {assurance.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.06} y={24}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section sdetail-stack" aria-label="Tools and platforms">
        <div className="container">
          <p className="kicker">Tools &amp; platforms</p>
          <ul className="chips">
            {service.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <div className="container">
        <Link href={`/services/${next.slug}`} className="next-block" data-cursor-label="Next">
          <span>Next service</span>
          <strong>{next.title}</strong>
          <i aria-hidden="true">→</i>
        </Link>
      </div>
    </>
  );
}
