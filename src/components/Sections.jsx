import { useState } from 'react';
import Mango from './Mango';
import { PROCESS, REVIEWS, FAQS, SHOP } from '../data';
import { useCountUp } from '../hooks';

function Stat({ n, suffix, label }) {
  const [v, ref] = useCountUp(n);
  return (
    <div className="stat glass" ref={ref}>
      <b>{v.toLocaleString('en-IN')}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

export function Story() {
  return (
    <section className="section story" id="story">
      <div className="story__art reveal">
        <div className="story__frame glass">
          <svg viewBox="0 0 400 300" className="story__scene" aria-hidden="true">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffd88a" />
                <stop offset="1" stopColor="#ff9f5a" />
              </linearGradient>
              <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2aa7a1" />
                <stop offset="1" stopColor="#13615e" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#sky)" />
            <circle cx="300" cy="150" r="46" fill="#fff4c2" className="scene-sun" />
            <rect y="170" width="400" height="130" fill="url(#sea)" />
            <path className="wave" d="M0 185 Q25 178 50 185 T100 185 T150 185 T200 185 T250 185 T300 185 T350 185 T400 185 T450 185" stroke="#bff3ee" strokeWidth="2" fill="none" opacity=".6" />
            <path d="M0 210 C80 180 140 200 220 230 L220 300 L0 300Z" fill="#7a3b1e" />
            <path d="M0 230 C70 210 130 225 200 250 L200 300 L0 300Z" fill="#a0522d" />
            {/* mango trees */}
            {[[40, 190], [110, 200], [170, 218]].map(([x, y], i) => (
              <g key={i} className="tree" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x}px ${y}px` }}>
                <rect x={x - 3} y={y - 30} width="6" height="32" fill="#4a2a12" />
                <circle cx={x} cy={y - 44} r="26" fill="#2f8a3e" />
                <circle cx={x - 14} cy={y - 36} r="16" fill="#3fa34d" />
                <circle cx={x + 14} cy={y - 38} r="16" fill="#267a35" />
                <circle cx={x - 6} cy={y - 30} r="4" fill="#ffb627" />
                <circle cx={x + 10} cy={y - 46} r="4" fill="#ffb627" />
                <circle cx={x + 2} cy={y - 56} r="4" fill="#ff9a1f" />
              </g>
            ))}
            {/* boat */}
            <g className="boat">
              <path d="M300 196 h40 l-6 8 h-28z" fill="#5b2e12" />
              <path d="M320 196 v-26 l14 22z" fill="#fff" />
            </g>
          </svg>
          <span className="story__caption marathi">रत्नागिरी · देवगड</span>
        </div>
        <Mango size={120} className="story__mango" />
      </div>

      <div className="story__text reveal">
        <span className="eyebrow">Our Story</span>
        <h2>Three generations. <em>One orchard.</em></h2>
        <p>
          Our family has grown Alphonso on the red laterite hills of Konkan for over
          sixty years. Here, the salt-laden sea breeze and the coastal sun give Hapus
          its legendary saffron pulp, silky texture and a fragrance that announces itself
          from across the room.
        </p>
        <p>
          We started this shop because too many people have never tasted the real thing.
          No middlemen, no mixed-origin “Alphonso” — just honest fruit from our trees and
          a handful of neighbouring farms we have known all our lives.
        </p>
        <div className="stats">
          <Stat n={60} suffix="+" label="Years of farming" />
          <Stat n={1200} suffix="+" label="Mango trees" />
          <Stat n={25000} suffix="+" label="Happy families" />
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section" id="process">
      <div className="section__head reveal">
        <span className="eyebrow">Baag to Box</span>
        <h2>How your mango <em>reaches you</em></h2>
      </div>
      <div className="process">
        {PROCESS.map((s, i) => (
          <div className="step glass reveal" key={s.title} style={{ '--d': `${i * 0.12}s` }}>
            <span className="step__num">0{i + 1}</span>
            <div className="step__icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section className="section" id="reviews">
      <div className="section__head reveal">
        <span className="eyebrow">Love Letters</span>
        <h2>Families who <em>tasted the difference</em></h2>
      </div>
      <div className="marquee reveal">
        <div className="marquee__track">
          {loop.map((r, i) => (
            <figure className="review glass" key={i}>
              <div className="stars">{'★'.repeat(r.stars)}</div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <span className="avatar">{r.name[0]}</span>
                <span><b>{r.name}</b><small>{r.city}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="section__head reveal">
        <span className="eyebrow">Questions</span>
        <h2>Everything about <em>Hapus</em></h2>
      </div>
      <div className="faq__list">
        {FAQS.map((f, i) => (
          <div className={`faq__item glass reveal ${open === i ? 'is-open' : ''}`} key={i}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              {f.q}
              <span className="faq__icon">+</span>
            </button>
            <div className="faq__a"><div><p>{f.a}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta glass reveal">
        <div>
          <h3>Season is short. <em>Don’t miss it.</em></h3>
          <p>Pre-book today and get first-harvest priority + free delivery.</p>
        </div>
        <a className="btn btn--primary" href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent('Hi! I want to pre-book Hapus mangoes 🥭')}`} target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>
      </div>
      <div className="footer__grid">
        <div>
          <div className="logo"><span className="logo__mark">🥭</span><span><strong>{SHOP.name}</strong><small className="marathi">{SHOP.tagline}</small></span></div>
          <p className="footer__muted">Pure Alphonso mangoes from the orchards of Ratnagiri and Devgad, delivered across India.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <a href="#shop">Ratnagiri Hapus</a>
          <a href="#shop">Devgad Hapus</a>
          <a href="#shop">Gift Boxes</a>
          <a href="#shop">Aamras</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${SHOP.phone.replace(/\s/g, '')}`}>{SHOP.phone}</a>
          <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
          <span className="footer__muted">{SHOP.address}</span>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} {SHOP.name}. Grown with love in Konkan.</p>
    </footer>
  );
}
