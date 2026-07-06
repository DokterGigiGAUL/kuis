const raw =
sessionStorage.getItem("result");

if(!raw){

    location.href="index.html";

}

const data =
JSON.parse(raw);

const quiz = data.quiz;
const session = data.session;

const scoreElement = document.getElementById("score");
const summaryElement = document.getElementById("summary");
const reviewList = document.getElementById("reviewList");

const total = quiz.questions.length;
const score = session.score;

scoreElement.textContent =
    `${score} / ${total}`;

summaryElement.textContent =
    `Jawaban benar ${score} dari ${total} soal`;

quiz.questions.forEach((q, index) => {

    const card = document.createElement("div");

    card.className = "review-card";

    const userAnswer =
        session.answers[index];

    const correct =
        userAnswer === q.answer;

    card.innerHTML = `

        <h3>
            Soal ${index + 1}
        </h3>

        <img
            src="${q.image}"
            class="review-image"
        >

        <p class="review-question">

            ${q.question}

        </p>

        <p>

            <strong>Jawaban Anda :</strong>

            ${userAnswer !== undefined
                ? q.choices[userAnswer]
                : "-"}

        </p>

        <p>

            <strong>Jawaban Benar :</strong>

            ${q.choices[q.answer]}

        </p>

        <p class="${
            correct
            ? "correct"
            : "wrong"
        }">

            ${
                correct
                ? "✔ Benar"
                : "✖ Salah"
            }

        </p>

        <div class="explanation">

            ${q.explanation}

        </div>

    `;

    reviewList.appendChild(card);

});
