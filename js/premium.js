const BACKEND_URL =
    "https://script.google.com/macros/s/AKfycbwzkcz2seD-3OCb2uWYhC2Oon_swZV4SYpOh6JUZXgg04Lx6UbCf1DlaHTmUWrwXWhr/exec";
const PREMIUM_SUBSCRIPTION_ID = "premium-monthly";

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
    await refreshPurchases();
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
    const result = await loginWithGoogle();

    if (!result.success) {
        return;
    }
  }
  const user = firebase.auth().currentUser;
  if (!user) return;
  await Premium.load();
  const item =
    quizzes.find(q => q.productId === productId) ||
    comics.find(c => c.productId === productId) ||
    ttsList.find(t => t.productId === productId) ||
    cases.find(c => c.productId === productId);

if (!item) {
    alert("Produk tidak ditemukan.");
    return;
}

const params = new URLSearchParams({
    action: "createCheckout",
    uid: user.uid,
    productId: productId,
    productName: item.title,
    description: item.description || item.title,
    amount: item.price,
    name: user.displayName || "",
    email: user.email || "",
    mobile: "",
    redirectUrl: sessionStorage.getItem("returnPage")
});
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
});

const result = await response.json();

if (!result.success) {
    alert(result.message || "Gagal membuat checkout.");
    return;
}

if (typeof openCheckout === "function") {
    openCheckout(result.paymentUrl);
} else {
    window.location.href = result.paymentUrl;
}
}

async function subscribePremium() {
  if (!firebase.auth().currentUser) {
    const result = await loginWithGoogle();

    if (!result.success) {
        return;
    }
  }
  const user = firebase.auth().currentUser;
  if (!user) return;
  await Premium.load();
  const params = new URLSearchParams({
    action: "createCheckout",
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
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
});

const result = await response.json();

if (!result.success) {
    alert(result.message || "Gagal membuat checkout.");
    return;
}

if (typeof openCheckout === "function") {
    openCheckout(result.paymentUrl);
} else {
    window.location.href = result.paymentUrl;
}
}

function openPremiumPage(productId = null) {
    openPremiumModal(productId);
}

async function refreshPurchases() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "getPurchases",
      uid: user.uid
    })
  });
  const result = await response.json();
    if (result.success) {
        PurchaseManager.sync(result);
    }
}
