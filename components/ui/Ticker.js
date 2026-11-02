// Endless text strip (pure CSS, no JS). `outline` alternates solid / outlined words.
export default function Ticker({ items, className = '', outline = true, label = 'Highlights' }) {
  const row = (key) => (
    <ul className="ticker-row" key={key} aria-hidden={key !== 0}>
      {items.map((item, i) => (
        <li className={outline && i % 2 ? 'is-outline' : ''} key={`${key}-${item}`}>
          {item}
          <svg className="ticker-star" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`ticker ${className}`.trim()} role="region" aria-label={label}>
      <div className="ticker-track">{[0, 1].map(row)}</div>
    </div>
  );
}
