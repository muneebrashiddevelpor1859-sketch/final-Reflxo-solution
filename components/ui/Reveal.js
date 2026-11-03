'use client';
import { motion } from 'framer-motion';

// Scroll-in reveal with one fixed timing everywhere.
// dir: 'up' (default) | 'left' | 'right'  - left/right slide the block in from the side.
const DURATION = 0.9;
const SIDE = 90;

export default function Reveal({ children, delay = 0, y = 40, x = 0, dir = 'up', className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div;
  const from = dir === 'left' ? { opacity: 0, x: -SIDE, y: 0 } : dir === 'right' ? { opacity: 0, x: SIDE, y: 0 } : { opacity: 0, x, y };
  return (
    <Tag
      className={className}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: DURATION, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
