const TRANSLATIONS = {
  ar: {
    nav_all: "الكل",
    nav_apparel: "ملابس رياضية",
    nav_supplements: "مكملات غذائية",
    nav_accessories: "إكسسوارات الجيم",
    search_placeholder: "ابحث عن منتج...",
    hero_badge: "تشكيلة 2026 الحصرية",
    shop_now: "تسوق الآن",
    why_us: "ليه تختار VANTOR؟",
    feat1_title: "مكملات أصلية 100%",
    feat1_desc: "مضمونة ومختومة بباركود التحقق",
    feat2_title: "خامات رياضية احترافية",
    feat2_desc: "مقاومة للتعرق ومرونة عالية للتمرين",
    feat3_title: "توصيل سريع في مصر",
    feat3_desc: "من 2 إلى 4 أيام عمل لباب البيت",
    feat4_title: "طلب سريع عبر واتساب",
    feat4_desc: "تأكيد فوري بالمقاس والنكهة المختارة",
    our_products: "منتجاتنا المميزة",
    footer_desc: "وجهتك الأولى للملابس الرياضية العصرية ومكملات الجيم الأصلية في مصر.",
    quick_links: "روابط سريعة",
    all_products: "جميع المنتجات",
    shipping_policy: "سياسة الاستبدال والشحن",
    contact_us: "تواصل معنا",
    footer_loc: "📍 الإسكندرية / القاهرة - شحن لجميع المحافظات",
    cart_title: "سلة المشتريات 🛒",
    total_label: "الإجمالي:",
    whatsapp_checkout: "إتمام الطلب عبر واتساب 💬",
    add_to_cart: "أضف إلى السلة 🛒",
    out_of_stock: "نفدت الكمية ❌",
    in_stock: "متوفر:",
    pieces: "قطعة",
    select_size: "اختر المقاس:",
    select_flavor: "اختر النكهة:",
    currency: "ج.م",
    empty_cart: "سلة المشتريات فارغة حالياً.",
    no_results: "لا توجد منتجات مطابقة لبحثك حالياً.",
    instagram_line: "📸 Instagram: @vantor.egy", footer_copyright: "© 2026 VANTOR.EGY - Elevate Your Performance"
  },
  en: {
    nav_all: "All",
    nav_apparel: "Apparel",
    nav_supplements: "Supplements",
    nav_accessories: "Accessories",
    search_placeholder: "Search products...",
    hero_badge: "EXCLUSIVE 2026 DROP",
    shop_now: "Shop Now",
    why_us: "Why VANTOR?",
    feat1_title: "100% Authentic Supps",
    feat1_desc: "Sealed with official verification barcode",
    feat2_title: "Pro Athletic Fabrics",
    feat2_desc: "Sweat-wicking & high stretch durability",
    feat3_title: "Fast Egypt Delivery",
    feat3_desc: "2 to 4 business days to your door",
    feat4_title: "Instant WhatsApp Order",
    feat4_desc: "Direct confirmation with size & flavor",
    our_products: "Featured Products",
    footer_desc: "Your #1 destination for modern athletic apparel & authentic gym supplements in Egypt.",
    quick_links: "Quick Links",
    all_products: "All Products",
    shipping_policy: "Shipping & Exchange Policy",
    contact_us: "Contact Us",
    footer_loc: "📍 Alexandria / Cairo - Nationwide Delivery",
    cart_title: "Shopping Cart 🛒",
    total_label: "Total:",
    whatsapp_checkout: "Order via WhatsApp 💬",
    add_to_cart: "Add to Cart 🛒",
    out_of_stock: "Out of Stock ❌",
    in_stock: "In Stock:",
    pieces: "pcs",
    select_size: "Select Size:",
    select_flavor: "Select Flavor:",
    currency: "EGP",
    empty_cart: "Your shopping cart is empty.",
    no_results: "No products match your search.",
    instagram_line: "📸 Instagram: @vantor.egy", footer_copyright: "© 2026 VANTOR.EGY - Elevate Your Performance"
  }
};

