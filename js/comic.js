const params = new URLSearchParams(window.location.search);
const comicId = parseInt(params.get("id")) || 1;

const currentIndex = comics.findIndex(comic => comic.id === comicId);
const currentComic = comics[currentIndex];

const title = document.getElementById("comic-title");
const image = document.getElementById("comic-image");

title.textContent = currentComic.title;
image.src = currentComic.image;
image.alt = currentComic.title;

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
