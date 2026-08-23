/* =========================================================
   A&M GLOBAL TOURS
   Main Website JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       CURRENT YEAR
    ----------------------------------------------------- */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* -----------------------------------------------------
       SMOOTH SCROLLING
    ----------------------------------------------------- */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* -----------------------------------------------------
       SUBSCRIBER FORM
       
       IMPORTANT:
       This currently DOES NOT save data to a database.
       Firebase will be connected in the next step.
    ----------------------------------------------------- */

    const subscribeForm = document.getElementById(
        "subscribeForm"
    );

    const subscribeMessage = document.getElementById(
        "subscribeMessage"
    );


    if (subscribeForm) {

        subscribeForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name = document
                    .getElementById("subscriberName")
                    .value
                    .trim();

                const email = document
                    .getElementById("subscriberEmail")
                    .value
                    .trim();

                const phone = document
                    .getElementById("subscriberPhone")
                    .value
                    .trim();


                /* Basic validation */

                if (!name || !email) {

                    showSubscribeMessage(
                        "Please enter your name and email address.",
                        "error"
                    );

                    return;
                }


                /* Email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    showSubscribeMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                /*
                 * TEMPORARY:
                 * We are not sending the data anywhere yet.
                 *
                 * Firebase Firestore will be added next.
                 */

                console.log("Subscriber information:", {
                    name: name,
                    email: email,
                    phone: phone
                });


                showSubscribeMessage(
                    "Thank you for subscribing! We'll keep you updated on our latest tours and travel offers.",
                    "success"
                );


                /* Clear form */

                subscribeForm.reset();
            }
        );
    }


    /* -----------------------------------------------------
       SUBSCRIBER MESSAGE HELPER
    ----------------------------------------------------- */

    function showSubscribeMessage(message, type) {

        if (!subscribeMessage) {
            return;
        }

        subscribeMessage.textContent = message;

        if (type === "success") {

            subscribeMessage.style.color = "#16803c";

        } else {

            subscribeMessage.style.color = "#c62828";
        }
    }


    /* -----------------------------------------------------
       ACTIVE NAVIGATION
    ----------------------------------------------------- */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".main-nav a"
    );


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }
        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");

            if (
                currentSection &&
                linkTarget === "#" + currentSection
            ) {
                link.classList.add("active");
            }

            if (
                !currentSection &&
                linkTarget === "index.html"
            ) {
                link.classList.add("active");
            }
        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* Run once when page loads */

    updateActiveNavigation();


    /* -----------------------------------------------------
       IMAGE FALLBACK
       
       If a travel image doesn't exist, the card will
       still have a nice background instead of looking broken.
    ----------------------------------------------------- */

    const imageElements = document.querySelectorAll(
        "img"
    );

    imageElements.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                this.style.display = "none";
            }
        );
    });


    /* -----------------------------------------------------
       BUTTON CLICK FEEDBACK
    ----------------------------------------------------- */

    const buttons = document.querySelectorAll(
        ".btn"
    );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                this.classList.add("button-clicked");

                setTimeout(
                    () => {
                        this.classList.remove(
                            "button-clicked"
                        );
                    },
                    250
                );
            }
        );
    });


    /* -----------------------------------------------------
       CONSOLE MESSAGE
    ----------------------------------------------------- */

    console.log(
        "A&M Global Tours website loaded successfully."
    );

});
