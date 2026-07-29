const googleProvider = new firebase.auth.GoogleAuthProvider();
function signInWithGoogle() {
    return firebase.auth().signInWithPopup(googleProvider);
}
function signOutUser() {

    Premium.disable();

    PurchaseManager.clear();

    localStorage.removeItem("ownedProducts");

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

    Premium.disable();
    PurchaseManager.clear();
    localStorage.removeItem("ownedProducts");

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
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }, 
    { merge: true });
    
const snap = await userRef.get();

if (snap.exists) {
    const data = snap.data();

const now = new Date();

let premiumActive = false;

if (data.premium === true && data.premiumUntil) {

    const expired = data.premiumUntil.toDate();

    premiumActive = expired > now;

}

if (premiumActive) {
    Premium.enable();
} else {
    Premium.disable();

    if (data.premium === true) {
        userRef.update({
            premium: false
        });
    }
}

PurchaseManager.sync(data.ownedProducts || []);

} else {

    Premium.disable();
    PurchaseManager.sync([]);

}

console.log("Firestore premium:", snap.data().premium);
console.log("LocalStorage premium:", localStorage.getItem("premium"));

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
