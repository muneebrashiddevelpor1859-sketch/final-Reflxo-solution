'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { posts } from '@/data/posts';
import Cover from '../ui/Cover';
import { fmtDate } from './PostCard';

export default function BlogList() {
  const [first, ...rest] = posts;
  return (
    <section className="container journal-list">
      <p className="journal-section-label"><span>01</span> Latest thinking <i /></p>

      <motion.div
        className="journal-feature"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href={`/blog/${first.slug}`} className="journal-feature-image crop" data-cursor-label="Read">
          <Cover title={first.title} hue={first.hue} image={first.image} />
          <span className="journal-feature-stamp">Featured note / 01</span>
        </Link>
        <div className="journal-feature-copy">
          <div className="journal-meta">
            <span>{first.category}</span>
            <span>{fmtDate(first.date)}</span>
            <span>{first.read} read</span>
          </div>
          <h2><Link href={`/blog/${first.slug}`}>{first.title}</Link></h2>
          <p>{first.excerpt}</p>
          <Link className="journal-read" href={`/blog/${first.slug}`}>
            Read the article <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </motion.div>

      <div className="journal-archive">
        {rest.map((post, index) => (
          <motion.article
            className="journal-row"
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="journal-row-number">{String(index + 2).padStart(2, '0')}</span>
            <div className="journal-row-image">
              <Cover title={post.title} hue={post.hue} image={post.image} />
            </div>
            <div className="journal-row-copy">
              <div className="journal-meta">
                <span>{post.category}</span>
                <span>{fmtDate(post.date)}</span>
                <span>{post.read} read</span>
              </div>
              <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
            </div>
            <Link className="journal-row-link" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>↗</Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
