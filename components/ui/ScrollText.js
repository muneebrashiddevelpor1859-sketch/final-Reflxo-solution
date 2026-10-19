'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="scroll-word">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  );
}

// Each word lights up as you scroll through the paragraph
export default function ScrollText({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={`scroll-text ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}
