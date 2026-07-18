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

const premium =
    data.premiumContent;

if (!data.premium) {

    document.getElementById("pathophysiology").textContent =
        premium.pathophysiology;

    document.getElementById("supporting-examination").textContent =
        premium.supportingExamination;

    document.getElementById("treatment-plan").textContent =
        premium.treatmentPlan;

    document.getElementById("follow-up").textContent =
        premium.followUp;

    const ul =
        document.getElementById("key-points");

    premium.keyPoints.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        ul.appendChild(li);

    });

} else {

    document.getElementById("pathophysiology").innerHTML =
        `<div class="premium-hidden">
            🔒 Konten Premium
        </div>`;

    document.getElementById("supporting-examination").innerHTML =
        `<div class="premium-hidden">
            🔒 Konten Premium
        </div>`;

    document.getElementById("treatment-plan").innerHTML =
        `<div class="premium-hidden">
            🔒 Konten Premium
        </div>`;

    document.getElementById("follow-up").innerHTML =
        `<div class="premium-hidden">
            🔒 Konten Premium
        </div>`;

    document.getElementById("key-points").innerHTML =
        `<div class="premium-hidden">
            🔒 Konten Premium
        </div>`;

}

    });

flashcard.onclick = () => {
    flashcard.classList.toggle("flipped");
};
