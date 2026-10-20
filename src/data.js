// ✏️ Edit your shop details, prices and products here.
export const SHOP = {
  name: 'Konkan Hapus',
  tagline: 'कोकणचा राजा',
  whatsapp: '919999999999', // ← your WhatsApp number with country code, no +
  phone: '+91 99999 99999',
  email: 'orders@konkanhapus.in',
  address: 'Ratnagiri, Maharashtra 415612',
};

export const PRODUCTS = [
  {
    id: 'ratnagiri-1dz',
    name: 'Ratnagiri Hapus',
    region: 'Ratnagiri',
    pack: '1 Dozen',
    size: 'Medium · 200–250 g each',
    price: 1199,
    mrp: 1499,
    badge: 'Bestseller',
    hue: 0,
    rating: 4.9,
  },
  {
    id: 'devgad-1dz',
    name: 'Devgad Hapus',
    region: 'Devgad',
    pack: '1 Dozen',
    size: 'Large · 250–300 g each',
    price: 1499,
    mrp: 1799,
    badge: 'GI Tagged',
    hue: 8,
    rating: 5.0,
  },
  {
    id: 'ratnagiri-2dz',
    name: 'Ratnagiri Hapus',
    region: 'Ratnagiri',
    pack: '2 Dozen',
    size: 'Medium · 200–250 g each',
    price: 2249,
    mrp: 2999,
    badge: 'Family Pack',
    hue: -6,
    rating: 4.9,
  },
  {
    id: 'devgad-jumbo',
    name: 'Devgad Jumbo',
    region: 'Devgad',
    pack: '1 Dozen',
    size: 'Jumbo · 300 g+ each',
    price: 1899,
    mrp: 2299,
    badge: 'Premium',
    hue: 14,
    rating: 5.0,
  },
  {
    id: 'gift-box',
    name: 'Royal Gift Box',
    region: 'Ratnagiri + Devgad',
    pack: '6 + 6 Mixed',
    size: 'Wooden crate · hand-picked',
    price: 1799,
    mrp: 2199,
    badge: 'Gift',
    hue: 4,
    rating: 4.8,
  },
  {
    id: 'aamras',
    name: 'Fresh Aamras',
    region: 'Ratnagiri',
    pack: '1 kg Jar',
    size: '100% pulp · no sugar added',
    price: 549,
    mrp: 699,
    badge: 'New',
    hue: -10,
    rating: 4.7,
  },
];

export const FILTERS = ['All', 'Ratnagiri', 'Devgad', 'Gifts & More'];

export const PROCESS = [
  { icon: '🌳', title: 'Grown in Konkan', text: 'Laterite soil, sea breeze and coastal sun — the only place true Hapus is born.' },
  { icon: '✋', title: 'Hand-Picked', text: 'Harvested at peak maturity by farmers who have tended these trees for generations.' },
  { icon: '🌾', title: 'Hay Ripened', text: 'Naturally ripened in dry grass. Zero calcium carbide, zero chemicals. Ever.' },
  { icon: '🚚', title: 'Farm to Door', text: 'Packed in cushioned boxes and shipped within 24 hours of grading.' },
];

export const REVIEWS = [
  { name: 'Priya S.', city: 'Pune', text: 'The aroma filled the whole house the moment we opened the box. This is the Hapus I remember from my aaji’s home.', stars: 5 },
  { name: 'Rahul M.', city: 'Bengaluru', text: 'Every single mango was perfect. Saffron-coloured, no fibre, unbelievably sweet. Ordering again!', stars: 5 },
  { name: 'Anita D.', city: 'Mumbai', text: 'Sent the gift box to my parents — they called me just to say thank you for the mangoes. Lovely packaging.', stars: 5 },
  { name: 'Vikram K.', city: 'Delhi', text: 'Finally genuine Devgad Hapus in Delhi. Arrived well-packed and ripened in two days exactly as promised.', stars: 5 },
];

export const FAQS = [
  { q: 'How do I know these are genuine Hapus?', a: 'Every mango comes from our own and partner orchards in Ratnagiri and Devgad. Devgad boxes carry GI-tag traceability. Genuine Hapus has a thin skin, saffron pulp, no fibre and a strong fragrance even before cutting.' },
  { q: 'Are the mangoes ripe on arrival?', a: 'They are shipped semi-ripe so they survive the journey. Keep them in the box at room temperature, and they will be ready in 2–4 days. A ripe Hapus smells sweet and gives slightly to a gentle press.' },
  { q: 'Do you use chemicals for ripening?', a: 'Never. We ripen only the traditional way, in dry hay. No calcium carbide and no ethylene spray.' },
  { q: 'Where do you deliver?', a: 'Across India. Mumbai and Pune in 1–2 days, other metros in 2–4 days. Delivery is free on orders above ₹1,999.' },
  { q: 'When is the season?', a: 'Hapus season runs from late March to early June. Pre-book now to get first-harvest priority.' },
];
