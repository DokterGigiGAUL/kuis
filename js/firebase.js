const firebaseConfig = {
  apiKey: "AIzaSyDJ7AdX6rrE0OylKkPYx-UWYjtYj-y4QWg",
  authDomain: "wonder-app-2426.firebaseapp.com",
  projectId: "wonder-app-2426",
  storageBucket: "wonder-app-2426.firebasestorage.app",
  messagingSenderId: "274978911943",
  appId: "1:274978911943:web:b5c763f8a8b29dc86ff0e2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase berhasil diinisialisasi.");

async function syncUser(user) {

    const userRef = db.collection("users").doc(user.uid);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {

        await userRef.set({
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    ownedProducts: [],
    premiumUntil: null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        PurchaseManager.sync({
            ownedProducts: [],
            premiumUntil: null
        });

        return;

    }

    const data = snapshot.data() || {};

await userRef.update({
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
});

PurchaseManager.sync({
    ownedProducts: data.ownedProducts || [],
    premiumUntil: data.premiumUntil || null
});

}
