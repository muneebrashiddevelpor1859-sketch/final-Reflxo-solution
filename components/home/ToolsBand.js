import Ticker from '../ui/Ticker';
import Reveal from '../ui/Reveal';

const tools = ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Figma', 'Illustrator', 'n8n', 'OpenAI', 'Claude API', 'Docker', 'AWS', 'Shopify'];

export default function ToolsBand() {
  return (
    <section className="tools" aria-label="Tools we trust">
      <div className="container">
        <Reveal><p className="kicker">The tools we trust</p></Reveal>
      </div>
      <Ticker items={tools} outline={false} className="ticker-md" label="Tools and platforms" />
    </section>
  );
}
