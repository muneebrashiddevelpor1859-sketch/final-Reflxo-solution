'use client';
import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <section className="container err">
      <p className="kicker">Something broke</p>
      <h1 className="h-xl h-xl-sm">This page hit a snag.</h1>
      <p className="lead">It is on our side, not yours. Try again, or head back to the homepage.</p>
      <div className="err-actions">
        <button className="btn btn-solid" onClick={() => reset()}><span className="btn-label">Try again</span></button>
        <Link className="btn btn-line" href="/"><span className="btn-label">Back home</span></Link>
      </div>
    </section>
  );
}
