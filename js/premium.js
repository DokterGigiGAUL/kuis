const BACKEND_URL =
    "https://script.google.com/macros/s/AKfycbwzkcz2seD-3OCb2uWYhC2Oon_swZV4SYpOh6JUZXgg04Lx6UbCf1DlaHTmUWrwXWhr/exec";
const PREMIUM_SUBSCRIPTION_ID = "wonderapp_premium_monthly";

function openPremiumModal(productId = null) {

    const modal = document.getElementById("premiumModal");
    const frame = document.getElementById("premiumFrame");

    frame.src = productId
        ? `premium.html?product=${encodeURIComponent(productId)}`
        : "premium.html";

    modal.classList.add("show");

}

function closePremiumModal() {

    const modal = document.getElementById("premiumModal");
    const frame = document.getElementById("premiumFrame");

    modal.classList.remove("show");

    // menghentikan proses di iframe
    frame.src = "";

}

document.addEventListener("DOMContentLoaded", () => {

    const closeBtn = document.getElementById("closePremiumModal");

    if (closeBtn) {
        closeBtn.addEventListener("click", closePremiumModal);
    }

});

function showPremiumDialog(productId = null) {
    openPremiumPage(productId);
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

async function buyProduct(productId) {

    if (!firebase.auth().currentUser) {
        await signInWithGoogle();
    }

    const user = firebase.auth().currentUser;
    if (!user) return;

    const params = new URLSearchParams({
        action: "checkout",
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        mobile: "",
        productId: productId,
        redirectUrl: window.location.origin + "/kuis/payment-success.html"
    });

    const checkoutUrl =
        `${BACKEND_URL}?${params.toString()}`;

    if (typeof openCheckout === "function") {
        openCheckout(checkoutUrl);
    } else {
        window.location.href = checkoutUrl;
    }

}

async function subscribePremium() {

    if (!firebase.auth().currentUser) {
        await signInWithGoogle();
    }

    const user = firebase.auth().currentUser;

    if (!user) return;

    const params = new URLSearchParams({
        action: "checkout",
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        mobile: "",
        productId: "premium-monthly",
        productName: "Wonder App Premium",
        amount: "49000",
        description: "Wonder App Premium",
        redirectUrl: window.location.origin + "/kuis/payment-success.html"
    });

    const checkoutUrl =
        `${BACKEND_URL}?${params.toString()}`;

    if (typeof openCheckout === "function") {
        openCheckout(checkoutUrl);
    } else {
        window.location.href = checkoutUrl;
    }

}
function showPremiumDialog(productId = null) {
    window.location.href =
        `premium.html?product=${encodeURIComponent(productId)}`;
}
