// js/mayar.js

(() => {

    const SCRIPT_URL = "https://mayarembed.r2.mayar.id/mayar-new-min.js";

    let loader = null;

    function loadScript() {

        if (loader) return loader;

        loader = new Promise((resolve, reject) => {

            if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement("script");

            script.src = SCRIPT_URL;
            script.async = true;

            script.onload = () => {
                // beri waktu library menginisialisasi .mayar-button
                setTimeout(resolve, 100);
            };

            script.onerror = () => reject(
                new Error("Gagal memuat library Mayar.")
            );

            document.head.appendChild(script);

        });

        return loader;

    }

    async function open(url) {

        await loadScript();

        const link = document.getElementById("mayar-link");

        link.href = url.includes("?")
            ? url
            : url + "?iframe=true";

        link.click();

    }

    window.MayarWrapper = {
        open
    };

})();
