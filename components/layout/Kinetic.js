'use client';
import { useEffect } from 'react';

// Pure visual helper. It renders nothing and touches no data:
//  - --px / --py on the home hero: pointer position (-1..1) for the parallax glow
//  - window.__iris: last click position, so the page-transition aperture closes onto it
export default function Kinetic() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const click = (e) => {
      window.__iris = { x: Math.round(e.clientX), y: Math.round(e.clientY) };
    };
    window.addEventListener('pointerdown', click, { passive: true });

    let raf = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let hero = null;
    const step = () => {
      px += (tx - px) * 0.1;
      py += (ty - py) * 0.1;
      if (hero) {
        hero.style.setProperty('--px', px.toFixed(3));
        hero.style.setProperty('--py', py.toFixed(3));
      }
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.003 ? requestAnimationFrame(step) : 0;
    };
    const move = (e) => {
      hero = document.querySelector('.hx');
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      if (r.bottom < 0) return; // hero is off screen: do nothing
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(step);
    };
    if (fine && !reduce) window.addEventListener('pointermove', move, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', click);
      window.removeEventListener('pointermove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
