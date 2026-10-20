# Konkan Hapus — Online Mango Shop (React + Vite)

## Run it
```bash
npm install
npm run dev      # open http://localhost:5173
npm run build    # production files go to /dist
```

## Make it yours
Everything you need to edit is in **src/data.js**:
- `SHOP.whatsapp` — your WhatsApp number (e.g. 919876543210). Orders are sent here.
- `SHOP.phone`, `email`, `address`
- `PRODUCTS` — names, packs, sizes, prices, MRP, badges
- `REVIEWS`, `FAQS`, `PROCESS`

Free-delivery threshold and delivery fee are at the top of `src/components/Cart.jsx`.

## Deploy (free)
Push to GitHub, then import on Vercel or Netlify — build command `npm run build`, output folder `dist`.
