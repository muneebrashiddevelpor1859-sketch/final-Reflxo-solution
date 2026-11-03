import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Manifesto from '@/components/home/Manifesto';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import WorkBento from '@/components/home/WorkBento';
import Showcase from '@/components/home/Showcase';
import WhyUs from '@/components/home/WhyUs';
import Approach from '@/components/home/Approach';
import ToolsBand from '@/components/home/ToolsBand';
import Insights from '@/components/home/Insights';
import Faq from '@/components/home/Faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <ServicesShowcase />
      <WorkBento />
      <Showcase />
      <WhyUs />
      <Approach />
      <ToolsBand />
      <Insights />
      <Faq />
    </>
  );
}
