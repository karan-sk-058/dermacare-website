/* ============================================
   DermaCare - Main JavaScript
   Cart, Carousel, Search, Filters, Animations
   ============================================ */

/// ─── Product Database ────────────────────────
// To update a price or description: change the value here and re-upload to GitHub
const PRODUCTS = [
  { id: 4,  name: "CELIDAC CREAM",            price: 322, category: "cream",     badge: "popular", shopOnly: true, description: "Premium dermatological cream for targeted skin care treatment." },
  { id: 5,  name: "CELIDAC LOTION",            price: 311, category: "lotion",    badge: "",        shopOnly: true, description: "Lightweight moisturizing lotion for daily skin nourishment." },
  { id: 6,  name: "CELIDAC MAX",               price: 545, category: "specialty", badge: "new",     shopOnly: true, description: "Maximum-strength advanced formula for intensive skin repair." },
  { id: 20, name: "CELIDAC FACE WASH",         price: 259, category: "specialty", badge: "new",     shopOnly: true, description: "Gentle yet effective daily face wash for clear, radiant skin." },
  { id: 25, name: "CELIDAC-LP LOTION",         price: 274, category: "lotion",    badge: "",        shopOnly: true, description: "Long-protection moisturizing lotion for sustained skin hydration." },
  { id: 29, name: "CELIDAC CERA LOTION",       price: 627, category: "lotion",    badge: "new",     shopOnly: true, description: "Ceramide-enriched lotion restoring the skin's natural barrier." },
  { id: 9,  name: "DISPEL CREAM",              price: 478, category: "cream",     badge: "popular", shopOnly: true, description: "Premium pigmentation correction cream with advanced actives." },
  { id: 21, name: "DISPEL GOLD",               price: 570, category: "specialty", badge: "popular", shopOnly: true, description: "Gold-standard depigmentation formula with premium ingredients." },
  { id: 24, name: "DISPEL SPF SUNSCREEN",      price: 615, category: "specialty", badge: "new",     shopOnly: true, description: "Broad-spectrum SPF sunscreen with skin-brightening benefits." },
  { id: 30, name: "DISPEL GOLD SERUM (20ML)",  price: 952, category: "specialty", badge: "popular", shopOnly: true, description: "Ultra-premium serum delivering concentrated brightening actives." }
];

// ─── Image Helper ─────────────────────────────
// Converts product name to expected image filename
// e.g. "TUFTINA 100 MG" → "tuftina-100-mg"
function getProductImageName(name) {
  return name.toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Returns the best image src for a product
// Tries: .jpg → .png → .jpeg → falls back to placeholder
function getProductImageSrc(name) {
  const base = `images/products/${getProductImageName(name)}`;
  return base; // JS will try extensions at load time via onerror
}

// ─── Category Colors ─────────────────────────
const CATEGORY_COLORS = {
  cream: '#E91E7B',
  lotion: '#1B5E20',
  tablet: '#7C3AED',
  gel: '#0891B2',
  ointment: '#D97706',
  specialty: '#E91E7B'
};

// ─── Cart State ──────────────────────────────
let cart = JSON.parse(localStorage.getItem('dermacare_cart') || '[]');

// ─── Initialize ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();        // ← reads config.js settings
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initScrollTop();
  updateCartUI();

  // Page-specific init
  if (document.getElementById('featured-carousel')) initCarousel();
  if (document.getElementById('products-grid')) initShopPage();
  if (document.getElementById('contact-form')) initContactForm();
});

// ─── Apply Config Settings ───────────────────
function applyConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;
  const cfg = SITE_CONFIG;

  // 1. Announcement Banner
  const bar = document.getElementById('announcement-bar');
  if (bar && cfg.announcement && cfg.announcement.show) {
    bar.style.cssText = `
      display: block;
      background: ${cfg.announcement.backgroundColor || '#D81B76'};
      color: ${cfg.announcement.textColor || '#fff'};
      text-align: center;
      padding: 10px 20px;
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      position: relative;
      z-index: 1001;
    `;
    bar.innerHTML = `
      <span>${cfg.announcement.text}</span>
      <button onclick="this.parentElement.style.display='none'" style="
        position:absolute;right:16px;top:50%;transform:translateY(-50%);
        background:none;border:none;color:inherit;font-size:1.2rem;
        cursor:pointer;opacity:0.7;line-height:1;
      ">×</button>
    `;
  }

  // 2. Top Bar delivery message
  const topBarMsg = document.getElementById('top-bar-message');
  if (topBarMsg && cfg.delivery) {
    topBarMsg.textContent = cfg.delivery.topBarMessage || topBarMsg.textContent;
  }

  // 3. Top Bar phone number
  const topBarPhone = document.getElementById('top-bar-phone');
  if (topBarPhone && cfg.contact) {
    topBarPhone.href = `tel:+${cfg.contact.whatsappNumber}`;
    topBarPhone.textContent = `Customer Support: ${cfg.contact.displayPhone}`;
  }

  // 4. Sale banner overrides announcement when sale is active
  if (cfg.sale && cfg.sale.active && bar) {
    const saleText = cfg.sale.saleBannerText.replace('{percent}', cfg.sale.discountPercent);
    if (!cfg.announcement || !cfg.announcement.show) {
      bar.style.cssText = `
        display:block;background:#D81B76;color:#fff;
        text-align:center;padding:10px 20px;
        font-size:0.88rem;font-weight:600;position:relative;z-index:1001;
      `;
      bar.innerHTML = `<span>${saleText}</span>`;
    }
  }

  // 5. Update delivery threshold for cart (sync from config)
  if (cfg.delivery) {
    window.DELIVERY_THRESHOLD = cfg.delivery.freeDeliveryAbove || 500;
    window.DELIVERY_CHARGE = cfg.delivery.deliveryCharge || 80;
  }
}

