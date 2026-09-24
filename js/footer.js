/* =========================================================
   A WATCH MECHANIC
   Footer + Gallery Lightbox + Project Carousel JavaScript
   ========================================================= */


/* =========================================================
   LOAD FOOTER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footer = document.getElementById("footer");

    if (!footer) {
        return;
    }


    /*
       Project pages are inside /projects/
       All other pages are in the website root.
    */

    const footerPath = window.location.pathname.includes("/projects/")
        ? "../footer.html"
        : "footer.html";


    fetch(footerPath)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Could not load footer: " +
                    response.status + " " +
                    response.statusText
                );

            }

            return response.text();

        })

        .then(data => {

            footer.innerHTML = data;

        })

        .catch(error => {

            console.error("Footer loading error:", error);

            footer.innerHTML = `
                <p>Unable to load footer.</p>
            `;

        });

});


/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

function openLightbox(
    event,
    image,
    title,
    paragraph1,
    paragraph2,
    paragraph3,
    additionalImage
) {

    event.preventDefault();

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxTitle =
        document.getElementById("lightbox-title");

    const lightboxDescription =
        document.getElementById("lightbox-description");


    if (!lightbox) {
        return;
    }


    lightboxImage.src = image;

    lightboxImage.alt = title;

    lightboxTitle.textContent = title;


    let description = "";


    /* First paragraph */

    if (paragraph1) {

        description += `
            <p>${paragraph1}</p>
        `;

    }


    /* Additional story image */

    if (additionalImage) {

        description += `
            <img
                src="${additionalImage}"
                class="lightbox-story-image"
                alt="${title} restoration detail"
            >
        `;

    }


    /* Second paragraph */

    if (paragraph2) {

        description += `
            <p>${paragraph2}</p>
        `;

    }


    /* Third paragraph */

    if (paragraph3) {

        description += `
            <p>${paragraph3}</p>
        `;

    }


    lightboxDescription.innerHTML = description;


    lightbox.classList.add("active");

    document.body.classList.add("lightbox-open");

}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) {
        return;
    }


    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxTitle =
        document.getElementById("lightbox-title");

    const lightboxDescription =
        document.getElementById("lightbox-description");


    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");


    lightboxImage.src = "";

    lightboxImage.alt = "";

    lightboxTitle.textContent = "";

    lightboxDescription.innerHTML = "";

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const lightbox =
            document.getElementById("lightbox");


        if (
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    }

});