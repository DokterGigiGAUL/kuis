const quizList = document.getElementById("quiz-list");
const comicsContainer = document.getElementById("comics-container");
const ttsContainer = document.getElementById("tts-container");
const caseContainer = document.getElementById("case-container");
const featuredHero = document.getElementById("featured-hero");
const featuredLatest = document.getElementById("featured-latest");
const featuredCardTemplate = document.getElementById("featured-card-template");
const cardTemplate = document.getElementById("content-card-template");

loadQuiz();
loadComics();
loadTTS();
loadCases();
renderFeaturedHero();

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

function renderFeaturedHero() {

    if (!featuredHero) return;

    const latestItems = [
    ...quizzes,
    ...comics,
    ...ttsList,
    ...cases
].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

const heroItem = latestItems[0];
const latestCards = latestItems.slice(1, 5);

if (!heroItem) return;

    featuredHero.style.backgroundImage = `url(${heroItem.thumbnail})`;

    const badge = featuredHero.querySelector(".featured-badge");
    const title = featuredHero.querySelector(".featured-title");
    const description = featuredHero.querySelector(".featured-description");
    const button = featuredHero.querySelector(".featured-btn");

    const typeLabel = {
        quiz: "Kuis",
        comic: "Komik",
        tts: "TTS",
        case: "Kartu Kasus"
    };

    const buttonLabel = {
        quiz: "Mulai",
        comic: "Baca",
        tts: "Main",
        case: "Lihat"
    };

    badge.textContent = typeLabel[heroItem.type] ?? "";
    title.textContent = heroItem.title;
    description.textContent = heroItem.description;
    button.textContent = buttonLabel[heroItem.type] ?? "Buka";
    button.onclick = () => {

if (heroItem.premium) {
            showPremiumDialog();
            return;
        }

switch (heroItem.type) {

            case "quiz":
                location.href = `quiz.html?id=${item.id}`;
                break;

            case "comic":
                location.href = `komik.html?id=${item.id}`;
                break;

            case "tts":
                location.href = `tts.html?puzzle=tts${item.id}`;
                break;

            case "case":
                location.href = `case.html?case=${item.file}`;
                break;

        }

    };
featuredLatest.innerHTML = "";

latestCards.forEach(item => {

    const clone = featuredCardTemplate.content.cloneNode(true);

    clone.querySelector(".featured-card-thumb").src = item.thumbnail;
    clone.querySelector(".featured-card-thumb").alt = item.title;

    clone.querySelector(".featured-card-title").textContent = item.title;
const featuredButton = clone.querySelector(".featured-card-btn");

featuredButton.textContent = ({
    quiz: "Mulai",
    comic: "Baca",
    tts: "Main",
    case: "Lihat"
})[item.type] ?? "Buka";
    clone.querySelector(".featured-card-type").textContent = ({
        quiz: "Kuis",
        comic: "Komik",
        tts: "TTS",
        case: "Kartu Kasus"
    })[item.type];

const card = clone.querySelector(".featured-card");

const openContent = () => {

    if (item.premium) {
        showPremiumDialog();
        return;
    }

    switch (item.type) {

        case "quiz":
            location.href = `quiz.html?id=${item.id}`;
            break;

        case "comic":
            location.href = `komik.html?id=${item.id}`;
            break;

        case "tts":
            location.href = `tts.html?puzzle=tts${item.id}`;
            break;

        case "case":
            location.href = `case.html?case=${item.id}`;
            break;

    }

};

card.onclick = openContent;
featuredButton.onclick = (e) => {
    e.stopPropagation();
    openContent();
};

    featuredLatest.appendChild(clone);

});
}
