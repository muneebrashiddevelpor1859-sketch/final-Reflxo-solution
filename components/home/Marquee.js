import Ticker from '../ui/Ticker';

const items = ['Strategy', 'Web design', 'Brand systems', 'AI & automation', 'E-commerce', 'Growth'];

export default function Marquee() {
  return <Ticker items={items} className="ticker-xl" label="Our capabilities" />;
}
