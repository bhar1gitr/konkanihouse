import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Countdown } from './components/Shared';
import Home from './pages/Home';
import Shop from './pages/Shop';
import PreBook from './pages/PreBook';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { useReveal } from './hooks';
import { SHOP, SEASON, GALLERY } from './data';

// ✅ true  = show the "Coming Soon" page to everyone
// ❌ false = show the full website
const COMING_SOON = true;

function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="blob blob--1" />
      <div className="blob blob--2" />
      <div className="blob blob--3" />
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="leaf" style={{ '--i': i }}>🍃</span>
      ))}
    </div>
  );
}

/* ---------------- Coming Soon page ---------------- */
function ComingSoon() {
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = `${SHOP.name} — Coming Soon`;
  }, []);

  const wa = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
  const notify = (e) => {
    e.preventDefault();
    const who = name.trim() ? `I'm ${name.trim()}. ` : '';
    window.open(wa(`Hi! ${who}Please notify me when pre-booking for Devgad Hapus ${SEASON.year} opens 🥭`), '_blank');
  };

  return (
    <main className="cs">
      <style>{CS_CSS}</style>

      <header className="cs__brand fade-up">
        <img src="/logo/konkan-hapus-icon.svg" alt="" width="64" height="64" />
        <div>
          <strong>{SHOP.name}</strong>
          <small className="marathi">{SHOP.tagline}</small>
        </div>
      </header>

      <section className="cs__hero">
        <div className="cs__logo fade-up" style={{ '--d': '0.1s' }}>
          <span className="cs__ring" />
          <span className="cs__ring cs__ring--2" />
          <img src="/logo/konkan-hapus-badge.svg" alt="Konkan Hapus — Devgad Alphonso badge" />
        </div>

        <span className="pill glass fade-up" style={{ '--d': '0.2s' }}>
          <span className="dot" /> Website launching soon
        </span>

        <h1 className="fade-up" style={{ '--d': '0.3s' }}>
          Something sweet <br />is <span className="shimmer">ripening.</span>
        </h1>

        <p className="marathi cs__marathi fade-up" style={{ '--d': '0.4s' }}>
          अस्सल देवगड हापूस — लवकरच येत आहे!
        </p>

        <p className="cs__lead fade-up" style={{ '--d': '0.5s' }}>
          Our new home for pure Devgad Hapus is almost ready. Pre-booking for Season {SEASON.year} opens
          here soon — until then, you can book directly with us on WhatsApp.
        </p>

        <div className="fade-up" style={{ '--d': '0.6s' }}>
          <Countdown />
        </div>

        <form className="cs__form glass fade-up" style={{ '--d': '0.7s' }} onSubmit={notify}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
            autoComplete="name"
          />
          <button className="btn btn--primary" type="submit">Notify me on WhatsApp</button>
        </form>

        <a
          className="cs__alt fade-up"
          style={{ '--d': '0.8s' }}
          href={wa(`Hi! I want to pre-book Devgad Hapus for ${SEASON.year} 🥭`)}
          target="_blank"
          rel="noreferrer"
        >
          Or pre-book right now on WhatsApp →
        </a>
      </section>

      <section className="cs__photos" aria-label="Photos from our farm">
        {GALLERY.map((g, i) => (
          <figure key={g.src} className="fade-up" style={{ '--d': `${0.8 + i * 0.1}s`, '--r': `${[-6, 3, -2, 5, -4][i]}deg` }}>
            <img src={g.src} alt={g.title} />
          </figure>
        ))}
      </section>

      <footer className="cs__foot">
        <a href={`tel:${SHOP.phone.replace(/\s/g, '')}`}>📞 {SHOP.phone}</a>
        <a href={`mailto:${SHOP.email}`}>✉️ {SHOP.email}</a>
        <span>📍 {SHOP.address}</span>
      </footer>
      <p className="cs__copy">© {new Date().getFullYear()} {SHOP.name}. Grown with love in Devgad.</p>
    </main>
  );
}

