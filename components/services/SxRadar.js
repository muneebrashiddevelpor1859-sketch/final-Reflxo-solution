'use client';
import { useEffect, useRef } from 'react';

const N = 48;
const CX = 200;
const CY = 200;
const R0 = 72;

// Cursor-reactive radar: spokes stretch toward the pointer, the ring of service names turns with scroll.
export default function SxRadar({ labels = [] }) {
  const svgRef = useRef(null);
  const ringRef = useRef(null);
  const spokes = useRef([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const len = new Array(N).fill(8);
    const pointer = { on: false, angle: 0, power: 0 };
    let visible = true;
    let raf = 0;
    let t = 0;

    const paint = () => {
      for (let i = 0; i < N; i += 1) {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2;
        let target = 8 + ((Math.sin(t * 1.1 + i * 0.45) + 1) / 2) * 9;
        if (pointer.on) {
          let d = a - pointer.angle;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          target += 52 * pointer.power * Math.exp(-(d * d) / (2 * 0.36 * 0.36));
        }
        len[i] += (target - len[i]) * 0.14;
        const el = spokes.current[i];
        if (!el) continue;
        const r1 = R0 + len[i];
        el.setAttribute('x1', (CX + Math.cos(a) * R0).toFixed(2));
        el.setAttribute('y1', (CY + Math.sin(a) * R0).toFixed(2));
        el.setAttribute('x2', (CX + Math.cos(a) * r1).toFixed(2));
        el.setAttribute('y2', (CY + Math.sin(a) * r1).toFixed(2));
      }
      if (ringRef.current) {
        ringRef.current.setAttribute('transform', `rotate(${(window.scrollY * 0.1 + t * 7).toFixed(2)} ${CX} ${CY})`);
      }
    };

    const loop = (now) => {
      t = now / 1000;
      if (visible) paint();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      pointer.angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);
      pointer.power = Math.max(0.25, 1 - dist / (Math.max(window.innerWidth, 800) * 0.7));
      pointer.on = true;
    };
    const onLeave = () => { pointer.on = false; };

    paint();
    if (reduce) return undefined;

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(svg);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const ringText = `${labels.join('   +   ')}   +   `;

  return (
    <svg ref={svgRef} className="sx-radar" viewBox="0 0 400 400" role="img" aria-label="Reflexo capabilities radar">
      <defs>
        <linearGradient id="sx-radar-g" gradientUnits="userSpaceOnUse" x1="60" y1="60" x2="340" y2="340">
          <stop offset="0" stopColor="#10100E" />
          <stop offset="0.6" stopColor="#10100E" />
          <stop offset="1" stopColor="#FF4A1C" />
        </linearGradient>
        <path id="sx-radar-ring" d="M 200 200 m -170 0 a 170 170 0 1 1 340 0 a 170 170 0 1 1 -340 0" />
      </defs>
      <g ref={ringRef}>
        <text className="sx-radar-ring-text">
          <textPath href="#sx-radar-ring" textLength={2 * Math.PI * 170 - 8} lengthAdjust="spacing">{ringText}</textPath>
        </text>
      </g>
      <g stroke="url(#sx-radar-g)" strokeWidth="3.2" strokeLinecap="round">
        {Array.from({ length: N }).map((_, i) => (
          <line key={i} ref={(el) => { spokes.current[i] = el; }} x1={CX} y1={CY} x2={CX} y2={CY} />
        ))}
      </g>
      <circle cx={CX} cy={CY} r="56" fill="#FF4A1C" />
      <text x={CX} y={CY + 6} textAnchor="middle" className="sx-radar-count">{labels.length}</text>
      <text x={CX} y={CY + 30} textAnchor="middle" className="sx-radar-sub">capabilities</text>
    </svg>
  );
}
