/* =========================================================
   A WATCH MECHANIC
   Footer + Gallery Lightbox JavaScript
   ========================================================= */


/* =========================================================
   LOAD FOOTER
   ========================================================= */

fetch("footer.html")

    .then(response => response.text())

    .then(data => {

        const footer = document.getElementById("footer");

        if (footer) {
            footer.innerHTML = data;
        }

    })

    .catch(error => {

        console.error("Error loading footer:", error);

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

    /* Stop the link from opening the image as a new page */

    event.preventDefault();


    /* Find the lightbox elements */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");


    /* Make sure the lightbox exists */

    if (!lightbox) {
        return;
    }


    /* Set the main enlarged image */

    lightboxImage.src = image;


    /* Set the title */

    lightboxTitle.textContent = title;


    /* Start building the description */

    let description = `
        <p>${paragraph1}</p>
    `;


    /* Add the additional image if one has been supplied */

    if (additionalImage) {

        description += `
            <img
                src="${additionalImage}"
                class="lightbox-story-image"
                alt="${title}"
            >
        `;

    }


    /* Add the remaining paragraphs */

    description += `
        <p>${paragraph2}</p>
        <p>${paragraph3}</p>
    `;


    /* Insert the content */

    lightboxDescription.innerHTML = description;


    /* Show the lightbox */

    lightbox.classList.add("active");


    /* Prevent the page underneath from scrolling */

    document.body.classList.add("lightbox-open");

}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    const lightbox = document.getElementById("lightbox");


    /* Do nothing if there is no lightbox on the page */

    if (!lightbox) {
        return;
    }


    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");


    /* Hide the lightbox */

    lightbox.classList.remove("active");


    /* Allow the page to scroll again */

    document.body.classList.remove("lightbox-open");


    /* Clear the content */

    lightboxImage.src = "";

    lightboxTitle.textContent = "";

    lightboxDescription.innerHTML = "";

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        document.getElementById("lightbox")
    ) {

        closeLightbox();

    }

});