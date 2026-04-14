# Mostly Paper — Website

Full custom artist website with cart, Stripe checkout, and Printful auto-fulfillment.

---

## Stack

- **Frontend** — Vanilla HTML/CSS/JS, no framework, no build step
- **Backend** — Node.js + Express
- **Payments** — Stripe (hosted checkout, ~2.9% + $0.30/sale)
- **Print fulfillment** — Printful API (auto-fulfills on payment)
- **Hosting** — Any Node host: Railway, Render, Fly.io (all have free tiers)

---

## Setup (one time)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Then fill in `.env` with your real keys (see below).

### 3. Stripe setup
1. Create account at https://stripe.com
2. Go to Developers → API Keys
3. Copy your **Secret key** → `STRIPE_SECRET_KEY` in `.env`
4. For webhooks: Developers → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/webhook`
   - Events to listen for: `checkout.session.completed`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET` in `.env`

### 4. Printful setup
1. Create account at https://printful.com
2. Go to Settings → API → Generate token
3. Copy token → `PRINTFUL_API_KEY` in `.env`
4. In Printful, create a product for each painting (use "Enhanced Matte Paper Poster" or "Premium Luster Photo Paper Poster")
5. Upload each painting as the print file
6. For each size variant, copy the **Sync Variant ID** from the Printful dashboard
7. Paste those IDs into `data.js` in the `printfulVariantId` fields

### 5. Add painting images
- Put all painting images in the `images/` folder
- Name them `painting-01.jpg`, `painting-02.jpg`, etc. (or update `data.js` to match your filenames)
- **Minimum resolution**: 300 DPI at the largest print size you offer (24×36" = 7200×10800px minimum)
- **Format**: JPG or PNG

### 6. Update data.js
- Change painting titles, years, sizes, and prices as needed
- Update artist info in `index.html` (TikTok handle, email, about text)
- Update footer links

### 7. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Deployment (free)

### Recommended: Railway
1. Push this folder to a GitHub repo
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Add your `.env` variables in Railway's environment settings
4. Railway gives you a free `.up.railway.app` subdomain
5. Point your custom domain to it in Railway settings

### Also works: Render, Fly.io, Heroku

---

## Adding a new painting

1. Add image to `images/`
2. Add an entry to `PAINTINGS` array in `data.js`
3. Set up the Printful product and paste variant IDs into `data.js`
4. That's it — gallery and shop update automatically

## Marking an original as sold

In `data.js`, find the painting and set:
```js
original: { available: false, ... }
```

---

## How orders work

**Prints:**
1. Customer adds to cart, checks out via Stripe
2. Payment lands in Jason's Stripe account
3. Stripe fires a webhook to `/api/webhook`
4. Server automatically places order with Printful
5. Printful prints and ships to customer
6. Jason never touches it

**Originals:**
1. Same checkout flow
2. Webhook logs the order (and optionally emails/texts Jason)
3. Jason ships manually

---

## Folder structure

```
mostly-paper/
├── index.html          ← main site
├── success.html        ← post-checkout confirmation
├── style.css           ← all styles
├── data.js             ← painting catalog (edit this!)
├── app.js              ← frontend logic (cart, modals, etc)
├── package.json
├── .env.example        ← copy to .env
├── api/
│   └── server.js       ← Node backend (Stripe + Printful)
└── images/
    └── painting-01.jpg ← put Jason's images here
```
