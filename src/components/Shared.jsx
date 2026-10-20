import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCountdown, inr, pad } from '../hooks';
import { SEASON, FAQS } from '../data';

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
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
  );
}

// Big title block at the top of inner pages
export function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="page-head">
      <span className="eyebrow fade-up">{eyebrow}</span>
      <h1 className="fade-up" style={{ '--d': '0.1s' }}>{title}</h1>
      {children && <p className="fade-up" style={{ '--d': '0.2s' }}>{children}</p>}
    </section>
  );
}

export function Countdown({ compact }) {
  const c = useCountdown();
  if (c.live) {
    return (
      <div className="countdown glass">
        <p><strong>🥭 Season {SEASON.year} is LIVE!</strong> Fresh harvest shipping daily.</p>
      </div>
    );
  }
  return (
    <div className={`countdown glass ${compact ? 'countdown--compact' : ''}`}>
      <p className="countdown__label">Devgad harvest {SEASON.year} begins in</p>
      <div className="countdown__grid">
        {[[c.days, 'Days'], [pad(c.hours), 'Hrs'], [pad(c.mins), 'Min'], [pad(c.secs), 'Sec']].map(([v, l]) => (
          <div key={l}><b>{v}</b><span>{l}</span></div>
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ p, i = 0 }) {
  const off = Math.round((1 - p.price / p.mrp) * 100);
  return (
    <article className="card glass reveal" style={{ '--d': `${i * 0.08}s` }}>
      <div className="card__img">
        <img src={p.img} alt={`${p.name} ${p.pack}`} loading="lazy" />
        <span className="card__badge">{p.badge}</span>
        <span className="card__off">-{off}%</span>
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span>📍 Devgad</span>
          <span>Season {SEASON.year}</span>
        </div>
        <h3>{p.name}</h3>
        <p className="card__pack">{p.pack} · <span>{p.size}</span></p>
        <div className="card__foot">
          <div className="price">
            <b>{inr(p.price)}</b>
            <s>{inr(p.mrp)}</s>
          </div>
          <Link to={`/prebook?box=${p.id}`} className="btn btn--primary btn--sm">
            Pre-Book →
          </Link>
        </div>
      </div>
    </article>
  );
}
