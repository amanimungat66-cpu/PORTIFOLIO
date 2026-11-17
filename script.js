// =====================================
// MELLOW AX - JAVASCRIPT
// =====================================


// 1. PRELOADER

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 800);

});


// 2. SELECT ELEMENTS

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const allNavLinks = document.querySelectorAll(".nav-link");

const scrollTop = document.getElementById("scrollTop");


// 3. MOBILE NAVIGATION

function closeMenu() {

    menuToggle.classList.remove("active");

    navLinks.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

}

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// Close menu when a navigation link is clicked

allNavLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


// 4. HEADER SCROLL EFFECT

function handleScroll() {

    const currentScroll = window.scrollY;

    if (currentScroll > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

    // Scroll to top button

    if (currentScroll > 400) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

}

window.addEventListener("scroll", handleScroll, {
    passive: true
});


// 5. SCROLL TO TOP

scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// 6. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.12

});

revealElements.forEach(element => {

    revealObserver.observe(element);

});


// 7. ACTIVE NAVIGATION LINKS

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const sectionId = entry.target.id;

            allNavLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + sectionId) {

                    link.classList.add("active");

                }

            });

        }

    });

}, {

    rootMargin: "-35% 0px -55% 0px"

});

sections.forEach(section => {

    sectionObserver.observe(section);

});


// 8. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


// 9. INITIALIZE HEADER STATE

handleScroll();


// 10. CLOSE MENU WHEN SCREEN RESIZES

window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {

        closeMenu();

    }

});


// 11. ESCAPE KEY CLOSES MOBILE MENU

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


// =====================================
// MELLOW AX INITIALIZATION COMPLETE
// =====================================

console.log(
    "%c MELLOW AX ",
    "background: #d6b36a; color: #080808; font-size: 20px; font-weight: bold; padding: 10px;"
);

console.log("Portfolio initialized successfully.");

console.log("Developed by Amani Munga.");

// =====================================
// MELLOW AX - PHASE 2
// PREMIUM INTERACTIONS
// =====================================


// 1. TYPING ANIMATION

const typingElement = document.getElementById("typingText");

const phrases = [
    "Creating Digital Experiences.",
    "Building Smart Applications.",
    "Exploring New Technologies.",
    "Turning Ideas Into Reality."
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function typeEffect() {

    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingElement.textContent =
        currentPhrase.substring(0, characterIndex);

    let speed = deleting ? 35 : 75;

    if (!deleting && characterIndex === currentPhrase.length) {

        deleting = true;
        speed = 1600;

    } else if (deleting && characterIndex === 0) {

        deleting = false;

        phraseIndex = (phraseIndex + 1) % phrases.length;

        speed = 400;

    }

    setTimeout(typeEffect, speed);

}

if (typingElement) {

    if (reducedMotion) {

        typingElement.textContent = phrases[0];

    } else {

        typeEffect();

    }

}


// 2. ANIMATED STATISTICS

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        const duration = 1500;

        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(
                easedProgress * target
            );

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        if (reducedMotion) {

            counter.textContent = target;

        } else {

            requestAnimationFrame(updateCounter);

        }

        observer.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


// 3. PROJECT FILTERING

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {

            item.classList.remove("active");

        });

        button.classList.add("active");

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const matches =
                selectedFilter === "all" ||
                category === selectedFilter;

            card.classList.toggle("hidden", !matches);

        });

    });

});


// 4. GITHUB PROFILE INTEGRATION

const githubUsername = "amanimungat66-cpu";

const githubName = document.getElementById("githubName");

const githubUser = document.getElementById("githubUsername");

const githubBio = document.getElementById("githubBio");

const githubRepos = document.getElementById("githubRepos");

const githubFollowers = document.getElementById("githubFollowers");

const githubAvatar = document.getElementById("githubAvatar");

const githubLink = document.getElementById("githubLink");

const githubStatus = document.getElementById("githubStatus");


