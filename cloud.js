// ==========================================================
// VANTOR Cloud - مزامنة آمنة تمنع رجوع بيانات أقدم فوق المنتجات الجديدة
// ==========================================================
window.VantorCloud = {
  ready: false,
  db: null,
  _productsWriteQueue: Promise.resolve(),
  _pendingProductsWrites: 0,
  _settingsWriteQueue: Promise.resolve(),

  async init(onRemoteUpdate) {
    if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.enabled || !FIREBASE_CONFIG.projectId) return;
    if (this._initializing || this.ready) return;
    this._initializing = true;
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
      const { getFirestore, doc, setDoc, onSnapshot } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
      const app = initializeApp(FIREBASE_CONFIG);
      this.db = getFirestore(app);
      this._setDoc = setDoc;
      this._doc = doc;
      this.ready = true;
      const storeRef = doc(this.db, "vantor_egy", "main_store");

      onSnapshot(storeRef, snap => {
        if (!snap.exists()) return;
        const data = snap.data();
        // أثناء حفظ منتج جديد، لا تسمح للنسخة القديمة القادمة من السحابة
        // باستبدال القائمة المحلية قبل اكتمال كل عمليات الكتابة.
        if (Array.isArray(data.products) && this._pendingProductsWrites === 0) {
          localStorage.setItem("vantor_products_v4", JSON.stringify(data.products));
        }
        if (data.settings) localStorage.setItem("vantor_settings_v4", JSON.stringify(data.settings));
        if (typeof onRemoteUpdate === "function") onRemoteUpdate(data);
      }, err => console.error("Firebase listener error:", err));
    } catch (err) {
      console.warn("Firebase Cloud fallback to LocalStorage:", err);
    } finally {
      this._initializing = false;
    }
  },

  syncProducts(productsList) {
    if (!this.ready || !this.db) return Promise.resolve();
    const snapshot = JSON.stringify(productsList);
    this._pendingProductsWrites++;
    this._productsWriteQueue = this._productsWriteQueue.then(async () => {
      await this._setDoc(this._doc(this.db, "vantor_egy", "main_store"),
        { products: JSON.parse(snapshot) }, { merge: true });
    }).catch(e => {
      console.error("Error syncing products:", e);
    }).finally(() => {
      this._pendingProductsWrites = Math.max(0, this._pendingProductsWrites - 1);
    });
    return this._productsWriteQueue;
  },

  syncSettings(settingsObj) {
    if (!this.ready || !this.db) return Promise.resolve();
    const snapshot = JSON.stringify(settingsObj);
    this._settingsWriteQueue = this._settingsWriteQueue.then(async () => {
      await this._setDoc(this._doc(this.db, "vantor_egy", "main_store"),
        { settings: JSON.parse(snapshot) }, { merge: true });
    }).catch(e => console.error("Error syncing settings:", e));
    return this._settingsWriteQueue;
  }
};
