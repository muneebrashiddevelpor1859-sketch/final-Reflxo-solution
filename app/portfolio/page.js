import PageHero from '@/components/ui/PageHero';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';

export const metadata = {
  title: 'Portfolio & Case Studies',
  description: 'Selected projects and case studies from Reflexo Solutions across web, branding, AI automation and AI agents.',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        kicker="Portfolio"
        lines={['Work that earns', 'its place.']}
        italicLines={[1]}
        text="A selection of recent projects. Open any of them for the full case study: the problem, what we built and the result."
      />
      <PortfolioGrid />
    </>
  );
}
