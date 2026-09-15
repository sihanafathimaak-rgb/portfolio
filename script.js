// ===============================
// PORTFOLIO INTERACTIONS
// ===============================

// Reveal sections while scrolling
const sections = document.querySelectorAll(".section");

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// ===============================
// MOUSE GLOW EFFECT
// ===============================

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "250px";
glow.style.height = "250px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
    "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "-1";

document.body.appendChild(glow);

document.addEventListener("mousemove", (event) => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
});


// ===============================
// PROJECT CARD TILT EFFECT
// ===============================

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    });

});


// ===============================
// NAVBAR ACTIVE LINK
// ===============================

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// ===============================
// WELCOME MESSAGE
// ===============================

console.log("Welcome to Sihana's Portfolio 🚀");
