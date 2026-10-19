'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Photo from '../ui/Photo';

// Image opens like a camera aperture, then drifts with scroll. Badge text turns around the corner.
export default function SxIris({ seed, group, title, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  return (
    <figure ref={ref} className={`sx-iris sx-iris-${index}`}>
      <div className="sx-iris-meta"><span>{group}</span><span>FIELD NOTE / {index}</span></div>
      <motion.div
        className="sx-iris-reveal"
        initial={{ clipPath: 'inset(100% 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0)' }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="sx-iris-mask">
          <motion.div className="sx-iris-zoom" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div className="sx-iris-art" style={{ y }}>
              <Photo seed={seed} reveal={false} />
            </motion.div>
          </motion.div>
          <span className="sx-iris-image-index" aria-hidden="true">{index}</span>
        </div>
      </motion.div>
      <figcaption className="sx-iris-caption"><span>{title}</span><span aria-hidden="true">↗</span></figcaption>
    </figure>
  );
}
