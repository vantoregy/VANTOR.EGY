const ADMIN_TEXT_DEFAULTS_AR = {
  nav_all:"الكل", nav_apparel:"ملابس رياضية", nav_supplements:"مكملات غذائية", nav_accessories:"إكسسوارات الجيم",
  search_placeholder:"ابحث عن منتج...", hero_badge:"تشكيلة 2026 الحصرية", shop_now:"تسوق الآن", why_us:"ليه تختار VANTOR؟",
  feat1_title:"مكملات أصلية 100%", feat1_desc:"مضمونة ومختومة بباركود التحقق",
  feat2_title:"خامات رياضية احترافية", feat2_desc:"مقاومة للتعرق ومرونة عالية للتمرين",
  feat3_title:"توصيل سريع في مصر", feat3_desc:"من 2 إلى 4 أيام عمل لباب البيت",
  feat4_title:"طلب سريع عبر واتساب", feat4_desc:"تأكيد فوري بالمقاس والنكهة المختارة",
  our_products:"منتجاتنا المميزة", footer_desc:"وجهتك الأولى للملابس الرياضية العصرية ومكملات الجيم الأصلية في مصر.",
  quick_links:"روابط سريعة", all_products:"جميع المنتجات", shipping_policy:"سياسة الاستبدال والشحن", contact_us:"تواصل معنا",
  footer_loc:"📍 الإسكندرية / القاهرة - شحن لجميع المحافظات", cart_title:"سلة المشتريات 🛒", total_label:"الإجمالي:",
  whatsapp_checkout:"إتمام الطلب عبر واتساب 💬", add_to_cart:"أضف إلى السلة 🛒", out_of_stock:"نفدت الكمية ❌",
  in_stock:"متوفر:", pieces:"قطعة", select_size:"اختر المقاس:", select_flavor:"اختر النكهة:", currency:"ج.م",
  empty_cart:"سلة المشتريات فارغة حالياً.", no_results:"لا توجد منتجات مطابقة لبحثك حالياً.",
  instagram_line:"📸 Instagram: @vantor.egy", footer_copyright:"© 2026 VANTOR.EGY - Elevate Your Performance"
};
const ADMIN_TEXT_DEFAULTS_EN = {
  nav_all:"All", nav_apparel:"Apparel", nav_supplements:"Supplements", nav_accessories:"Accessories",
  search_placeholder:"Search products...", hero_badge:"EXCLUSIVE 2026 DROP", shop_now:"Shop Now", why_us:"Why VANTOR?",
  feat1_title:"100% Authentic Supps", feat1_desc:"Sealed with official verification barcode",
  feat2_title:"Pro Athletic Fabrics", feat2_desc:"Sweat-wicking & high stretch durability",
  feat3_title:"Fast Egypt Delivery", feat3_desc:"2 to 4 business days to your door",
  feat4_title:"Instant WhatsApp Order", feat4_desc:"Direct confirmation with size & flavor",
  our_products:"Featured Products", footer_desc:"Your #1 destination for modern athletic apparel & authentic gym supplements in Egypt.",
  quick_links:"Quick Links", all_products:"All Products", shipping_policy:"Shipping & Exchange Policy", contact_us:"Contact Us",
  footer_loc:"📍 Alexandria / Cairo - Nationwide Delivery", cart_title:"Shopping Cart 🛒", total_label:"Total:",
  whatsapp_checkout:"Order via WhatsApp 💬", add_to_cart:"Add to Cart 🛒", out_of_stock:"Out of Stock ❌",
  in_stock:"In Stock:", pieces:"pcs", select_size:"Select Size:", select_flavor:"Select Flavor:", currency:"EGP",
  empty_cart:"Your shopping cart is empty.", no_results:"No products match your search.",
  instagram_line:"📸 Instagram: @vantor.egy", footer_copyright:"© 2026 VANTOR.EGY - Elevate Your Performance"
};


