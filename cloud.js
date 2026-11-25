// ==========================================================
// جسر الربط السحابي (Firebase Firestore) - كل منتج في مستند مستقل
// ==========================================================
window.VantorCloud = {
  ready: false,
  db: null,
  _migratedLegacy: false,

  async init(onRemoteUpdate) {
    if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.enabled || !FIREBASE_CONFIG.projectId) {
      return;
    }
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
      const {
        getFirestore,
        doc,
        setDoc,
        deleteDoc,
        collection,
        getDoc,
        getDocs,
        onSnapshot
      } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

      const app = initializeApp(FIREBASE_CONFIG);
      this.db = getFirestore(app);
      this._setDoc = setDoc;
      this._deleteDoc = deleteDoc;
      this._doc = doc;
      this._collection = collection;
      this._getDoc = getDoc;
      this._getDocs = getDocs;
      this.ready = true;

      // 1) متابعة إعدادات المتجر من main_store
      const storeRef = doc(this.db, "vantor_egy", "main_store");
      onSnapshot(storeRef, async snap => {
        if (!snap.exists()) return;
        const data = snap.data();
        if (data.settings) {
          localStorage.setItem("vantor_settings_v4", JSON.stringify(data.settings));
        }

        // ترحيل تلقائي لمرة واحدة للمنتجات القديمة من main_store إلى vantor_products
        if (!this._migratedLegacy && Array.isArray(data.products) && data.products.length > 0) {
          this._migratedLegacy = true;
          try {
            const existingSnap = await getDocs(collection(this.db, "vantor_products"));
            if (existingSnap.empty) {
              for (const legacyProd of data.products) {
                const docId = String(legacyProd.id || Date.now());
                await setDoc(doc(this.db, "vantor_products", docId), legacyProd, { merge: true });
              }
            }
          } catch (migErr) {
            console.warn("Legacy products migration skipped:", migErr);
          }
        }

        if (typeof onRemoteUpdate === "function") {
          onRemoteUpdate(data);
        }
      });

      // 2) متابعة المنتجات من مجموعة vantor_products (كل منتج مستند مستقل لتجنب حد 1MB)
      const productsCol = collection(this.db, "vantor_products");
      onSnapshot(productsCol, snap => {
        const list = [];
        snap.forEach(itemDoc => {
          list.push(itemDoc.data());
        });
        if (list.length > 0) {
          list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
          localStorage.setItem("vantor_products_v4", JSON.stringify(list));
          if (typeof onRemoteUpdate === "function") {
            onRemoteUpdate({ products: list });
          }
        }
      });
    } catch (err) {
      console.warn("Firebase Cloud fallback to LocalStorage:", err);
    }
  },

  async syncSingleProduct(product) {
    if (!this.ready || !this.db || !product) return;
    try {
      const docId = String(product.id);
      await this._setDoc(
        this._doc(this.db, "vantor_products", docId),
        product,
        { merge: true }
      );
    } catch (e) {
      console.error("Error syncing single product:", e);
    }
  },

  async syncProducts(productsList) {
    if (!this.ready || !this.db || !Array.isArray(productsList)) return;
    try {
      for (const product of productsList) {
        const docId = String(product.id);
        await this._setDoc(
          this._doc(this.db, "vantor_products", docId),
          product,
          { merge: true }
        );
      }
    } catch (e) {
      console.error("Error syncing products:", e);
    }
  },

  async deleteProduct(productId) {
    if (!this.ready || !this.db || productId == null) return;
    try {
      await this._deleteDoc(this._doc(this.db, "vantor_products", String(productId)));
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  },

  async syncSettings(settingsObj) {
    if (!this.ready || !this.db) return;
    try {
      await this._setDoc(this._doc(this.db, "vantor_egy", "main_store"), { settings: settingsObj }, { merge: true });
    } catch (e) {
      console.error("Error syncing settings:", e);
    }
  }
};
