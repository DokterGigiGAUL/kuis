const params = new URLSearchParams(window.location.search);
const file = params.get("case") || "case1";

const flashcard = document.getElementById("flashcard");

fetch(`assets/cases/${file}.json`)
    .then(response => response.json())
    .then(data => {

        document.getElementById("case-image").src = data.image;

        document.getElementById("patient").textContent =
            `${data.gender}, ${data.age}`;

        document.getElementById("anamnesis").textContent =
            data.anamnesis;

        document.getElementById("diagnosis").textContent =
            data.diagnosis;

    });

flashcard.onclick = () => {
    flashcard.classList.toggle("flipped");
};
