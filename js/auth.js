const googleProvider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
    return firebase.auth().signInWithPopup(googleProvider);
}

function signOutUser() {
    return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(async user => {

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn && logoutBtn) {

        if (user) {
            loginBtn.style.display = "none";
            logoutBtn.style.display = "";
        } else {
            loginBtn.style.display = "";
            logoutBtn.style.display = "none";
        }

    }

    if (!user) return;

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
    }, {
        merge: true
    });

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

document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn) {

        loginBtn.onclick = () => {

            signInWithGoogle();

        };

    }

    if (logoutBtn) {

        logoutBtn.onclick = () => {

            signOutUser();

        };

    }

});
