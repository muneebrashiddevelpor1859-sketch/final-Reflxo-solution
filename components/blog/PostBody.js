'use client';
import Link from 'next/link';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import PostCard, { fmtDate } from './PostCard';

export default function PostBody({ post, related }) {
  return (
    <article className="article journal-article">
      <header className="page-hero journal-article-hero">
        <div className="container container-narrow">
          <Reveal y={14}>
            <Link href="/blog" className="back">&larr; All articles</Link>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <p className="post-meta post-meta-hero">
              <span>{post.category}</span>
              <span>{fmtDate(post.date)}</span>
              <span>{post.read} read</span>
            </p>
          </Reveal>
          <SplitHeading as="h1" lines={[post.title]} immediate delay={0.1} className="display display-sm" />
        </div>
      </header>

      <div className="container journal-reading">
        <aside className="journal-reading-aside">
          <span>In this note</span>
          <ol>
            {post.body.filter((block) => block.t === 'h').map((block, index) => (
              <li key={block.c}><i>{String(index + 1).padStart(2, '0')}</i>{block.c}</li>
            ))}
          </ol>
        </aside>
        <div className="prose">
          {post.body.map((b, i) =>
            b.t === 'h' ? (
              <Reveal key={i} as="h2">
                <span className="journal-heading-index">{String(post.body.slice(0, i + 1).filter((block) => block.t === 'h').length).padStart(2, '0')}</span>
                {b.c}
              </Reveal>
            ) : (
              <Reveal key={i} as="p" y={24}>{b.c}</Reveal>
            )
          )}
          <div className="prose-cta">
            <p className="h3">Have a similar problem?</p>
            <Button href="/contact">Talk to us</Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container related">
          <h2 className="h3">Keep reading</h2>
          <div className="blog-grid">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
