const params = new URLSearchParams(window.location.search);
const file = params.get("case") || "case1";
const imageFlip = document.getElementById("imageFlip");
const infoFlip = document.getElementById("infoFlip");

fetch(`assets/metadata/kasus/${file}.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Gagal memuat data kasus: ${file}.json`);
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("case-image").src = data.image;
    document.getElementById("case-image-back").src = data.image;

    // Perbaikan: template literal harus pakai backtick, tanpa spasi setelah $
    document.getElementById("patient").textContent = `${data.gender}, ${data.age}`;

    document.getElementById("anamnesis").textContent = data.anamnesis;
    document.getElementById("clinicalExaminations").textContent = data.clinicalExaminations;
    document.getElementById("diagnosis").textContent = data.diagnosis;

    const ddList = document.getElementById("dd-list");
    data.differentialDiagnosis.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ddList.appendChild(li);
    });
const clinicalList = document.getElementById("clinical-list");

data.clinicalExamination.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  clinicalList.appendChild(li);
});
    
    document.getElementById("lesion-description").textContent = data.lesionDescription;

const premium = data.premiumContent;
    const caseMeta = cases.find(c => c.file === file);
/*
const hasAccess =
    !data.premium ||
    userHasPremium() ||
    (caseMeta && Premium.ownsProduct(caseMeta.productId));
*/
const hasAccess = caseMeta
    ? PurchaseManager.hasAccess(caseMeta)
    : !data.premium;
if (hasAccess) {
      // Kasus gratis: tampilkan konten premium apa adanya
      document.getElementById("pathophysiology").textContent = premium.pathophysiology;
      document.getElementById("supporting-examination").textContent = premium.supportingExamination;
      document.getElementById("treatment-plan").textContent = premium.treatmentPlan;
      document.getElementById("follow-up").textContent = premium.followUp;

      const ul = document.getElementById("key-points");
      premium.keyPoints.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
    } else {

          // Kasus premium terkunci: tampilkan banner
          const banner = document.getElementById("premium-banner");
      banner.style.display = "block";

      // Perbaikan: HTML harus berupa string (template literal), bukan tag mentah
      banner.innerHTML = `
        <h3>🔒 Konten Premium</h3>
        <p>Buka akses Premium untuk mempelajari:</p>
        <ul>
          <li>Patofisiologi</li>
          <li>Pemeriksaan Penunjang</li>
          <li>Rencana Perawatan</li>
          <li>Follow Up</li>
          <li>Key Points</li>
        </ul>
        <button id="premium-btn" class="btn btn-primary">Buka Premium</button>
      `;

document.getElementById("premium-btn").onclick = () => {
    showPremiumDialog(caseMeta.productId);
};
      document.getElementById("pathophysiology").parentElement.style.display = "none";
      document.getElementById("supporting-examination").parentElement.style.display = "none";
      document.getElementById("treatment-plan").parentElement.style.display = "none";
      document.getElementById("follow-up").parentElement.style.display = "none";
      document.getElementById("key-points").parentElement.style.display = "none";
    }

    const currentId = Number(data.id);
    const prevBtns = document.querySelectorAll(".prev-case");
    const nextBtns = document.querySelectorAll(".next-case");

    // Perbaikan: navigasi harus membentuk URL string yang valid, bukan ekspresi "case.html ? case = ..."
    prevBtns.forEach(btn => {
  btn.onclick = (e) => {
    e.stopPropagation();

    if (currentId > 1) {
      location.href = `case.html?case=case${currentId - 1}`;
    }
  };

  btn.disabled = currentId === 1;
});

nextBtns.forEach(btn => {
  btn.onclick = (e) => {
    e.stopPropagation();

    location.href = `case.html?case=case${currentId + 1}`;
  };

  btn.disabled = currentId === cases.length;
});

    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
      backBtn.onclick = () => {
        window.location.href = "index.html";
      };
    }
  })
  .catch(err => console.error(err));

// Perbaikan: fungsi & event listener flip dipindah keluar dari promise chain,
// karena sebelumnya diselipkan di antara .then() dan .catch() sehingga merusak chain
function showDiagnosis(e) {
  e.stopPropagation();
  imageFlip.classList.toggle("flipped");
  infoFlip.classList.toggle("flipped");
}
imageFlip.onclick = showDiagnosis;
infoFlip.onclick = showDiagnosis;
