'use client';
import { MotionConfig } from 'framer-motion';

// reducedMotion="user": visitors who asked their OS for less motion get calm transitions instead of big animations.
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
