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

const ddList =
    document.getElementById("dd-list");

data.differentialDiagnosis.forEach(item => {

    const li = document.createElement("li");
    li.textContent = item;
    ddList.appendChild(li);

});

document.getElementById("lesion-description").textContent =
    data.lesionDescription;

const clinicalList =
    document.getElementById("clinical-list");

data.clinicalExamination.forEach(item => {

    const li = document.createElement("li");
    li.textContent = item;
    clinicalList.appendChild(li);

});

    });

flashcard.onclick = () => {
    flashcard.classList.toggle("flipped");
};
