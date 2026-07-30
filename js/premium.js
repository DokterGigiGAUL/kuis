const BACKEND_URL =
    "https://script.google.com/macros/s/AKfycbwzkcz2seD-3OCb2uWYhC2Oon_swZV4SYpOh6JUZXgg04Lx6UbCf1DlaHTmUWrwXWhr/exec";
const PREMIUM_SUBSCRIPTION_ID = "wonderapp_premium_monthly";

function openPremiumModal(productId = null) {

    const modal = document.getElementById("premiumModal");
    const frame = document.getElementById("premiumFrame");
sessionStorage.setItem("returnPage", window.location.href);
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

    data: null,

    async load() {

        const user = firebase.auth().currentUser;

        if (!user) {
            this.data = null;
            return;
        }

        const doc = await db.collection("users")
            .doc(user.uid)
            .get();

        this.data = doc.exists ? doc.data() : {};

    },

    isPremium() {

        return this.data?.premium === true;

    },

    ownsProduct(productId) {

        return (this.data?.ownedProducts || [])
            .includes(productId);

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
await Premium.load();
    const params = new URLSearchParams({
        action: "checkout",
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        mobile: "",
        productId: productId,
        //redirectUrl: window.location.origin + "/kuis/payment-success.html"
redirectUrl: sessionStorage.getItem("returnPage")    });

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
await Premium.load();
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
        //redirectUrl: window.location.origin + "/kuis/payment-success.html"
redirectUrl: sessionStorage.getItem("returnPage")    });

    const checkoutUrl =
        `${BACKEND_URL}?${params.toString()}`;

    if (typeof openCheckout === "function") {
        openCheckout(checkoutUrl);
    } else {
        window.location.href = checkoutUrl;
    }

}

function openPremiumPage(productId = null) {
    openPremiumModal(productId);
}
