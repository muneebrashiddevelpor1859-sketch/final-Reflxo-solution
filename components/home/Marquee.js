'use client';
import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const items = ['Strategy', 'Digital experiences', 'Brand systems', 'AI & automation', 'E-commerce', 'Growth'];

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Star = () => (
  <svg className="mq-star" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 1v22M2.5 6.5l19 11M2.5 17.5l19-11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
  </svg>
);

// Big type band. It drifts on its own, accelerates in the direction you scroll and leans into the motion.
export default function Marquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [7, 0, -7], { clamp: true });
  const dir = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) dir.current = 1;
    else if (b > 0.05) dir.current = -1;
    let move = -1 * 2.2 * (delta / 1000);
    move += dir.current * Math.abs(move) * Math.abs(b);
    base.set(wrap(-25, 0, base.get() + move));
  });
  const x = useTransform(base, (v) => `${v}%`);

  const set = (key) => (
    <div className="marquee-row" key={key} aria-hidden={key !== 0}>
      {items.map((item, i) => (
        <span className={`marquee-item ${i % 2 ? 'is-outline' : ''}`} key={item}>
          {item}
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <section className="marquee" aria-label="Our capabilities">
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map(set)}
      </motion.div>
    </section>
  );
}
