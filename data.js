// ==========================================================
// إعدادات الحماية (SHA-256) وقاعدة البيانات السحابية (Firebase)
// ==========================================================

// هاش SHA-256 الافتراضي لكلمة المرور: vantor
// لتغيير كلمة المرور: افتح Console المتصفح واكتب:
// hashPassword("باسوردك_الجديد").then(console.log)
// ثم ضع الناتج مكان ADMIN_PASSWORD_HASH
const ADMIN_CONFIG = {
  username: "maro",
  passwordHash: "f839701fa153ba45924dc3ae9bb0972bb126ad5387fc171bc09f985d257d66dc", // SHA-256 of "vantor"
  maxAttempts: 5,
  lockoutSeconds: 60
};

// إعدادات Firebase Firestore (اختيارية لربط المتجر أونلاين لكل الزوار)
// عند إضافة بيانات مشروعك من Firebase Console هنا، سيعمل الربط السحابي تلقائياً
const FIREBASE_CONFIG = {
  enabled: true,
  apiKey: "AIzaSyCUX77RZTOFRggINZMRKxng820NfAtOuFc",
  authDomain: "vantoregy.firebaseapp.com",
  projectId: "vantoregy",
  storageBucket: "vantoregy.firebasestorage.app",
  messagingSenderId: "389962022302",
  appId: "1:389962022302:web:7e507f8dd68149a9e7ea8f"
};

async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

const DEFAULT_SETTINGS = {
  whatsapp: "201000000000",
  announcementAr: "🔥 شحن مجاني للطلبات فوق 1500 جنيه مصري | الدفع عند الاستلام متاح لجميع المحافظات 🇪🇬",
  announcementEn: "🔥 Free Shipping on orders over 1500 EGP | Cash on Delivery across Egypt 🇪🇬",
  heroTitleAr: "ارتقِ بأدائك في الجيم مع <span>VANTOR.EGY</span>",
  heroTitleEn: "ELEVATE YOUR PERFORMANCE WITH <span>VANTOR.EGY</span>",
  heroSubAr: "أقوى خامات الملابس الرياضية الـ Compression والـ Oversized مع أفضل المكملات الأصلية المعتمدة لتصل لأقصى فورمة.",
  heroSubEn: "High-performance compression & oversized gym wear alongside 100% authentic sports nutrition.",
  heroTitleAr: "ارتقِ بأدائك في الجيم مع <span>VANTOR.EGY</span>",
  heroTitleEn: "ELEVATE YOUR PERFORMANCE WITH <span>VANTOR.EGY</span>",
  contentAr: {},
  contentEn: {}
};

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    nameAr: "تيشيرت VANTOR Compression أسود",
    nameEn: "VANTOR Black Compression Tee",
    category: "apparel",
    price: 450,
    oldPrice: 550,
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    sizePrices: { "S": 400, "M": 425, "L": 450, "XL": 475 },
    flavorPrices: {},
    flavors: [],
    descAr: "خامة ليكرا مرنة طاردة للعرق تبرز تفاصيل العضلات",
    descEn: "Flexible sweat-wicking lycra fabric sculpted for muscle definition",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    nameAr: "واي بروتين أيزوليت (Whey Isolate 2kg)",
    nameEn: "Whey Protein Isolate 2kg",
    category: "supplements",
    price: 2850,
    oldPrice: 3200,
    stock: 9,
    sizes: [],
    flavors: ["شوكولاتة / Chocolate", "فانيليا / Vanilla", "فراولة / Strawberry"],
    descAr: "27 جرام بروتين صافي لكل سكوب - سريع الامتصاص والاستشفاء",
    descEn: "27g pure protein per scoop - fast absorption & muscle recovery",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
    badge: "100% Original"
  },
  {
    id: 3,
    nameAr: "هودي أوفر سايز Heavyweight Gym",
    nameEn: "Heavyweight Oversized Gym Hoodie",
    category: "apparel",
    price: 680,
    oldPrice: null,
    stock: 12,
    sizes: ["M", "L", "XL", "XXL"],
    flavors: [],
    descAr: "قطن ميلتون ثقيل عالي الجودة بتصميم عصري مريح للتمرين",
    descEn: "Heavyweight cotton fleece engineered for comfort and street-gym style",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    badge: "New Drop"
  },
  {
    id: 4,
    nameAr: "كرياتين مونوهيدرات نقي 300 جرام",
    nameEn: "Pure Creatine Monohydrate 300g",
    category: "supplements",
    price: 1150,
    oldPrice: 1350,
    stock: 15,
    sizes: [],
    flavors: ["بدون نكهة / Unflavored", "توت أزرق / Blue Raspberry", "ليمون / Lemon"],
    descAr: "60 حصة لزيادة القوة البدنية والأداء العضلي في التمرين",
    descEn: "60 servings for explosive strength, power, and muscle volume",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80",
    badge: "Sale"
  },
  {
    id: 5,
    nameAr: "شورت رياضي 2 في 1 بطبقات داخلية",
    nameEn: "2-in-1 Performance Training Shorts",
    category: "apparel",
    price: 390,
    oldPrice: 460,
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    flavors: [],
    descAr: "شورت تدريب خفيف مع طبقة داخلية ضاغطة وجيب للموبايل",
    descEn: "Lightweight training shorts with inner compression liner & phone pocket",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
    badge: ""
  },
  {
    id: 6,
    nameAr: "حزام رفع أوزان وشدادات معصم VANTOR",
    nameEn: "VANTOR Lifting Belt & Wrist Wraps",
    category: "accessories",
    price: 520,
    oldPrice: null,
    stock: 7,
    sizes: ["M", "L", "XL"],
    flavors: [],
    descAr: "دعم كامل لأسفل الظهر والمعصم أثناء الأوزان الثقيلة",
    descEn: "Maximum lower back & wrist stability for heavy compound lifts",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    badge: ""
  }
];

function getStoreProducts() {
  const saved = localStorage.getItem("vantor_products_v4");
  return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
}

function saveStoreProducts(list) {
  localStorage.setItem("vantor_products_v4", JSON.stringify(list));
  if (window.VantorCloud && window.VantorCloud.ready) {
    window.VantorCloud.syncProducts(list);
  }
}

function getStoreSettings() {
  const saved = localStorage.getItem("vantor_settings_v4");
  if (!saved) return { ...DEFAULT_SETTINGS };
  const parsed = JSON.parse(saved);
  return { ...DEFAULT_SETTINGS, ...parsed,
    contentAr: { ...(DEFAULT_SETTINGS.contentAr || {}), ...(parsed.contentAr || {}) },
    contentEn: { ...(DEFAULT_SETTINGS.contentEn || {}), ...(parsed.contentEn || {}) }
  };
}

function saveStoreSettings(settingsObj) {
  localStorage.setItem("vantor_settings_v4", JSON.stringify(settingsObj));
  if (window.VantorCloud && window.VantorCloud.ready) {
    window.VantorCloud.syncSettings(settingsObj);
  }
}
