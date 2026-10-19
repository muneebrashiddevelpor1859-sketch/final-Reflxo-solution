import Reveal from '../ui/Reveal';

const tools = ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Figma', 'Illustrator', 'n8n', 'OpenAI', 'Claude API', 'Docker', 'AWS', 'Shopify'];

export default function StackBand() {
  return (
    <section className="section stackband">
      <div className="container">
        <Reveal>
          <p className="kicker">Our working toolkit</p>
          <h2 className="h2">The tools we trust</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="chips chips-lg">
            {tools.map((t) => (
              <li key={t}><span aria-hidden="true">+</span>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
