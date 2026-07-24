const googleProvider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
    return firebase.auth().signInWithPopup(googleProvider);
}

function signOutUser() {
    return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(async user => {

    if (!user) {
        console.log("Belum login");
        return;
    }

    console.log("Login:", user.displayName);
    
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
