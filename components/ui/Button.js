'use client';
import Link from 'next/link';
import Magnetic from './Magnetic';
import Roll from './Roll';

// variant: 'solid' (ink) | 'line' (outline) | 'inv' (for dark sections) | 'lime' (accent). 'signal' = 'lime'.
export default function Button({ href, children, variant = 'solid', onClick, type, disabled, magnetic = true }) {
  const body = (
    <>
      <span className="btn-label"><Roll>{children}</Roll></span>
      <span className="btn-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 13L13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
  const cls = `btn btn-${variant === 'signal' ? 'lime' : variant} has-roll`;
  const inner = href ? (
    <Link href={href} className={cls} onClick={onClick}>{body}</Link>
  ) : (
    <button type={type || 'button'} className={cls} onClick={onClick} disabled={disabled}>{body}</button>
  );
  return magnetic ? <Magnetic strength={0.18}>{inner}</Magnetic> : inner;
}