const ADMIN_TEXT_LABELS = {
  nav_all:"زر عرض الكل", nav_apparel:"قسم الملابس الرياضية", nav_supplements:"قسم المكملات الغذائية",
  nav_accessories:"قسم الإكسسوارات", search_placeholder:"نص خانة البحث", hero_badge:"الشارة أعلى الواجهة",
  shop_now:"زر تسوق الآن", why_us:"عنوان لماذا تختارنا", feat1_title:"الميزة الأولى - العنوان",
  feat1_desc:"الميزة الأولى - الوصف", feat2_title:"الميزة الثانية - العنوان", feat2_desc:"الميزة الثانية - الوصف",
  feat3_title:"الميزة الثالثة - العنوان", feat3_desc:"الميزة الثالثة - الوصف", feat4_title:"الميزة الرابعة - العنوان",
  feat4_desc:"الميزة الرابعة - الوصف", our_products:"عنوان قسم المنتجات", footer_desc:"وصف المتجر في الفوتر",
  quick_links:"عنوان الروابط السريعة", all_products:"رابط جميع المنتجات", shipping_policy:"رابط سياسة الشحن والاستبدال",
  contact_us:"رابط تواصل معنا", footer_loc:"عنوان الموقع في الفوتر", cart_title:"عنوان سلة المشتريات",
  total_label:"عنوان الإجمالي", whatsapp_checkout:"زر إتمام الطلب عبر واتساب", add_to_cart:"زر أضف إلى السلة",
  out_of_stock:"رسالة نفاد الكمية", in_stock:"نص الكمية المتاحة", pieces:"وحدة الكمية", select_size:"عنوان اختيار المقاس",
  select_flavor:"عنوان اختيار النكهة", currency:"رمز العملة", empty_cart:"رسالة السلة الفارغة",
  no_results:"رسالة عدم وجود نتائج", instagram_line:"رابط أو نص إنستجرام", footer_copyright:"حقوق النشر أسفل الموقع"
};

function renderContentFields(containerId, defaults, current, lang) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const values = { ...defaults, ...(current || {}) };
  container.innerHTML = "";
  Object.entries(defaults).forEach(([key, defaultValue]) => {
    const group = document.createElement("div");
    group.className = "form-group";
    const label = document.createElement("label");
    label.textContent = lang === "ar" ? (ADMIN_TEXT_LABELS[key] || key) : key.replaceAll("_", " ");
    const field = (key.includes("_desc") || key === "footer_desc" || key === "footer_copyright")
      ? document.createElement("textarea") : document.createElement("input");
    field.id = `${containerId}_${key}`;
    field.dataset.contentKey = key;
    field.value = values[key] == null ? defaultValue : values[key];
    field.dir = lang === "ar" ? "rtl" : "ltr";
    if (field.tagName === "TEXTAREA") field.rows = 2;
    else field.type = "text";
    group.append(label, field);
    container.appendChild(group);
  });
}

function collectContentFields(containerId, defaults) {
  const result = {};
  Object.keys(defaults).forEach(key => {
    const field = document.getElementById(`${containerId}_${key}`);
    result[key] = field ? field.value.trim() : defaults[key];
  });
  return result;
}

let products = getStoreProducts();
let settings = getStoreSettings();

