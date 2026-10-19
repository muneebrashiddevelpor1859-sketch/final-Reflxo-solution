import SplitHeading from './SplitHeading';
import Reveal from './Reveal';

// Header block reused by inner pages: oversized title, viewfinder corners, hairline footer.
export default function PageHero({
  lines,
  text,
  kicker,
  italicLines = [],
  video = false,
  className = '',
  index,
}) {
  const src = typeof video === 'string' ? video : '/videos/blog.mp4';

  return (
    <section className={`page-hero${video ? ' has-video' : ''} ${className}`.trim()}>
      {video && (
        <div className="page-hero-video" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto">
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="container page-hero-content">
        <div className="ph-top">
          {kicker && (
            <Reveal y={12}>
              <p className="kicker">{kicker}</p>
            </Reveal>
          )}
          {index && <span className="ph-index">{index}</span>}
        </div>
        <SplitHeading as="h1" lines={lines} immediate delay={0.15} italicLines={italicLines} className="display" />
        {text && (
          <Reveal delay={0.5} y={24}>
            <p className="lead ph-lead">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
