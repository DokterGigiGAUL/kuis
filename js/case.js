const caseData = {
    image: "assets/cases/images/case1.jpg",
    gender: "Perempuan",
    age: "43 tahun",
    anamnesis: "Pasien datang dengan keluhan luka putih pada mukosa pipi kanan sejak tiga minggu yang lalu. Tidak terasa nyeri.",
    diagnosis: "ORAL LICHEN PLANUS"
};

document.getElementById("case-image").src = caseData.image;
document.getElementById("patient").textContent = `👤 ${caseData.gender}, ${caseData.age}`;
document.getElementById("anamnesis").textContent = caseData.anamnesis;
document.getElementById("diagnosis").textContent = caseData.diagnosis;

document.getElementById("flashcard").addEventListener("click", () => {
    document.getElementById("flashcard").classList.toggle("flipped");
});