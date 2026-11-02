'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Cover from '../ui/Cover';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';

// Dark case-study slider: native scroll-snap, arrows, progress line.
export default function WorkSlider() {
  const track = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, left: 0, moved: false });

  const down = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
    setDragging(true);
  };
  const move = (e) => {
    if (!dragging) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    track.current.scrollLeft = drag.current.left - dx;
  };
  const up = () => setDragging(false);
  // a drag must not count as a click on a card
  const block = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('.wcard');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="section work" aria-labelledby="work-title">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="kicker kicker-inv">Selected work</p>
            <SplitHeading lines={['Work that earns', 'its place.']} italicLines={[1]} className="h-lg" />
          </div>
          <Button href="/portfolio" variant="inv">See full portfolio</Button>
        </div>
      </div>

      <div className={`wtrack${dragging ? ' is-drag' : ''}`} ref={track} onScroll={onScroll} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onClickCapture={block} tabIndex={0} aria-label="Case studies, scroll sideways">
        {projects.map((p, i) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="wcard" data-cursor-label="View">
            <div className="wcard-media">
              <Cover title={p.title} hue={p.hue} image={p.image} />
              <span className="wcard-no">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="wcard-meta">
              <ul className="wcard-tags">
                <li>{p.category}</li>
                <li>{p.year}</li>
              </ul>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="container wctrl">
        <span className="wbar" aria-hidden="true"><span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} /></span>
        <div className="warrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous project">←</button>
          <button type="button" onClick={() => go(1)} aria-label="Next project">→</button>
        </div>
      </div>
    </section>
  );
}
