import Link from 'next/link';
import { posts } from '@/data/posts';
import { fmtDate } from '@/lib/format';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';

export default function Insights() {
  return (
    <section className="section insights">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="kicker">Insights</p>
            <SplitHeading lines={['Ideas for your', 'next good move.']} italicLines={[1]} className="h-lg" />
          </div>
          <Button href="/blog" variant="line">Visit blog</Button>
        </div>
        <ul className="ins-list">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06} y={24}>
              <Link href={`/blog/${p.slug}`} className="ins-row" data-cursor-label="Read">
                <span className="ins-date">{fmtDate(p.date)}</span>
                <span className="ins-title">{p.title}</span>
                <span className="ins-cat">{p.category}</span>
                <span className="ins-arrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
