# Konkan Hapus — Devgad Mango Shop (React + Vite)

Pages: Home · Shop · Pre-Book 2027 · Gallery · About Us

## Run
npm install
npm run dev        # open http://localhost:5173

## Edit your details
Everything is in src/data.js:
- SHOP.whatsapp  → your WhatsApp number (e.g. 919876543210). Pre-bookings are sent here.
- SHOP.phone, email, address
- SHOP.processVideo → YouTube link, or '/videos/process.mp4' (put file in public/videos/)
- SEASON → year, start date, advance %, delivery fee, delivery windows
- PRODUCTS → boxes and prices
- REVIEWS → sample text, replace with real customer reviews
- FAQS → incl. cancellation policy, set your own

Photos live in public/images/ (keep the same file names to swap them).

## Deploy
Push to GitHub → import on Vercel or Netlify. Build: npm run build, output: dist.
vercel.json and public/_redirects make page links work after deploy.
