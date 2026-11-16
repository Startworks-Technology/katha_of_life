// FAQ page: WhatsApp links, mobile menu, footer year. Settings come from courses.js.
document.querySelectorAll(".js-whatsapp").forEach((a) => {
  a.href = waLink(a.dataset.msg || `Hi ${EXPERT}!`);
  a.target = "_blank";
  a.rel = "noopener";
});
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
document.getElementById("year").textContent = new Date().getFullYear();
