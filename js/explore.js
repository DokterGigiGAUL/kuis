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
const caseSection =
    document.getElementById("case-container");
const quizTab =
    document.getElementById("quizTab");
const comicTab =
    document.getElementById("comicTab");
const ttsTab =
    document.getElementById("ttsTab");
const pageTitle =
    document.getElementById("pageTitle");
const caseTab =
    document.getElementById("caseTab");

if (tab === "comic") {
    showComic();
} else if (tab === "tts") {
    showTTS();
} else if (tab === "case") {
    showCase();
} else {
    showQuiz();
}

function showQuiz() {

    pageTitle.textContent = "Semua Kuis";

    quizSection.style.display = "block";
    comicSection.style.display = "none";
    ttsSection.style.display = "none";
    caseSection.style.display = "none";

    quizTab.classList.add("active");
    comicTab.classList.remove("active");
    ttsTab.classList.remove("active");
    caseTab.classList.remove("active");

    const template =
        document.getElementById("quiz-card-template");

    quizSection.innerHTML = "";

    quizzes.forEach(quiz => {

        const card =
            template.content.cloneNode(true);

        card.querySelector(".quiz-list-thumb").src =
        quiz.thumbnail;

        card.querySelector(".quiz-list-title").textContent =
        quiz.title;

        card.querySelector(".quiz-list-description").textContent =
        quiz.description;

        const button =
        card.querySelector(".quiz-btn-list");

        if (Storage.isFinished(quiz.productId)) {

            button.textContent =
                "Sudah Dikerjakan";

            button.disabled = true;

        } else {

            button.onclick = () => {
                location.href =
                    `quiz.html?id=${quiz.file}`;
            };

        }

        quizSection.appendChild(card);

    });

}

function showComic() {

    pageTitle.textContent = "Semua Komik";

    quizSection.style.display = "none";
    comicSection.style.display = "block";
    ttsSection.style.display = "none";
    caseSection.style.display = "none";

    quizTab.classList.remove("active");
    comicTab.classList.add("active");
    ttsTab.classList.remove("active");
    caseTab.classList.remove("active");

    comicSection.innerHTML = "";

    comics.forEach(comic => {

        comicSection.innerHTML += `
            <article class="comic-list-card">

                <img
                    src="${comic.thumbnail}"
                    class="comic-list-thumb"
                    alt="${comic.title}"
                    loading="lazy"
                >

                <div class="comic-list-info">

                    <h3>${comic.title}</h3>

                </div>

                <button
                    class="btn btn-outline comic-btn-list"
                    onclick="location.href='komik.html?id=${comic.id}'">
                    Baca
                </button>

            </article>
        `;

    });

}

function showTTS() {

    pageTitle.textContent = "Semua TTS";
    
    quizSection.style.display = "none";
    comicSection.style.display = "none";
    ttsSection.style.display = "block";
    caseSection.style.display = "none";

    quizTab.classList.remove("active");
    comicTab.classList.remove("active");
    ttsTab.classList.add("active");
    caseTab.classList.remove("active");
    
    const template =
        document.getElementById("tts-card-template");

    ttsSection.innerHTML = "";

    ttsList.forEach(tts => {

        const card =
            template.content.cloneNode(true);

        card.querySelector(".tts-list-thumb").src =
            tts.thumbnail;
        card.querySelector(".tts-list-title").textContent =
            tts.title;
        card.querySelector(".tts-list-soal").textContent =
            `${tts.soal} Soal`;
        card.querySelector(".tts-btn-list").onclick = () => {
            location.href =
                `assets/tts/crossword.html?puzzle=tts${tts.id}`;
        };
        ttsSection.appendChild(card);
    });

}

function showCase() {

    pageTitle.textContent = "Semua Kartu Kasus";

    quizSection.style.display = "none";
    comicSection.style.display = "none";
    ttsSection.style.display = "none";
    caseSection.style.display = "block";

    quizTab.classList.remove("active");
    comicTab.classList.remove("active");
    ttsTab.classList.remove("active");
    caseTab.classList.add("active");

    const template =
        document.getElementById("case-card-template");

    caseSection.innerHTML = "";

    cases.forEach(caseData => {

        const card =
            template.content.cloneNode(true);

        card.querySelector(".case-list-thumb").src =
        caseData.thumbnail;

         card.querySelector(".case-list-title").textContent =
         caseData.title;

        card.querySelector(".case-list-description").textContent =
        caseData.description;

        card.querySelector(".case-btn-list").onclick = () => {
        location.href =
        `case.html?case=${caseData.file}`;
};

        caseSection.appendChild(card);

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

caseTab.onclick = () => {

    history.replaceState(
        {},
        "",
        "explore.html?tab=case"
    );

    showCase();

};
