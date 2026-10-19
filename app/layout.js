import '@fontsource-variable/manrope';
import '@fontsource-variable/sora';
import './globals.css';
import './agency.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Preloader from '@/components/layout/Preloader';
import Cursor from '@/components/layout/Cursor';
import Spotlight from '@/components/layout/Spotlight';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageMotion from '@/components/layout/PageMotion';
import ChatWidget from '@/components/chat/ChatWidget';
import Providers from '@/components/layout/Providers';
import { site } from '@/data/site';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: `${site.name} | Web, Design & AI Solutions`, template: `%s | ${site.name}` },
  description:
    'Reflexo Solutions is an IT studio building websites, graphics, AI automation and AI agents for ambitious brands.',
  openGraph: {
    title: `${site.name} | Web, Design & AI Solutions`,
    description: 'Websites, graphics, AI automation and AI agents for ambitious brands.',
    type: 'website',
  },
};

export const viewport = { themeColor: '#ede9e0' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Providers>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <Spotlight />
          <Header />
          <main id="main"><PageMotion>{children}</PageMotion></main>
          <Footer />
          <ChatWidget />
        </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
