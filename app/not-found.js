import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <PageHero lines={['This page', 'does not exist.']} text="The link may be old or mistyped. Head back and keep exploring." />
      <div className="container" style={{ paddingBottom: '10rem' }}>
        <Button href="/">Back to home</Button>
      </div>
    </>
  );
}
