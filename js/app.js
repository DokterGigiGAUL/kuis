const quizFiles = [
    "kuis1",
    "kuis2",
    "kuis3",
    "kuis4",
    "kuis5",
    "kuis6",
    "kuis7",
    "kuis8",
    "kuis9"
];

const quizList = document.getElementById("quiz-list");
const template = document.getElementById("quiz-card-template");

init();

async function init() {

for (const id of quizFiles.slice(0, 4)) {

    try {

        const response = await fetch(`assets/quizzes/${id}.json`);

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

    const comicsContainer =
        document.getElementById("comics-container");

    if (!comicsContainer) return;

    const template =
        document.getElementById("comic-card-template");

for (const id of quizFiles.slice(0, 4)) {

        const card =
            template.content.cloneNode(true);

        card.querySelector(".comic-thumb").src =
            comic.thumb;

        card.querySelector(".comic-thumb").alt =
            comic.title;

        card.querySelector(".comic-title").textContent =
            comic.title;

        card.querySelector(".comic-episode").textContent =
            `EPISODE #${String(comic.id).padStart(3,"0")}`;

        card.querySelector(".comic-btn").onclick = () => {

            location.href =
                `komik.html?id=${comic.id}`;

        };

        comicsContainer.appendChild(card);

    });

});
