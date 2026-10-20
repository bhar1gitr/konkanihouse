import { PageHeader, ProductCard } from '../components/Shared';
import { PRODUCTS, SEASON } from '../data';
import { inr } from '../hooks';

export default function Shop() {
  return (
    <>
      <PageHeader eyebrow={`Season ${SEASON.year} · Devgad`} title={<>Choose your <em>Hapus</em></>}>
        Every box comes from our Devgad orchard, graded by hand. Pick a box to pre-book it —
        you only pay a {SEASON.advancePercent}% advance now.
      </PageHeader>

      <section className="section section--tight">
        <div className="notice glass reveal">
          <span>🚚</span>
          <p>
            <b>Free delivery</b> on orders above {inr(SEASON.freeDeliveryAbove)} · Deliveries from April {SEASON.year} ·
            Prices are pre-booking prices and may rise when the season opens.
          </p>
        </div>
        <div className="grid">
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </section>
    </>
  );
}