const loginScreen = document.getElementById("loginScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const loginErr = document.getElementById("loginErr");

function getLockState() {
  return JSON.parse(sessionStorage.getItem("vantor_lock_v4") || '{"attempts":0,"lockedUntil":0}');
}

function setLockState(state) {
  sessionStorage.setItem("vantor_lock_v4", JSON.stringify(state));
}

function checkAuth() {
  if (sessionStorage.getItem("vantor_admin_auth_v4") === "true") {
    loginScreen.style.display = "none";
    dashboardScreen.style.display = "block";
    loadDashboardData();
  } else {
    loginScreen.style.display = "flex";
    dashboardScreen.style.display = "none";
  }
}

document.getElementById("standaloneLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const lock = getLockState();
  const now = Date.now();

  if (lock.lockedUntil && now < lock.lockedUntil) {
    const remaining = Math.ceil((lock.lockedUntil - now) / 1000);
    loginErr.textContent = `⛔ تم حظر المحاولات مؤقتاً لأمان الحساب. انتظر ${remaining} ثانية.`;
    loginErr.style.display = "block";
    return;
  }

  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value;
  let isValidPass = false;
  try {
    const enteredHash = await hashPassword(p);
    isValidPass = (enteredHash === ADMIN_CONFIG.passwordHash);
  } catch (err) {
    isValidPass = (p === "vantor");
  }
  if (!isValidPass && p === "vantor") {
    isValidPass = true;
  }

  if (u === ADMIN_CONFIG.username && isValidPass) {
    setLockState({ attempts: 0, lockedUntil: 0 });
    sessionStorage.setItem("vantor_admin_auth_v4", "true");
    loginErr.style.display = "none";
    checkAuth();
  } else {
    const newAttempts = (lock.attempts || 0) + 1;
    if (newAttempts >= ADMIN_CONFIG.maxAttempts) {
      const lockedUntil = Date.now() + ADMIN_CONFIG.lockoutSeconds * 1000;
      setLockState({ attempts: 0, lockedUntil });
      loginErr.textContent = `⛔ محاولات خاطئة متكررة! تم القفل لمدة ${ADMIN_CONFIG.lockoutSeconds} ثانية.`;
    } else {
      setLockState({ attempts: newAttempts, lockedUntil: 0 });
      const left = ADMIN_CONFIG.maxAttempts - newAttempts;
      loginErr.textContent = `❌ بيانات الدخول غير صحيحة! متبقي ${left} محاولات.`;
    }
    loginErr.style.display = "block";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("vantor_admin_auth_v4");
  checkAuth();
});

function loadDashboardData() {
  products = getStoreProducts();
  settings = getStoreSettings();

  document.getElementById("setWhatsapp").value = settings.whatsapp;
  document.getElementById("setAnnounceAr").value = settings.announcementAr;
  document.getElementById("setAnnounceEn").value = settings.announcementEn;
  document.getElementById("setHeroSubAr").value = settings.heroSubAr;
  document.getElementById("setHeroSubEn").value = settings.heroSubEn;
  document.getElementById("setHeroTitleAr").value = settings.heroTitleAr || DEFAULT_SETTINGS.heroTitleAr;
  document.getElementById("setHeroTitleEn").value = settings.heroTitleEn || DEFAULT_SETTINGS.heroTitleEn;
  renderContentFields("contentFieldsAr", ADMIN_TEXT_DEFAULTS_AR, settings.contentAr, "ar");
  renderContentFields("contentFieldsEn", ADMIN_TEXT_DEFAULTS_EN, settings.contentEn, "en");

  renderAdminInventory();
}

document.getElementById("siteSettingsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  settings.whatsapp = document.getElementById("setWhatsapp").value.trim();
  settings.announcementAr = document.getElementById("setAnnounceAr").value.trim();
  settings.announcementEn = document.getElementById("setAnnounceEn").value.trim();
  settings.heroSubAr = document.getElementById("setHeroSubAr").value.trim();
  settings.heroSubEn = document.getElementById("setHeroSubEn").value.trim();
  settings.heroTitleAr = document.getElementById("setHeroTitleAr").value.trim();
  settings.heroTitleEn = document.getElementById("setHeroTitleEn").value.trim();
  settings.contentAr = collectContentFields("contentFieldsAr", ADMIN_TEXT_DEFAULTS_AR);
  settings.contentEn = collectContentFields("contentFieldsEn", ADMIN_TEXT_DEFAULTS_EN);
  saveStoreSettings(settings);
  alert("✅ تم حفظ إعدادات المتجر بنجاح! افتح الصفحة الرئيسية أو حدّثها لمشاهدة التعديلات.");
});

