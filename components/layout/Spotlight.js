'use client';
import { useEffect } from 'react';

// Cards that get a soft glow under the pointer (styles live in agency.css)
const CARDS = '.why-card, .process-card, .value, .about-hero-aside, .form-done, .stats-grid > .stat, .faq-list li, .case-meta > div';

// Pure visual helper: writes the pointer position into CSS variables. Renders nothing, touches no data.
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let raf = 0;
    let last = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const { x, y, target } = last;

      const hero = document.querySelector('.hero-lens');
      if (hero) {
        const r = hero.getBoundingClientRect();
        if (y >= r.top && y <= r.bottom) {
          hero.style.setProperty('--gx', `${x - r.left}px`);
          hero.style.setProperty('--gy', `${y - r.top}px`);
        }
      }

      const card = target && target.closest ? target.closest(CARDS) : null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--sx', `${x - r.left}px`);
        card.style.setProperty('--sy', `${y - r.top}px`);
      }
    };

    const move = (e) => {
      last = { x: e.clientX, y: e.clientY, target: e.target };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
