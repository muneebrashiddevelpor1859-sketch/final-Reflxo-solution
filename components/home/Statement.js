'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollText from '../ui/ScrollText';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

const collageItems = [
  { normal: '/images/cards/o09-b.jpg', hover: '/images/cards/o05-b.jpg', alt: 'Our studio workspace', cap: 'Fig. 01 — The desk', speed: 40 },
  { normal: '/images/cards/o11-b.jpg', hover: '/images/cards/o01-b.jpg', alt: 'Website design preview', cap: 'Fig. 02 — The screen', speed: -30 },
  { normal: '/images/cards/o02-b.jpg', hover: '/images/cards/o04-b.jpg', alt: 'Strategy and pitch decks', cap: 'Fig. 03 — The plan', speed: 60 },
];

function HoverImage({ item, index }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [item.speed, -item.speed]);

  return (
    <motion.figure
      ref={ref}
      style={{ y }}
      className={`collage-item collage-item-${index + 1}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="collage-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={isHovered ? item.hover : item.normal} alt={item.alt} className="collage-image" loading="lazy" />
      </div>
      <figcaption>{item.cap}</figcaption>
    </motion.figure>
  );
}

export default function Statement() {
  return (
    <section className="section statement">
      <div className="container statement-grid">
        <div className="statement-copy">
          <ScrollText className="statement-text" text="Good digital work starts with the problem, not the platform." />
          <p className="statement-support">
            First we get clear on what needs to change. Then we build what helps.
          </p>
          <Reveal>
            <Button href="/about" variant="line">Meet the studio</Button>
          </Reveal>
        </div>

        <div className="collage" aria-label="Studio photographs">
          {collageItems.map((item, i) => (
            <HoverImage key={item.normal} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
