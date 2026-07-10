const container =
    document.getElementById("tts-list");

const template =
    document.getElementById("tts-card-template");

for (const tts of ttsList) {

    const card =
        template.content.cloneNode(true);

    card.querySelector(".tts-thumb").src =
        tts.thumb;

    card.querySelector(".tts-thumb").alt =
        tts.title;

    card.querySelector(".tts-title").textContent =
        tts.title;

    card.querySelector(".tts-description").textContent =
        tts.description;

    card.querySelector(".tts-soal").textContent =
        `${tts.soal} Soal`;

    card.querySelector(".tts-btn").onclick = () => {

        location.href =
            `assets/tts/tts${tts.id}.html`;

    };

    container.appendChild(card);

}
