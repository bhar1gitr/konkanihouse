import { Link } from 'react-router-dom';
import { PageHeader } from '../components/Shared';
import { IMAGES, STEPS, SHOP, SEASON } from '../data';

const STEP_PHOTOS = [IMAGES.crates, IMAGES.grading, IMAGES.hay, IMAGES.box];

// Turns a YouTube link into an embed URL
function youTubeEmbed(url) {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?rel=0` : null;
}

function ProcessVideo() {
  const url = SHOP.processVideo;
  const yt = url && youTubeEmbed(url);

  if (yt) {
    return <iframe src={yt} title="Our mango process" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
  }
  if (url) {
    return <video src={url} poster={IMAGES.hay.src} controls playsInline preload="metadata" />;
  }
  return (
    <div className="video__placeholder" style={{ backgroundImage: `url(${IMAGES.crates.src})` }}>
      <div className="video__play">▶</div>
      <p>Our process video is coming soon</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About Us" title={<>A family orchard in <em>Devgad</em></>}>
        Pure, authentic Hapus — grown, picked and ripened by the same hands, season after season.
      </PageHeader>

      {/* Story */}
      <section className="section section--tight about">
        <div className="about__photos reveal">
          <img className="about__p1" src={IMAGES.grading.src} alt="Hand-grading mangoes in a crate" loading="lazy" />
          <img className="about__p2" src={IMAGES.pulp.src} alt="Sliced Devgad Hapus" loading="lazy" />
          <span className="about__tag glass marathi">देवगड, सिंधुदुर्ग</span>
        </div>
        <div className="about__text reveal">
          <span className="eyebrow">Our Story</span>
          <h2>Grown on the <em>red hills</em> of Konkan</h2>
          <p>
            Our family has looked after these Alphonso trees in Devgad for generations. The red laterite
            soil, the salty sea breeze and the long coastal summer give Devgad Hapus its deep saffron
            pulp, silky texture and a fragrance that fills the whole room.
          </p>
          <p>
            We started selling directly because too many people have never tasted the real thing.
            No middlemen and no mixed-origin “Alphonso” — just honest fruit from our trees and a few
            neighbouring farms we have known all our lives.
          </p>
          <ul className="promise">
            <li>✔ 100% Devgad origin</li>
            <li>✔ Ripened in hay, never carbide</li>
            <li>✔ Hand-graded, honest sizes</li>
            <li>✔ Shipped within 24 hours of packing</li>
          </ul>
        </div>
      </section>

      {/* Video */}
      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Watch</span>
          <h2>Our process, <em>start to finish</em></h2>
          <p>From picking on the tree to ripening in hay and packing your box.</p>
        </div>
        <div className="video glass reveal">
          <ProcessVideo />
        </div>
      </section>

      {/* Process steps with photos */}
      <section className="section">
        <div className="section__head reveal">
          <span className="eyebrow">Baag to Box</span>
          <h2>How we <em>do it</em></h2>
        </div>
        <div className="timeline">
          {STEPS.map((s, i) => (
            <div className="timeline__item reveal" key={s.title}>
              <div className="timeline__dot">{s.icon}</div>
              <div className="timeline__card glass">
                <span className="timeline__n">Step 0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <img src={STEP_PHOTOS[i].src} alt={STEP_PHOTOS[i].title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="prebook-banner prebook-banner--center glass reveal">
          <h2>Taste the real <em>Devgad Hapus</em></h2>
          <p>Pre-bookings for Season {SEASON.year} are open. Limited boxes from our orchard.</p>
          <Link to="/prebook" className="btn btn--primary">Pre-Book Now →</Link>
        </div>
      </section>
    </>
  );
}
