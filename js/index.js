function renderFeaturedHero() {

    if (!featuredHero) return;

    const latestPremiumItems = [
        ...quizzes,
        ...comics,
        ...ttsList,
        ...cases
    ]
    .filter(item => item.premium)
    .sort(
        (a, b) =>
            new Date(b.releaseDate) -
            new Date(a.releaseDate)
    );

    const heroItem = latestPremiumItems[0];

    if (!heroItem) return;

    const urlBg =
        "https://doktergigigaul.github.io/kuis/assets/images/premium-bg.jpeg";

    featuredHero.style.backgroundImage =
        `url(${urlBg})`;

    const badge =
        featuredHero.querySelector(".featured-badge");

    const title =
        featuredHero.querySelector(".featured-title");

    const description =
        featuredHero.querySelector(".featured-description");

    const button =
        featuredHero.querySelector(".featured-btn");

    const catalogButton =
        featuredHero.querySelector(
            ".featured-catalog-btn"
        );

    badge.textContent =
        PurchaseManager.hasAccess(heroItem)
            ? "🟢 Akses permanen"
            : "👑 Premium";

    title.textContent =
        heroItem.title;

    description.textContent =
        heroItem.description;

    button.textContent =
        "🔒 Buka";

    button.onclick = () => {

        if (!PurchaseManager.hasAccess(heroItem)) {
            showPremiumDialog(
                heroItem.productId
            );
            return;
        }

        switch (heroItem.type) {

            case "quiz":
                location.href =
                    `quiz.html?id=${heroItem.file}`;
                break;

            case "comic":
                location.href =
                    `komik.html?id=${heroItem.id}`;
                break;

            case "tts":
                location.href =
                    `tts.html?puzzle=tts${heroItem.id}`;
                break;

            case "case":
                location.href =
                    `case.html?case=${heroItem.file}`;
                break;
        }
    };

    catalogButton.onclick = () => {
        location.href =
            "premium-catalogue.html";
    };
}
