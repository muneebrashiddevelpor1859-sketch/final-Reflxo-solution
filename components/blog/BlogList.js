import Link from 'next/link';
import { posts } from '@/data/posts';
import { fmtDate } from '@/lib/format';
import Cover from '../ui/Cover';
import Reveal from '../ui/Reveal';

export default function BlogList() {
  const [first, ...rest] = posts;
  return (
    <section className="container journal">
      <div className="journal-heading">
        <div>
          <h2 className="h-lg">Ideas worth your time.</h2>
        </div>
        <p className="journal-count"><strong>{String(posts.length).padStart(2, '0')}</strong> articles</p>
      </div>

      <Reveal y={50}>
        <article className="jfeature">
          <Link href={`/blog/${first.slug}`} className="jfeature-media" data-cursor-label="Read">
            <Cover title={first.title} hue={first.hue} image={first.image} />
            <span className="jfeature-stamp">Featured</span>
            <span className="jfeature-arrow" aria-hidden="true">↗</span>
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
            <article className="jcard">
              <Link className="jcard-link" href={`/blog/${post.slug}`} data-cursor-label="Read">
                <div className="jcard-media">
                  <Cover title={post.title} hue={post.hue} image={post.image} />
                  <span className="jcard-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="jcard-copy">
                  <div className="post-meta">
                    <span>{post.category}</span>
                    <span>{fmtDate(post.date)}</span>
                    <span>{post.read} read</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
