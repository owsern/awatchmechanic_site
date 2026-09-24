fetch("../navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load navbar");
        }

        return response.text();
    })
    .then(data => {

        const navbar = document.getElementById("navbar");

        navbar.innerHTML = data;

        // Adjust navbar links for pages inside /projects/
        navbar.querySelectorAll("a").forEach(link => {

            const href = link.getAttribute("href");

            link.setAttribute("href", "../" + href);

        });

    })
    .catch(error => {
        console.error("Error loading project navbar:", error);
    });