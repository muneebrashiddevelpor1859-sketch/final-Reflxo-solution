'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Photo from '../ui/Photo';

function Panel({ s, active, onActivate, onIntent, onLeave }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });

  const move = (e) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -34);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -24);
  };

  return (
    <article
      id={s.slug}
      className={`sx-panel${active ? ' is-active' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onIntent()}
      onPointerLeave={onLeave}
      onPointerMove={move}
      onFocus={onActivate}
    >
      <div className="sx-panel-art" aria-hidden="true">
        <motion.div className="sx-panel-artwrap" style={{ x, y }}>
          <Photo seed={s.slug} reveal={false} />
        </motion.div>
      </div>
      <div className="sx-panel-shade" aria-hidden="true" />

      <div className="sx-panel-closed" aria-hidden={active}>
        <span className="sx-panel-vert">{s.title}</span>
        <span className="sx-panel-plus" aria-hidden="true" />
      </div>

      <div className="sx-panel-open" {...(active ? {} : { inert: '' })}>
        <p className="sx-panel-group">{s.group}</p>
        <h2 className="sx-panel-title">{s.title}</h2>
        <p className="sx-panel-short">{s.short}</p>
        <ul className="sx-panel-feats">
          {s.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <div className="sx-panel-actions">
          <Link href={`/services/${s.slug}`} className="sx-pill sx-pill-solid" data-cursor-label="Open">See the details</Link>
          <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className="sx-pill sx-pill-ghost">Discuss this</Link>
        </div>
      </div>

      {!active && (
        <button type="button" className="sx-panel-hit" onClick={onActivate} aria-label={`Show ${s.title}`} />
      )}
    </article>
  );
}

// Expanding column panels: hover / focus / tap opens one, the rest fold into vertical strips.
export default function SxPanels({ services }) {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const idx = services.findIndex((s) => s.slug === hash);
    if (idx > -1) setActive(idx);
    return () => clearTimeout(timer.current);
  }, [services]);

  return (
    <div className="sx-panels" role="list">
      {services.map((s, i) => (
        <Panel
          key={s.slug}
          s={s}
          active={active === i}
          onActivate={() => setActive(i)}
          onIntent={() => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setActive(i), 70);
          }}
          onLeave={() => clearTimeout(timer.current)}
        />
      ))}
    </div>
  );
}
