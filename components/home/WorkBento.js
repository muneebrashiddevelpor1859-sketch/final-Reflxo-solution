import Link from 'next/link';
import { projects } from '@/data/projects';
import Cover from '../ui/Cover';
import Parallax from '../ui/Parallax';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import SplitHeading from '../ui/SplitHeading';

// Bento grid of selected work. Images drift with scroll, cards slide in from alternating sides.
export default function WorkBento() {
  return (
    <section className="section rx-work" id="work" aria-label="Selected work">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="kicker">Selected work</p>
            <SplitHeading lines={['Work that earns', 'its place.']} italicLines={[1]} className="h-lg" />
          </div>
          <Button href="/portfolio" variant="solid">See full portfolio</Button>
        </div>

        <div className="rx-bento">
          {projects.slice(0, 6).map((p, i) => (
            <Reveal key={p.slug} dir={i % 2 === 0 ? 'left' : 'right'} className="rx-cell">
              <Link href={`/portfolio/${p.slug}`} className="rx-pj" data-cursor-label="View">
                <div className="rx-pj-media">
                  <Parallax className="rx-par">
                    <Cover title={p.title} image={p.image} />
                  </Parallax>
                </div>
                <span className="rx-pj-shade" aria-hidden="true" />
                <span className="rx-pj-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="rx-pj-go" aria-hidden="true">↗</span>
                <div className="rx-pj-info">
                  <ul className="rx-pj-tags">
                    <li>{p.category}</li>
                    <li>{p.year}</li>
                  </ul>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
