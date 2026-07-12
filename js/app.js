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

const quizExplore = document.getElementById("quizExplore");
const comicExplore = document.getElementById("comicExplore");
const ttsExplore = document.getElementById("ttsExplore");

loadQuiz();
loadComics();
loadTTS();

async function loadQuiz() {
    for (const id of quizFiles.slice(0, 4)) {
        try {
            const response =
                await fetch(`assets/quizzes/${id}.json`);
            if (!response.ok) continue;
            const quiz =
                await response.json();
            createQuizCard(quiz);
        } catch (e) {
            console.error(e);
        }
    }
    if (quizExplore) {
        quizExplore.textContent =
            "Kuis Lainnya →";
    }
}

function createQuizCard(quiz) {
    const clone =
        quizTemplate.content.cloneNode(true);
    clone.querySelector(".quiz-thumbnail").src =
        quiz.thumbnail;
    clone.querySelector(".quiz-title").textContent =
        quiz.title;
    clone.querySelector(".quiz-description").textContent =
        quiz.description;
    const button =
        clone.querySelector(".start-btn");
    if (Storage.isFinished(quiz.id)) {
        button.textContent =
            "Sudah Dikerjakan";
        button.disabled = true;
    } else {
        button.onclick = () => {
            location.href =
                `quiz.html?id=${quiz.id}`;
        };
    }
    quizList.appendChild(clone);
}

function loadComics() {
    if (!comicsContainer) return;
    for (const comic of comics.slice(0, 4)) {
        const card =
            comicTemplate.content.cloneNode(true);
        card.querySelector(".comic-thumb").src =
            comic.thumb;
        card.querySelector(".comic-thumb").alt =
            comic.title;
        card.querySelector(".comic-title").textContent =
            comic.title;
        card.querySelector(".comic-episode").textContent =
            `EPISODE #${String(comic.id).padStart(3, "0")}`;
        card.querySelector(".start-btn").onclick = () => {
            location.href =
                `komik.html?id=${comic.id}`;
        };
        comicsContainer.appendChild(card);
    }
    if (comicExplore) {
        comicExplore.textContent =
            "Episode Lainnya →";
    }
}

function loadTTS() {
    if (!ttsContainer) return;
    for (const tts of ttsList.slice(0, 4)) {
        const card =
            ttsTemplate.content.cloneNode(true);
        card.querySelector(".tts-thumb").src =
            tts.thumb;
        card.querySelector(".tts-thumb").alt =
            tts.title;
        card.querySelector(".tts-title").textContent =
            tts.title;
        card.querySelector(".tts-description").textContent =
            tts.description;
        card.querySelector(".tts-soal").textContent =
            `${tts.soal} Soal`; //jumlah soal
        card.querySelector(".tts-btn").onclick = () => {
    location.href =
        `assets/tts/crossword.html?puzzle=tts${tts.id}`;
        };
        ttsContainer.appendChild(card);
    }
    if (ttsExplore) {
        ttsExplore.textContent =
            "TTS Lainnya →";
    }
}
