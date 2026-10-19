'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Cover from '../ui/Cover';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      layout
      className="pcard-wrap"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/portfolio/${project.slug}`} className="pcard" data-cursor-label="View">
        <div className="pcard-media crop">
          <Cover title={project.title} hue={project.hue} image={project.image} />
        </div>
        <div className="pcard-meta">
          <span className="pcard-no">{String(index + 1).padStart(2, '0')}</span>
          <h3>{project.title}</h3>
          <span className="pcard-cat">{project.category}</span>
        </div>
        <p className="pcard-sum">{project.summary}</p>
      </Link>
    </motion.div>
  );
}
