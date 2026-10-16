/* Shared behavior: navigation, theme, subtle motion, project filters, and accessible fallbacks. */
(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.querySelector(".page-loader");
  const hideLoader = () => window.setTimeout(() => loader?.classList.add("is-loaded"), 160);

  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 1600);

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const storedTheme = localStorage.getItem("sihana-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    document.documentElement.dataset.theme = storedTheme;
  }

  const themeButton = document.querySelector(".theme-toggle");
  const updateThemeButton = () => {
    const light = document.documentElement.dataset.theme === "light";
    if (!themeButton) return;
    themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    const icon = themeButton.querySelector(".theme-icon");
    if (icon) icon.textContent = light ? "☾" : "☼";
  };
  updateThemeButton();
  themeButton?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("sihana-theme", nextTheme);
    updateThemeButton();
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    navLinks?.classList.remove("is-open");
  };
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks?.classList.toggle("is-open", !isOpen);
  });
  navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.querySelectorAll(".profile-photo").forEach((image) => {
    const showFallback = () => {
      image.hidden = true;
    };
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) showFallback();
  });

  const progress = document.querySelector(".scroll-progress");
  const header = document.querySelector(".site-header");
  let scrollQueued = false;
  const updateScroll = () => {
    scrollQueued = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", () => {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();

  const glow = document.querySelector(".cursor-glow");
  if (glow && !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const typing = document.querySelector("[data-typing]");
  if (typing && !reducedMotion) {
    const phrases = typing.dataset.typing.split("|");
    let phrase = 0;
    let position = phrases[0].length;
    let deleting = true;
    const type = () => {
      const current = phrases[phrase];
      if (deleting) {
        position -= 1;
        typing.textContent = current.slice(0, position);
        if (position === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          window.setTimeout(type, 350);
          return;
        }
        window.setTimeout(type, 38);
      } else {
        const next = phrases[phrase];
        position += 1;
        typing.textContent = next.slice(0, position);
        if (position === next.length) {
          deleting = true;
          window.setTimeout(type, 1700);
          return;
        }
        window.setTimeout(type, 68);
      }
    };
    window.setTimeout(type, 1500);
  }

  const counters = [...document.querySelectorAll("[data-count]")];
  const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;
    if (reducedMotion) {
      element.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 950;
    const step = (now) => {
      const amount = Math.min((now - start) / duration, 1);
      element.textContent = String(Math.round(target * (1 - (1 - amount) ** 3)));
      if (amount < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => animateCounter(counter));
  }

  const skillBars = [...document.querySelectorAll(".skill-track > span[data-progress]")];
  const revealBar = (bar) => {
    const amount = Math.max(0, Math.min(100, Number(bar.dataset.progress)));
    bar.style.setProperty("--progress", `${amount}%`);
    bar.classList.add("is-visible");
  };
  if (skillBars.length && "IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach((bar) => skillObserver.observe(bar));
  } else {
    skillBars.forEach(revealBar);
  }

  const filters = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".projects-grid [data-category]");
  const projectCount = document.querySelector(".project-count");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      let visible = 0;
      filters.forEach((filter) => {
        const selected = filter === button;
        filter.classList.toggle("is-active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      projectCards.forEach((card) => {
        const show = category === "all" || card.dataset.category === category;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (projectCount) projectCount.textContent = `Showing ${visible} ${visible === 1 ? "project" : "projects"}`;
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  });

  document.querySelectorAll(".placeholder-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  if (!reducedMotion && window.AOS) {
    document.documentElement.classList.add("aos-ready");
    window.AOS.init({ duration: 650, easing: "ease-out-cubic", once: true, offset: 45, disable: reducedMotion });
  }

  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.utils.toArray(".project-card").forEach((card) => {
      window.gsap.fromTo(card, { y: 18 }, {
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 92%", once: true }
      });
    });
  }

  if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.transform = `perspective(850px) rotateX(${-y * 3.5}deg) rotateY(${x * 3.5}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || link.target || reducedMotion) return;
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      if (document.body.classList.contains("page-leaving")) return;
      document.body.classList.add("page-leaving");
      window.setTimeout(() => window.location.assign(destination.href), 230);
    });
  });
})();
