import Link from 'next/link';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import PheroBg from '../ui/PheroBg';
import PostCard from './PostCard';
import { fmtDate } from '@/lib/format';

export default function PostBody({ post, related }) {
  let h = 0;
  return (
    <article className="article">
      <header className="phero article-hero">
        <PheroBg src="/images/office/o11.jpg" />
        <div className="container container-narrow">
          <Reveal y={14}>
            <Link href="/blog" className="back">&larr; All articles</Link>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <p className="post-meta">
              <span>{post.category}</span>
              <span>{fmtDate(post.date)}</span>
              <span>{post.read} read</span>
            </p>
          </Reveal>
          <SplitHeading as="h1" lines={[post.title]} immediate delay={0.1} className="h-xl h-xl-sm" />
        </div>
      </header>

      <div className="container reading">
        <aside className="reading-aside">
          <span>In this article</span>
          <ol>
            {post.body.filter((b) => b.t === 'h').map((b, i) => (
              <li key={b.c}><i>{String(i + 1).padStart(2, '0')}</i>{b.c}</li>
            ))}
          </ol>
        </aside>
        <div className="prose">
          {post.body.map((b, i) => {
            if (b.t === 'h') {
              h += 1;
              return (
                <Reveal key={i} as="h2">
                  <span className="prose-no">{String(h).padStart(2, '0')}</span>
                  {b.c}
                </Reveal>
              );
            }
            return <Reveal key={i} as="p" y={24}>{b.c}</Reveal>;
          })}
          <div className="prose-cta">
            <p className="h-md">Have a similar problem?</p>
            <Button href="/contact">Talk to us</Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container related">
          <h2 className="h-md">Keep reading</h2>
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
