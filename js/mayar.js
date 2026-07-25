// js/mayar.js

(() => {
    let loadingPromise = null;

    function loadScript() {
        if (window.Mayar) {
            return Promise.resolve(window.Mayar);
        }

        if (loadingPromise) {
            return loadingPromise;
        }

        loadingPromise = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://mayar.id/js/embed.js";
            script.async = true;

            script.onload = () => {
                if (window.Mayar) {
                    resolve(window.Mayar);
                } else {
                    reject(new Error("Mayar gagal dimuat."));
                }
            };

            script.onerror = () => {
                reject(new Error("Tidak dapat memuat library Mayar."));
            };

            document.head.appendChild(script);
        });

        return loadingPromise;
    }

    async function open(url) {
        if (!url) {
            console.error("URL checkout Mayar kosong.");
            return;
        }

        await loadScript();

        Mayar.open(url);
    }

    window.MayarWrapper = {
        open
    };
})();
