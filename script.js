const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

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
window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("moreProjects").addEventListener("click", () => {
  const text = document.getElementById("moreProjectsText");
  text.hidden = !text.hidden;
});


// Certificate viewer
const certModal = document.getElementById("certModal");
const certViewer = document.getElementById("certViewer");
const certTitle = document.getElementById("certModalTitle");
const certProvider = document.getElementById("certModalProvider");
const certOpen = document.getElementById("certModalOpen");

function closeCertificate() {
  certModal.hidden = true;
  certModal.setAttribute("aria-hidden", "true");
  certViewer.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".cert-card").forEach(card => {
  card.addEventListener("click", () => {
    const url = card.dataset.cert;
    certTitle.textContent = card.dataset.title;
    certProvider.textContent = card.dataset.provider;
    certOpen.href = url;
    if (card.dataset.type === "image") {
      certViewer.innerHTML = `<img src="${url}" alt="${card.dataset.title} certificate">`;
    } else {
      certViewer.innerHTML = `<iframe src="${url}" title="${card.dataset.title} certificate viewer"></iframe><div class="cert-fallback">If the certificate website blocks embedded viewing, use <a href="${url}" target="_blank" rel="noopener">Open original ↗</a>.</div>`;
    }
    certModal.hidden = false;
    certModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-close-cert]").forEach(el => el.addEventListener("click", closeCertificate));
document.addEventListener("keydown", e => { if (e.key === "Escape" && !certModal.hidden) closeCertificate(); });
