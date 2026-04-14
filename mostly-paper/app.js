// ─────────────────────────────────────────────────────────────────
//  MOSTLY PAPER — App Logic
//  Cart, gallery rendering, modals, Stripe checkout
// ─────────────────────────────────────────────────────────────────

// ── State ────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('mp_cart') || '[]');
let activeSizeModal = null; // { painting, selectedSize }

// ── Helpers ──────────────────────────────────────
const $ = id => document.getElementById(id);
const fmt = n => '$' + n.toFixed(2).replace(/\.00$/, '');

function saveCart() {
  localStorage.setItem('mp_cart', JSON.stringify(cart));
}

// ── Gallery Render ────────────────────────────────
function renderGallery() {
  const grid = $('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const shown = PAINTINGS.filter(p => p.gallery);
  shown.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item' + (p.span2 ? ' span2' : '');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="${i < 3 ? 'eager' : 'lazy'}"
           onerror="this.style.display='none'">
      <div class="gallery-overlay">
        <div class="gallery-info">
          <p class="gallery-name">${p.title}</p>
          <p class="gallery-meta">${p.medium} · ${p.year}</p>
        </div>
      </div>
    `;
    div.addEventListener('click', () => openLightbox(p));
    grid.appendChild(div);
  });
}

// ── Shop Render ───────────────────────────────────
function renderShop() {
  renderPrintsGrid();
  renderOriginalsGrid();
}

function renderPrintsGrid() {
  const grid = $('prints-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PAINTINGS.forEach(p => {
    const minPrice = Math.min(...p.prints.map(s => s.price));
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             onerror="this.parentElement.style.background='#111'">
      </div>
      <div class="product-info">
        <p class="product-name">${p.title} — Print</p>
        <p class="product-detail">Giclée · Archival ink · from ${fmt(minPrice)}</p>
        <div class="product-bottom">
          <span class="product-price">from ${fmt(minPrice)}</span>
          <button class="product-cta">Select size</button>
        </div>
      </div>
    `;
    card.querySelector('.product-cta').addEventListener('click', e => {
      e.stopPropagation();
      openSizeModal(p);
    });
    card.addEventListener('click', () => openSizeModal(p));
    grid.appendChild(card);
  });
}

