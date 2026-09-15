/* =========================================
   SIHANA PORTFOLIO — INTERACTIVE JAVASCRIPT
   ========================================= */


/* ---------- SCROLL REVEAL ---------- */

const sections = document.querySelectorAll(".section");

function revealSections() {

    sections.forEach(section => {

        const position = section.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {
            section.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealSections);
revealSections();



/* ---------- MOUSE GLOW ---------- */

const cursorGlow = document.createElement("div");

cursorGlow.style.position = "fixed";
cursorGlow.style.width = "260px";
cursorGlow.style.height = "260px";
cursorGlow.style.borderRadius = "50%";
cursorGlow.style.pointerEvents = "none";
cursorGlow.style.zIndex = "-1";

cursorGlow.style.background =
    "radial-gradient(circle, rgba(192,132,252,0.13), transparent 70%)";

cursorGlow.style.transform =
    "translate(-50%, -50%)";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", function(event) {

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});



/* ---------- PROJECT 3D TILT ---------- */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", function(event) {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            (y - centerY) / 25;

        const rotateY =
            (centerX - x) / 25;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.02)`;

    });


    card.addEventListener("mouseleave", function() {

        card.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

});



/* ---------- CERTIFICATE HOVER ---------- */

const certificates =
    document.querySelectorAll(".certificate-card");


certificates.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.05}s`;

});



/* ---------- AI TALKING TEXT ---------- */

const aiMessages = [

    "Hi! I'm Sihana's AI assistant 👋",

    "Welcome to Sihana's portfolio ✨",

    "She loves coding and building projects 💻",

    "She enjoys participating in hackathons 🚀",

    "Currently learning JavaScript & AWS 🌐",

    "Explore the portfolio and discover her journey ✦"

];

const aiBubble =
    document.querySelector(".ai-bubble");


let messageIndex = 0;


function changeAIMessage() {

    if (!aiBubble) return;

    aiBubble.style.opacity = "0";
    aiBubble.style.transform =
        "translateY(10px)";

    setTimeout(() => {

        aiBubble.innerHTML =
            `<span class="typing-dot">●</span>
             ${aiMessages[messageIndex]}`;

        aiBubble.style.opacity = "1";

        aiBubble.style.transform =
            "translateY(0)";

        messageIndex++;

        if (messageIndex >= aiMessages.length) {
            messageIndex = 0;
        }

    }, 400);

}


setInterval(changeAIMessage, 3500);



/* ---------- AI GIRL BLINK ---------- */

const eyes =
    document.querySelectorAll(".eye");


function blink() {

    eyes.forEach(eye => {

        eye.style.height = "2px";

    });

    setTimeout(() => {

        eyes.forEach(eye => {

            eye.style.height = "7px";

        });

    }, 180);

}


setInterval(blink, 4500);



/* ---------- NAVBAR ACTIVE LINK ---------- */

const navLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", function() {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 250;

        if (window.scrollY >= top) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});



/* ---------- BUTTON RIPPLE ---------- */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(button => {

    button.addEventListener("click", function() {

        button.style.transform =
            "scale(0.96)";

        setTimeout(() => {

            button.style.transform =
                "";

        }, 150);

    });

});



/* ---------- RANDOM FLOATING PARTICLES ---------- */

for (let i = 0; i < 25; i++) {

    const particle =
        document.createElement("div");

    particle.style.position = "fixed";
    particle.style.width = "3px";
    particle.style.height = "3px";

    particle.style.borderRadius = "50%";

    particle.style.background =
        "rgba(216,180,254,0.6)";

    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.top =
        Math.random() * 100 + "vh";

    particle.style.pointerEvents =
        "none";

    particle.style.zIndex =
        "-1";

    particle.style.animation =
        `particleFloat ${4 + Math.random() * 6}s ease-in-out infinite`;

    particle.style.animationDelay =
        Math.random() * 5 + "s";

    document.body.appendChild(particle);

}



/* ---------- PARTICLE ANIMATION ---------- */

const particleStyle =
    document.createElement("style");

particleStyle.innerHTML = `

@keyframes particleFloat {

    0%, 100% {
        transform: translateY(0px);
        opacity: 0.2;
    }

    50% {
        transform: translateY(-40px);
        opacity: 0.8;
    }

}

.ai-bubble {
    transition:
        opacity 0.4s ease,
        transform 0.4s ease;
}

.eye {
    transition: height 0.08s ease;
}

`;

document.head.appendChild(particleStyle);



/* ---------- WELCOME ---------- */

console.log(
    "✨ Welcome to Sihana Fathima A.K.'s Portfolio!"
);

console.log(
    "🚀 Portfolio animations loaded successfully."
);
