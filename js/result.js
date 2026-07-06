const raw = sessionStorage.getItem("result");

if (!raw) {
    window.location.href = "index.html";
}

const data = JSON.parse(raw);

const quiz = data.quiz;
const session = data.session;

const scoreElement = document.getElementById("score");
const summaryElement = document.getElementById("summary");
const reviewList = document.getElementById("reviewList");

const total = quiz.questions.length;
const score = session.score;

scoreElement.textContent = `${score} / ${total}`;
summaryElement.textContent = `Jawaban benar ${score} dari ${total} soal`;

quiz.questions.forEach((q, index) => {

    const card = document.createElement("div");
    card.className = "review-card";

    const userAnswer = session.answers[index];

    const correct = userAnswer === q.answer;

    const answerText =
        userAnswer !== undefined
            ? q.options[userAnswer]
            : "Tidak dijawab";

    card.innerHTML = `
        <h3>Soal ${index + 1}</h3>

        ${q.image ? `<img src="${q.image}" class="review-image">` : ""}

        <p class="review-question">${q.q}</p>

        <p>
            <strong>Jawaban Anda :</strong>
            ${answerText}
        </p>

        <p>
            <strong>Jawaban Benar :</strong>
            ${q.options[q.answer]}
        </p>

        <p class="${correct ? "correct" : "wrong"}">
            ${correct ? "✔ Benar" : "✖ Salah"}
        </p>

        <div class="explanation">
            ${q.explanation}
        </div>
    `;

    reviewList.appendChild(card);

});
