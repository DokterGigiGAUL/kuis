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
const quizTemplate = document.getElementById("quiz-card-template");

const comicsContainer = document.getElementById("comics-container");
const comicTemplate = document.getElementById("comic-card-template");

const ttsContainer = document.getElementById("tts-container");
const ttsTemplate = document.getElementById("tts-card-template");

const caseFiles = [
    "case1",
    "case2",
    "case3"
];

const caseContainer = document.getElementById("case-container");
const caseTemplate = document.getElementById("case-card-template");

loadQuiz();
loadComics();
loadTTS();
loadCases();

async function loadQuiz() {
    try {
        const responses = await Promise.all(
            quizFiles.slice(0, 4).map(id =>
                fetch(`assets/quizzes/${id}.json`)
            )
        );

        const quizzes = await Promise.all(
            responses.map(async response => {
                if (!response.ok) return null;
                return response.json();
            })
        );

        quizzes
            .filter(quiz => quiz !== null)
            .forEach(createQuizCard);

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
    if (!caseContainer) return;

    try {

        const responses = await Promise.all(
            caseFiles.slice(0, 4).map(file =>
                fetch(`assets/cases/${file}.json`)
            )
        );

        const cases = await Promise.all(
            responses.map(r => r.json())
        );

        cases.forEach(createCaseCard);

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
