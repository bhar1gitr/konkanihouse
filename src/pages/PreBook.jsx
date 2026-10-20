import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageHeader, Countdown, Faq } from '../components/Shared';
import { PRODUCTS, SEASON, SHOP, PREBOOK_STEPS } from '../data';
import { inr } from '../hooks';

const STAGES = ['Your box', 'Delivery', 'Details', 'Confirm'];

function Stepper({ value, onChange }) {
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Decrease">−</button>
      <span key={value} className="stepper__n">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase">+</button>
    </div>
  );
}

function Field({ label, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className="field">
      <Tag placeholder=" " {...props} />
      <span>{label}</span>
    </label>
  );
}

export default function PreBook() {
  const [params] = useSearchParams();
  const first = params.get('box');
  const [items, setItems] = useState(() =>
    PRODUCTS.some((p) => p.id === first) ? { [first]: 1 } : {}
  );
  const [stage, setStage] = useState(0);
  const [win, setWin] = useState(SEASON.windows[1].id);
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '', pin: '', note: '' });
  const [bookingId, setBookingId] = useState(null);

  const setQty = (id, q) =>
    setItems((c) => {
      const n = { ...c };
      if (q <= 0) delete n[id];
      else n[id] = Math.min(q, 50);
      return n;
    });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const lines = PRODUCTS.filter((p) => items[p.id]).map((p) => ({ ...p, qty: items[p.id] }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const delivery = subtotal === 0 || subtotal >= SEASON.freeDeliveryAbove ? 0 : SEASON.deliveryFee;
  const total = subtotal + delivery;
  const advance = Math.ceil((total * SEASON.advancePercent) / 100);
  const window_ = SEASON.windows.find((w) => w.id === win);

  const detailsOk = useMemo(
    () =>
      form.name.trim().length > 1 &&
      /^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)) &&
      form.city.trim().length > 1 &&
      form.address.trim().length > 8 &&
      /^\d{6}$/.test(form.pin),
    [form]
  );
  const canNext = [lines.length > 0, !!win, detailsOk, true][stage];

  const confirm = () => {
    const id = `DVG${String(SEASON.year).slice(2)}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const msg =
      `🥭 *Pre-Booking — Devgad Hapus ${SEASON.year}*\nBooking ID: ${id}\n\n` +
      lines.map((l) => `• ${l.name} (${l.pack}) × ${l.qty} = ${inr(l.price * l.qty)}`).join('\n') +
      `\n\nSubtotal: ${inr(subtotal)}\nDelivery: ${delivery ? inr(delivery) : 'FREE'}\n*Total: ${inr(total)}*` +
      `\n*Advance (${SEASON.advancePercent}%): ${inr(advance)}*\n\nDelivery window: ${window_.label} (${window_.note})` +
      `\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}\nPIN: ${form.pin}` +
      (form.note ? `\nNote: ${form.note}` : '');
    window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (bookingId) {
    return (
      <section className="section">
        <div className="done glass fade-up">
          <div className="done__check">✓</div>
          <h2>Booking sent!</h2>
          <p className="done__id">Booking ID <b>{bookingId}</b></p>
          <p>
            We’ve opened WhatsApp with your booking. Press <b>send</b> there, and we’ll reply with UPI
            details for your {inr(advance)} advance. Your box is reserved once the advance is received.
          </p>
          <div className="done__btns">
            <Link to="/" className="btn btn--primary">Back to Home</Link>
            <Link to="/gallery" className="btn btn--glass">See Our Farm</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow={`Pre-Booking · Season ${SEASON.year}`} title={<>Reserve your <em>Devgad Hapus</em></>}>
        Straight from our orchard in Devgad. Pay just {SEASON.advancePercent}% now, the rest on dispatch.
      </PageHeader>

      <section className="section section--tight">
        <div className="how reveal">
          {PREBOOK_STEPS.map((s) => (
            <div className="how__item glass" key={s.n}>
              <b>{s.n}</b>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </div>
          ))}
        </div>

        <div className="booking">
          <div className="booking__main glass reveal">
            {/* progress */}
            <ol className="progress">
              {STAGES.map((s, i) => (
                <li key={s} className={i < stage ? 'is-done' : i === stage ? 'is-active' : ''}>
                  <span>{i < stage ? '✓' : i + 1}</span>
                  <small>{s}</small>
                </li>
              ))}
            </ol>

            <div className="booking__stage" key={stage}>
              {stage === 0 && (
                <>
                  <h3>Choose your boxes</h3>
                  <ul className="pick-list">
                    {PRODUCTS.map((p) => (
                      <li key={p.id} className={items[p.id] ? 'is-picked' : ''}>
                        <img src={p.img} alt="" />
                        <div className="pick-list__info">
                          <b>{p.name}</b>
                          <small>{p.pack} · {p.size}</small>
                          <span>{inr(p.price)}</span>
                        </div>
                        {items[p.id] ? (
                          <Stepper value={items[p.id]} onChange={(q) => setQty(p.id, q)} />
                        ) : (
                          <button type="button" className="btn btn--glass btn--sm" onClick={() => setQty(p.id, 1)}>Add</button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {stage === 1 && (
                <>
                  <h3>When should we deliver?</h3>
                  <p className="muted">Pick your preferred window. We’ll ship the ripest batch available then.</p>
                  <div className="windows">
                    {SEASON.windows.map((w) => (
                      <button
                        type="button"
                        key={w.id}
                        className={`window ${win === w.id ? 'is-active' : ''}`}
                        onClick={() => setWin(w.id)}
                      >
                        <b>{w.label}</b>
                        <small>{w.note} {SEASON.year}</small>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {stage === 2 && (
                <>
                  <h3>Delivery details</h3>
                  <div className="form-grid">
                    <Field label="Full name" value={form.name} onChange={set('name')} autoComplete="name" />
                    <Field label="Mobile number" type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                    <Field label="City" value={form.city} onChange={set('city')} autoComplete="address-level2" />
                    <Field label="PIN code" inputMode="numeric" maxLength={6} value={form.pin} onChange={set('pin')} autoComplete="postal-code" />
                    <div className="span-2"><Field label="Full address" textarea rows={3} value={form.address} onChange={set('address')} autoComplete="street-address" /></div>
                    <div className="span-2"><Field label="Note (optional) — e.g. gift message" textarea rows={2} value={form.note} onChange={set('note')} /></div>
                  </div>
                </>
              )}

              {stage === 3 && (
                <>
                  <h3>Check & confirm</h3>
                  <dl className="review-list">
                    <dt>Boxes</dt>
                    <dd>{lines.map((l) => <div key={l.id}>{l.name} ({l.pack}) × {l.qty}</div>)}</dd>
                    <dt>Delivery</dt>
                    <dd>{window_.label} · {window_.note} {SEASON.year}</dd>
                    <dt>Deliver to</dt>
                    <dd>{form.name}, {form.phone}<br />{form.address}, {form.city} – {form.pin}</dd>
                  </dl>
                  <p className="muted small">
                    Clicking confirm opens WhatsApp with your booking. We’ll reply with UPI details for the advance.
                  </p>
                </>
              )}
            </div>

            <div className="booking__nav">
              {stage > 0 && (
                <button type="button" className="btn btn--ghost" onClick={() => setStage(stage - 1)}>← Back</button>
              )}
              {stage < 3 ? (
                <button type="button" className="btn btn--primary" disabled={!canNext} onClick={() => setStage(stage + 1)}>
                  Continue →
                </button>
              ) : (
                <button type="button" className="btn btn--primary" onClick={confirm}>Confirm on WhatsApp</button>
              )}
            </div>
          </div>

          {/* summary */}
          <aside className="summary glass reveal">
            <h3>Your booking</h3>
            {lines.length === 0 ? (
              <p className="muted">No boxes yet. Add one to see your total.</p>
            ) : (
              <ul className="summary__lines">
                {lines.map((l) => (
                  <li key={l.id}><span>{l.name} <small>{l.pack} × {l.qty}</small></span><b>{inr(l.price * l.qty)}</b></li>
                ))}
              </ul>
            )}
            <div className="row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
            <div className="row"><span>Delivery</span><span>{subtotal ? (delivery ? inr(delivery) : 'FREE') : '—'}</span></div>
            <div className="row row--total"><span>Total</span><span>{inr(total)}</span></div>
            <div className="advance">
              <span>Pay now ({SEASON.advancePercent}% advance)</span>
              <b>{inr(advance)}</b>
            </div>
            {subtotal > 0 && subtotal < SEASON.freeDeliveryAbove && (
              <p className="muted small">Add {inr(SEASON.freeDeliveryAbove - subtotal)} more for free delivery.</p>
            )}
            <Countdown compact />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Questions</span>
          <h2>Pre-booking <em>FAQ</em></h2>
        </div>
        <Faq />
      </section>
    </>
  );
}
