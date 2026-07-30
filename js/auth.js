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