async function loadGitHubProfile() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}`
        );

        if (!response.ok) {

            throw new Error("GitHub profile unavailable");

        }

        const user = await response.json();

        githubName.textContent = user.name || user.login;

        githubUser.textContent = "@" + user.login;

        githubBio.textContent =
            user.bio || "Software development and technology.";

        githubRepos.textContent = user.public_repos;

        githubFollowers.textContent = user.followers;

        githubAvatar.textContent = "";

        githubAvatar.style.backgroundImage =
            `url("${user.avatar_url}")`;

        githubAvatar.style.backgroundSize = "cover";

        githubAvatar.style.backgroundPosition = "center";

        githubLink.href = user.html_url;

        githubStatus.textContent =
            "Public GitHub profile connected successfully.";

    } catch (error) {

        githubStatus.textContent =
            "Unable to load GitHub profile. Please try again later.";

        console.error("GitHub error:", error);

    }

}

loadGitHubProfile();


// =====================================
// PHASE 2 INITIALIZATION
// =====================================

console.log("MELLOW AX Phase 2 loaded.");

console.log("Typing animation initialized.");

console.log("Project filters initialized.");

console.log("Statistics initialized.");

console.log("GitHub integration initialized.");

// =====================================
// MELLOW AX - PHASE 3
// =====================================


// 1. ANIMATE TECHNICAL SKILL BARS

const skillBars = document.querySelectorAll(".meter-fill");

const skillObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const bar = entry.target;

            bar.style.width = bar.dataset.width;

            observer.unobserve(bar);

        }

    });

}, {
    threshold: 0.3
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});


// 2. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");


// Replace with your actual email address
const portfolioEmail = "your-email@example.com";


const fields = {

    name: document.getElementById("visitorName"),

    email: document.getElementById("visitorEmail"),

    subject: document.getElementById("visitorSubject"),

    message: document.getElementById("visitorMessage")

};


const errors = {

    name: document.getElementById("nameError"),

    email: document.getElementById("emailError"),

    subject: document.getElementById("subjectError"),

    message: document.getElementById("messageError")

};


// Clear individual errors while typing

Object.keys(fields).forEach(key => {

    fields[key].addEventListener("input", () => {

        errors[key].textContent = "";

        fields[key].removeAttribute("aria-invalid");

        formStatus.textContent = "";

    });

});


// Validate form

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    Object.values(errors).forEach(error => {
        error.textContent = "";
    });

    formStatus.textContent = "";

    let valid = true;

    const name = fields.name.value.trim();

    const email = fields.email.value.trim();

    const subject = fields.subject.value.trim();

    const message = fields.message.value.trim();


    // Name validation

    if (name.length < 2) {

        errors.name.textContent =
            "Please enter a name with at least 2 characters.";

        valid = false;

    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        errors.email.textContent =
            "Please enter a valid email address.";

        valid = false;

    }


    // Subject validation

    if (subject.length < 3) {

        errors.subject.textContent =
            "Please enter a meaningful subject.";

        valid = false;

    }


    // Message validation

    if (message.length < 10) {

        errors.message.textContent =
            "Your message must contain at least 10 characters.";

        valid = false;

    }


    if (!valid) {

        Object.keys(fields).forEach(key => {

            if (errors[key].textContent) {

                fields[key].setAttribute("aria-invalid", "true");

            }

        });

        formStatus.textContent =
            "Please correct the highlighted fields.";

        return;

    }


    // Prepare email

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(

        "Hello Amani,\n\n" +

        message +

        "\n\nFrom: " + name +

        "\nReply email: " + email

    );


    const mailtoLink =
        `mailto:${portfolioEmail}?subject=${emailSubject}&body=${emailBody}`;


    formStatus.textContent =
        "Your email draft is being prepared. Please send it from your email application.";

    window.location.href = mailtoLink;

});


// 3. INITIALIZE PROFILE

console.log("MELLOW AX Phase 3 initialized.");

console.log("Professional profile loaded.");

console.log("Technical dashboard initialized.");

console.log("Contact form validation initialized.");

// PHASE 4: PROJECT DETAILS MODAL

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");

const projectDetailButtons =
    document.querySelectorAll(".project-details-btn");

function closeProjectModal() {
    if (!projectModal) return;

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
}

projectDetailButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!projectModal) return;

        modalTitle.textContent = button.dataset.title || "Project";
        modalDescription.textContent =
            button.dataset.description || "No description available.";
        modalTech.textContent =
            button.dataset.tech || "Not specified";

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");

        modalClose?.focus();
    });
});

modalClose?.addEventListener("click", closeProjectModal);

projectModal?.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});