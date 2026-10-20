import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';
import { Story, Process, Reviews, Faq, Footer } from './components/Sections';
import { useCart, useReveal } from './hooks';
import { PRODUCTS } from './data';

const STRIP = ['100% Natural', 'GI Tagged Devgad', 'No Carbide', 'Hand-Picked', 'Farm Fresh', 'Pan-India Delivery'];

export default function App() {
  const { items, add, clear, count } = useCart();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [toast, setToast] = useState(null);
  const [flyers, setFlyers] = useState([]);

  useReveal();

  const onAdd = useCallback(
    (id, n, e) => {
      add(id, n);
      if (n > 0) {
        setBump(true);
        setTimeout(() => setBump(false), 450);
        const p = PRODUCTS.find((x) => x.id === id);
        setToast(`${p.name} (${p.pack}) added 🥭`);
        clearTimeout(window.__toastT);
        window.__toastT = setTimeout(() => setToast(null), 2000);

        // Fly a mango emoji from the button to the cart icon
        if (e?.currentTarget) {
          const from = e.currentTarget.getBoundingClientRect();
          const to = document.querySelector('.cart-btn')?.getBoundingClientRect();
          if (to) {
            const f = {
              key: Date.now() + Math.random(),
              x: from.left + from.width / 2,
              y: from.top + from.height / 2,
              dx: to.left + to.width / 2 - (from.left + from.width / 2),
              dy: to.top + to.height / 2 - (from.top + from.height / 2),
            };
            setFlyers((fs) => [...fs, f]);
            setTimeout(() => setFlyers((fs) => fs.filter((x) => x.key !== f.key)), 800);
          }
        }
      }
    },
    [add]
  );

  return (
    <>
      {/* Ambient background */}
      <div className="bg" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="leaf" style={{ '--i': i }}>🍃</span>
        ))}
      </div>

      <Navbar count={count} onCart={() => setOpen(true)} bump={bump} />

      <main>
        <Hero />

        <div className="strip" aria-hidden="true">
          <div className="strip__track">
            {[...STRIP, ...STRIP, ...STRIP].map((s, i) => (
              <span key={i}>🥭 {s}</span>
            ))}
          </div>
        </div>

        <Products cart={items} onAdd={onAdd} />
        <Story />
        <Process />
        <Reviews />
        <Faq />
      </main>

      <Footer />

      <Cart open={open} onClose={() => setOpen(false)} cart={items} onAdd={onAdd} onClear={clear} />

      {/* Mobile sticky cart bar */}
      {count > 0 && !open && (
        <button className="mobile-bar" onClick={() => setOpen(true)}>
          <span>🥭 {count} item{count > 1 ? 's' : ''} in basket</span>
          <b>View →</b>
        </button>
      )}

      {flyers.map((f) => (
        <span
          key={f.key}
          className="flyer"
          style={{ left: f.x, top: f.y, '--dx': `${f.dx}px`, '--dy': `${f.dy}px` }}
        >
          🥭
        </span>
      ))}

      <div className={`toast glass ${toast ? 'is-show' : ''}`} role="status">{toast}</div>
    </>
  );
}