const CATEGORY_LABELS = {
  ar: { apparel: "ملابس رياضية", supplements: "مكملات غذائية", accessories: "إكسسوارات الجيم" },
  en: { apparel: "Apparel", supplements: "Supplements", accessories: "Accessories" }
};

let currentLang = localStorage.getItem("vantor_lang") || "ar";
let products = getStoreProducts();
let settings = getStoreSettings();
let cart = JSON.parse(localStorage.getItem("vantor_cart_v4")) || [];
let currentFilter = "all";
let searchQuery = "";
let selectedVariants = {};

function saveCart() {
  localStorage.setItem("vantor_cart_v4", JSON.stringify(cart));
}

function getTranslationDict(lang = currentLang) {
  const savedTexts = lang === "ar" ? settings.contentAr : settings.contentEn;
  return { ...TRANSLATIONS[lang], ...(savedTexts || {}) };
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("vantor_lang", lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  const dict = getTranslationDict(lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(dict, key)) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (Object.prototype.hasOwnProperty.call(dict, key)) el.placeholder = dict[key];
  });

  // Apply dynamic settings edited from Admin Panel
  document.getElementById("announcementBar").textContent =
    lang === "ar" ? settings.announcementAr : settings.announcementEn;
  document.getElementById("heroTitleEl").innerHTML =
    lang === "ar" ? settings.heroTitleAr : settings.heroTitleEn;
  document.getElementById("heroSubEl").textContent =
    lang === "ar" ? settings.heroSubAr : settings.heroSubEn;
  document.getElementById("footerWhatsappDisplay").textContent = settings.whatsapp;

  document.getElementById("langToggleBtn").textContent = lang === "ar" ? "🌐 EN" : "🌐 عربي";

  renderProducts();
  updateCartUI();
}

document.getElementById("langToggleBtn").addEventListener("click", () => {
  applyLanguage(currentLang === "ar" ? "en" : "ar");
});

function ensureDefaultVariants(product) {
  if (!selectedVariants[product.id]) {
    selectedVariants[product.id] = {
      size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : null,
      flavor: product.flavors && product.flavors.length > 0 ? product.flavors[0] : null
    };
  }
}

function selectVariant(productId, type, value) {
  if (!selectedVariants[productId]) selectedVariants[productId] = {};
  selectedVariants[productId][type] = value;
  renderProducts();
}

function getVariantPrice(product, selection) {
  const sizePrice = selection && selection.size && product.sizePrices && product.sizePrices[selection.size];
  const flavorPrice = selection && selection.flavor && product.flavorPrices && product.flavorPrices[selection.flavor];
  return Number(flavorPrice || sizePrice || product.price || 0);
}