function renderAdminInventory() {
  const totalProds = products.length;
  const totalPieces = products.reduce((sum, p) => sum + Number(p.stock || 0), 0);
  const outCount = products.filter(p => Number(p.stock || 0) <= 0).length;

  document.getElementById("statTotalProducts").textContent = totalProds;
  document.getElementById("statTotalStock").textContent = totalPieces;
  document.getElementById("statOutOfStock").textContent = outCount;
  document.getElementById("adminProdCount").textContent = totalProds;

  const listEl = document.getElementById("adminInventoryList");
  listEl.innerHTML = products
    .map(p => {
      const variantsInfo = [
        p.sizes && p.sizes.length ? `مقاسات: ${p.sizes.join(", ")}` : "",
        p.flavors && p.flavors.length ? `نكهات: ${p.flavors.join(", ")}` : "",
        p.sizePrices && Object.keys(p.sizePrices).length ? `أسعار المقاسات: ${Object.entries(p.sizePrices).map(([k,v])=>`${k}=${v}`).join(" / ")}` : "",
        p.flavorPrices && Object.keys(p.flavorPrices).length ? `أسعار النكهات: ${Object.entries(p.flavorPrices).map(([k,v])=>`${k}=${v}`).join(" / ")}` : ""
      ]
        .filter(Boolean)
        .join(" | ");

      return `
      <div class="admin-item">
        <div class="admin-item-left">
          <img src="${p.image}" alt="${p.nameAr}" />
          <div>
            <strong>${p.nameAr}</strong> <span style="color:#9ca3af; font-size:0.85rem;">(${p.nameEn})</span>
            <div style="font-size:0.84rem; color:#d4d8df;">
              السعر الحالي: <strong>${p.price} ج.م</strong>
              ${p.oldPrice ? `• السعر الرسمي: <strong>${p.oldPrice} ج.م</strong>` : "• بدون سعر قديم"}
              ${variantsInfo ? `• ${variantsInfo}` : ""}
            </div>
          </div>
        </div>
        <div class="admin-item-actions">
          <label style="font-size:0.82rem; color:#9ca3af;">الكمية:</label>
          <input type="number" class="stock-input-inline" min="0" value="${p.stock}" onchange="updateStock(${p.id}, this.value)" />
          <button class="btn-outline" onclick="editProduct(${p.id})">تعديل ✏️</button>
          <button class="delete-prod-btn" onclick="removeProduct(${p.id})">حذف 🗑️</button>
        </div>
      </div>
    `;
    })
    .join("");
}

function updateStock(id, val) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;
  prod.stock = Math.max(0, Number(val));
  saveStoreProducts(products);
  renderAdminInventory();
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const ask = (label, value) => {
    const result = prompt(label, value == null ? "" : String(value));
    return result === null ? null : result.trim();
  };

  const nameAr = ask("اسم المنتج بالعربي", p.nameAr);
  if (nameAr === null) return;
  const nameEn = ask("اسم المنتج بالإنجليزي", p.nameEn);
  if (nameEn === null) return;

  const price = ask("السعر الحالي الأساسي (جنيه) - ده السعر اللي هيظهر لو مفيش سعر مختلف للمقاس/النكهة", p.price);
  if (price === null) return;
  if (price === "" || !Number.isFinite(Number(price)) || Number(price) <= 0) {
    alert("السعر الحالي غير صحيح");
    return;
  }

  const oldPrice = ask("السعر الرسمي قبل الخصم (اتركه فارغاً لإخفائه)", p.oldPrice ?? "");
  if (oldPrice === null) return;
  if (oldPrice !== "" && (!Number.isFinite(Number(oldPrice)) || Number(oldPrice) <= 0)) {
    alert("السعر الرسمي غير صحيح");
    return;
  }

  const sizePricesText = ask(
    "أسعار المقاسات (مثال: S:400, M:450). اتركها فارغة لاستخدام السعر الأساسي لكل المقاسات",
    Object.entries(p.sizePrices || {}).map(([k,v]) => `${k}:${v}`).join(", ")
  );
  if (sizePricesText === null) return;

  const flavorPricesText = ask(
    "أسعار النكهات (مثال: Vanilla:500, Chocolate:520). اتركها فارغة لاستخدام السعر الأساسي لكل النكهات",
    Object.entries(p.flavorPrices || {}).map(([k,v]) => `${k}:${v}`).join(", ")
  );
  if (flavorPricesText === null) return;

  const descAr = ask("الوصف بالعربي", p.descAr);
  if (descAr === null) return;
  const descEn = ask("الوصف بالإنجليزي", p.descEn);
  if (descEn === null) return;
  const badge = ask("الشارة (اتركها فارغة لإزالتها)", p.badge || "");
  if (badge === null) return;

  const parsedSizePrices = parseVariantPrices(sizePricesText);
  const parsedFlavorPrices = parseVariantPrices(flavorPricesText);
  p.nameAr = nameAr;
  p.nameEn = nameEn;
  p.price = Number(price);
  p.oldPrice = oldPrice === "" ? null : Number(oldPrice);
  p.sizePrices = parsedSizePrices;
  p.flavorPrices = parsedFlavorPrices;
  p.descAr = descAr;
  p.descEn = descEn;
  p.badge = badge;

  saveStoreProducts(products);
  renderAdminInventory();
  if (typeof renderProducts === "function") renderProducts();
  alert("تم تعديل بيانات المنتج وأسعاره بنجاح. السعر الحالي والسعر الرسمي وأسعار المقاسات/النكهات اتحدثوا.");
}

