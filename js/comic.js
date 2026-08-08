const params = new URLSearchParams(window.location.search);
const comicId = parseInt(params.get("id")) || 1;

const currentIndex = comics.findIndex(comic => comic.id === comicId);
const currentComic = comics[currentIndex];
if (currentIndex === -1) {
    window.location.href = "index.html";
    throw new Error("Komik tidak ditemukan.");
}

const backendProduct =
    typeof backendProducts !== "undefined"
        ? backendProducts.get(currentComic.productId)
        : null;

const hasAccess =
    backendProduct?.status === "active" ||
    PurchaseManager.hasAccess(currentComic);

if (!hasAccess) {
    showPremiumDialog(currentComic.productId);
    window.location.href = "index.html";
    throw new Error("Akses ditolak.");
}

const title = document.getElementById("comic-title");
const imageContainer = document.getElementById("comic-image");

//document.getElementById("home-btn").onclick = () => history.back();
const backBtn = document.getElementById("backBtn");
    if (backBtn) {
      backBtn.onclick = () => {
        window.location.href = "index.html";
      };
    }

title.textContent = currentComic.title;

imageContainer.innerHTML = "";

currentComic.images.forEach(src => {
  const img = document.createElement("img");

  img.src = src;
  img.alt = currentComic.title;
  img.className = "comic-image";
  img.loading = "lazy";

  imageContainer.appendChild(img);
});

const prevButton = document.getElementById("prev-comic");
const nextButton = document.getElementById("next-comic");

prevButton.disabled = currentIndex === 0;
nextButton.disabled = currentIndex === comics.length - 1;

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    window.location.href = `komik.html?id=${comics[currentIndex - 1].id}`;
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < comics.length - 1) {
    window.location.href = `komik.html?id=${comics[currentIndex + 1].id}`;
  }
});
