import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEASON } from './data';

// Fade elements with class "reveal" in when they scroll into view
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    const scan = () => document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}

// Countdown to the start of the season
export function useCountdown() {
  const target = new Date(SEASON.start + 'T06:00:00+05:30').getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return {
    live: s === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const pad = (n) => String(n).padStart(2, '0');
