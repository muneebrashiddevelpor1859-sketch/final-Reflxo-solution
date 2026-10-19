'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Full-width photo band: the picture drifts and zooms slowly as you scroll past it.
export default function ParallaxBand({ src, alt = '', caption, tag }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.08, 1.2]);
  const clip = useTransform(scrollYProgress, [0, 0.25], ['inset(12% 8% 12% 8%)', 'inset(0% 0% 0% 0%)']);
  return (
    <section className="pband" ref={ref} aria-label={alt}>
      <motion.div className="pband-frame" style={{ clipPath: clip }}>
        <motion.img src={src} alt={alt} style={{ y, scale }} loading="lazy" />
        <span className="pband-shade" aria-hidden="true" />
        {(caption || tag) && (
          <div className="container pband-cap">
            {tag && <span className="pband-tag">{tag}</span>}
            {caption && <p>{caption}</p>}
          </div>
        )}
      </motion.div>
    </section>
  );
}
