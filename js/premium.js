const PREMIUM_SUBSCRIPTION_ID = "wonderapp_premium_monthly";

function showPremiumDialog(productId = null) {

    if (confirm(
        "🔒 Konten Premium\n\n" +
        "Konten ini hanya tersedia untuk member Premium.\n\n" +
        "Tekan OK untuk mendapatkan akses akun Premium atau CANCEL untuk tetap menggunakan akun Gratis."
    )) {
        openPremiumPage(productId);
    }

}

const Premium = {

    isPremium() {
        return localStorage.getItem("premium") === "true";
    },

    enable() {
        localStorage.setItem("premium", "true");
    },

    disable() {
        localStorage.removeItem("premium");
    },

    ownsProduct(productId) {

        const products = JSON.parse(
            localStorage.getItem("ownedProducts") || "[]"
        );

        return products.includes(productId);

    },

    addProduct(productId) {

        const products = JSON.parse(
            localStorage.getItem("ownedProducts") || "[]"
        );

        if (!products.includes(productId)) {

            products.push(productId);

            localStorage.setItem(
                "ownedProducts",
                JSON.stringify(products)
            );

        }

    }

};

function userHasPremium() {
    return Premium.isPremium();
}

function activatePremium() {
    Premium.enable();
    alert("Premium berhasil diaktifkan.");
    location.reload();
}

function deactivatePremium() {
    Premium.disable();
    alert("Premium dinonaktifkan.");
    location.reload();
}

function buyProduct(productId) {

    alert(
        "Produk yang dipilih:\n\n" +
        productId +
        "\n\nFitur pembayaran akan segera tersedia."
    );

}

function subscribePremium() {

    buyProduct(PREMIUM_SUBSCRIPTION_ID);

}

function openPremiumPage(productId = null) {

    if (productId) {
        window.location.href =
            `premium.html?product=${encodeURIComponent(productId)}`;
    } else {
        window.location.href = "premium.html";
    }

}
