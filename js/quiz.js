const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

let quizData = null;
let currentQuestion = 0;
let answers = [];

const quizTitle = document.getElementById("quizTitle");
const questionCounter = document.getElementById("questionCounter");
const progressBar = document.getElementById("progressBar");
const questionImage = document.getElementById("questionImage");
const questionText = document.getElementById("questionText");
const choicesContainer = document.getElementById("choices");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

init();

async function init() {

    if (!quizId) {

        location.href = "index.html";
        return;

    }

    if (isQuizFinished(quizId)) {

        alert("Kuis ini sudah dikerjakan.");
        location.href = "index.html";
        return;

    }

    const response = await fetch(`quizzes/${quizId}.json`);
    quizData = await response.json();

    quizTitle.textContent = quizData.title;

    const saved = loadProgress(quizId);

    if (saved) {

        currentQuestion = saved.currentQuestion || 0;
        answers = saved.answers || [];

    } else {

        answers = new Array(quizData.questions.length).fill(null);

    }

    showQuestion();
    startTimer(quizData.timeLimit, autoSubmit);

}

function showQuestion() {

    const q = quizData.questions[currentQuestion];

    questionCounter.textContent =
        `Soal ${currentQuestion + 1} dari ${quizData.questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / quizData.questions.length) * 100}%`;

    questionImage.src = q.image;
    questionText.textContent = q.question;

    choicesContainer.innerHTML = "";

    q.choices.forEach((choice, index) => {

        const div = document.createElement("div");
        div.className = "choice";
        div.textContent = choice;

        if (answers[currentQuestion] === index) {

            div.classList.add("selected");

        }

        div.addEventListener("click", () => selectChoice(index));

        choicesContainer.appendChild(div);

    });

    prevBtn.disabled = currentQuestion === 0;

    nextBtn.textContent =
        currentQuestion === quizData.questions.length - 1
            ? "Selesai"
            : "Selanjutnya";

}

function selectChoice(index) {

    answers[currentQuestion] = index;

    saveProgress(quizId, {
        currentQuestion,
        answers
    });

    showQuestion();

}

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        saveProgress(quizId, {
            currentQuestion,
            answers
        });

        showQuestion();

    }

});

nextBtn.addEventListener("click", () => {

    if (currentQuestion < quizData.questions.length - 1) {

        currentQuestion++;

        saveProgress(quizId, {
            currentQuestion,
            answers
        });

        showQuestion();

    } else {

        submitQuiz();

    }

});

backBtn.addEventListener("click", () => {

    if (confirm("Keluar dari kuis? Waktu tetap berjalan.")) {

        location.href = "index.html";

    }

});

function autoSubmit() {

    alert("Waktu habis. Kuis akan dikirim otomatis.");
    submitQuiz();

}

function submitQuiz() {

    const result = {
        quizId,
        answers,
        submittedAt: Date.now()
    };

    sessionStorage.setItem(
        "quizResult",
        JSON.stringify(result)
    );

    finishQuiz(quizId);
    clearProgress(quizId);

    location.href = "result.html";

}
