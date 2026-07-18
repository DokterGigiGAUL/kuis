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

    const banner =
    document.getElementById("premium-banner");

banner.style.display = "block";

banner.innerHTML = `
<h3>🔒 Konten Premium</h3>

<p>
Buka akses Premium untuk mempelajari:
</p>

<ul>

<li>Patofisiologi</li>

<li>Pemeriksaan Penunjang</li>

<li>Rencana Perawatan</li>

<li>Follow Up</li>

<li>Key Points</li>

</ul>

<button class="btn btn-primary">

Buka Premium

</button>
`;

document.getElementById("pathophysiology").parentElement.style.display =
    "none";

document.getElementById("supporting-examination").parentElement.style.display =
    "none";

document.getElementById("treatment-plan").parentElement.style.display =
    "none";

document.getElementById("follow-up").parentElement.style.display =
    "none";

document.getElementById("key-points").parentElement.style.display =
    "none";
    });

    }

flashcard.onclick = () => {
    flashcard.classList.toggle("flipped");
};

})
.catch(err => console.error(err));