// ─── Navbar Scroll Effect ────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── Mobile Menu ─────────────────────────────
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    toggle.innerHTML = mobileNav.classList.contains('active') ? '✕' : '☰';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      toggle.innerHTML = '☰';
    });
  });
}

// ─── Scroll Animations ──────────────────────
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!elements.length) return;

  // Immediately reveal elements already visible in viewport (fixes blank page on load)
  elements.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => el.classList.add('visible'), i * 60);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

  elements.forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}

// ─── Scroll-to-Top ──────────────────────────
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Product Card HTML Generator ─────────────
function createProductCard(product) {
  const initials = product.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const color = CATEGORY_COLORS[product.category] || '#E91E7B';
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const imgBase = getProductImageSrc(product.name);

  // Check for sale from config
  const cfg = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : null;
  const saleOn = cfg && cfg.sale && cfg.sale.active;
  const discPct = saleOn ? cfg.sale.discountPercent : 0;
  const salePrice = saleOn ? (product.price * (1 - discPct / 100)) : product.price;

  // Badge: sale overrides existing badge when sale is active
  let badgeText = '';
  if (saleOn) {
    badgeText = `<span class="product-badge sale">🏷️ ${discPct}% OFF</span>`;
  } else if (product.badge) {
    badgeText = `<span class="product-badge ${product.badge}">${product.badge === 'new' ? '✨ New' : product.badge === 'popular' ? '🔥 Popular' : product.badge}</span>`;
  }

  const priceHTML = saleOn
    ? `<div class="product-price"><span style="text-decoration:line-through;color:#aaa;font-size:0.8em;margin-right:4px">₹${product.price}</span><span class="currency">₹</span>${salePrice.toFixed(0)}</div>`
    : `<div class="product-price"><span class="currency">₹</span>${product.price.toFixed(2)}</div>`;

  return `
    <div class="product-card fade-in" data-category="${product.category}" data-id="${product.id}">
      <div class="product-image">
        <div class="product-image-placeholder" id="ph-${product.id}" style="background:${color}10;">
          <img
            src="${imgBase}.jpg"
            alt="${product.name}"
            class="product-real-img"
            onerror="this._tried=this._tried||[];
              if(!this._tried.includes('png')){this._tried.push('png');this.src='${imgBase}.png';}
              else if(!this._tried.includes('jpeg')){this._tried.push('jpeg');this.src='${imgBase}.jpeg';}
              else if(!this._tried.includes('webp')){this._tried.push('webp');this.src='${imgBase}.webp';}
              else{this.style.display='none';document.getElementById('fallback-${product.id}').style.display='flex';}"
            onload="document.getElementById('fallback-${product.id}').style.display='none';"
            style="width:100%;height:100%;object-fit:contain;position:absolute;top:0;left:0;padding:12px;box-sizing:border-box;"
          >
          <div id="fallback-${product.id}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;position:absolute;top:0;left:0;width:100%;">
            <div class="product-initials" style="background:${color};">${initials}</div>
            <span class="product-type-label">${categoryLabel}</span>
          </div>
        </div>
        ${badgeText}
        <button class="product-wishlist" aria-label="Add to wishlist">♡</button>
      </div>
      <div class="product-info">
        <div class="product-category-tag">${categoryLabel}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          ${priceHTML}
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `;
}

