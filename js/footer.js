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


/* =========================================================
   RECENT PROJECTS CAROUSEL
   ========================================================= */

let currentProject = 0;

let carouselTimer;


/* =========================================================
   SHOW PROJECT
   ========================================================= */

function showProject(index) {

    const slides =
        document.querySelectorAll(".carousel-slide");

    const dots =
        document.querySelectorAll(".carousel-dot");


    /*
       If the page doesn't contain a carousel,
       simply stop here.
    */

    if (!slides.length) {
        return;
    }


    /* Loop back to first project */

    if (index >= slides.length) {

        currentProject = 0;

    }


    /* Loop back to last project */

    else if (index < 0) {

        currentProject = slides.length - 1;

    }


    /* Show requested project */

    else {

        currentProject = index;

    }


    /* Remove active state from all slides */

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    /* Remove active state from all dots */

    dots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    /* Activate current slide */

    slides[currentProject].classList.add("active");


    /* Activate current dot */

    if (dots[currentProject]) {

        dots[currentProject].classList.add("active");

    }

}


/* =========================================================
   CHANGE PROJECT
   ========================================================= */

function changeProject(direction) {

    showProject(
        currentProject + direction
    );


    /*
       Reset the automatic carousel timer
       whenever the user manually changes slides.
    */

    startCarousel();

}


/* =========================================================
   AUTOMATIC CAROUSEL
   ========================================================= */

function startCarousel() {

    /*
       Clear any existing timer first.
       This prevents multiple timers running
       at the same time.
    */

    clearInterval(carouselTimer);


    /*
       Change to the next project every 5 seconds.
    */

    carouselTimer = setInterval(function () {

        showProject(
            currentProject + 1
        );

    }, 5000);

}


/* =========================================================
   START AUTOMATIC CAROUSEL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel =
        document.querySelector(".project-carousel");


    /*
       Only start the automatic carousel if
       this page contains a project carousel.
    */

    if (!carousel) {
        return;
    }


    startCarousel();

});