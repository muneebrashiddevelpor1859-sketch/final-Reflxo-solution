import Link from 'next/link';
import { posts } from '@/data/posts';
import { fmtDate } from '@/lib/format';
import Cover from '../ui/Cover';
import Reveal from '../ui/Reveal';

export default function BlogList() {
  const [first, ...rest] = posts;
  return (
    <section className="container journal">
      <Reveal y={50}>
        <article className="jfeature">
          <Link href={`/blog/${first.slug}`} className="jfeature-media" data-cursor-label="Read">
            <Cover title={first.title} hue={first.hue} image={first.image} />
            <span className="jfeature-stamp">Featured</span>
          </Link>
          <div className="jfeature-copy">
            <div className="post-meta">
              <span>{first.category}</span>
              <span>{fmtDate(first.date)}</span>
              <span>{first.read} read</span>
            </div>
            <h2><Link href={`/blog/${first.slug}`}>{first.title}</Link></h2>
            <p>{first.excerpt}</p>
            <Link className="jfeature-link" href={`/blog/${first.slug}`}>Read the article <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      </Reveal>

      <div className="jlist">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.05} y={28}>
            <Link className="jrow" href={`/blog/${post.slug}`} data-cursor-label="Read">
              <span className="jrow-no">{String(i + 2).padStart(2, '0')}</span>
              <div className="jrow-media"><Cover title={post.title} hue={post.hue} image={post.image} /></div>
              <div className="jrow-copy">
                <div className="post-meta">
                  <span>{post.category}</span>
                  <span>{fmtDate(post.date)}</span>
                  <span>{post.read} read</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <span className="jrow-arrow" aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
