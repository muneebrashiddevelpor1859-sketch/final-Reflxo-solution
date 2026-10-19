'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Photo from '../ui/Photo';

// The accent colour floods in from exactly where the pointer entered, and drains out to where it left.
export default function SxNext({ service }) {
  const ref = useRef(null);
  const set = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty('--y', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <section className="sx-next-section">
      <div className="container">
        <Link ref={ref} href={`/services/${service.slug}`} className="sx-next" onPointerEnter={set} onPointerLeave={set} data-cursor-label="Next">
          <span className="sx-next-small">Up next</span>
          <span className="sx-next-title">{service.title}</span>
          <span className="sx-next-short">{service.short}</span>
          <span className="sx-next-thumb" aria-hidden="true">
            <Photo seed={service.slug} reveal={false} />
          </span>
          <svg className="sx-next-arrow" width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
            <circle cx="27" cy="27" r="26" stroke="currentColor" strokeWidth="1.5" />
            <path d="M19 27h16M29 20l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
