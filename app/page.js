import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Statement from '@/components/home/Statement';
import Stats from '@/components/home/Stats';
import ServicesList from '@/components/home/ServicesList';
import WorkScroll from '@/components/home/WorkScroll';
import WhyUs from '@/components/home/WhyUs';
import PhotoStrip from '@/components/home/PhotoStrip';
import ScrollWord from '@/components/home/ScrollWord';
import Process from '@/components/home/Process';
import Faq from '@/components/home/Faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Stats />
      <PhotoStrip />
      <ServicesList />
      <WorkScroll />
      <WhyUs />
      <Process />
      <ScrollWord />
      <Faq />
    </>
  );
}
