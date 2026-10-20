import { useEffect, useState } from 'react';
import { SHOP } from '../data';

const LINKS = [
  ['Shop', '#shop'],
  ['Our Story', '#story'],
  ['Process', '#process'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
];

export default function Navbar({ count, onCart, bump }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner glass">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo__mark">🥭</span>
          <span>
            <strong>{SHOP.name}</strong>
            <small className="marathi">{SHOP.tagline}</small>
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map(([l, h], i) => (
            <a key={h} href={h} style={{ '--i': i }} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button className={`cart-btn ${bump ? 'bump' : ''}`} onClick={onCart} aria-label="Open cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && <span className="cart-btn__count">{count}</span>}
          </button>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
