import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Intro from '@/components/home/Intro';
import WorkSlider from '@/components/home/WorkSlider';
import WhyUs from '@/components/home/WhyUs';
import Approach from '@/components/home/Approach';
import ToolsBand from '@/components/home/ToolsBand';
import Insights from '@/components/home/Insights';
import Faq from '@/components/home/Faq';
import Showcase from '@/components/home/Showcase';
import ServiceRows from '@/components/services/ServiceRows';
import SplitHeading from '@/components/ui/SplitHeading';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />

      <section className="section services-home" aria-labelledby="services-title">
        <div className="container">
          <div className="sec-head">
            <div>
              <SplitHeading lines={['Everything your', 'brand needs online.']} italicLines={[1]} className="h-lg" />
            </div>
            <Button href="/services" variant="line">All services</Button>
          </div>
          <ServiceRows />
        </div>
      </section>

      <WorkSlider />
      <Showcase />
      <WhyUs />
      <Approach />
      <ToolsBand />
      <Insights />
      <Faq />
    </>
  );
}
