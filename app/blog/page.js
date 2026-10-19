import BlogList from '@/components/blog/BlogList';
import PageHero from '@/components/ui/PageHero';

export const metadata = {
  title: 'Blog',
  description: 'Practical writing on web development, branding, AI automation and AI agents from Reflexo Solutions.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Journal / Field notes"
        index="(04)"
        lines={['Ideas for your', 'next good move.']}
        italicLines={[1]}
        text="Clear thinking on digital strategy, design and technology, and the small details that make a difference."
      />
      <BlogList />
    </>
  );
}
