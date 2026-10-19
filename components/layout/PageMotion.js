'use client';
import { usePathname } from 'next/navigation';

// Keys the page on route change so every page mounts fresh (reveals replay, templates re-run).
export default function PageMotion({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-motion">
      {children}
    </div>
  );
}
