function showPremiumDialog() {
    alert(
        "🔒 Konten Premium\n\n" +
        "Konten ini merupakan bagian dari Wonder App Premium.\n\n" +
        "Saat ini konten dan atau fungsi Premium belum dapat diakses karena masih dalam tahap pengembangan. Akses premium bisa segera didapat kan maksimal dalam 1 minggu ke depan.\n\n" +
        "Terima kasih atas dukungannya 😊"
    );
}

function userHasPremium() {
    return false;
}

const Premium = {

    isPremium() {
        return localStorage.getItem("premium") === "true";
    },

    enable() {
        localStorage.setItem("premium", "true");
    },

    disable() {
        localStorage.removeItem("premium");
    }

};

