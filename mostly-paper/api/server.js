// ─────────────────────────────────────────────────────────────────
//  MOSTLY PAPER — Backend API
//  Node.js (Express). Handles Stripe checkout + Printful fulfillment.
//
//  Setup:
//    npm install express stripe dotenv
//    node api/server.js
//
//  Required .env variables (see .env.example):
//    STRIPE_SECRET_KEY
//    STRIPE_WEBHOOK_SECRET
//    PRINTFUL_API_KEY
//    YOUR_DOMAIN  (e.g. https://mostlypaper.com)
// ─────────────────────────────────────────────────────────────────

require('dotenv').config();
const express = require('express');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto  = require('crypto');

const app = express();

// ── Raw body needed for Stripe webhook signature verification
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.static('.')); // serve frontend files

const DOMAIN = process.env.YOUR_DOMAIN || 'http://localhost:3000';

// ─────────────────────────────────────────────────────────────────
//  POST /api/create-checkout
//  Body: { items: [ { id, title, type, size, price, qty, printfulVariantId, image } ] }
//  Returns: { url } — Stripe hosted checkout URL
// ─────────────────────────────────────────────────────────────────
app.post('/api/create-checkout', async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    // Build Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
        product_data: {
          name: `${item.title} — ${item.type === 'original' ? 'Original' : `Print (${item.size})`}`,
          images: item.image ? [`${DOMAIN}/${item.image}`] : [],
          metadata: {
            paintingId: item.paintingId || '',
            type: item.type,
            size: item.size,
            printfulVariantId: item.printfulVariantId || '',
          },
        },
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${DOMAIN}/#shop`,
      // Collect shipping address for fulfillment
      shipping_address_collection: {
        allowed_countries: [
          'US','CA','GB','AU','DE','FR','NL','SE','NO','DK','FI',
          'IT','ES','PT','BE','AT','CH','PL','CZ','HU','RO','BG',
          'JP','KR','SG','HK','NZ','MX','BR','AR','RU','UA','BY'
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 799, currency: 'usd' },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 12 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1599, currency: 'usd' },
            display_name: 'Express shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      // Store full cart in metadata for webhook reference
      metadata: {
        cart: JSON.stringify(items.map(i => ({
          paintingId: i.paintingId,
          type: i.type,
          size: i.size,
          qty: i.qty,
          printfulVariantId: i.printfulVariantId || '',
        }))),
      },
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────
//  POST /api/webhook
//  Stripe sends events here after payment.
//  On checkout.session.completed → auto-fulfill prints via Printful.
//  Originals are flagged for manual handling.
// ─────────────────────────────────────────────────────────────────
app.post('/api/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await handleSuccessfulPayment(session);
  }

  res.json({ received: true });
});

// ─────────────────────────────────────────────────────────────────
//  handleSuccessfulPayment
//  Splits order into prints (→ Printful) and originals (→ email alert)
// ─────────────────────────────────────────────────────────────────
async function handleSuccessfulPayment(session) {
  let cartItems = [];
  try {
    cartItems = JSON.parse(session.metadata.cart || '[]');
  } catch (e) {
    console.error('Failed to parse cart metadata');
    return;
  }

  const shipping = session.shipping_details?.address;
  const customerEmail = session.customer_details?.email;
  const customerName  = session.customer_details?.name;

  const prints   = cartItems.filter(i => i.type === 'print');
  const originals = cartItems.filter(i => i.type === 'original');

  // ── Auto-fulfill prints via Printful ──────────────
  if (prints.length > 0 && shipping) {
    const printfulItems = prints
      .filter(i => i.printfulVariantId) // only if variant IDs are configured
      .flatMap(i => Array(i.qty).fill({
        sync_variant_id: i.printfulVariantId,
        quantity: 1,
      }));

    if (printfulItems.length > 0) {
      try {
        await createPrintfulOrder({
          recipient: {
            name:    customerName || 'Customer',
            email:   customerEmail,
            address1: shipping.line1,
            address2: shipping.line2 || '',
            city:    shipping.city,
            state_code: shipping.state || '',
            country_code: shipping.country,
            zip:     shipping.postal_code,
          },
          items: printfulItems,
          retail_costs: {
            shipping: '0.00', // already charged via Stripe
          },
        });
        console.log(`Printful order created for ${customerEmail}`);
      } catch (err) {
        console.error('Printful error:', err);
        // TODO: send yourself a fallback email
      }
    } else {
      console.warn('Prints in order but no Printful variant IDs configured. Update data.js.');
    }
  }

  // ── Alert Jason about originals (manual fulfillment) ──
  if (originals.length > 0) {
    console.log('=== ORIGINAL SALE — MANUAL FULFILLMENT NEEDED ===');
    console.log('Customer:', customerName, customerEmail);
    console.log('Shipping:', shipping);
    console.log('Items:', originals);
    // TODO: send an email/SMS to Jason here using Resend, Postmark, or Twilio
  }
}

// ─────────────────────────────────────────────────────────────────
//  Printful API helper
// ─────────────────────────────────────────────────────────────────
async function createPrintfulOrder(orderData) {
  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...orderData, confirm: true }),
  });

  const data = await response.json();
  if (data.code !== 200) {
    throw new Error(`Printful API error: ${JSON.stringify(data)}`);
  }
  return data.result;
}

// ─────────────────────────────────────────────────────────────────
//  Start server
// ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mostly Paper running on http://localhost:${PORT}`);
});
