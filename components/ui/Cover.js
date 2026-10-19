import Photo from './Photo';

// Projects / posts cover. Uses a real image if one is set (jpg/png/webp), otherwise a team photo.
const isPlaceholder = (src) => !src || /\.svg(\?|$)/i.test(src);

export default function Cover({ title = '', image, className = '' }) {
  return (
    <div className={`cover ${className}`.trim()}>
      {isPlaceholder(image) ? <Photo seed={title} alt={title} /> : <Photo src={image} alt={title} />}
    </div>
  );
}