function renderProducts() {
  const dict = getTranslationDict(currentLang);
  const productGrid = document.getElementById("productGrid");

  const filtered = products.filter(p => {
    const matchesCat = currentFilter === "all" || p.category === currentFilter;
    const name = currentLang === "ar" ? p.nameAr : p.nameEn;
    const desc = currentLang === "ar" ? p.descAr : p.descEn;
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#9ca3af; padding:40px 0;">${dict.no_results}</p>`;
    return;
  }

  productGrid.innerHTML = filtered
    .map(product => {
      ensureDefaultVariants(product);
      const name = currentLang === "ar" ? product.nameAr : product.nameEn;
      const desc = currentLang === "ar" ? product.descAr : product.descEn;
      const catLabel = dict[`nav_${product.category}`] || CATEGORY_LABELS[currentLang][product.category] || "";
      const isOut = product.stock <= 0;
      const sel = selectedVariants[product.id];
      const selectedPrice = getVariantPrice(product, sel);

      const sizesHtml =
        product.sizes && product.sizes.length > 0
          ? `<div class="variant-group">
              <span class="variant-label">${dict.select_size}</span>
              <div class="variant-pills">
                ${product.sizes
                  .map(
                    s =>
                      `<button type="button" class="variant-pill ${sel.size === s ? "selected" : ""}" onclick="selectVariant(${product.id}, 'size', '${s}')">${s}</button>`
                  )
                  .join("")}
              </div>
            </div>`
          : "";

      const flavorsHtml =
        product.flavors && product.flavors.length > 0
          ? `<div class="variant-group">
              <span class="variant-label">${dict.select_flavor}</span>
              <div class="variant-pills">
                ${product.flavors
                  .map(
                    f =>
                      `<button type="button" class="variant-pill ${sel.flavor === f ? "selected" : ""}" onclick="selectVariant(${product.id}, 'flavor', '${f}')">${f}</button>`
                  )
                  .join("")}
              </div>
            </div>`
          : "";

      return `
      <article class="product-card">
        <div class="product-img-wrapper" onclick="openQuickView(${product.id})">
          <img src="${product.image}" alt="${name}" loading="lazy" />
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <span class="stock-badge ${isOut ? "out-of-stock" : ""}">
            ${isOut ? dict.out_of_stock : `${dict.in_stock} ${product.stock} ${dict.pieces}`}
          </span>
        </div>
        <div class="product-info">
          <span class="product-cat">${catLabel}</span>
          <h3 class="product-title">${name}</h3>
          <p class="product-desc">${desc}</p>
          ${sizesHtml}
          ${flavorsHtml}
          <div class="product-price-row">
            <span class="current-price">${selectedPrice.toLocaleString()} ${dict.currency}</span>
            ${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString()} ${dict.currency}</span>` : ""}
          </div>
          <button class="add-to-cart-btn" ${isOut ? "disabled" : ""} onclick="addToCart(${product.id})">
            ${isOut ? dict.out_of_stock : dict.add_to_cart}
          </button>
        </div>
      </article>
    `;
    })
    .join("");
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || product.stock <= 0) return;

  ensureDefaultVariants(product);
  const sel = selectedVariants[product.id];
  const variantKey = `${product.id}_${sel.size || ""}_${sel.flavor || ""}`;
  const selectedPrice = getVariantPrice(product, sel);

  const existing = cart.find(item => item.variantKey === variantKey);
  const totalInCartForProduct = cart
    .filter(item => item.id === productId)
    .reduce((sum, i) => sum + i.qty, 0);

  if (totalInCartForProduct >= product.stock) {
    alert(currentLang === "ar" ? "عذراً، وصلت للحد الأقصى المتوفر في المخزن!" : "Maximum available stock reached!");
    return;
  }

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      variantKey,
      id: product.id,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      price: selectedPrice,
      image: product.image,
      size: sel.size,
      flavor: sel.flavor,
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  document.getElementById("cartDrawer").classList.add("open");
}

function changeCartQty(variantKey, delta) {
  const item = cart.find(i => i.variantKey === variantKey);
  if (!item) return;

  const product = products.find(p => p.id === item.id);
  if (delta > 0 && product) {
    const totalForProd = cart.filter(i => i.id === item.id).reduce((s, i) => s + i.qty, 0);
    if (totalForProd >= product.stock) return;
  }

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.variantKey !== variantKey);
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const dict = getTranslationDict(currentLang);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById("cartCount").textContent = totalQty;
  document.getElementById("cartTotalPrice").textContent = `${totalPrice.toLocaleString()} ${dict.currency}`;

  const cartItemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="text-align:center; color:#9ca3af; margin-top:40px;">${dict.empty_cart}</p>`;
    return;
  }

  cartItemsEl.innerHTML = cart
    .map(item => {
      const name = currentLang === "ar" ? item.nameAr : item.nameEn;
      const variantDetails = [item.size, item.flavor].filter(Boolean).join(" | ");
      return `
      <div class="cart-item">
        <img src="${item.image}" alt="${name}" />
        <div class="cart-item-info">
          <h4 style="font-size:0.95rem;">${name}</h4>
          ${variantDetails ? `<span class="cart-variant-tag">${variantDetails}</span><br/>` : ""}
          <span style="color:#fff; font-weight:800;">${(item.price * item.qty).toLocaleString()} ${dict.currency}</span>
          <div class="cart-qty-controls">
            <button onclick="changeCartQty('${item.variantKey}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeCartQty('${item.variantKey}', 1)">+</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

document.getElementById("checkoutWhatsappBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  let message = "أهلاً VANTOR.EGY، أريد طلب المنتجات التالية:%0A%0A";
  cart.forEach((item, index) => {
    const details = [item.size ? `المقاس: ${item.size}` : "", item.flavor ? `النكهة: ${item.flavor}` : ""]
      .filter(Boolean)
      .join(" - ");
    message += `${index + 1}. ${item.nameAr} ${details ? `(${details})` : ""} × ${item.qty} = ${item.price * item.qty} ج.م%0A`;
  });
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  message += `%0A*الإجمالي:* ${total} ج.م`;

  window.open(`https://wa.me/${settings.whatsapp}?text=${message}`, "_blank");
});

function openQuickView(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  const dict = getTranslationDict(currentLang);
  const name = currentLang === "ar" ? p.nameAr : p.nameEn;
  const desc = currentLang === "ar" ? p.descAr : p.descEn;
  ensureDefaultVariants(p);
  const quickPrice = getVariantPrice(p, selectedVariants[p.id]);

  document.getElementById("quickViewContent").innerHTML = `
    <img src="${p.image}" alt="${name}" style="width:100%; max-height:330px; object-fit:cover; border-radius:10px; margin-bottom:16px;" />
    <span class="product-cat">${CATEGORY_LABELS[currentLang][p.category]}</span>
    <h2 style="margin:6px 0;">${name}</h2>
    <p style="color:#9ca3af; margin-bottom:12px;">${desc}</p>
    <p style="font-size:0.88rem; color:#d4d8df; margin-bottom:14px;">
      ${p.stock > 0 ? `${dict.in_stock} ${p.stock} ${dict.pieces}` : dict.out_of_stock}
    </p>
    <div class="product-price-row">
      <span class="current-price">${quickPrice.toLocaleString()} ${dict.currency}</span>
      ${p.oldPrice ? `<span class="old-price">${p.oldPrice.toLocaleString()} ${dict.currency}</span>` : ""}
    </div>
    <button class="btn-primary full-btn" ${p.stock <= 0 ? "disabled" : ""} onclick="addToCart(${p.id}); document.getElementById('quickViewModal').classList.remove('open');">
      ${p.stock <= 0 ? dict.out_of_stock : dict.add_to_cart}
    </button>
  `;
  document.getElementById("quickViewModal").classList.add("open");
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.category;
    renderProducts();
  });
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    currentFilter = link.dataset.filter;
    document.querySelectorAll(".tab-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.category === currentFilter);
    });
    renderProducts();
  });
});

