# Mostly Paper — Developer Handoff

Written 2026-10-21. Everything here was checked against the code in this ZIP unless marked "unverified".

## Links

- **GitHub repo:** https://github.com/hondamasao/mostly_paper (public, default branch `main`)
- **Live site:** none found. The repo has no homepage URL, no hosting config and no CNAME file. Ask the owner where it is deployed, if anywhere.
- **Domain:** none configured in the repo. The code assumes `mostly-paper.com` for outgoing email addresses, but nothing confirms the owner controls it.
- **Unmerged work:** the removal of the drawings is on branch `claude/remove-drawings-M4awZ`, not on `main`. This ZIP contains that branch. `main` still has the drawings until someone merges it.

## What the site is

A single-page art shop with a Node backend.

| Part | Technology |
|---|---|
| Frontend | Plain HTML, CSS and JavaScript. No framework, no build step. |
| Backend | Node.js 18+ with Express (`api/server.js`). Also serves the frontend files. |
| Payments | Stripe hosted Checkout |
| Print fulfillment | Printful API, triggered by a Stripe webhook |
| Optional email | Resend, only for alerts when an original painting sells |
| Fonts | Google Fonts (Bebas Neue, DM Mono) loaded from the web. No font files are in the project. |
| Database | None |

Files that matter:

- `index.html`, `style.css`, `app.js`: the page, styles and cart/gallery logic.
- `data.js`: the whole catalog. Titles, prices, sizes and Printful variant IDs live here.
- `api/server.js`: `POST /api/create-checkout` and `POST /api/webhook`.
- `success.html`: post-payment page. It clears the cart.
- `painting-01.jpg` to `painting-09.jpg`: artwork, in the project root.
- `drawing-01.jpg` to `drawing-08.jpg`: no longer used by the site (see below).
- `package-lock.json`: generated while preparing this handoff. The project had none before.

## Run it locally

```bash
npm ci
cp .env.example .env     # fill in test keys
npm run dev              # http://localhost:3000
```

The page itself loads without any keys. Checkout needs `STRIPE_SECRET_KEY`. For webhooks on your machine, use the Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`, and put the `whsec_` value it prints in `STRIPE_WEBHOOK_SECRET`. There are no automated tests.

## What I verified works

- The server starts and serves the site.
- A headless browser load showed 9 paintings in the gallery, 9 print cards, 9 original cards, no console errors and no failed requests.
- Opening a print, choosing a size and adding to cart works.
- Dotfiles such as `.env` are not served by the static handler.

## What I could not verify

- A real payment, a real Stripe webhook, or a real Printful order. No keys were available, so the whole payment-to-fulfillment path is untested. With a fake key, checkout returns an error as expected.
- Whether the site is deployed anywhere, or what it looks like live.

## Unfinished or likely broken

Ordered by how likely they are to hurt a real sale.

1. **Printful variant IDs may be the wrong kind (unverified).** The IDs in `data.js` look like Printful *external* IDs (hex strings such as `69defba9454192`). The server sends them as `sync_variant_id`, which Printful expects as a number. If so, every print order fails at Printful after the customer has paid. Test with one real order in Stripe test mode and Printful draft mode before launch. The fix is probably to send `external_variant_id` instead.
2. **Printful failures are silent.** The webhook logs the error, still returns success to Stripe, and has a `TODO` for a fallback email. A paid print order can be lost with nobody told. Stripe will not retry because it received a success reply.
3. **Checkout fails for carts with 5 or more different items.** The server stores the cart in Stripe metadata, which has a 500-character limit per value. Five lines is about 520 characters. Store a short order ID instead.
4. **`YOUR_DOMAIN` must be set in production.** If it is missing, customers are sent back to `http://localhost:3000` after paying, and product images in Stripe Checkout use the wrong URL.
5. **Static-only hosting will break checkout.** The cart button calls `/api/create-checkout`. GitHub Pages, or any host that does not run `node api/server.js`, shows "Error — try again". This may be the cause of any "checkout doesn't work" report, but I cannot tell without knowing where the site is hosted.
6. **Shipping address field may move (unverified).** The webhook reads `session.shipping_details`. Newer Stripe API versions put it under `collected_information.shipping_details`. If the Stripe account or webhook endpoint uses a newer API version, Printful orders would silently get no address and be skipped. Pin the version or read both fields.
7. **Duplicate orders are possible.** There is no check for a Stripe event already handled.
8. **Leftover drawing content.** The hero text ("Oil on canvas, pen on paper") and the scrolling ticker ("Pen on Paper") still mention drawings. The eight `drawing-*.jpg` files are still in the repo but unused. The gallery now has only an "All" and a "Paintings" tab, which is redundant. Browsers may keep serving an old cached `data.js` because `index.html` loads `data.js?v=2`. Bump it to `?v=3`. Customers who already had a drawing in their cart can still check out with it.
9. **Source files are publicly served.** `express.static('.')` serves the project folder, so `api/server.js` and `package.json` can be downloaded. There are no secrets in them, but serve a dedicated `public/` folder instead.
10. **README is out of date.** It mentions an `images/` folder and an `.env.example`; images are in the project root, and `.env.example` is new in this ZIP.

