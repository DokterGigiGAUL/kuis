function showPremiumDialog() {
    if (confirm(
        "🔒 Konten Premium\n\n" +
        "Konten ini hanya tersedia untuk member Premium.\n\n" +
        "Tekan OK untuk mendapatkan akses akun Premium atau CANCEL untuk tetap menggunakan akun Gratis."
    )) {
        window.location.href = "premium.html";
    }
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

function userHasPremium() {
    return Premium.isPremium();
}

function activatePremium() {
    Premium.enable();
    alert("Premium berhasil diaktifkan.");
    location.reload();
}

function deactivatePremium() {
    Premium.disable();
    alert("Premium dinonaktifkan.");
    location.reload();
}
