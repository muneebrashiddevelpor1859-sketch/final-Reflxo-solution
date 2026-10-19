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
      <div className="filters" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            className={`filter ${active === c ? 'is-active' : ''}`}
            onClick={() => setActive(c)}
          >
            {active === c && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="filter-label">{c}</span>
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
