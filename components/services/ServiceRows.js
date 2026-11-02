'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { services, groups } from '@/data/services';
import { photoFor } from '@/data/photos';
import FollowImage from '../ui/FollowImage';

// Tabbed, numbered list of services. Hovering a row makes its picture trail the pointer.
export default function ServiceRows() {
  const tabs = ['All', ...groups];
  const [tab, setTab] = useState('All');
  const [hover, setHover] = useState(null);
  const list = tab === 'All' ? services : services.filter((s) => s.group === tab);

  return (
    <div className="srows">
      <div className="tabs" role="tablist" aria-label="Service groups">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={`tab${tab === t ? ' is-active' : ''}`} onClick={() => setTab(t)}>
            {t}
            <sup>{t === 'All' ? services.length : services.filter((s) => s.group === t).length}</sup>
          </button>
        ))}
      </div>

      <ul className="srows-list" onMouseLeave={() => setHover(null)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((s) => {
            const no = String(services.indexOf(s) + 1).padStart(2, '0');
            return (
              <motion.li
                layout
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/services/${s.slug}`} className="srow" onMouseEnter={() => setHover(photoFor(s.slug).src)} data-cursor-label="Explore">
                  <span className="srow-no">{no}</span>
                  <span className="srow-title">{s.title}</span>
                  <span className="srow-text">{s.short}</span>
                  <span className="srow-arrow" aria-hidden="true">↗</span>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
      <FollowImage src={hover} />
    </div>
  );
}
