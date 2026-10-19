// Text that rolls up and is replaced by a copy on hover. Parent needs the `has-roll` class.
export default function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">{children}</span>
    </span>
  );
}
