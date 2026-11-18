const revealedElements = new WeakSet();
let portfolioRevealObserver;

window.refreshPortfolioReveals = () => {
  const revealItems = document.querySelectorAll(
    ".reveal-item, .skill-category",
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  revealItems.forEach((element, index) => {
    if (revealedElements.has(element)) return;
    revealedElements.add(element);
    element.classList.add("reveal-item");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    if (!portfolioRevealObserver) {
      portfolioRevealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );
    }

    portfolioRevealObserver.observe(element);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Buka navigasi" : "Tutup navigasi",
      );
      navMenu.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  window.refreshPortfolioReveals();

  const sections = document.querySelectorAll(".section[id]");
  if (!sections.length) return;

  const navLinks = document.querySelectorAll(".nav-link");
  const updateActiveLink = () => {
    const currentSection = [...sections]
      .filter((section) => section.getBoundingClientRect().top <= 120)
      .at(-1);
    if (!currentSection) return;

    navLinks.forEach((link) => {
      const target = new URL(link.href, window.location.href);
      const isActive =
        target.pathname === window.location.pathname &&
        target.hash === `#${currentSection.id}`;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
});
