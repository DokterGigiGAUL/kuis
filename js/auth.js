/*
|--------------------------------------------------------------------------
| auth.js
|--------------------------------------------------------------------------
*/

const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

/* -------------------------------------------------------------------------- */
/* LOGIN EMAIL */
/* -------------------------------------------------------------------------- */

async function login(email, password) {

    try {

        const result = await auth.signInWithEmailAndPassword(
            email,
            password
        );

        return {
            success: true,
            user: result.user
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

/* -------------------------------------------------------------------------- */
/* REGISTER */
/* -------------------------------------------------------------------------- */

async function register(email, password) {

    try {

        const result = await auth.createUserWithEmailAndPassword(
            email,
            password
        );

        return {
            success: true,
            user: result.user
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

/* -------------------------------------------------------------------------- */
/* GOOGLE LOGIN */
/* -------------------------------------------------------------------------- */

async function loginWithGoogle() {

    try {

        const result = await auth.signInWithPopup(
            googleProvider
        );

        return {
            success: true,
            user: result.user
        };

    } catch (err) {

        return {
            success: false,
            message: err.message
        };

    }

}

/* -------------------------------------------------------------------------- */
/* LOGOUT */
/* -------------------------------------------------------------------------- */

async function logout() {

    PurchaseManager.clear();

    await auth.signOut();

}

/* -------------------------------------------------------------------------- */
/* UI */
/* -------------------------------------------------------------------------- */

function updateAuthUI(user) {

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!loginBtn || !logoutBtn) return;

    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "";
    } else {
        loginBtn.style.display = "";
        logoutBtn.style.display = "none";
    }

}

/* -------------------------------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------------------------------- */

function currentUser() {
    return auth.currentUser;
}

function onUserChanged(callback) {
    auth.onAuthStateChanged(callback);
}

/* -------------------------------------------------------------------------- */
/* APP START */
/* -------------------------------------------------------------------------- */

auth.onAuthStateChanged(async (user) => {

    updateAuthUI(user);

    if (!user) {

        PurchaseManager.clear();
        return;

    }

    try {

        await syncUser(user);

        const response = await loadProfile();

        PurchaseManager.sync(response.data);

    } catch (err) {

        console.error(err);

    }

});

/* -------------------------------------------------------------------------- */
/* LOGIN MODAL */
/* -------------------------------------------------------------------------- */

function getLoginModal() {
    return document.getElementById("loginModal");
}
function openLogin() {
    getLoginModal().classList.add("show");
}

function closeLogin() {
    getLoginModal().classList.remove("show");
}

/* -------------------------------------------------------------------------- */
/* LOGIN EMAIL BUTTON */
/* -------------------------------------------------------------------------- */

async function loginEmail() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const result = await login(email, password);

    if (result.success) {
        closeLogin();
    }

}

/* -------------------------------------------------------------------------- */
/* REGISTER BUTTON */
/* -------------------------------------------------------------------------- */

async function registerEmail() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const result = await register(email, password);

    if (result.success) {
        closeLogin();
    }

}

/* -------------------------------------------------------------------------- */
/* GOOGLE BUTTON */
/* -------------------------------------------------------------------------- */

async function loginGoogle() {

    const result = await loginWithGoogle();

    if (result.success) {
        closeLogin();
    }

}
