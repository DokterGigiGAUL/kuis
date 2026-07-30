async function syncUser(user) {

    if (!user) return;

    const ref = db.collection("users").doc(user.uid);

    const doc = await ref.get();

    if (!doc.exists) {

        await ref.set({
            premiumUntil: null,
            ownedProducts: []
        });

    }

}
