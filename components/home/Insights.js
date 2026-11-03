import Link from 'next/link';
import { posts } from '@/data/posts';
import { fmtDate } from '@/lib/format';
import Cover from '../ui/Cover';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';

const dirs = ['left', 'up', 'right'];

// Three image cards that arrive from left, below and right.
export default function Insights() {
  return (
    <section className="section rx-ins">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="kicker">Journal</p>
            <SplitHeading lines={['Ideas for your', 'next good move.']} italicLines={[1]} className="h-lg" />
          </div>
          <Button href="/blog" variant="line">Visit blog</Button>
        </div>

        <ul className="rx-ins-grid">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.slug} dir={dirs[i]} delay={i * 0.06}>
              <Link href={`/blog/${p.slug}`} className="rx-post" data-cursor-label="Read">
                <div className="rx-post-media">
                  <Cover title={p.title} image={p.image} />
                  <span className="rx-post-cat">{p.category}</span>
                </div>
                <div className="rx-post-body">
                  <span className="rx-post-date">{fmtDate(p.date)} · {p.read}</span>
                  <h3>{p.title}</h3>
                  <span className="rx-post-go">Read article <i aria-hidden="true">↗</i></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