function renderOriginalsGrid() {
  const grid = $('originals-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PAINTINGS.forEach(p => {
    const avail = p.original.available;
    const card = document.createElement('div');
    card.className = 'product-card';
    if (!avail) card.style.opacity = '0.5';
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             onerror="this.parentElement.style.background='#111'">
        <span class="product-badge ${avail ? '' : 'sold'}">${avail ? 'Original' : 'Sold'}</span>
      </div>
      <div class="product-info">
        <p class="product-name">${p.title} — Original</p>
        <p class="product-detail">${p.medium} · ${p.original.size} · ${p.year}</p>
        <div class="product-bottom">
          <span class="product-price">${avail ? fmt(p.original.price) : 'Sold'}</span>
          <button class="product-cta" ${avail ? '' : 'disabled style="opacity:0.3;cursor:not-allowed"'}>
            ${avail ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    `;
    if (avail) {
      card.querySelector('.product-cta').addEventListener('click', e => {
        e.stopPropagation();
        addToCart({
          id: p.id + '-original',
          paintingId: p.id,
          title: p.title,
          type: 'original',
          size: p.original.size,
          price: p.original.price,
          image: p.image,
        });
      });
    }
    grid.appendChild(card);
  });
}

// ── Lightbox ──────────────────────────────────────
function openLightbox(painting) {
  $('lightbox-img').src = painting.image;
  $('lightbox-title').textContent = painting.title;
  $('lightbox-meta').textContent = `${painting.medium} · ${painting.original.size} · ${painting.year}`;
  $('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

$('lightbox-close').addEventListener('click', closeLightbox);
$('lightbox').addEventListener('click', e => {
  if (e.target === $('lightbox')) closeLightbox();
});

// ── Size Modal ────────────────────────────────────
function openSizeModal(painting) {
  activeSizeModal = { painting, selectedSize: painting.prints[1] }; // default to 8×10
  $('modal-img').src = painting.image;
  $('modal-title').textContent = painting.title;
  $('modal-medium').textContent = `${painting.medium} · ${painting.year}`;

  const opts = $('size-options');
  opts.innerHTML = '';
  painting.prints.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'size-btn' + (i === 1 ? ' selected' : '');
    btn.dataset.index = i;
    btn.innerHTML = `${s.label}<span class="size-price">${fmt(s.price)}</span>`;
    btn.addEventListener('click', () => selectSize(i, painting));
    opts.appendChild(btn);
  });

  $('modal-price').textContent = fmt(activeSizeModal.selectedSize.price);
  $('modal-overlay').classList.add('open');
  $('size-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectSize(index, painting) {
  activeSizeModal.selectedSize = painting.prints[index];
  document.querySelectorAll('.size-btn').forEach((b, i) => {
    b.classList.toggle('selected', i === index);
  });
  $('modal-price').textContent = fmt(activeSizeModal.selectedSize.price);
}

function closeSizeModal() {
  $('modal-overlay').classList.remove('open');
  $('size-modal').classList.remove('open');
  document.body.style.overflow = '';
  activeSizeModal = null;
}

$('modal-close').addEventListener('click', closeSizeModal);
$('modal-overlay').addEventListener('click', closeSizeModal);

$('modal-add-btn').addEventListener('click', () => {
  if (!activeSizeModal) return;
  const { painting, selectedSize } = activeSizeModal;
  addToCart({
    id: painting.id + '-print-' + selectedSize.label.replace(/[^a-z0-9]/gi, ''),
    paintingId: painting.id,
    title: painting.title,
    type: 'print',
    size: selectedSize.label,
    price: selectedSize.price,
    printfulVariantId: selectedSize.printfulVariantId,
    image: painting.image,
  });
  closeSizeModal();
});

// ── Cart ──────────────────────────────────────────
function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const items = $('cart-items');
  const footer = $('cart-footer');
  const count = $('cart-count');

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);

  count.textContent = totalQty;
  $('cart-total').textContent = fmt(total);

  if (cart.length === 0) {
    items.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.title}"
           onerror="this.style.background='#1a1a1a';this.removeAttribute('src')">
      <div>
        <p class="cart-item-name">${item.title}</p>
        <p class="cart-item-size">${item.type === 'original' ? 'Original · ' + item.size : 'Print · ' + item.size}${item.qty > 1 ? ' × ' + item.qty : ''}</p>
        <p class="cart-item-price">${fmt(item.price * item.qty)}</p>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">✕</button>
    </div>
  `).join('');

  items.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
}

function openCart() {
  $('cart-drawer').classList.add('open');
  $('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('cart-drawer').classList.remove('open');
  $('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

$('cart-toggle').addEventListener('click', openCart);
$('cart-close').addEventListener('click', closeCart);
$('cart-overlay').addEventListener('click', closeCart);

// ── Checkout → Stripe ─────────────────────────────
$('checkout-btn').addEventListener('click', async () => {
  if (cart.length === 0) return;

  const btn = $('checkout-btn');
  btn.textContent = 'Redirecting...';
  btn.disabled = true;

  try {
    // Send cart to your backend which creates a Stripe Checkout session
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    });

    if (!res.ok) throw new Error('Server error');
    const { url } = await res.json();
    window.location.href = url; // redirect to Stripe hosted checkout
  } catch (err) {
    console.error(err);
    btn.textContent = 'Error — try again';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Proceed to Checkout';
    }, 3000);
  }
});

// ── Tabs ──────────────────────────────────────────
document.querySelectorAll('.product-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.product-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    $('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ── Nav scroll effect ─────────────────────────────
window.addEventListener('scroll', () => {
  const nav = $('nav');
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(122,21,21,0.35)';
  } else {
    nav.style.borderBottomColor = 'rgba(122,21,21,0.2)';
  }
}, { passive: true });

// ── Init ──────────────────────────────────────────
renderGallery();
renderShop();
renderCart();
