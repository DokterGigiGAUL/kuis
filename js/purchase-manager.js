const PurchaseManager = (() => {
    const STORAGE_KEY = "wonderapp_purchases";

    function getPurchasedProducts() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }

    function savePurchasedProducts(products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }

    function hasAccess(item) {
        // Konten gratis
        if (!item.premium) return true;

        const products = getPurchasedProducts();

        // Produk individual
        if (item.productId && products.includes(item.productId)) {
            return true;
        }

        // Bundle berdasarkan tipe konten
        if (item.bundleId && products.includes(item.bundleId)) {
            return true;
        }

        // Akses seluruh premium
        if (products.includes("premium_all")) {
            return true;
        }

        return false;
    }

    function purchase(productId) {
        const products = getPurchasedProducts();

        if (!products.includes(productId)) {
            products.push(productId);
            savePurchasedProducts(products);
        }
    }

    function revoke(productId) {
        savePurchasedProducts(
            getPurchasedProducts().filter(id => id !== productId)
        );
    }

    function clear() {
        localStorage.removeItem(STORAGE_KEY);
    }

    return {
        hasAccess,
        purchase,
        revoke,
        clear,
        getPurchasedProducts
    };
})();
