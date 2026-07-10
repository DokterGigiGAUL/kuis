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
const params =
    new URLSearchParams(location.search);
const tab =
    params.get("tab") || "quiz";
const quizSection =
    document.getElementById("quiz-list");
const comicSection =
    document.getElementById("comics-container");
const ttsSection =
    document.getElementById("tts-container");
const quizTab =
    document.getElementById("quizTab");
const comicTab =
    document.getElementById("comicTab");
const ttsTab =
    document.getElementById("ttsTab");
const pageTitle =
    document.getElementById("pageTitle");


if (tab === "comic") {
    showComic();
} else if (tab === "tts") {
    showTTS();
} else {
    showQuiz();
}

async function showQuiz() {
    pageTitle.textContent =
        "Semua Kuis";
    quizSection.style.display = "grid";
    comicSection.style.display = "none";
    ttsSection.style.display = "none";
    quizTab.classList.add("active");
    comicTab.classList.remove("active");
    ttsTab.classList.remove("active");
    
    const template =
        document.getElementById("quiz-card-template");
    quizSection.innerHTML = "";
    for (const id of quizFiles) {
        const response =
            await fetch(`assets/quizzes/${id}.json`);
        if (!response.ok)
            continue;

        const quiz =
            await response.json();
        const card =
            template.content.cloneNode(true);
        card.querySelector(".quiz-thumbnail").src =
            quiz.thumbnail;
        card.querySelector(".quiz-title").textContent =
            quiz.title;
        card.querySelector(".quiz-description").textContent =
            quiz.description;

        const button =
            card.querySelector(".comic-btn");
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
        quizSection.appendChild(card);
    }
}

function showComic() {
    pageTitle.textContent =
        "Semua Komik";
    quizSection.style.display = "none";
    comicSection.style.display = "grid";
    ttsSection.style.display = "none";
    comicTab.classList.add("active");
    quizTab.classList.remove("active");
    ttsTab.classList.remove("active");
    
    const template =
        document.getElementById("comic-card-template");
    comicSection.innerHTML = "";
    comics.forEach(comic => {
        const card =
            template.content.cloneNode(true);
        card.querySelector(".comic-thumb").src =
            comic.thumb;
        card.querySelector(".comic-title").textContent =
            comic.title;
        card.querySelector(".comic-episode").textContent =
            `EPISODE #${String(comic.id).padStart(3,"0")}`;
        card.querySelector(".comic-btn").onclick = () => {
            location.href =
                `komik.html?id=${comic.id}`;
        };
        comicSection.appendChild(card);
    });
}

function showTTS() {
    pageTitle.textContent =
        "Semua TTS";
    quizSection.style.display = "none";
    comicSection.style.display = "none";
    ttsSection.style.display = "grid";
    quizTab.classList.remove("active");
    comicTab.classList.remove("active");
    ttsTab.classList.add("active");

    const template =
        document.getElementById("tts-card-template");
    ttsSection.innerHTML = "";
    ttsList.forEach(tts => {

        const card =
            template.content.cloneNode(true);
        card.querySelector(".tts-thumb").src =
            tts.thumb;
        card.querySelector(".tts-title").textContent =
            tts.title;
        card.querySelector(".tts-description").textContent =
            tts.description;
        card.querySelector(".tts-soal").textContent =
            `${tts.soal} Soal`;
        card.querySelector(".comic-btn").onclick = () => {
            location.href =
                `assets/tts/tts${tts.id}.html`;
        };
        ttsSection.appendChild(card);
    });
}

quizTab.onclick = () => {
    history.replaceState(
        {},
        "",
        "explore.html?tab=quiz"
    );
    showQuiz();
};

comicTab.onclick = () => {
    history.replaceState(
        {},
        "",
        "explore.html?tab=comic"
    );
    showComic();
};

ttsTab.onclick = () => {
    history.replaceState(
        {},
        "",
        "explore.html?tab=tts"
    );
    showTTS();
};
