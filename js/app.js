//const quizList = document.getElementById("quiz-list");
const quizTemplate = document.getElementById("quiz-card-template");

//const comicsContainer = document.getElementById("comics-container");
const comicTemplate = document.getElementById("comic-card-template");

//const ttsContainer = document.getElementById("tts-container");
const ttsTemplate = document.getElementById("tts-card-template");

//const caseContainer = document.getElementById("case-container");
const caseTemplate = document.getElementById("case-card-template");

loadQuiz();
loadComics();
loadTTS();
loadCases();

function loadQuiz() {

    if (!quizList) return;

    quizzes
        .slice(0, 4)
        .forEach(createQuizCard);

}

function createQuizCard(quiz) {

    const clone = quizTemplate.content.cloneNode(true);

    clone.querySelector(".quiz-thumbnail").src = quiz.thumbnail;
    clone.querySelector(".quiz-thumbnail").alt = quiz.title;

    clone.querySelector(".quiz-title").textContent = quiz.title;
    clone.querySelector(".quiz-description").textContent = quiz.description;

    const button = clone.querySelector(".quiz-btn");

    if (Storage.isFinished(quiz.productId)) {

        button.textContent = "Sudah Dikerjakan";
        button.disabled = true;
    } else {
        button.onclick = () => {

        if (quiz.premium) {
        showPremiumDialog();
        return;
    }
            
            location.href = `quiz.html?id=${quiz.file}`;
        };
    }
    quizList.appendChild(clone);
}

function loadComics() {
    if (!comicsContainer) return;

    for (const comic of comics.slice(0, 4)) {
        const card = comicTemplate.content.cloneNode(true);

        card.querySelector(".comic-thumb").src = comic.thumbnail;
        card.querySelector(".comic-thumb").alt = comic.title;
        card.querySelector(".comic-title").textContent = comic.title;
        card.querySelector(".comic-episode").textContent =
            `Episode #${String(comic.id).padStart(1, "0")}`;

        card.querySelector(".comic-btn").onclick = () => {
            if (comic.premium) {
        showPremiumDialog();
        return;
    }
            location.href = `komik.html?id=${comic.id}`;
        };

        comicsContainer.appendChild(card);
    }
}

function loadTTS() {
    if (!ttsContainer) return;

    for (const tts of ttsList.slice(0, 4)) {
        const card = ttsTemplate.content.cloneNode(true);

        card.querySelector(".tts-thumbnail").src = tts.thumbnail;
        card.querySelector(".tts-thumbnail").alt = tts.title;
        card.querySelector(".tts-title").textContent = tts.title;
        card.querySelector(".tts-soal").textContent =
            `${tts.soal} Soal`;

        card.querySelector(".tts-btn").onclick = () => {
            if (tts.premium) {
        showPremiumDialog();
        return;
    }
            location.href =
                `tts.html?puzzle=tts${tts.id}`;
        };

        ttsContainer.appendChild(card);
    }
}

function loadCases() {

    if (!caseContainer) return;

    cases
        .slice(0, 4)
        .forEach(createCaseCard);

}

function createCaseCard(caseData) {

    const clone = caseTemplate.content.cloneNode(true);

    clone.querySelector(".case-thumbnail").src = caseData.thumbnail;
    clone.querySelector(".case-thumbnail").alt = caseData.title;

    clone.querySelector(".case-title").textContent =
        caseData.title;

   // clone.querySelector(".case-description").textContent =
   //     caseData.description;

    clone.querySelector(".case-btn").onclick = () => {
    location.href = `case.html?case=${caseData.file}`;
};
    
    caseContainer.appendChild(clone);
}
