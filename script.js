const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("pointermove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* =========================================
   ADD PROJECT MODAL
   ========================================= */
const addProjectBtn = document.getElementById("addProjectBtn");
const projectModal = document.getElementById("projectModal");
const closeProjectModal = document.getElementById("closeProjectModal");
const cancelProject = document.getElementById("cancelProject");
const projectForm = document.getElementById("projectForm");

function openProjectPopup() {
  if (!projectModal) return;
  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("projectName")?.focus(), 100);
}

function closeProjectPopup() {
  if (!projectModal) return;
  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

addProjectBtn?.addEventListener("click", openProjectPopup);
closeProjectModal?.addEventListener("click", closeProjectPopup);
cancelProject?.addEventListener("click", closeProjectPopup);

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectPopup();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal?.classList.contains("active")) {
    closeProjectPopup();
  }
});

/* Show selected file names */
const projectImage = document.getElementById("projectImage");
const projectVideo = document.getElementById("projectVideo");
const projectImageName = document.getElementById("projectImageName");
const projectVideoName = document.getElementById("projectVideoName");

projectImage?.addEventListener("change", () => {
  if (projectImageName) {
    projectImageName.textContent = projectImage.files[0]?.name || "";
  }
});

projectVideo?.addEventListener("change", () => {
  if (projectVideoName) {
    projectVideoName.textContent = projectVideo.files[0]?.name || "";
  }
});

/* Form is currently a UI preview only */
projectForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Project details are ready! 🚀\n\nPermanent project publishing will be added later.");
});
