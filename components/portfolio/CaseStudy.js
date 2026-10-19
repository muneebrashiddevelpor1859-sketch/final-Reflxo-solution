'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Cover from '../ui/Cover';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function CaseStudy({ project, next }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <article className="case">
      <header className="page-hero case-hero">
        <div className="container">
          <Reveal y={14}>
            <Link href="/portfolio" className="back">&larr; All projects</Link>
          </Reveal>
          <SplitHeading as="h1" lines={[project.title]} immediate delay={0.1} className="display" />
          <Reveal delay={0.4} y={20}>
            <p className="lead">{project.summary}</p>
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

        <div className="case-visual crop" ref={ref}>
          <div className="case-visual-clip">
            <motion.div className="case-visual-inner" style={{ y }}>
              <Cover title={project.title} hue={project.hue} image={project.image} />
            </motion.div>
          </div>
        </div>

        <div className="case-text">
          <Reveal>
            <h2 className="h3"><span>01</span> The challenge</h2>
            <p>{project.challenge}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h3"><span>02</span> What we did</h2>
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
          <Link href={`/portfolio/${next.slug}`} className="case-next" data-cursor-label="Next">
            <span>Next project</span>
            <strong>{next.title}</strong>
          </Link>
        )}
        <div className="case-cta">
          <p className="h3">Want results like these?</p>
          <Button href={`/contact?service=${encodeURIComponent(project.category)}`}>Start a project</Button>
        </div>
      </div>
    </article>
  );
}
