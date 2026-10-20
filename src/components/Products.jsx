import { useState } from 'react';
import Mango from './Mango';
import { PRODUCTS, FILTERS } from '../data';
import { inr } from '../hooks';

function matches(p, f) {
  if (f === 'All') return true;
  if (f === 'Gifts & More') return p.id === 'gift-box' || p.id === 'aamras';
  return p.region === f && p.id !== 'aamras';
}

function Card({ p, qty, onAdd, i }) {
  const [pop, setPop] = useState(false);
  const off = Math.round((1 - p.price / p.mrp) * 100);

  const tilt = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    e.currentTarget.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    e.currentTarget.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  };
  const reset = (e) => (e.currentTarget.style.transform = '');

  const add = (e) => {
    onAdd(p.id, 1, e);
    setPop(true);
    setTimeout(() => setPop(false), 500);
  };

  return (
    <article
      className="card glass reveal"
      style={{ '--d': `${i * 0.08}s` }}
      onMouseMove={tilt}
      onMouseLeave={reset}
    >
      <span className="card__badge">{p.badge}</span>
      <span className="card__off">-{off}%</span>
      <div className="card__img">
        <div className="card__glow" />
        {p.id === 'aamras' ? (
          <div className="jar"><div className="jar__lid" /><div className="jar__body"><span>AAMRAS</span></div></div>
        ) : (
          <div className="card__mangoes">
            <Mango size={130} hue={p.hue} className="card__m1" />
            {p.pack !== '1 Dozen' && <Mango size={90} hue={p.hue + 6} className="card__m2" />}
          </div>
        )}
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span>📍 {p.region}</span>
          <span>★ {p.rating.toFixed(1)}</span>
        </div>
        <h3>{p.name}</h3>
        <p className="card__pack">{p.pack} · <span>{p.size}</span></p>
        <div className="card__foot">
          <div className="price">
            <b>{inr(p.price)}</b>
            <s>{inr(p.mrp)}</s>
          </div>
          {qty ? (
            <div className="stepper">
              <button onClick={() => onAdd(p.id, -1)} aria-label="Decrease">−</button>
              <span key={qty} className="stepper__n">{qty}</span>
              <button onClick={add} aria-label="Increase">+</button>
            </div>
          ) : (
            <button className={`btn btn--primary btn--sm ${pop ? 'pop' : ''}`} onClick={add}>
              Add +
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Products({ cart, onAdd }) {
  const [filter, setFilter] = useState('All');
  const list = PRODUCTS.filter((p) => matches(p, filter));

  return (
    <section className="section" id="shop">
      <div className="section__head reveal">
        <span className="eyebrow">This Season’s Harvest</span>
        <h2>Choose your <em>Hapus</em></h2>
        <p>Every box is graded by hand. Sizes are honest, ripeness is natural, taste is guaranteed.</p>
      </div>

      <div className="filters reveal">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`chip ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid" key={filter}>
        {list.map((p, i) => (
          <Card key={p.id} p={p} i={i} qty={cart[p.id]} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
