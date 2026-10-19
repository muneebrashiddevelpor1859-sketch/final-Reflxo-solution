'use client';
import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <section className="container" style={{ minHeight: '70vh', display: 'grid', alignContent: 'center', gap: '1.25rem', paddingBlock: '8rem 4rem' }}>
      <p className="kicker">Something broke</p>
      <h1 className="display" style={{ fontSize: 'clamp(1.872rem, 4.68vw, 3.9rem)' }}>This page hit a snag.</h1>
      <p style={{ maxWidth: '34rem' }}>It is on our side, not yours. Try again, or head back to the homepage.</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button className="btn btn-solid" onClick={() => reset()} style={{ padding: '1rem 1.6rem' }}>Try again</button>
        <Link className="btn" href="/" style={{ padding: '1rem 1.6rem' }}>Back home</Link>
      </div>
    </section>
  );
}
