import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SHOP, SEASON } from '../data';

const LINKS = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['Pre-Book 2027', '/prebook'],
  ['Gallery', '/gallery'],
  ['About Us', '/about'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner glass">
        <Link to="/" className="logo">
          <span className="logo__mark">🥭</span>
          <span>
            <strong>{SHOP.name}</strong>
            <small className="marathi">{SHOP.tagline}</small>
          </span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map(([label, to], i) => (
            <NavLink key={to} to={to} end={to === '/'} style={{ '--i': i }}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <Link to="/prebook" className="btn btn--primary btn--sm nav__cta">
            Pre-Book {SEASON.year}
          </Link>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
