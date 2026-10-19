import { OFFICE } from '@/data/photos';

// Two endless rows of team photographs drifting in opposite directions (pure CSS, pauses on hover).
function Row({ items, reverse }) {
  const list = [...items, ...items];
  return (
    <div className={`pstrip-row${reverse ? ' is-reverse' : ''}`}>
      <div className="pstrip-track">
        {list.map((p, i) => (
          <figure className="pstrip-item" key={`${p.src}-${i}`} aria-hidden={i >= items.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={i < items.length ? p.alt : ''} loading="lazy" />
            <figcaption>{String((i % items.length) + 1).padStart(2, '0')}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PhotoStrip() {
  const a = OFFICE.slice(0, 6);
  const b = OFFICE.slice(5).concat(OFFICE.slice(0, 1));
  return (
    <section className="pstrip" aria-label="The team at work">
      <Row items={a} />
      <Row items={b} reverse />
    </section>
  );
}
