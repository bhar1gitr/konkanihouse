import { useEffect, useRef, useState } from 'react';

// Reveal elements when they scroll into view (adds .in-view)
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// Cart persisted in localStorage
export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hapus-cart')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hapus-cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (id, n = 1) =>
    setItems((c) => {
      const q = (c[id] || 0) + n;
      const next = { ...c };
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  const clear = () => setItems({});
  const count = Object.values(items).reduce((a, b) => a + b, 0);

  return { items, add, clear, count };
}

// Animated number counter
export function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / duration, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [val, ref];
}

// Season countdown target (next March 25)
export function useCountdown() {
  const getTarget = () => {
    const now = new Date();
    let y = now.getFullYear();
    let t = new Date(y, 2, 25);
    if (now > new Date(y, 5, 10)) t = new Date(y + 1, 2, 25);
    return t;
  };
  const [left, setLeft] = useState(() => getTarget() - new Date());
  useEffect(() => {
    const i = setInterval(() => setLeft(getTarget() - new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const s = Math.max(0, Math.floor(left / 1000));
  return {
    inSeason: left <= 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export const inr = (n) => '₹' + n.toLocaleString('en-IN');
