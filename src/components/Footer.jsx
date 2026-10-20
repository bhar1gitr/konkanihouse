import { Link } from 'react-router-dom';
import { SHOP, SEASON } from '../data';

export default function Footer() {
  const wa = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Hi! I want to know about pre-booking Devgad Hapus for ${SEASON.year} 🥭`)}`;
  return (
    <footer className="footer">
      <div className="footer__cta glass reveal">
        <div>
          <h3>Season {SEASON.year} is short. <em>Book early.</em></h3>
          <p>Pre-bookings get first-harvest priority from our Devgad orchard.</p>
        </div>
        <div className="footer__btns">
          <Link to="/prebook" className="btn btn--primary">Pre-Book Now</Link>
          <a className="btn btn--glass" href={wa} target="_blank" rel="noreferrer">WhatsApp Us</a>
        </div>
      </div>

      <div className="footer__grid">
        <div>
          <Link to="/" className="logo">
            <span className="logo__mark">🥭</span>
            <span><strong>{SHOP.name}</strong><small className="marathi">{SHOP.tagline}</small></span>
          </Link>
          <p className="footer__muted">
            Pure, authentic Devgad Alphonso mangoes, hand-picked and hay-ripened, delivered across India.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/prebook">Pre-Book {SEASON.year}</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${SHOP.phone.replace(/\s/g, '')}`}>{SHOP.phone}</a>
          <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
          <span className="footer__muted">{SHOP.address}</span>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} {SHOP.name}. Grown with love in Devgad.</p>

      <a className="wa-float" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>
      </a>
    </footer>
  );
}
