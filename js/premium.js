const PREMIUM_SUBSCRIPTION_ID = "wonderapp_premium_monthly";

let currentProductId = null;

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
}

function deactivatePremium() {
    Premium.disable();
}

function showPremiumDialog(productId = null) {
    openPremiumModal(productId);
}

function openPremiumModal(productId = null) {

    currentProductId = productId;

    const modal = document.getElementById("premiumModal");
    const content = document.getElementById("premiumContent");

    if (!modal || !content) return;

    content.innerHTML = `
        <iframe
            src="premium.html${productId ? `?product=${encodeURIComponent(productId)}` : ""}"
            style="
                width:100%;
                height:85vh;
                border:none;
                display:block;
                border-radius:22px;
            ">
        </iframe>
    `;

    modal.classList.add("show");

    document.getElementById("premiumCloseBtn").onclick = closePremiumModal;

    modal.querySelector(".premium-backdrop").onclick = closePremiumModal;

}

function closePremiumModal() {

    const modal = document.getElementById("premiumModal");

    if (!modal) return;

    modal.classList.remove("show");

    document.getElementById("premiumContent").innerHTML = "";

}

function buyProduct(productId = currentProductId) {

    if (!firebase.auth().currentUser) {

        requireLogin("buyProduct", {
            productId
        });

        return;
    }

    alert(
        "Produk yang dipilih:\n\n" +
        productId +
        "\n\nFitur pembayaran akan segera tersedia."
    );

}

function subscribePremium() {

    if (!firebase.auth().currentUser) {

        requireLogin("subscribePremium");

        return;
    }

    alert(
        "Berlangganan Wonder App Premium\n\n" +
        "Fitur pembayaran akan segera tersedia."
    );

}
