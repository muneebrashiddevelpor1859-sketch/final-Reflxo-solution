// Fixed background picture behind an inner-page hero (stays still while the page scrolls).
export default function PheroBg({ src = '/images/office/o03.jpg' }) {
  return (
    <div className="phero-bg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" />
    </div>
  );
}
