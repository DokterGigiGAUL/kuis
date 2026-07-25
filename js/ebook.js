const ebookList = document.getElementById("ebook-list");
const template = document.getElementById("ebook-card-template");


function renderEbooks(){

    ebookList.innerHTML = "";

    ebooks.forEach(item => {

        const clone = template.content.cloneNode(true);

        clone.querySelector(".content-thumb").src =
            item.thumbnail;

        clone.querySelector(".content-title").textContent =
            item.title;

        clone.querySelector(".content-description").textContent =
            item.description;

        clone.querySelector(".ebook-price").textContent =
            "Rp " + item.price.toLocaleString("id-ID");


        const button =
            clone.querySelector(".ebook-btn");


        button.onclick = () => {

            const link = button;

            link.className =
                "mayar-button iframe-lightbox-link";

            link.href =
                item.mayarUrl + "?iframe=true";

            link.dataset.paddingBottom = "30%";
            link.dataset.scrolling = "true";

            link.click();

        };


        ebookList.appendChild(clone);

    });

}


renderEbooks();
