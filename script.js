/* =====================================================
   SIHANA PORTFOLIO — CINEMATIC INTERACTIONS
   ===================================================== */


/* ---------- CUSTOM CURSOR ---------- */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {

    if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

    if (cursorRing) {
        cursorRing.style.left = e.clientX + "px";
        cursorRing.style.top = e.clientY + "px";
    }

});


/* ---------- CURSOR HOVER ---------- */

const interactiveElements =
    document.querySelectorAll("a, .project, .certificate, .skill-box");

interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        if (cursorRing) {
            cursorRing.classList.add("cursor-active");
        }

    });

    element.addEventListener("mouseleave", () => {

        if (cursorRing) {
            cursorRing.classList.remove("cursor-active");
        }

    });

});


/* ---------- SCROLL REVEAL ---------- */

const revealElements =
    document.querySelectorAll(
        ".cinematic-section, .project, .certificate, .skill-box, .creative-item"
    );


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ---------- AI TALKING MESSAGES ---------- */

const aiText =
    document.getElementById("aiText");


const messages = [

    "Hi! Welcome to my portfolio 👋",

    "I'm here to introduce Sihana's journey ✨",

    "She's a first-year Computer Science student 💻",

    "She loves programming and problem solving 🧠",

    "She's currently learning JavaScript & AWS 🚀",

    "Check out her projects and certificates!",

    "Thanks for visiting! Keep exploring ✦"

];


let messageIndex = 0;


function typeMessage(message) {

    if (!aiText) return;

    aiText.textContent = "";

    let characterIndex = 0;


    const typingInterval = setInterval(() => {

        aiText.textContent +=
            message.charAt(characterIndex);

        characterIndex++;


        if (characterIndex >= message.length) {

            clearInterval(typingInterval);

        }

    }, 35);

}


function nextAIMessage() {

    if (!aiText) return;

    aiText.style.opacity = "0";


    setTimeout(() => {

        typeMessage(messages[messageIndex]);

        aiText.style.opacity = "1";

        messageIndex++;

        if (messageIndex >= messages.length) {

            messageIndex = 0;

        }

    }, 400);

}


setInterval(nextAIMessage, 4500);


/* ---------- AI GIRL BLINK ---------- */

const aiEyes =
    document.querySelectorAll(
        ".eye-left, .eye-right"
    );


function blinkAI() {

    aiEyes.forEach(eye => {

        eye.style.transform =
            "scaleY(0.15)";

    });


    setTimeout(() => {

        aiEyes.forEach(eye => {

            eye.style.transform =
                "scaleY(1)";

        });

    }, 180);

}


setInterval(blinkAI, 4200);


/* ---------- PARALLAX AI CHARACTER ---------- */

const aiCharacter =
    document.querySelector(".ai-character");


document.addEventListener("mousemove", (e) => {

    if (!aiCharacter) return;


    const x =
        (window.innerWidth / 2 - e.clientX) / 45;

    const y =
        (window.innerHeight / 2 - e.clientY) / 45;


    aiCharacter.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ---------- FLOATING TAG PARALLAX ---------- */

const floatingTags =
    document.querySelectorAll(".floating-tag");


document.addEventListener("mousemove", (e) => {

    const mouseX =
        (e.clientX / window.innerWidth - 0.5);

    const mouseY =
        (e.clientY / window.innerHeight - 0.5);


    floatingTags.forEach((tag, index) => {

        const strength =
            (index + 1) * 8;

        tag.style.transform =
            `translate(
                ${mouseX * strength}px,
                ${mouseY * strength}px
            )`;

    });

});


/* ---------- 3D PROJECT TILT ---------- */

const projects =
    document.querySelectorAll(".project");


projects.forEach(project => {

    project.addEventListener("mousemove", (e) => {

        const rect =
            project.getBoundingClientRect();


        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            (y - centerY) / 25;

        const rotateY =
            (centerX - x) / 25;


        project.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    project.addEventListener("mouseleave", () => {

        project.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

});


/* ---------- CERTIFICATE TILT ---------- */

const certificates =
    document.querySelectorAll(".certificate");


certificates.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect =
            card.getBoundingClientRect();


        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;


        const rotateX =
            (y - rect.height / 2) / 35;

        const rotateY =
            (rect.width / 2 - x) / 35;


        card.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-7px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(700px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* ---------- NAVBAR ACTIVE SECTION ---------- */

const navItems =
    document.querySelectorAll(".navbar nav a");


const pageSections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";


    pageSections.forEach(section => {

        const sectionTop =
            section.offsetTop - 250;


        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* ---------- NAVBAR BACKGROUND ---------- */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) return;


    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ---------- SMOOTH BUTTON PRESS ---------- */

const buttons =
    document.querySelectorAll(
        ".primary-btn, .outline-btn, .resume-button, .big-resume-button"
    );


buttons.forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform =
            "scale(0.96)";

    });


    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

});


/* ---------- FLOATING PARTICLES ---------- */

for (let i = 0; i < 35; i++) {

    const particle =
        document.createElement("span");


    particle.className =
        "floating-particle";


    particle.style.left =
        Math.random() * 100 + "vw";


    particle.style.top =
        Math.random() * 100 + "vh";


    particle.style.animationDelay =
        Math.random() * 8 + "s";


    particle.style.animationDuration =
        5 + Math.random() * 8 + "s";


    document.body.appendChild(particle);

}


/* ---------- DYNAMIC PARTICLE STYLE ---------- */

const particleStyle =
    document.createElement("style");


particleStyle.textContent = `

.floating-particle {

    position: fixed;

    width: 3px;
    height: 3px;

    border-radius: 50%;

    background: rgba(216,180,254,0.65);

    pointer-events: none;

    z-index: -1;

    animation:
        particleMove
        linear
        infinite;

}


@keyframes particleMove {

    0% {

        transform:
            translateY(30px)
            scale(0.5);

        opacity: 0;

    }


    25% {

        opacity: 0.8;

    }


    75% {

        opacity: 0.5;

    }


    100% {

        transform:
            translateY(-120px)
            scale(1.2);

        opacity: 0;

    }

}


.cinematic-section,
.project,
.certificate,
.skill-box,
.creative-item {

    opacity: 0;

    transform:
        translateY(45px);

    transition:
        opacity 0.8s ease,
        transform 0.8s ease;

}


.cinematic-section.visible,
.project.visible,
.certificate.visible,
.skill-box.visible,
.creative-item.visible {

    opacity: 1;

    transform:
        translateY(0);

}


.ai-text,
#aiText {

    transition:
        opacity 0.4s ease;

}


.eye-left,
.eye-right {

    transform-origin: center;

    transition:
        transform 0.08s ease;

}


.navbar.scrolled {

    background:
        rgba(5,5,12,0.92);

    box-shadow:
        0 10px 40px
        rgba(0,0,0,0.35);

}


.cursor-active {

    transform:
        translate(-50%, -50%)
        scale(1.7);

}

`;


document.head.appendChild(particleStyle);


/* ---------- CONSOLE ---------- */

console.log(
    "✨ Sihana's cinematic portfolio loaded!"
);

console.log(
    "🚀 Interactive AI portfolio experience ready."
);
