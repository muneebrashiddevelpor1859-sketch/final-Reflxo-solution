'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Cover from '../ui/Cover';

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function PostCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="post" data-cursor-label="Read">
        <div className="post-media crop">
          <Cover title={post.title} hue={post.hue} image={post.image} />
        </div>
        <div className="post-meta">
          <span>{post.category}</span>
          <span>{fmtDate(post.date)}</span>
          <span>{post.read} read</span>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
      </Link>
    </motion.div>
  );
}
