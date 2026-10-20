import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/Shared';
import { GALLERY, SEASON } from '../data';

export default function Gallery() {
  const [idx, setIdx] = useState(-1); // -1 = lightbox closed
  const open = idx >= 0;
  const go = useCallback((d) => setIdx((i) => (i + d + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const key = (e) => {
      if (e.key === 'Escape') setIdx(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', key);
    };
  }, [open, go]);

  // Swipe on mobile
  const [touchX, setTouchX] = useState(null);
  const onTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    setTouchX(null);
  };

  const cur = GALLERY[idx];

  return (
    <>
      <PageHeader eyebrow="Gallery" title={<>Life on <em>our farm</em></>}>
        Real photos from our Devgad orchard — from the tree, to the hay, to your box.
      </PageHeader>

      <section className="section section--tight">
        <div className="masonry">
          {GALLERY.map((g, i) => (
            <button key={g.src} className="masonry__item reveal" style={{ '--d': `${i * 0.08}s` }} onClick={() => setIdx(i)}>
              <img src={g.src} alt={g.title} loading="lazy" />
              <span className="masonry__cap">
                <b>{g.title}</b>
                <small>{g.text}</small>
              </span>
              <span className="masonry__zoom" aria-hidden>⤢</span>
            </button>
          ))}
        </div>

        <div className="center reveal">
          <Link to="/prebook" className="btn btn--primary">Pre-Book Season {SEASON.year} →</Link>
        </div>
      </section>

      <div
        className={`lightbox ${open ? 'is-open' : ''}`}
        onClick={() => setIdx(-1)}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        role="dialog"
        aria-hidden={!open}
      >
        {cur && (
          <figure onClick={(e) => e.stopPropagation()} key={idx}>
            <img src={cur.src} alt={cur.title} />
            <figcaption><b>{cur.title}</b> — {cur.text}</figcaption>
          </figure>
        )}
        <button className="lightbox__btn lightbox__close" onClick={() => setIdx(-1)} aria-label="Close">✕</button>
        <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">‹</button>
        <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">›</button>
        <span className="lightbox__count">{idx + 1} / {GALLERY.length}</span>
      </div>
    </>
  );
}
