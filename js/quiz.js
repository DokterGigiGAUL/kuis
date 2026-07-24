const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

let quiz = null;
let session = null;

const title = document.getElementById("quizTitle");
const counter = document.getElementById("questionCounter");
const image = document.getElementById("questionImage");
const question = document.getElementById("questionText");
const choices = document.getElementById("choices");
const progress = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

init();

async function init() {

    const metadata = quizzes.find(q => q.file === quizId);

    if (!metadata) {
        alert("Kuis tidak ditemukan.");
        window.location.href = "index.html";
        return;
    }

    if (!PurchaseManager.hasAccess(metadata)) {
        showPremiumDialog(metadata.productId);
        window.location.href = "index.html";
        return;
    }

    const response = await fetch(`assets/metadata/kuis/${quizId}.json`);
    quiz = await response.json();

    if (Storage.isFinished(quiz.id)) {
        alert("Kuis sudah selesai dikerjakan.");
        window.location.href = "index.html";
        return;
    }

    session = Storage.get(quiz.id);

    if (!session) {
        session = Storage.create(
            quiz.id,
            quiz.timeLimit
        );
    }

    title.textContent = quiz.title;
    startTimer(Storage.remainingTime(quiz.id));
    renderQuestion();
}

function renderQuestion() {

    const index = session.currentQuestion;
    const q = quiz.questions[index];

    counter.textContent =
        `Soal ${index + 1} dari ${quiz.questions.length}`;
    progress.style.width =
        ((index + 1) / quiz.questions.length) * 100 + "%";
    if (q.image) {
        image.src = q.image;
        image.style.display = "block";
    } else {
        image.style.display = "none";
    }
    question.textContent = q.q;
    choices.innerHTML = "";
    q.options.forEach((item, i) => {

        const div = document.createElement("div");
    
        div.className = "choice";
        div.textContent = item;

        if (session.answers[index] === i) {
            div.classList.add("selected");
            }
    
        div.onclick = () => {
            session.answers[index] = i;
            Storage.save(quiz.id, session);
            renderQuestion();
        };
    
        choices.appendChild(div);
    });

    prevBtn.disabled = index === 0;

    if (index === quiz.questions.length - 1) {
        nextBtn.textContent = "Selesai";
    } else {
        nextBtn.textContent = "Selanjutnya";
    }
}

prevBtn.onclick = () => {
    if (session.currentQuestion > 0) {
        session.currentQuestion--;
        Storage.save(quiz.id, session);
        renderQuestion();
    }
};

nextBtn.onclick = () => {
    if (session.currentQuestion < quiz.questions.length - 1) {
        session.currentQuestion++;
        Storage.save(quiz.id, session);
        renderQuestion();
    } else {
        submitQuiz();
    }
};

backBtn.onclick = ()=>{
    if(confirm("Keluar dari kuis?")){
        stopTimer();
        window.location.href="index.html";
    }
};

function submitQuiz() {
    stopTimer();
    let score = 0;
    quiz.questions.forEach((q, i) => {
        if (session.answers[i] === q.answer) {
            score++;
        }
    });
    session.score = score;
    Storage.finish(
        quiz.id,
        score
    );
    sessionStorage.setItem(
        "result",
        JSON.stringify({
            quiz: quiz,
            session: session
        })
    );
    window.location.href = "result.html";
}