document.getElementById("searchInput").addEventListener("input", e => {
  searchQuery = e.target.value;
  renderProducts();
});

document.getElementById("openCartBtn").addEventListener("click", () => document.getElementById("cartDrawer").classList.add("open"));
document.getElementById("closeCartBtn").addEventListener("click", () => document.getElementById("cartDrawer").classList.remove("open"));
document.getElementById("closeQuickViewBtn").addEventListener("click", () => document.getElementById("quickViewModal").classList.remove("open"));

window.addEventListener("click", e => {
  if (e.target.id === "cartDrawer") document.getElementById("cartDrawer").classList.remove("open");
  if (e.target.id === "quickViewModal") document.getElementById("quickViewModal").classList.remove("open");
});

// Listen for real-time updates if Admin tab modifies products/settings
window.addEventListener("storage", () => {
  products = getStoreProducts();
  settings = getStoreSettings();
  if (window.VantorCloud) {
  window.VantorCloud.init(() => {
    products = getStoreProducts();
    settings = getStoreSettings();
    applyLanguage(currentLang);
  });
}
applyLanguage(currentLang);
});

if (window.VantorCloud) {
  window.VantorCloud.init(() => {
    products = getStoreProducts();
    settings = getStoreSettings();
    applyLanguage(currentLang);
  });
}
applyLanguage(currentLang);
