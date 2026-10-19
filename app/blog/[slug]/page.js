import { notFound } from 'next/navigation';
import PostBody from '@/components/blog/PostBody';
import { posts } from '@/data/posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default function PostPage({ params }) {
  const post = posts.find((x) => x.slug === params.slug);
  if (!post) notFound();
  const related = posts.filter((x) => x.slug !== post.slug).slice(0, 2);
  return <PostBody post={post} related={related} />;
}
