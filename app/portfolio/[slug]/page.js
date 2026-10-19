import { notFound } from 'next/navigation';
import CaseStudy from '@/components/portfolio/CaseStudy';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  return p ? { title: `${p.title} - Case study`, description: p.summary } : {};
}

export default function CaseStudyPage({ params }) {
  const i = projects.findIndex((x) => x.slug === params.slug);
  if (i === -1) notFound();
  const next = projects[(i + 1) % projects.length];
  return <CaseStudy project={projects[i]} next={next} />;
}
