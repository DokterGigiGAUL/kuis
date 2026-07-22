const params = new URLSearchParams(window.location.search);
const file = params.get("case") || "case1";

const imageFlip = document.getElementById("imageFlip");
const infoFlip = document.getElementById("infoFlip");

fetch(`assets/metadata/kasus/${file}.json`)
    .then(response => response.json())
    .then(data => {

        document.getElementById("case-image").src = data.image;

        document.getElementById("patient").textContent =
            `${data.gender}, ${data.age}`;

        document.getElementById("anamnesis").textContent =
            data.anamnesis;

        document.getElementById("clinicalExamination").textContent =
            data.clinicalExamination;
        
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

<button
    id="premium-btn"
    class="btn btn-primary">
    Buka Premium
</button>
`;
    
document.getElementById("premium-btn").onclick = showPremiumDialog;
    
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

    }
const currentId =
    Number(data.id);

const prevBtn =
    document.getElementById("prev-case");

const nextBtn =
    document.getElementById("next-case");

prevBtn.onclick = () => {

    if (currentId > 1) {

        location.href =
            `case.html?case=case${currentId - 1}`;

    }

};

nextBtn.onclick = () => {

    location.href =
        `case.html?case=case${currentId + 1}`;

};

prevBtn.disabled =
    currentId === 1;

nextBtn.disabled =
    currentId === cases.length;


const backBtn = document.getElementById("backBtn");

if (backBtn) {
    backBtn.onclick = () => {
        window.location.href = "index.html";
    };
}
        
function showDiagnosis(e) {
    e.stopPropagation();

    imageFlip.classList.toggle("flipped");
    infoFlip.classList.toggle("flipped");
}

imageFlip.onclick = showDiagnosis;
infoFlip.onclick = showDiagnosis;

})

.catch(err => console.error(err));
