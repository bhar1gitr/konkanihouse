import { useEffect, useRef } from 'react';
import Mango from './Mango';
import { useCountdown } from '../hooks';

const pad = (n) => String(n).padStart(2, '0');

export default function Hero() {
  const stage = useRef(null);
  const cd = useCountdown();

  // Parallax tilt on mouse move (desktop)
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty('--px', x);
      el.style.setProperty('--py', y);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__text">
        <span className="pill glass fade-up" style={{ '--d': '0.1s' }}>
          <span className="dot" /> Direct from Ratnagiri & Devgad orchards
        </span>
        <h1 className="fade-up" style={{ '--d': '0.25s' }}>
          The King of <br />
          <span className="shimmer">Mangoes,</span> <br />
          from Konkan.
        </h1>
        <p className="marathi hero__marathi fade-up" style={{ '--d': '0.4s' }}>
          अस्सल कोकणचा हापूस — थेट बागेतून तुमच्या घरी
        </p>
        <p className="hero__lead fade-up" style={{ '--d': '0.5s' }}>
          Pure Alphonso, hand-picked at peak and ripened slowly in hay — the way our
          grandparents did. No carbide. No shortcuts. Just sunshine you can taste.
        </p>
        <div className="hero__cta fade-up" style={{ '--d': '0.65s' }}>
          <a href="#shop" className="btn btn--primary">
            Order Now <span aria-hidden>→</span>
          </a>
          <a href="#story" className="btn btn--glass">Our Story</a>
        </div>

        <div className="countdown glass fade-up" style={{ '--d': '0.8s' }}>
          {cd.inSeason ? (
            <p><strong>🥭 Season is LIVE!</strong> Fresh harvest shipping daily.</p>
          ) : (
            <>
              <p className="countdown__label">Pre-book now — next harvest begins in</p>
              <div className="countdown__grid">
                {[
                  [cd.days, 'Days'],
                  [pad(cd.hours), 'Hrs'],
                  [pad(cd.mins), 'Min'],
                  [pad(cd.secs), 'Sec'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <b>{v}</b>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="hero__stage" ref={stage}>
        <div className="sun" />
        <div className="ring ring--1" />
        <div className="ring ring--2" />
        <Mango size={340} className="hero__mango" />
        <Mango size={110} hue={10} className="hero__mini hero__mini--1" />
        <Mango size={80} hue={-8} className="hero__mini hero__mini--2" />
        <div className="float-card glass float-card--a">
          <span>🏅</span>
          <div><b>GI Tagged</b><small>Certified origin</small></div>
        </div>
        <div className="float-card glass float-card--b">
          <span>🌾</span>
          <div><b>Hay Ripened</b><small>Zero chemicals</small></div>
        </div>
      </div>
    </section>
  );
}
