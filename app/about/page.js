import AboutIntro from '@/components/about/AboutIntro';
import Values from '@/components/about/Values';
import Process from '@/components/home/Process';
import ToolsBand from '@/components/home/ToolsBand';

export const metadata = {
  title: 'About',
  description: 'Reflexo Solutions is a small senior studio combining web development, design and AI.',
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Values />
      <Process tone="dark" />
      <ToolsBand />
    </>
  );
}
