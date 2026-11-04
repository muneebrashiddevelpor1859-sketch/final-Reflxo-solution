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
      <div className="portfolio-heading">
        <div>
          <h2 className="h-lg">Built to make a difference.</h2>
        </div>
        <p className="portfolio-count"><strong>{String(list.length).padStart(2, '0')}</strong> projects</p>
      </div>

      <div className="tabs" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={active === c} className={`tab${active === c ? ' is-active' : ''}`} onClick={() => setActive(c)}>
            {c}
            <sup>{c === 'All' ? projects.length : projects.filter((project) => project.category === c).length}</sup>
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
