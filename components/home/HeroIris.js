'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const SIDES = 6;
const STOPS = ['1.4', '2', '2.8', '4', '5.6', '8'];
const TICKS = Array.from({ length: 72 }, (_, i) => i);

export const SLIDES = [
  { n: '01', label: 'Brand & strategy', src: '/images/office/o03.jpg', alt: 'Designer reviewing an interface on a laptop' },
  { n: '02', label: 'Digital experiences', src: '/images/office/o04.jpg', alt: 'Developers working at their desks' },
  { n: '03', label: 'AI & automation', src: '/images/office/o06.jpg', alt: 'Team discussing charts on a whiteboard' },
];

const poly = (r, deg) =>
  Array.from({ length: SIDES }, (_, i) => {
    const a = ((deg + i * (360 / SIDES) - 90) * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });

// A real lens aperture: six blades that open when the page loads, turn with the pointer and the scroll,
// and "snap" shut for a moment every time the picture inside changes - like taking a photograph.
export default function HeroIris({ ready, active, onPick }) {
  const reduce = useReducedMotion();
  const open = useMotionValue(0);
  const px = useMotionValue(0);
  const pxs = useSpring(px, { stiffness: 70, damping: 16 });
  const { scrollY } = useScroll();
  const spin = useTransform(scrollY, [0, 900], [0, 60]);
  const rot = useTransform([pxs, spin], ([a, b]) => a * 18 + b + 10);
  const radius = useTransform(open, (o) => 3 + o * 44);
  const pts = useTransform([radius, rot], ([r, d]) => poly(r, d));
  const clip = useTransform(pts, (p) => `polygon(${p.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(',')})`);
  const svgPts = useTransform(pts, (p) => p.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' '));
  const blades = useTransform([pts, rot], ([p, d]) =>
    p
      .map(([x, y], i) => {
        const a = ((d + i * (360 / SIDES) - 90 + 44) * Math.PI) / 180;
        return `M${x.toFixed(2)} ${y.toFixed(2)}L${(50 + 49 * Math.cos(a)).toFixed(2)} ${(50 + 49 * Math.sin(a)).toFixed(2)}`;
      })
      .join('')
  );

  const [shown, setShown] = useState(active);

  // opening
  useEffect(() => {
    if (!ready) return undefined;
    if (reduce) {
      open.set(1);
      return undefined;
    }
    const c = animate(open, 1, { duration: 1.8, ease: [0.76, 0, 0.24, 1] });
    return () => c.stop();
  }, [ready, reduce, open]);

  // shutter snap whenever the slide changes (picture is swapped while the aperture is nearly closed)
  useEffect(() => {
    if (active === shown) return undefined;
    if (reduce) {
      setShown(active);
      return undefined;
    }
    const c = animate(open, [1, 0.12, 1], { duration: 0.9, times: [0, 0.42, 1], ease: 'easeInOut' });
    const t = setTimeout(() => setShown(active), 370);
    return () => {
      clearTimeout(t);
      c.stop();
    };
  }, [active, shown, reduce, open]);

  // the lens leans towards the pointer
  useEffect(() => {
    const move = (e) => px.set((e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [px]);

  return (
    <div className="iris" aria-hidden="true">
      {/* lens bezel: tick marks and f-stop numbers */}
      <svg className="iris-bezel" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="49.2" className="iris-ring" />
        <circle cx="50" cy="50" r="46.2" className="iris-ring iris-ring-thin" />
        <g className="iris-ticks">
          {TICKS.map((i) => {
            const a = (i * 5 * Math.PI) / 180;
            const long = i % 6 === 0;
            const r1 = long ? 46.2 : 47.2;
            return <line key={i} x1={50 + r1 * Math.cos(a)} y1={50 + r1 * Math.sin(a)} x2={50 + 49.2 * Math.cos(a)} y2={50 + 49.2 * Math.sin(a)} />;
          })}
        </g>
      </svg>

      <motion.div className="iris-media" style={{ clipPath: clip }}>
        {SLIDES.map((s, i) => (
          <img key={s.src} src={s.src} alt="" className={i === shown ? 'is-on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
        <span className="iris-shade" />
      </motion.div>

      <svg className="iris-blades" viewBox="0 0 100 100">
        <motion.polygon points={svgPts} className="iris-edge" />
        <motion.path d={blades} className="iris-blade" />
      </svg>

      <span className="iris-pin" />

      <ul className="iris-stops">
        {STOPS.map((s, i) => (
          <li key={s} style={{ '--i': i }}><span>{s}</span></li>
        ))}
      </ul>

      <p className="iris-cap">
        <b>{SLIDES[shown].n}</b> {SLIDES[shown].label}
        <i>f / {STOPS[(shown * 2 + 1) % STOPS.length]}</i>
      </p>
    </div>
  );
}
