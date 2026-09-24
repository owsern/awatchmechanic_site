/* =========================================================
   A WATCH MECHANIC
   Recent Projects Carousel
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".carousel-slide");

    console.log("Carousel found:", slides.length);

    if (slides.length === 0) {
        console.log("No carousel slides found.");
        return;
    }

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

        console.log("Showing slide:", index);
    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    showSlide(0);

    setInterval(nextSlide, 5000);

});