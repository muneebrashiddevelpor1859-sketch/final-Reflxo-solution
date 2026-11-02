// A band whose background (video or image) stays still while the page scrolls over it.
// The wrapper clips the media (clip-path), the media itself is position: fixed - see .fx in globals.css.
// veil: 'fx-veil' (light fade from the left) | 'fx-veil-full' (even light wash) | 'fx-veil-ink' (deep navy-gold, for white text)
export default function FixedMedia({
  as: Tag = 'section',
  video,
  image,
  poster = '/videos/hero-poster.jpg',
  veil = 'fx-veil',
  glow = true,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`fx ${veil}${glow ? ' fx-glow' : ''} ${className}`.trim()} {...rest}>
      <div className="fx-media" aria-hidden="true">
        {video ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={poster}>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" />
        )}
      </div>
      {children}
    </Tag>
  );
}
