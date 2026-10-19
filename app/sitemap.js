import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { posts } from '@/data/posts';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap() {
  const pages = ['', '/about', '/services', '/portfolio', '/blog', '/contact'].map((p) => ({ url: `${base}${p}` }));
  return [
    ...pages,
    ...services.map((s) => ({ url: `${base}/services/${s.slug}` })),
    ...projects.map((p) => ({ url: `${base}/portfolio/${p.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];
}
