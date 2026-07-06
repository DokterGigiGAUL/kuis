const quizFiles = [
    "quizzes/kuis1.json",
    "quizzes/kuis2.json",
    "quizzes/kuis3.json"
];

const quizList = document.getElementById("quiz-list");
const template = document.getElementById("quiz-card-template");

init();

async function init() {

    for (const file of quizFiles) {

        try {

            const response = await fetch(file);

if (!response.ok) {

    throw new Error("Quiz file not found");

} catch (err) {

            console.error(file, err);

        }

    }

}

function createCard(quiz) {

    const clone = template.content.cloneNode(true);

    clone.querySelector(".quiz-thumbnail").src = quiz.thumbnail;
    clone.querySelector(".quiz-thumbnail").alt = quiz.title;

    clone.querySelector(".quiz-title").textContent = quiz.title;
    clone.querySelector(".quiz-description").textContent = quiz.description;

    const button = clone.querySelector(".start-btn");

    if (isQuizFinished(quiz.id)) {

        button.textContent = "🔒 Sudah Dikerjakan";
        button.disabled = true;

    } else {

        button.addEventListener("click", () => {

            window.location.href = `quiz.html?id=${quiz.id}`;

        });

    }

    quizList.appendChild(clone);

}
