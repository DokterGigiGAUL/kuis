const googleProvider = new firebase.auth.GoogleAuthProvider();
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

async function logout() {
    await auth.signOut();
}

function currentUser() {
    return auth.currentUser;
}

function onUserChanged(callback) {
    auth.onAuthStateChanged(callback);
}

auth.onAuthStateChanged(async (user) => {
    if (!user) return;
    await syncUser(user);
});

const loginModal = document.getElementById("loginModal");

function openLogin() {
    loginModal.classList.add("show");
}

function closeLogin() {
    loginModal.classList.remove("show");
}

async function loginEmail() {

    const result = await login(
        loginEmail.value,
        loginPassword.value
    );

    if(result.success){
        closeLogin();
    }

}

async function registerEmail() {

    const result = await register(
        loginEmail.value,
        loginPassword.value
    );

    if(result.success){
        closeLogin();
    }

}

async function loginGoogle() {

    const result = await loginWithGoogle();

    if(result.success){
        closeLogin();
    }

}
