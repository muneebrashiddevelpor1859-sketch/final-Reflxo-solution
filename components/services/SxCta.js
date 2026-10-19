'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

// Dark call-to-action card with a light that follows the pointer.
export default function SxCta({ title, text, service, services = [], label = 'Start a conversation' }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const href = service ? `/contact?service=${encodeURIComponent(service)}` : '/contact';
  return (
    <section className="sx-cta-section">
      <div className="container">
        <div ref={ref} className="sx-cta" onPointerMove={move}>
          <div className="sx-cta-glow" aria-hidden="true" />
          <h2 className="sx-cta-title">{title}</h2>
          <p className="sx-cta-text">{text}</p>
          <div className="sx-cta-row">
            <Button href={href}>{label}</Button>
            {services.length > 0 && (
              <ul className="sx-cta-pills" aria-label="Services">
                {services.map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
