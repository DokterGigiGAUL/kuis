quizList = document.getElementById("quiz-list");
const quizTemplate = document.getElementById("quiz-card-template");

const comicsContainer = document.getElementById("comics-container");
const comicTemplate = document.getElementById("comic-card-template");

const ttsContainer = document.getElementById("tts-container");
const ttsTemplate = document.getElementById("tts-card-template");

const caseContainer = document.getElementById("case-container");
const caseTemplate = document.getElementById("case-card-template");

loadQuiz();
loadComics();
loadTTS();
loadCases();

async function loadQuiz() {
    try {

        const selected = quizzes.slice(0, 4);

        const responses = await Promise.all(
            selected.map(q =>
                fetch(`assets/quizzes/${q.file}.json`)
            )
        );

        const data = await Promise.all(
            responses.map(r => r.json())
        );

        data.forEach(createQuizCard);

    } catch (e) {
        console.error(e);
    }
}

function createQuizCard(quiz) {
    const clone = quizTemplate.content.cloneNode(true);

    clone.querySelector(".quiz-thumbnail").src = quiz.thumbnail;
    clone.querySelector(".quiz-title").textContent = quiz.title;
    clone.querySelector(".quiz-description").textContent = quiz.description;

    const button = clone.querySelector(".start-btn");

    if (Storage.isFinished(quiz.id)) {
        button.textContent = "Sudah Dikerjakan";
        button.disabled = true;
    } else {
        button.onclick = () => {
            location.href = `quiz.html?id=${quiz.id}`;
        };
    }

    quizList.appendChild(clone);
}

function loadComics() {
    if (!comicsContainer) return;

    for (const comic of comics.slice(0, 4)) {
        const card = comicTemplate.content.cloneNode(true);

        card.querySelector(".comic-thumb").src = comic.thumb;
        card.querySelector(".comic-thumb").alt = comic.title;
        card.querySelector(".comic-title").textContent = comic.title;
        card.querySelector(".comic-episode").textContent =
            `EPISODE #${String(comic.id).padStart(3, "0")}`;

        card.querySelector(".comic-btn").onclick = () => {
            location.href = `komik.html?id=${comic.id}`;
        };

        comicsContainer.appendChild(card);
    }
}

function loadTTS() {
    if (!ttsContainer) return;

    for (const tts of ttsList.slice(0, 4)) {
        const card = ttsTemplate.content.cloneNode(true);

        card.querySelector(".tts-thumbnail").src = tts.thumb;
        card.querySelector(".tts-thumbnail").alt = tts.title;
        card.querySelector(".tts-title").textContent = tts.title;
        card.querySelector(".tts-soal").textContent =
            `${tts.soal} Soal`;

        card.querySelector(".tts-btn").onclick = () => {
            location.href =
                `assets/tts/crossword.html?puzzle=tts${tts.id}`;
        };

        ttsContainer.appendChild(card);
    }
}

async function loadCases() {
    try {

        const selected = cases.slice(0, 4);

        const responses = await Promise.all(
            selected.map(c =>
                fetch(`assets/cases/${c.file}.json`)
            )
        );

        const data = await Promise.all(
            responses.map(r => r.json())
        );

        data.forEach(createCaseCard);

    } catch (e) {
        console.error(e);
    }
}

function createCaseCard(data) {

    const clone = caseTemplate.content.cloneNode(true);

    clone.querySelector(".case-thumbnail").src = data.image;

    clone.querySelector(".case-title").textContent =
        data.title;

    clone.querySelector(".case-description").textContent =
        `${data.gender}, ${data.age}`;

    clone.querySelector(".case-btn").onclick = () => {
        location.href = `case.html?case=case${data.id}`;
    };

    caseContainer.appendChild(clone);

}
