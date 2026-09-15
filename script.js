// Hero Animation
gsap.from(".hero h1", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power3.out"
});

gsap.from(".hero p", {
  duration: 1.5,
  y: 30,
  opacity: 0,
  delay: 0.3,
  ease: "power3.out"
});


// Scroll Animation
gsap.registerPlugin(ScrollTrigger);

// Projects
gsap.from(".project-card", {
  scrollTrigger: ".projects",
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out"
});


// Toolkit
gsap.from(".toolkit-words span", {
  scrollTrigger: ".toolkit",
  y: 50,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out"
});


// Certificates
gsap.from(".certificate-card", {
  scrollTrigger: ".certificates",
  y: 100,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out"
});


// Resume
gsap.from(".resume", {
  scrollTrigger: ".resume",
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});


// Contact
gsap.from(".contact", {
  scrollTrigger: ".contact",
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});