## What changes might have caused problems

I do not know which problems you have seen, so these are leads from the git history, not conclusions.

- All 50 commits before mine were made through the GitHub web editor ("Update data.js", "Add files via upload"). That means nothing was run or tested between edits, and trailing-whitespace changes crept into `api/server.js`.
- On 2026-04-14 the static-file line in `server.js` changed from a path relative to the file to `'.'`. It now depends on which folder the server is started from. Starting it from anywhere but the project root serves nothing.
- Between 2026-04-14 and 2026-04-20, `data.js` was edited 12 times by hand. Printful IDs were pasted in by hand, which is where a wrong ID kind (item 1) would come from.
- The drawings were listed for sale with empty Printful IDs. A customer buying a drawing print would have been charged and nothing ordered. Removing them closed that gap.
- Painting images 04 to 09 were deleted and re-uploaded on 2026-04-14. Check that the filenames in `data.js` still match the files.

## Setup for hosting, domain, payments and orders

**Hosting.** Any host that runs Node. The README suggests Railway; Render and Fly.io also work. Steps: connect the GitHub repo, build command `npm ci`, start command `npm start`, add the environment variables from `.env.example`. Do not use a static-only host.

**Domain.** Add the custom domain in the host's settings and set its DNS records as the host instructs. Then set `YOUR_DOMAIN` to the final `https://` address. If using Resend, verify the sending domain there and change the hard-coded `from` address in `api/server.js` (`orders@mostly-paper.com`) to match.

**Payments (Stripe).**
1. Create or open the Stripe account and copy the secret key into `STRIPE_SECRET_KEY`. Use `sk_test_` keys first.
2. Add a webhook endpoint at `https://YOUR_DOMAIN/api/webhook`, event `checkout.session.completed`.
3. Copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Switch to live keys only after a full test order works. Shipping is fixed at $7.99 standard and $15.99 express in `server.js`.

**Prints (Printful).** Create a token under Settings, then API, and put it in `PRINTFUL_API_KEY`. Each painting needs a Printful product with four size variants (8x10, 11x14, 18x24, 24x36). Paste the variant IDs into the matching entry in `data.js` (see item 1 above on which ID type to use).

**Database.** There is none. The catalog is the `PAINTINGS` array in `data.js`, and the cart is stored in the visitor's browser.

**Artwork uploads.** There is no upload screen. To add a painting: add the JPG to the project root, add an entry to `PAINTINGS` in `data.js`, create the Printful product and paste its IDs, then commit and redeploy. For print quality, the README asks for 300 DPI at the largest size (7200 by 10800 pixels for 24x36). The current painting files are about 0.8 to 2.2 MB each, so they are probably web-sized and too small to print at 24x36. Keep the full-resolution files in Printful, not in this repo. To mark an original as sold, set `original.available` to `false`.

**Order management.** There is no admin page. Orders are handled in these places:
- Stripe Dashboard: payments, customer details and shipping address for every order.
- Printful Dashboard: print orders and their shipping status.
- Originals: the server only logs the sale and, if `RESEND_API_KEY` is set, emails `JASON_EMAIL`. The artist ships these by hand from the Stripe order.

## Security notes

- Two GitHub personal access tokens were pasted into the chat while pushing to this repo. Revoke both at https://github.com/settings/tokens. They are not in this ZIP and have been removed from the git remote.
- `.env` is now listed in `.gitignore`. No secrets are in the repo or this ZIP.
- The footer contains the owner's personal email address in plain text.
