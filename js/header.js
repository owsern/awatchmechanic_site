const isProjectPage = window.location.pathname.includes("/projects/");

const headerPath = isProjectPage
    ? "../header.html"
    : "header.html";

fetch(headerPath)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load header");
        }

        return response.text();
    })
    .then(data => {
        document.getElementById("header").innerHTML = data;
    })
    .catch(error => {
        console.error("Header error:", error);

        document.getElementById("header").innerHTML =
            "<p>Unable to load header.</p>";
    });