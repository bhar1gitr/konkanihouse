import { useEffect, useState } from 'react';
import Mango from './Mango';
import { PRODUCTS, SHOP } from '../data';
import { inr } from '../hooks';

const FREE_SHIP = 1999;
const SHIP_FEE = 149;

export default function Cart({ open, onClose, cart, onAdd, onClear }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', pin: '' });
  const [step, setStep] = useState('cart'); // cart | details | done

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open && step === 'done') setStep('cart');
  }, [open]); // eslint-disable-line

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  const lines = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  const valid =
    form.name.trim().length > 1 &&
    /^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)) &&
    form.address.trim().length > 8 &&
    /^\d{6}$/.test(form.pin);

  const placeOrder = (e) => {
    e.preventDefault();
    if (!valid) return;
    const msg =
      `🥭 *New Hapus Order*\n\n` +
      lines.map((l) => `• ${l.name} (${l.pack}) × ${l.qty} = ${inr(l.price * l.qty)}`).join('\n') +
      `\n\nSubtotal: ${inr(subtotal)}\nDelivery: ${shipping ? inr(shipping) : 'FREE'}\n*Total: ${inr(total)}*\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPIN: ${form.pin}`;
    window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setStep('done');
    onClear();
  };

  return (
    <>
      <div className={`overlay ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`drawer glass ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          <h3>{step === 'details' ? 'Delivery details' : 'Your Basket'}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {step === 'done' ? (
          <div className="drawer__empty">
            <div className="done-check">✓</div>
            <h4>Order sent!</h4>
            <p>We’ve opened WhatsApp with your order. Hit send and we’ll confirm payment & delivery within an hour.</p>
            <button className="btn btn--primary" onClick={onClose}>Continue browsing</button>
          </div>
        ) : lines.length === 0 ? (
          <div className="drawer__empty">
            <Mango size={120} className="bob" />
            <h4>Your basket is empty</h4>
            <p>The king is waiting. Add some Hapus!</p>
            <button className="btn btn--primary" onClick={onClose}>Shop mangoes</button>
          </div>
        ) : step === 'cart' ? (
          <>
            <div className="ship-bar">
              <p>
                {subtotal >= FREE_SHIP
                  ? '🎉 You’ve unlocked FREE delivery!'
                  : <>Add <b>{inr(FREE_SHIP - subtotal)}</b> more for free delivery</>}
              </p>
              <div className="ship-bar__track"><div style={{ width: `${progress}%` }} /></div>
            </div>
            <ul className="lines">
              {lines.map((l) => (
                <li key={l.id} className="line">
                  <div className="line__img"><Mango size={56} hue={l.hue} /></div>
                  <div className="line__info">
                    <b>{l.name}</b>
                    <small>{l.pack}</small>
                    <span>{inr(l.price)}</span>
                  </div>
                  <div className="stepper stepper--sm">
                    <button onClick={() => onAdd(l.id, -1)}>−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => onAdd(l.id, 1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <div className="row"><span>Delivery</span><span>{shipping ? inr(shipping) : 'FREE'}</span></div>
              <div className="row row--total"><span>Total</span><span>{inr(total)}</span></div>
              <button className="btn btn--primary btn--block" onClick={() => setStep('details')}>
                Checkout →
              </button>
            </div>
          </>
        ) : (
          <form className="checkout" onSubmit={placeOrder}>
            {[
              ['name', 'Full name', 'text', 'name'],
              ['phone', 'Mobile number', 'tel', 'tel'],
              ['pin', 'PIN code', 'text', 'postal-code'],
            ].map(([k, label, type, ac]) => (
              <label className="field" key={k}>
                <input
                  type={type}
                  autoComplete={ac}
                  inputMode={k === 'name' ? 'text' : 'numeric'}
                  maxLength={k === 'pin' ? 6 : undefined}
                  placeholder=" "
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  required
                />
                <span>{label}</span>
              </label>
            ))}
            <label className="field">
              <textarea
                rows={3}
                placeholder=" "
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
              <span>Full address</span>
            </label>
            <div className="drawer__foot">
              <div className="row row--total"><span>Total</span><span>{inr(total)}</span></div>
              <button className="btn btn--primary btn--block" disabled={!valid}>
                Place order on WhatsApp
              </button>
              <button type="button" className="btn btn--ghost btn--block" onClick={() => setStep('cart')}>
                ← Back to basket
              </button>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}