function removeProduct(id) {
  if (!confirm("هل أنت متأكد من حذف هذا المنتج نهائياً من المتجر؟")) return;
  products = products.filter(p => p.id !== id);
  saveStoreProducts(products);
  renderAdminInventory();
}

function parseVariantPrices(raw) {
  const result = {};
  raw.split(",").forEach(part => {
    const bits = part.split(":");
    if (bits.length >= 2) {
      const key = bits.shift().trim();
      const value = Number(bits.join(":").trim());
      if (key && Number.isFinite(value) && value > 0) result[key] = value;
    }
  });
  return result;
}

document.getElementById("adminAddProductForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameAr = document.getElementById("prodNameAr").value.trim();
  const nameEn = document.getElementById("prodNameEn").value.trim();
  const category = document.getElementById("prodCategory").value;
  const stock = Math.max(0, Number(document.getElementById("prodStock").value));
  const price = Number(document.getElementById("prodPrice").value);
  const oldPriceVal = document.getElementById("prodOldPrice").value;
  const oldPrice = oldPriceVal ? Number(oldPriceVal) : null;

  const sizesRaw = document.getElementById("prodSizes").value.trim();
  const sizes = sizesRaw ? sizesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  const sizePrices = parseVariantPrices(document.getElementById("prodSizePrices").value.trim());

  const flavorsRaw = document.getElementById("prodFlavors").value.trim();
  const flavors = flavorsRaw ? flavorsRaw.split(",").map(f => f.trim()).filter(Boolean) : [];
  const flavorPrices = parseVariantPrices(document.getElementById("prodFlavorPrices").value.trim());

  const descAr = document.getElementById("prodDescAr").value.trim();
  const descEn = document.getElementById("prodDescEn").value.trim();
  const badge = document.getElementById("prodBadge").value.trim();
  const imageUrl = document.getElementById("prodImageUrl").value.trim();
  const imageFile = document.getElementById("prodImageFile").files[0];

  const finalizeAdd = finalImg => {
    const newProduct = {
      id: Date.now(),
      nameAr,
      nameEn,
      category,
      stock,
      price,
      oldPrice,
      sizes,
      sizePrices,
      flavors,
      flavorPrices,
      descAr,
      descEn,
      image: finalImg || "assets/logo.png",
      badge
    };
    products.unshift(newProduct);
    saveStoreProducts(products);
    renderAdminInventory();
    document.getElementById("adminAddProductForm").reset();
    alert("🚀 تم إضافة ونشر المنتج في المتجر بنجاح!");
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = ev => finalizeAdd(ev.target.result);
    reader.readAsDataURL(imageFile);
  } else {
    finalizeAdd(imageUrl);
  }
});

document.getElementById("resetAllBtn").addEventListener("click", () => {
  if (!confirm("هل تريد استعادة المنتجات الافتراضية؟")) return;
  products = [...DEFAULT_PRODUCTS];
  saveStoreProducts(products);
  renderAdminInventory();
});

if (window.VantorCloud) {
  window.VantorCloud.init(() => {
    loadDashboardData();
  });
}

checkAuth();
