const quizList = document.getElementById("quiz-list");
const comicsContainer = document.getElementById("comics-container");
const ttsContainer = document.getElementById("tts-container");
const caseContainer = document.getElementById("case-container");

const cardTemplate = document.getElementById("content-card-template");

loadQuiz();
loadComics();
loadTTS();
loadCases();

function createContentCard({
    container,
    thumbnail,
    title,
    description,
    buttonText,
    disabled = false,
    onClick
}) {

    const clone = cardTemplate.content.cloneNode(true);

    clone.querySelector(".content-thumb").src = thumbnail;
    clone.querySelector(".content-thumb").alt = title;

    clone.querySelector(".content-title").textContent = title;
    clone.querySelector(".content-description").textContent = description;

    const button = clone.querySelector(".content-btn");

    button.textContent = buttonText;
    button.disabled = disabled;

    if (!disabled) {
        button.onclick = onClick;
    }

    container.appendChild(clone);
}

function loadQuiz() {

    if (!quizList) return;

    quizzes.slice(0, 6).forEach(quiz => {

        const finished =
            Storage.isFinished(quiz.productId);

        createContentCard({

            container: quizList,

            thumbnail: quiz.thumbnail,

            title: quiz.title,

            description: quiz.description,

            buttonText: finished
                ? "Sudah Selesai"
                : "Mulai",

            disabled: finished,

            onClick() {

                if (quiz.premium) {
                    showPremiumDialog();
                    return;
                }

                location.href =
                    `quiz.html?id=${quiz.file}`;

            }

        });

    });

}

function loadComics() {

    if (!comicsContainer) return;

    comics.slice(0, 6).forEach(comic => {

        createContentCard({

            container: comicsContainer,

            thumbnail: comic.thumbnail,

            title: comic.title,

            //description: `Episode #${comic.id}`,
            description: comic.description,

            buttonText: "Baca",

            onClick() {

                if (comic.premium) {
                    showPremiumDialog();
                    return;
                }

                location.href =
                    `komik.html?id=${comic.id}`;

            }

        });

    });

}

function loadTTS() {

    if (!ttsContainer) return;

    ttsList.slice(0, 6).forEach(tts => {

        createContentCard({

            container: ttsContainer,

            thumbnail: tts.thumbnail,

            title: tts.title,

            description: `${tts.soal} Soal`,

            buttonText: "Main",

            onClick() {

                if (tts.premium) {
                    showPremiumDialog();
                    return;
                }

                location.href =
                    `tts.html?puzzle=tts${tts.id}`;

            }

        });

    });

}


function loadCases() {

    if (!caseContainer) return;

    cases.slice(0, 6).forEach(caseData => {

        createContentCard({

            container: caseContainer,

            thumbnail: caseData.thumbnail,

            title: caseData.title,

            description: caseData.description,

            buttonText: "Lihat",

            onClick() {

                location.href =
                    `case.html?case=${caseData.file}`;

            }

        });

    });

}

