'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav, site } from '@/data/site';
import { services, groups } from '@/data/services';
import Roll from '../ui/Roll';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [drop, setDrop] = useState(false);
  const [sub, setSub] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > prev && y > 260 && !open && !drop);
  });

  useEffect(() => {
    setOpen(false);
    setDrop(false);
    setSub(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) (open ? window.__lenis.stop() : window.__lenis.start());
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const links = nav.filter((n) => n.href !== '/' && n.href !== '/contact');

  return (
    <>
      <motion.header
        className={`hd${solid || drop ? ' is-solid' : ''}${open ? ' is-menu' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hd-in">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            <span className="logo-mark" aria-hidden="true">R</span>
            <span className="logo-text">Reflexo<small>Solutions</small></span>
          </Link>

          <nav className="nav" aria-label="Main">
            {links.map((n) =>
              n.href === '/services' ? (
                <div
                  key={n.href}
                  className="nav-item"
                  onMouseEnter={() => setDrop(true)}
                  onMouseLeave={() => setDrop(false)}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDrop(false)}
                  onKeyDown={(e) => e.key === 'Escape' && setDrop(false)}
                >
                  <Link
                    href={n.href}
                    className={`nav-link${isActive(n.href) ? ' is-active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={drop}
                    onFocus={() => setDrop(true)}
                  >
                    {n.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </Link>
                  <AnimatePresence>
                    {drop && (
                      <motion.div
                        className="mega"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="mega-in">
                          <div className="mega-cols">
                            {groups.map((g, gi) => (
                              <div className="mega-col" key={g}>
                                <p className="mega-label"><span>0{gi + 1}</span>{g}</p>
                                <ul>
                                  {services.filter((s) => s.group === g).map((s) => (
                                    <li key={s.slug}>
                                      <Link href={`/services/${s.slug}`} className="mega-link" onClick={() => setDrop(false)}>
                                        <strong>{s.title}</strong>
                                        <small>{s.short}</small>
                                        <span aria-hidden="true">↗</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="mega-side">
                            <p className="mega-side-title">Start with what needs to change.</p>
                            <p>Tell us where the friction is. We will help find the right next step.</p>
                            <Link href="/contact" className="mega-cta" onClick={() => setDrop(false)}>
                              Find your starting point <span aria-hidden="true">↗</span>
                            </Link>
                            <Link href="/services" className="mega-all" onClick={() => setDrop(false)}>
                              Explore all services →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="nav-item" key={n.href}>
                  <Link href={n.href} className={`nav-link${isActive(n.href) ? ' is-active' : ''}`}>{n.label}</Link>
                </div>
              )
            )}
          </nav>

          <div className="hd-right">
            <Link href="/contact" className="hd-cta has-roll">
              <Roll>Let&apos;s talk</Roll>
              <span aria-hidden="true">↗</span>
            </Link>
            <button
              className={`burger${open ? ' is-open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu-nav" aria-label="Menu">
              {nav.map((n, i) => (
                <div className="menu-mask" key={n.href}>
                  <motion.div
                    className="menu-row"
                    initial={{ y: '110%' }}
                    animate={{ y: 0, transition: { delay: 0.25 + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ y: '110%', transition: { duration: 0.25 } }}
                  >
                    <span className="menu-no">0{i + 1}</span>
                    <Link href={n.href} className={`menu-link${isActive(n.href) ? ' is-active' : ''}`}>{n.label}</Link>
                    {n.href === '/services' && (
                      <button type="button" className="menu-toggle" onClick={() => setSub((v) => !v)} aria-expanded={sub} aria-label="Show services">
                        {sub ? '\u2212' : '+'}
                      </button>
                    )}
                  </motion.div>
                  {n.href === '/services' && sub && (
                    <ul className="menu-sub">
                      {services.map((sv) => (
                        <li key={sv.slug}><Link href={`/services/${sv.slug}`} onClick={() => setOpen(false)}>{sv.title}</Link></li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
            <div className="menu-foot">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>{site.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
