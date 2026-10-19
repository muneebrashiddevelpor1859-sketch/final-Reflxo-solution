'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Giant outlined words slide sideways as you scroll, in opposite directions.
export default function ScrollWord() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['8%', '-38%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-40%', '4%']);
  return (
    <section className="sword" ref={ref} aria-hidden="true">
      <motion.p style={{ x: x1 }}>Design <i>✳</i> Build <i>✳</i> Automate <i>✳</i> Design</motion.p>
      <motion.p className="is-solid" style={{ x: x2 }}>Grow <i>✳</i> Launch <i>✳</i> Improve <i>✳</i> Grow</motion.p>
    </section>
  );
}
