'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { categories, projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function PortfolioGrid() {
  const [active, setActive] = useState('All');
  const list = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="container portfolio">
      <div className="tabs" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={active === c} className={`tab${active === c ? ' is-active' : ''}`} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="pgrid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && <p className="muted">No projects in this category yet.</p>}
    </section>
  );
}
