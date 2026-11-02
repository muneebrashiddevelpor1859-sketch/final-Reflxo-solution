'use client';
import Link from 'next/link';
import Cover from '../ui/Cover';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import PheroBg from '../ui/PheroBg';

export default function CaseStudy({ project, next }) {
  return (
    <article className="case">
      <header className="phero case-hero">
        <PheroBg src="/images/office/o10.jpg" />
        <div className="container">
          <Reveal y={14}>
            <Link href="/portfolio" className="back">&larr; All projects</Link>
          </Reveal>
          <SplitHeading as="h1" lines={[project.title]} immediate delay={0.1} className="h-xl" />
          <Reveal delay={0.4} y={20}>
            <p className="lead phero-lead">{project.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="container">
        <Reveal>
          <dl className="case-meta">
            <div><dt>Client</dt><dd>{project.client}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
            <div><dt>Services</dt><dd>{project.services.join(', ')}</dd></div>
            <div><dt>Stack</dt><dd>{project.stack.join(', ')}</dd></div>
          </dl>
        </Reveal>

        <Reveal y={50}>
          <div className="case-visual">
            <Cover title={project.title} hue={project.hue} image={project.image} />
          </div>
        </Reveal>

        <div className="case-text">
          <Reveal>
            <h2 className="h-md"><span>01</span> The challenge</h2>
            <p>{project.challenge}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-md"><span>02</span> What we did</h2>
            <p>{project.solution}</p>
          </Reveal>
        </div>
      </div>

      <div className="case-results-band">
        <div className="container case-results">
          {project.results.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.1}>
              <div className="result">
                <span className="result-value">{r.value}</span>
                <span className="result-label">{r.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container">
        {next && (
          <Link href={`/portfolio/${next.slug}`} className="next-block" data-cursor-label="Next">
            <span>Next project</span>
            <strong>{next.title}</strong>
            <i aria-hidden="true">→</i>
          </Link>
        )}
        <div className="case-cta">
          <p className="h-md">Want results like these?</p>
          <Button href={`/contact?service=${encodeURIComponent(project.category)}`}>Start a project</Button>
        </div>
      </div>
    </article>
  );
}
