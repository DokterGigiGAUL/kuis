Ganti seluruh isi js/auth.js dengan kode berikut:

const googleProvider = new firebase.auth.GoogleAuthProvider();
function signInWithGoogle() {
    return firebase.auth().signInWithPopup(googleProvider);
}
function signOutUser() {
    return firebase.auth().signOut();
}
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        signInWithGoogle().catch(console.error);
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOutUser().catch(console.error);
    });
}
firebase.auth().onAuthStateChanged(async user => {
    if (loginBtn && logoutBtn) {
        if (user) {
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        } else {
            loginBtn.style.display = "inline-block";
            logoutBtn.style.display = "none";
        }
    }
    if (!user) {
        console.log("Belum login");
        return;
    }
    console.log("Login:", user.displayName);
    const userRef = db.collection("users").doc(user.uid);
    await userRef.set({
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        premium: false,
        premiumUntil: null,
        ownedProducts: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    const action = sessionStorage.getItem("pendingAction");
    if (!action) return;
    sessionStorage.removeItem("pendingAction");
    const raw = sessionStorage.getItem("pendingActionData");
    sessionStorage.removeItem("pendingActionData");
    const data = raw ? JSON.parse(raw) : null;
    switch (action) {
        case "buyProduct":
            buyProduct(data.productId);
            break;
        case "subscribePremium":
            subscribePremium();
            break;
    }
});
function requireLogin(action, data = null) {
    if (firebase.auth().currentUser) {
        return Promise.resolve(true);
    }
    sessionStorage.setItem("pendingAction", action);
    if (data !== null) {
        sessionStorage.setItem(
            "pendingActionData",
            JSON.stringify(data)
        );
    }
    return signInWithGoogle();
}
