import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export const metadata = {
  title: 'Contact',
  description: 'Start a project with Reflexo Solutions. Tell us what you want to build.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        lines={["Let's talk about", 'your project.']}
        italicLines={[1]}
        text="Fill in the form and it lands straight in our inbox. Prefer chat? Use the button at the bottom right."
      />
      <section className="container contact-grid">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
        <ContactInfo />
      </section>
    </>
  );
}