const CS_CSS = `
.cs { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 28px 20px 30px; text-align: center; overflow-x: clip; }
.cs__brand { align-self: stretch; max-width: 1100px; width: 100%; margin: 0 auto; display: flex; align-items: center; gap: 12px; text-align: left; }
.cs__brand img { width: 48px; height: 48px; filter: drop-shadow(0 4px 8px rgba(31,122,58,.35)); }
.cs__brand strong { display: block; font-family: 'Fraunces', serif; font-weight: 900; font-size: 22px; line-height: 1; }
.cs__brand small { color: var(--leaf); font-size: 13px; }
.cs__hero { max-width: 720px; display: flex; flex-direction: column; align-items: center; gap: 22px; padding-top: 30px; }
.cs__logo { position: relative; width: 240px; height: 240px; display: grid; place-items: center; margin: 14px 0 10px; }
.cs__logo img { position: relative; width: 240px; height: 240px; animation: floatY 5s ease-in-out infinite; filter: drop-shadow(0 20px 34px rgba(122,59,30,.35)); }
.cs__ring { position: absolute; inset: -14px; border-radius: 50%; border: 2px dashed rgba(31,122,58,.35); animation: spin 30s linear infinite; }
.cs__ring--2 { inset: -32px; border: 2px dotted rgba(255,255,255,.8); animation-duration: 50s; animation-direction: reverse; }
.cs h1 { font-size: clamp(46px, 8vw, 88px); font-weight: 900; }
.cs__marathi { font-size: 22px; color: var(--leaf); }
.cs__lead { font-size: 17px; line-height: 1.7; color: var(--ink-soft); max-width: 560px; }
.cs__form { display: flex; gap: 8px; padding: 8px; border-radius: 999px; width: min(520px, 100%); }
.cs__form input { flex: 1; min-width: 0; padding: 0 20px; border: 0; outline: none; background: transparent; font: inherit; font-size: 16px; color: var(--ink); }
.cs__form input::placeholder { color: var(--ink-soft); }
.cs__alt { font-weight: 600; color: var(--leaf); border-bottom: 2px solid rgba(31,122,58,.3); padding-bottom: 2px; transition: border-color .3s; }
.cs__alt:hover { border-color: var(--leaf); }
.cs__photos { display: flex; justify-content: center; gap: 14px; margin: 60px 0 40px; flex-wrap: wrap; }
.cs__photos figure { width: 150px; aspect-ratio: 3 / 4; border-radius: 20px; overflow: hidden; border: 5px solid rgba(255,255,255,.7);
  box-shadow: var(--shadow); rotate: var(--r); transition: transform .5s var(--spring), rotate .5s var(--spring); }
.cs__photos figure:hover { rotate: 0deg; transform: translateY(-10px) scale(1.06); z-index: 1; }
.cs__photos img { width: 100%; height: 100%; object-fit: cover; }
.cs__foot { display: flex; gap: 12px 28px; flex-wrap: wrap; justify-content: center; font-size: 14px; color: var(--ink-soft); }
.cs__foot a:hover { color: var(--blush); }
.cs__copy { margin-top: 14px; font-size: 13px; color: var(--ink-soft); }
@media (max-width: 600px) {
  .cs__hero { gap: 18px; padding-top: 24px; }
  .cs__logo { width: 190px; height: 190px; }
  .cs__logo img { width: 190px; height: 190px; }
  .cs h1 { font-size: 46px; }
  .cs__marathi { font-size: 18px; }
  .cs__lead { font-size: 15px; }
  .cs__form { flex-direction: column; border-radius: 26px; padding: 10px; }
  .cs__form input { padding: 14px 16px; text-align: center; }
  .cs__photos { gap: 10px; margin-top: 44px; }
  .cs__photos figure { width: 30%; max-width: 120px; border-width: 4px; border-radius: 16px; }
  .cs__photos figure:nth-child(n+4) { display: none; }
}
`;

/* ---------------- Full website ---------------- */
function FullSite() {
  const { pathname } = useLocation();
  useReveal();

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/prebook" element={<PreBook />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Background />
      {COMING_SOON ? <ComingSoon /> : <FullSite />}
    </>
  );
}
