// js/mayar.js

(() => {

    const SCRIPT_URL = "https://mayarembed.r2.mayar.id/mayar-new-min.js";

    let loader = null;

    function loadScript() {

        if (window.IframeLightbox) {
            return Promise.resolve();
        }

        if (loader) return loader;

        loader = new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = SCRIPT_URL;
            script.async = true;

            script.onload = () => resolve();

            script.onerror = () => reject(
                new Error("Gagal memuat library Mayar.")
            );

            document.head.appendChild(script);

        });

        return loader;

    }

    async function open(url) {

        await loadScript();

        const link = document.createElement("a");

        link.href = url.includes("?")
            ? url
            : url + "?iframe=true";

        link.className = "iframe-lightbox-link";

        link.dataset.paddingBottom = "30%";
        link.dataset.scrolling = "true";

        document.body.appendChild(link);

        link.lightbox = new IframeLightbox(link);

        link.click();

        setTimeout(() => link.remove(), 1000);
    }

    window.MayarWrapper = {
        open
    };

})();
