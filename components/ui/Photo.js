'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { photoFor } from '@/data/photos';

// Image that opens like a curtain and settles from a slight zoom when it scrolls into view.
// The element that is watched for scrolling (outer div) is never clipped itself, so the browser always
// reports it correctly - and a 4 second safety timer guarantees the picture is shown in any case.
export default function Photo({ seed, src, alt, className = '', reveal = true, position = 'center' }) {
  const p = src ? { src, alt: alt || '' } : photoFor(seed);
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -6% 0px' });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (!reveal) return undefined;
    const t = setTimeout(() => setForced(true), 4000);
    return () => clearTimeout(t);
  }, [reveal]);

  const show = !reveal || seen || forced;

  return (
    <div ref={ref} className={`photo ${className}`.trim()}>
      <motion.div
        style={{ width: '100%', height: '100%' }}
        initial={reveal ? { clipPath: 'inset(100% 0 0 0)' } : false}
        animate={show ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={p.src}
          alt={alt !== undefined ? alt : p.alt}
          loading="lazy"
          style={{ objectPosition: position }}
          initial={reveal ? { scale: 1.35 } : false}
          animate={show ? { scale: 1 } : undefined}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  );
}