// ─── Featured Carousel ──────────────────────
function initCarousel() {
  const track = document.getElementById('featured-carousel');
  if (!track) return;

  // Only feature the 10 purchasable (shopOnly) products in the carousel
  const featured = PRODUCTS.filter(p => p.shopOnly === true && (p.badge === 'popular' || p.badge === 'new'));
  track.innerHTML = featured.map(createProductCard).join('');

  // Re-init animations for dynamically added cards
  initScrollAnimations();

  let currentIndex = 0;
  const cardWidth = 328; // card width + gap

  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  const totalSlides = Math.max(1, featured.length - 2);

  // Create dots
  if (dotsContainer) {
    for (let i = 0; i < Math.min(totalSlides, 8); i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => slideTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function slideTo(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => slideTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => slideTo(currentIndex + 1));

  // Auto-play
  let autoPlay = setInterval(() => slideTo((currentIndex + 1) % totalSlides), 4000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.parentElement.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => slideTo((currentIndex + 1) % totalSlides), 4000);
  });
}

// ─── Shop Page ──────────────────────────────
function initShopPage() {
  const grid = document.getElementById('products-grid');
  const searchInput = document.getElementById('shop-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const sortSelect = document.getElementById('shop-sort');
  const countDisplay = document.getElementById('product-count');

  let currentFilter = 'all';
  let currentSearch = '';
  let currentSort = 'name-asc';

  function renderProducts() {
    // Only show products marked shopOnly:true (the 10 purchasable products)
    let filtered = PRODUCTS.filter(p => {
      const isListed  = p.shopOnly === true;
      const matchFilter = currentFilter === 'all' || p.category === currentFilter;
      const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
      return isListed && matchFilter && matchSearch;
    });

    const shopTotal = PRODUCTS.filter(p => p.shopOnly === true).length;

    // Sort
    switch (currentSort) {
      case 'price-asc':  filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc':  filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    grid.innerHTML = filtered.length
      ? filtered.map(createProductCard).join('')
      : '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#6B7280;"><p style="font-size:1.2rem;">No products found matching your criteria.</p></div>';

    if (countDisplay) {
      countDisplay.innerHTML = `Showing <span>${filtered.length}</span> of <span>${shopTotal}</span> products`;
    }

    initScrollAnimations();
  }

  // Filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderProducts();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderProducts();
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  renderProducts();
}

// ─── Cart Functions ─────────────────────────
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('dermacare_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Update badge counts
  document.querySelectorAll('.cart-count').forEach(el => {
    const count = getCartCount();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });

  // Update cart sidebar
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalAmount = document.querySelector('.cart-total-amount');
  const cartFooter = document.querySelector('.cart-footer');

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <h4>Your cart is empty</h4>
          <p>Browse our products and add items to your cart.</p>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      cartItemsContainer.innerHTML = cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return '';
        const initials = product.name.split(' ').map(w => w[0]).slice(0, 2).join('');
        const color = CATEGORY_COLORS[product.category] || '#E91E7B';
        return `
          <div class="cart-item">
            <div class="cart-item-image" style="background:${color}">${initials}</div>
            <div class="cart-item-details">
              <div class="cart-item-name">${product.name}</div>
              <div class="cart-item-price">₹${(product.price * item.qty).toFixed(2)}</div>
              <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
              </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
          </div>
        `;
      }).join('');
      if (cartFooter) cartFooter.style.display = 'block';
    }
  }

  if (cartTotalAmount) {
    const subtotal = getCartTotal();
    const shipping = subtotal > 0 && subtotal < 500 ? 80 : 0;
    const grandTotal = subtotal + shipping;
    const shippingNote = subtotal === 0 ? '' :
      shipping === 0
        ? `<div style="font-size:0.75rem;color:#1B5E20;margin-bottom:6px;font-weight:500;">🎉 Free delivery applied!</div>`
        : `<div style="font-size:0.75rem;color:#E91E7B;margin-bottom:6px;">+₹80 delivery · Add ₹${(500-subtotal).toFixed(0)} more for FREE delivery</div>`;

    const cartTotalWrap = cartTotalAmount.closest('.cart-total');
    if (cartTotalWrap) {
      // Remove old notice first to avoid stacking
      const prevNotice = cartTotalWrap.previousElementSibling;
      if (prevNotice && prevNotice.classList.contains('cart-shipping-notice')) prevNotice.remove();
      if (shippingNote) {
        cartTotalWrap.insertAdjacentHTML('beforebegin', `<div class="cart-shipping-notice">${shippingNote}</div>`);
      }
    }
    cartTotalAmount.textContent = `₹${grandTotal.toFixed(2)}`;
  }
}

// ─── Cart Sidebar Toggle ────────────────────
function toggleCart() {
  const sidebar = document.querySelector('.cart-sidebar');
  const overlay = document.querySelector('.cart-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }
}

// ─── Toast Notification ─────────────────────
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ─── Contact Form ───────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Simulate submission
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      showToast('Message sent successfully! We\'ll get back to you soon.');
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1500);
  });
}
