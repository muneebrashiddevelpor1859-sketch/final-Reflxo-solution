'use client';
import { useState } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';
import { photoFor } from '@/data/photos';
import FixedMedia from '../ui/FixedMedia';
import SplitHeading from '../ui/SplitHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

// Dark band over a fixed video. Panels expand on hover - the active one opens to show details.
export default function ServicesShowcase() {
  const [on, setOn] = useState(0);

  return (
    <FixedMedia
      className="rx-dark rx-round rx-svc"
      video="/videos/5725949-uhd_3840_2160_30fps.mp4"
      veil="fx-veil-black"
      glow={false}
      id="services"
      aria-label="Our services"
    >
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="kicker">What we do</p>
            <SplitHeading lines={['Everything your', 'brand needs online.']} italicLines={[1]} className="h-lg" />
          </div>
          <Button href="/services" variant="line">All services</Button>
        </div>

        <Reveal y={50}>
          <div className="rx-acc" role="list">
            {services.map((s, i) => {
              const active = on === i;
              return (
                <div
                  key={s.slug}
                  role="listitem"
                  tabIndex={0}
                  className={`rx-pan${active ? ' is-on' : ''}`}
                  onMouseEnter={() => setOn(i)}
                  onFocus={() => setOn(i)}
                  onClick={() => setOn(i)}
                >
                  <div className="rx-pan-bg" style={{ backgroundImage: `url(${photoFor(s.slug).src})` }} aria-hidden="true" />
                  <div className="rx-pan-in">
                    <span className="rx-pan-no">{String(i + 1).padStart(2, '0')}</span>
                    <div className="rx-pan-body">
                      <h3 className="rx-pan-title">{s.title}</h3>
                      <div className="rx-pan-more">
                        <p>{s.short}</p>
                        <ul>
                          {s.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}
                        </ul>
                        <Link href={`/services/${s.slug}`} className="rx-pan-link" tabIndex={active ? 0 : -1} data-cursor-label="Explore">
                          Explore service <span aria-hidden="true">↗</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </FixedMedia>
  );
}
