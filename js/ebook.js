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


const button = clone.querySelector(".ebook-btn");

button.outerHTML = `
<a
    class="btn btn-primary ebook-btn mayar-button iframe-lightbox-link"
    href="${item.mayarUrl}?iframe=true"
    data-padding-bottom="30%"
    data-scrolling="true">
    Beli Sekarang
</a>`;


        ebookList.appendChild(clone);

    });

}


renderEbooks();
