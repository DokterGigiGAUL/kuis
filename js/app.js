const quizFiles = [
    "kuis1",
    "kuis2",
    "kuis3"
];

const quizList = document.getElementById("quiz-list");
const template = document.getElementById("quiz-card-template");

init();

async function init() {

    for (const id of quizFiles) {

        try {

            const response = await fetch(`quizzes/${id}.json`);

            if (!response.ok) continue;

            const quiz = await response.json();

            createCard(quiz);

        } catch (e) {

            console.error(e);

        }

    }

}

function createCard(quiz) {

    const clone = template.content.cloneNode(true);

    clone.querySelector(".quiz-thumbnail").src = quiz.thumbnail;
    clone.querySelector(".quiz-title").textContent = quiz.title;
    clone.querySelector(".quiz-description").textContent = quiz.description;

    const button = clone.querySelector(".start-btn");

    if (Storage.isFinished(quiz.id)) {

        button.textContent = "Sudah Dikerjakan";
        button.disabled = true;

    } else {

        button.onclick = () => {

            window.location.href = `quiz.html?id=${quiz.id}`;

        };

    }

    quizList.appendChild(clone);

}

document.addEventListener("DOMContentLoaded", () => {
  const comicsContainer = document.getElementById("comics-container");

  if (comicsContainer) {
    comicsContainer.innerHTML = comics
      .map(
        (comic) => `
          <article class="comic-card">
            <img
              src="${comic.thumb}"
              alt="${comic.title}"
              class="comic-thumb"
              loading="lazy"
            >

            <div class="comic-content">
              <h3 class="comic-title">${comic.title}</h3>

              <a
                href="komik.html?id=${comic.id}"
                class="btn-primary"
              >
                Baca Komik
              </a>
            </div>
          </article>
        `
      )
      .join("");
  }
});
