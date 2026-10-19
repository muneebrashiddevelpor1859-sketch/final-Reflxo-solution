'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { services } from '@/data/services';
import Photo from '../ui/Photo';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';

// An index, not a card grid: rows fill with ink on hover and a unique artwork follows the pointer.
export default function ServicesList() {
  const [hover, setHover] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => setMounted(true), []);

  const move = (e) => {
    x.set(e.clientX + 28);
    y.set(e.clientY - 110);
  };

  return (
    <section className="section svx" aria-labelledby="home-services-title">
      <div className="container">
        <div className="svx-head">
          <div>
            <SplitHeading lines={['What we do.']} className="h2 svx-title" />
          </div>
          <div className="svx-intro">
            <p>Brand, web and automation, brought together around the problem your business needs to solve.</p>
            <Button href="/services" variant="line" magnetic={false}>Explore all services</Button>
          </div>
        </div>

        <ul className="svx-list" onMouseMove={move} onMouseLeave={() => setHover(-1)}>
          {services.map((s, i) => (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="svx-row"
                data-cursor
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(-1)}
              >
                <span className="svx-no">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svx-name">{s.title}</h3>
                <p className="svx-short">{s.short}</p>
                <span className="svx-group">{s.group}</span>
                <span className="svx-arrow" aria-hidden="true">↗</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {hover > -1 && (
              <motion.div
                className="svx-preview"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <Photo key={services[hover].slug} seed={services[hover].slug} reveal={false} />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
