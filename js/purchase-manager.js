/*
|--------------------------------------------------------------------------
| purchase-manager.js
|--------------------------------------------------------------------------
*/

const PurchaseManager = (() => {

    const STORAGE_KEY = "wonderapp_purchases";

    function getPurchasedProducts() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }

    function savePurchasedProducts(products) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(products)
        );
    }

    function sync(profile = {}) {

        const products = profile.ownedProducts || [];

        savePurchasedProducts(products);

        if (profile.premiumUntil) {
            Premium.enable(profile.premiumUntil);
        } else {
            Premium.disable();
        }

    }

    function hasAccess(item) {

        if (!item.premium) {
            return true;
        }

        if (Premium.isPremium()) {
            return true;
        }

        const products = getPurchasedProducts();

        return (
            item.productId &&
            products.includes(item.productId)
        );

    }

    function hasTTSPremium() {

        if (Premium.isPremium()) {
            return true;
        }

        return getPurchasedProducts().some(id =>
            id.startsWith("tts")
        );

    }

    function purchase() {
        // Backend only
    }

    function revoke() {
        // Backend only
    }

    function clear() {

        localStorage.removeItem(STORAGE_KEY);

        Premium.disable();

    }

    async function refreshPurchases() {

        const user = auth.currentUser;

        if (!user) {

            clear();
            return;

        }

        const response = await WonderAPI.getProfile({
            uid: user.uid
        });

        sync(response.data);

    }

    return {

        sync,
        refreshPurchases,
        hasAccess,
        hasTTSPremium,
        clear,
        getPurchasedProducts,
        purchase,
        revoke

    };

})();
