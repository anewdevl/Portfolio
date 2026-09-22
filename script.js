document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const savedTheme = localStorage.getItem("theme") || "dark";

  body.setAttribute("data-theme", savedTheme);
  syncThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
    body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    syncThemeIcon(nextTheme);
  });

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

  function syncThemeIcon(theme) {
    themeToggle.querySelector("i").className = theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".project-card, .skill-card, .cert-card, .timeline-card, .stat-card, .mini-card, .profile-card").forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  const backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backToTop);

  const updateBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 380);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
