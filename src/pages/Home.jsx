import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Mango from '../components/Mango';
import { Countdown, ProductCard, Faq } from '../components/Shared';
import { IMAGES, GALLERY, PRODUCTS, STEPS, PREBOOK_STEPS, REVIEWS, SEASON } from '../data';

const STRIP = ['100% Devgad', 'Hand-Picked', 'Hay Ripened', 'No Carbide', 'Farm Direct', 'Pan-India Delivery'];

function Hero() {
  const stage = useRef(null);

  // Parallax on mouse move (desktop only)
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      el.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5) * 2);
      el.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section className="hero">
      <div className="hero__text">
        <span className="pill glass fade-up" style={{ '--d': '0.1s' }}>
          <span className="dot" /> Pre-booking open · Season {SEASON.year}
        </span>
        <h1 className="fade-up" style={{ '--d': '0.25s' }}>
          Pure <span className="shimmer">Devgad</span> <br />
          Hapus, from <br />
          our farm.
        </h1>
        <p className="marathi hero__marathi fade-up" style={{ '--d': '0.4s' }}>
          अस्सल देवगड हापूस — थेट बागेतून तुमच्या घरी
        </p>
        <p className="hero__lead fade-up" style={{ '--d': '0.5s' }}>
          Hand-picked from our family orchard in Devgad and ripened slowly in hay, the way
          our grandparents did. No carbide. No shortcuts. Book your {SEASON.year} box today.
        </p>
        <div className="hero__cta fade-up" style={{ '--d': '0.65s' }}>
          <Link to="/prebook" className="btn btn--primary">Pre-Book {SEASON.year} <span aria-hidden>→</span></Link>
          <Link to="/gallery" className="btn btn--glass">See Our Farm</Link>
        </div>
        <div className="fade-up" style={{ '--d': '0.8s' }}>
          <Countdown />
        </div>
      </div>

      <div className="hero__stage" ref={stage}>
        <div className="sun" />
        <div className="ring ring--1" />
        <div className="ring ring--2" />
        <div className="hero__photo hero__photo--main glass">
          <img src={IMAGES.box.src} alt="A dozen Devgad Hapus mangoes in a box" />
        </div>
        <div className="hero__photo hero__photo--side glass">
          <img src={IMAGES.pulp.src} alt="Sliced Hapus mango with saffron pulp" />
        </div>
        <Mango size={110} className="hero__mini hero__mini--1" />
        <Mango size={80} hue={-8} className="hero__mini hero__mini--2" />
        <div className="float-card glass float-card--a">
          <span>📍</span>
          <div><b>Devgad Origin</b><small>Our own orchard</small></div>
        </div>
        <div className="float-card glass float-card--b">
          <span>🌾</span>
          <div><b>Hay Ripened</b><small>Zero chemicals</small></div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <div className="strip" aria-hidden="true">
        <div className="strip__track">
          {[...STRIP, ...STRIP, ...STRIP].map((s, i) => <span key={i}>🥭 {s}</span>)}
        </div>
      </div>

      {/* Featured boxes */}
      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Season {SEASON.year}</span>
          <h2>Reserve your <em>Devgad box</em></h2>
          <p>Limited trees, limited boxes. Pre-book now and get first-harvest priority.</p>
        </div>
        <div className="grid">
          {PRODUCTS.slice(0, 3).map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
        <div className="center reveal">
          <Link to="/shop" className="btn btn--glass">View all boxes →</Link>
        </div>
      </section>

      {/* From the farm */}
      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Real Photos</span>
          <h2>Straight from <em>our farm</em></h2>
          <p>No stock photos. This is our harvest, our hay, our hands.</p>
        </div>
        <div className="photo-row">
          {GALLERY.map((g, i) => (
            <Link to="/gallery" className="photo-row__item reveal" key={g.src} style={{ '--d': `${i * 0.08}s` }}>
              <img src={g.src} alt={g.title} loading="lazy" />
              <span>{g.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Baag to Box</span>
          <h2>How your mango <em>reaches you</em></h2>
        </div>
        <div className="process">
          {STEPS.map((s, i) => (
            <div className="step glass reveal" key={s.title} style={{ '--d': `${i * 0.12}s` }}>
              <span className="step__num">0{i + 1}</span>
              <div className="step__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-book banner */}
      <section className="section">
        <div className="prebook-banner glass reveal">
          <div>
            <span className="eyebrow">Pre-Booking {SEASON.year}</span>
            <h2>Book in <em>4 easy steps</em></h2>
            <ol className="mini-steps">
              {PREBOOK_STEPS.map((s) => (
                <li key={s.n}><b>{s.n}</b><div><strong>{s.title}</strong><span>{s.text}</span></div></li>
              ))}
            </ol>
            <Link to="/prebook" className="btn btn--primary">Start Pre-Booking →</Link>
          </div>
          <div className="prebook-banner__side">
            <img src={IMAGES.hay.src} alt="Mangoes ripening in hay" loading="lazy" />
            <Countdown compact />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Love Letters</span>
          <h2>Families who <em>tasted the difference</em></h2>
        </div>
        <div className="marquee reveal">
          <div className="marquee__track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <figure className="review glass" key={i}>
                <div className="stars">★★★★★</div>
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

      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Questions</span>
          <h2>Everything about <em>pre-booking</em></h2>
        </div>
        <Faq />
      </section>
    </>
  );
}
