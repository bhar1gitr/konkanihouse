// ✏️ Edit your shop details, prices, photos and text here.
export const SHOP = {
  name: 'Konkan Hapus',
  tagline: 'देवगडचा राजा',
  whatsapp: '919555726438', // ← your WhatsApp number with country code, no + or spaces
  phone: '+91 95557 26438',
  email: 'housekonkani@gmail.com',
  address: 'Devgad, Sindhudurg, Maharashtra',
  // Process video: a YouTube link, OR a file path like '/videos/process.mp4'
  // (put the file in public/videos/). Leave '' to show "coming soon".
  processVideo: '',
};

export const SEASON = {
  year: 2027,
  start: '2027-03-25', // expected first harvest
  advancePercent: 25, // advance to confirm a pre-booking
  freeDeliveryAbove: 3000,
  deliveryFee: 149,
  windows: [
    { id: 'early-apr', label: 'Early April', note: '1 – 10 April' },
    { id: 'mid-apr', label: 'Mid April', note: '11 – 20 April' },
    { id: 'late-apr', label: 'Late April', note: '21 – 30 April' },
    { id: 'may', label: 'May', note: '1 – 20 May' },
  ],
};

export const IMAGES = {
  pulp: { src: '/images/pulp.jpg', title: 'Saffron pulp, zero fibre', text: 'Cut open, the real Devgad Hapus is deep saffron, silky and fragrant.' },
  crates: { src: '/images/crates.jpg', title: 'Fresh from the orchard', text: 'Crates come straight down from our trees to the ripening room.' },
  hay: { src: '/images/hay-box.jpg', title: 'Ripened in hay', text: 'The traditional way, in dry grass. No carbide, no chemicals.' },
  grading: { src: '/images/grading.jpg', title: 'Hand-graded by size', text: 'Every mango is checked and sorted by hand before packing.' },
  box: { src: '/images/dozen-box.jpg', title: 'A dozen, ready for you', text: 'Packed on newspaper and cushioned, just like at home.' },
};
export const GALLERY = [IMAGES.box, IMAGES.pulp, IMAGES.hay, IMAGES.crates, IMAGES.grading];

export const PRODUCTS = [
  { id: 'devgad-1dz', name: 'Devgad Hapus', pack: '1 Dozen', size: 'Medium · 200–250 g each', price: 1299, mrp: 1599, badge: 'Bestseller', img: IMAGES.box.src },
  { id: 'devgad-large', name: 'Devgad Hapus Large', pack: '1 Dozen', size: 'Large · 250–300 g each', price: 1599, mrp: 1899, badge: 'Popular', img: IMAGES.hay.src },
  { id: 'devgad-2dz', name: 'Devgad Hapus', pack: '2 Dozen', size: 'Medium · 200–250 g each', price: 2449, mrp: 3199, badge: 'Family Pack', img: IMAGES.grading.src },
  { id: 'devgad-jumbo', name: 'Devgad Jumbo', pack: '1 Dozen', size: 'Jumbo · 300 g+ each', price: 1999, mrp: 2399, badge: 'Premium', img: IMAGES.pulp.src },
  { id: 'devgad-crate', name: 'Orchard Crate', pack: '5 Dozen', size: 'Mixed sizes · for families & events', price: 5499, mrp: 6999, badge: 'Best Value', img: IMAGES.crates.src },
];

export const STEPS = [
  { icon: '🌳', title: 'Grown in Devgad', text: 'Red laterite soil, sea breeze and coastal sun — the land that gives Devgad Hapus its name.' },
  { icon: '✋', title: 'Hand-Picked', text: 'Harvested at full maturity by hand, never shaken from the tree.' },
  { icon: '🌾', title: 'Hay Ripened', text: 'Ripened slowly in dry hay. Zero calcium carbide, zero chemical sprays.' },
  { icon: '📦', title: 'Graded & Packed', text: 'Sorted by size by hand, cushioned and shipped within 24 hours.' },
];

export const PREBOOK_STEPS = [
  { n: 1, title: 'Choose your box', text: 'Pick a pack and quantity for the 2027 season.' },
  { n: 2, title: 'Pick a delivery window', text: 'Early April to May — whenever suits you.' },
  { n: 3, title: `Pay ${SEASON.advancePercent}% advance`, text: 'Confirm on WhatsApp and pay a small advance by UPI.' },
  { n: 4, title: 'Get first harvest', text: 'Balance on delivery. Pre-bookings ship first.' },
];

// ⚠️ Sample reviews — replace with your real customers' words before going live.
export const REVIEWS = [
  { name: 'Priya S.', city: 'Pune', text: 'The aroma filled the whole house the moment we opened the box. This is the Hapus I remember from my aaji’s home.' },
  { name: 'Rahul M.', city: 'Bengaluru', text: 'Every single mango was perfect. Saffron-coloured, no fibre, unbelievably sweet.' },
  { name: 'Anita D.', city: 'Mumbai', text: 'Sent a box to my parents — they called just to say thank you. Lovely packing.' },
  { name: 'Vikram K.', city: 'Delhi', text: 'Genuine Devgad Hapus in Delhi. Arrived well-packed and ripened in two days.' },
];

export const FAQS = [
  { q: 'How does pre-booking work?', a: `Choose your box and a delivery window, then send the booking on WhatsApp. We confirm availability and share UPI details for a ${SEASON.advancePercent}% advance. The balance is paid when your mangoes are dispatched.` },
  { q: 'Can I cancel or change my booking?', a: 'Yes. You can change your box or delivery window anytime before 1 March 2027. Cancel before then for a full refund of your advance.' },
  { q: 'How do I know these are genuine Devgad Hapus?', a: 'They come from our own family orchard and neighbouring farms in Devgad that we know personally. Genuine Hapus has thin skin, saffron pulp, no fibre and a strong fragrance even before cutting.' },
  { q: 'Are the mangoes ripe on arrival?', a: 'They are shipped semi-ripe so they travel safely. Keep them in the box at room temperature and they will be ready in 2–4 days.' },
  { q: 'Where do you deliver?', a: `Across India. Mumbai and Pune in 1–2 days, other cities in 2–4 days. Free delivery above ₹${SEASON.freeDeliveryAbove.toLocaleString('en-IN')}.` },
];
