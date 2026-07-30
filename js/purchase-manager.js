const PurchaseManager = (() => {
const STORAGE_KEY = "wonderapp_purchases";

function getPurchasedProducts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function savePurchasedProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function sync(data = {}) {

    const products = Array.isArray(data)
        ? data
        : (data.ownedProducts || []);

    savePurchasedProducts(products);

    if (typeof data.premiumUntil !== "undefined") {

        if (data.premiumUntil) {
            Premium.enable(data.premiumUntil);
        } else {
            Premium.disable();
        }

    }

}

function hasAccess(item) {
    // Konten gratis
    if (!item.premium) return true;

    // Premium aktif
    if (Premium.isPremium()) {
        return true;
    }

    const products = getPurchasedProducts();

    // Produk individual
    if (item.productId && products.includes(item.productId)) {
        return true;
    }

    return false;
}
    
function hasTTSPremium() {

    if (Premium.isPremium()) {
        return true;
    }

    const products = getPurchasedProducts();

    return products.some(id => id.startsWith("tts"));
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
    hasTTSPremium,
    purchase,
    revoke,
    clear,
    getPurchasedProducts,
    sync
    };
})();
