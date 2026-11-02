import SplitHeading from './SplitHeading';
import Reveal from './Reveal';
import PheroBg from './PheroBg';

// Every inner page gets its own fixed background picture.
const BG = {
  services: '/images/office/o04.jpg',
  portfolio: '/images/office/o08.jpg',
  blog: '/images/office/o06.jpg',
  contact: '/images/office/o01.jpg',
};

// Header block for inner pages: refined title, short lead, fixed picture behind a soft pearl veil.
export default function PageHero({ lines, text, kicker, italicLines = [], className = '', index, image, children }) {
  const bg = image || BG[(kicker || '').toLowerCase()] || '/images/office/o03.jpg';
  return (
    <section className={`phero ${className}`.trim()}>
      <PheroBg src={bg} />
      <div className="container">
        <div className="phero-top">
          {kicker ? (
            <Reveal y={12}>
              <p className="kicker">{kicker}</p>
            </Reveal>
          ) : (
            <span />
          )}
          {index && <span className="phero-index">{index}</span>}
        </div>
        <SplitHeading as="h1" lines={lines} immediate delay={0.1} italicLines={italicLines} className="h-xl" />
        {text && (
          <Reveal delay={0.4} y={20}>
            <p className="lead phero-lead">{text}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
