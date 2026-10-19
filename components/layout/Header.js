'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav, site } from '@/data/site';
import { services, groups } from '@/data/services';
import Photo from '../ui/Photo';
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
    setSolid(y > 40);
    setHidden(y > prev && y > 220 && !open);
  });

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  }, [open]);

  const showSolid = (solid || drop) && !open;
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className={`header ${showSolid ? 'is-solid' : ''} ${open ? 'is-menu' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header-inner">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            <span className="logo-mark" aria-hidden="true">R</span>
            <span className="logo-text">
              Reflexo <small>Solutions</small>
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Main">
            {nav.slice(1, 5).map((n, ni) =>
              n.href === '/services' ? (
                <div
                  key={n.href}
                  className="nav-item has-drop"
                  onMouseEnter={() => setDrop(true)}
                  onMouseLeave={() => setDrop(false)}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDrop(false)}
                  onKeyDown={(e) => e.key === 'Escape' && setDrop(false)}
                >
                  <Link
                    href={n.href}
                    className={`nav-link has-roll ${isActive(n.href) ? 'is-active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={drop}
                    onFocus={() => setDrop(true)}
                  >
                    <sup>0{ni + 1}</sup>
                    <Roll>{n.label}</Roll>
                  </Link>
                  <AnimatePresence>
                    {drop && (
                      <motion.div
                        className="drop-wrap"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      >
                        <div className="drop">
                          <div className="drop-cols">
                            {groups.map((g, groupIndex) => (
                              <div className="drop-col" key={g}>
                                <p className="drop-label"><span>0{groupIndex + 1}</span>{g}</p>
                                <ul className="drop-service-list">
                                  {services
                                    .filter((s) => s.group === g)
                                    .map((s) => (
                                      <li key={s.slug}>
                                        <Link href={`/services/${s.slug}`} className="drop-link" onClick={() => setDrop(false)}>
                                          <span className="drop-ico" aria-hidden="true"><Photo seed={s.slug} reveal={false} /></span>
                                          <span className="drop-txt">
                                            <strong>{s.title}</strong>
                                            <small>{s.short}</small>
                                          </span>
                                          <span className="drop-link-arrow" aria-hidden="true">↗</span>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="drop-side">
                            <span className="drop-side-index">REFLEXO / SERVICES</span>
                            <p className="drop-side-title">Start with what needs to change.</p>
                            <p className="drop-side-copy">Tell us where the friction is. We will help find the right next step.</p>
                            <Link href="/contact" className="drop-cta" onClick={() => setDrop(false)}>
                              Find your starting point <span aria-hidden="true">↗</span>
                            </Link>
                            <Link href="/services" className="drop-all" onClick={() => setDrop(false)}>
                              Explore all services <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="nav-item" key={n.href}>
                  <Link href={n.href} className={`nav-link has-roll ${isActive(n.href) ? 'is-active' : ''}`}>
                    <sup>0{ni + 1}</sup>
                    <Roll>{n.label}</Roll>
                  </Link>
                </div>
              )
            )}
          </nav>

          <div className="header-right">
            <Link href="/contact" className="header-cta has-roll">
              <span className="header-cta-dot" aria-hidden="true" />
              <Roll>Start a project</Roll>
            </Link>
            <button
              className={`burger ${open ? 'is-open' : ''}`}
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
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu-nav" aria-label="Menu">
              {nav.map((n, i) => (
                <div className="menu-item-mask" key={n.href}>
                  <motion.div
                    className="menu-row"
                    initial={{ y: '110%' }}
                    animate={{ y: 0, transition: { delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                  >
                    <span className="menu-no">0{i + 1}</span>
                    <Link href={n.href} className={`menu-link ${isActive(n.href) ? 'is-active' : ''}`}>
                      {n.label}
                    </Link>
                    {n.href === '/services' && (
                      <button type="button" className="menu-sub-toggle" onClick={() => setSub((v) => !v)} aria-expanded={sub} aria-label="Show services">
                        {sub ? '\u2212' : '+'}
                      </button>
                    )}
                  </motion.div>
                  {n.href === '/services' && sub && (
                    <ul className="menu-sub">
                      {services.map((sv) => (
                        <li key={sv.slug}>
                          <Link href={`/services/${sv.slug}`} onClick={() => setOpen(false)}>{sv.title}</Link>
                        </li>
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
