'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { sendChat } from '@/lib/api';
import './chat.css';

const STORE = 'reflexo-chat-v1';
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const uid = () => (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36));

const greeting = {
  from: 'bot',
  text: 'Hi, welcome to Reflexo. Tell us what you want to build and we will get back to you.',
};

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [launcherOverlapsAction, setLauncherOverlapsAction] = useState(false);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState({ id: '', name: '', email: '' });
  const [messages, setMessages] = useState([greeting]);
  const [intro, setIntro] = useState({ name: '', email: '' });
  const [introErr, setIntroErr] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottom = useRef(null);

  // restore chat from this browser
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved?.session?.id) {
        setSession(saved.session);
        setMessages(saved.messages?.length ? saved.messages : [greeting]);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORE, JSON.stringify({ session, messages }));
    } catch {}
  }, [session, messages, ready]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing, open]);

  useEffect(() => {
    let frame = 0;
    const updateOverlap = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const launcher = document.querySelector('.rc-fab');
        if (!launcher) return;

        const launcherBounds = launcher.getBoundingClientRect();
        const overlapsAction = Array.from(
          document.querySelectorAll('.btn, button:not(.rc-fab), [role="button"]')
        ).some((action) => {
          if (action.closest('.rc')) return false;
          const bounds = action.getBoundingClientRect();
          const style = window.getComputedStyle(action);
          if (
            style.visibility === 'hidden' ||
            Number(style.opacity) === 0 ||
            bounds.width === 0 ||
            bounds.height === 0
          ) return false;

          return (
            bounds.left < launcherBounds.right &&
            bounds.right > launcherBounds.left &&
            bounds.top < launcherBounds.bottom &&
            bounds.bottom > launcherBounds.top
          );
        });

        setLauncherOverlapsAction(overlapsAction);
      });
    };

    updateOverlap();
    const introFrameCheck = window.setTimeout(updateOverlap, 3400);
    window.addEventListener('scroll', updateOverlap, { passive: true });
    window.addEventListener('resize', updateOverlap);
    const content = document.querySelector('main');
    const resizeObserver = content ? new ResizeObserver(updateOverlap) : null;
    if (content) resizeObserver.observe(content);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(introFrameCheck);
      window.removeEventListener('scroll', updateOverlap);
      window.removeEventListener('resize', updateOverlap);
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  const hasSession = !!session.id;

  const startChat = (e) => {
    e.preventDefault();
    if (intro.name.trim().length < 2) return setIntroErr('Please enter your name.');
    if (!isEmail(intro.email.trim())) return setIntroErr('Please enter a valid email.');
    setIntroErr('');
    setSession({ id: uid(), name: intro.name.trim(), email: intro.email.trim() });
    setMessages((m) => [...m, { from: 'bot', text: `Nice to meet you, ${intro.name.trim().split(' ')[0]}. What can we help you with?` }]);
  };

  const submit = async (e) => {
    e.preventDefault();
    const msg = text.trim();
    if (!msg || sending) return;
    setText('');
    setMessages((m) => [...m, { from: 'me', text: msg }]);
    setSending(true);
    setTyping(true);
    try {
      const res = await sendChat({
        sessionId: session.id,
        name: session.name,
        email: session.email,
        message: msg,
        page: pathname,
      });
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { from: 'bot', text: res.reply }]);
      }, 700);
    } catch (err) {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { from: 'bot', error: true, text: err.message || 'Message could not be sent. Please try again or use the contact page.' },
      ]);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSession({ id: '', name: '', email: '' });
    setMessages([greeting]);
    setIntro({ name: '', email: '' });
  };

  return (
    <div className={`rc${launcherOverlapsAction && !open ? ' rc-action-overlap' : ''}`}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="rc-panel"
            role="dialog"
            aria-label="Chat with Reflexo"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
          >
            <div className="rc-head">
              <span className="rc-avatar" aria-hidden="true">
                R<i className="rc-online" />
              </span>
              <div className="rc-title">
                <strong>Reflexo Solutions</strong>
                <span>We reply by email too</span>
              </div>
              <div className="rc-actions">
                {hasSession && (
                  <button className="rc-pill" onClick={reset} aria-label="Start a new chat" title="New chat">
                    New
                  </button>
                )}
                <button className="rc-icon" onClick={() => setOpen(false)} aria-label="Close chat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="rc-body">
              {messages.map((m, i) => (
                <div key={i} className={`rc-msg ${m.from === 'me' ? 'rc-me' : 'rc-bot'} ${m.error ? 'rc-error' : ''}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="rc-msg rc-bot rc-typing">
                  <i />
                  <i />
                  <i />
                </div>
              )}
              <div ref={bottom} />
            </div>

            {!hasSession ? (
              <form className="rc-intro" onSubmit={startChat} noValidate>
                <input
                  placeholder="Your name"
                  value={intro.name}
                  onChange={(e) => setIntro({ ...intro, name: e.target.value })}
                  autoComplete="name"
                />
                <input
                  placeholder="Your email"
                  type="email"
                  value={intro.email}
                  onChange={(e) => setIntro({ ...intro, email: e.target.value })}
                  autoComplete="email"
                />
                {introErr && <p className="rc-err">{introErr}</p>}
                <button type="submit" className="rc-start">
                  Start chat
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            ) : (
              <form className="rc-input" onSubmit={submit}>
                <input
                  placeholder="Type your message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={1000}
                  aria-label="Message"
                />
                <button type="submit" className="rc-send" disabled={sending || !text.trim()} aria-label="Send message">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l16-8-6 16-2.5-6.5L4 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="rc-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-hidden={launcherOverlapsAction && !open}
        tabIndex={launcherOverlapsAction && !open ? -1 : 0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 18 }}
      >
        <span className="rc-fab-ico">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="rc-fab-label">{open ? 'Close' : 'Chat with us'}</span>
      </motion.button>
    </div>
  );
}