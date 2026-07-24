const googleProvider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
    return firebase.auth().signInWithPopup(googleProvider);
}

function signOutUser() {
    return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Login:", user.displayName);
    } else {
        console.log("Belum login");
    }
});
