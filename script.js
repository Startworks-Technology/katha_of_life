// Home page script. Settings and the course list live in courses.js.

// =====================================================
//  FEEDBACK: sample feedback, replace with real ones
// =====================================================
const FEEDBACK = [
  { name: "Priya R.", meta: "First-time mother", course: "Labour Management", text: "The labour management classes took away so much of my fear. I knew what each stage of labour would feel like and what to ask for. My husband felt involved and confident too." },
  { name: "Ananya S.", meta: "First-time mother", course: "Breastfeeding", text: "I was struggling with latch and pain in the first week. Dr. Monica's breastfeeding guidance made it so much easier. I'm so thankful I found her." },
  { name: "Kavya M.", meta: "Mother of two", course: "Early Pregnancy", text: "The early pregnancy session answered every question I had, from scans to diet to what I should avoid. I felt calm and prepared." },
  { name: "Divya K.", meta: "Working mother", course: "Breastfeeding", text: "The pumping and milk storage part made going back to work so much easier. Practical, kind and always available on WhatsApp when I had doubts." },
  { name: "Meera & Karthik", meta: "New parents", course: "Labour + Breastfeeding", text: "We did the 3-day programme together. As a husband I finally knew how to support her in labour and with feeding. Classes in Telugu made it easy for our family too." },
];

// ----- Courses (cards link to their own page: course.html?c=...) -----
const grid = document.getElementById("course-grid");
function renderCourses(filter) {
  const list = filter === "all" ? COURSES : COURSES.filter((c) => c.stage === filter);
  grid.innerHTML = list.map((c, i) => `
    <a class="course${c.featured ? " course--featured" : ""}" href="${courseUrl(c)}" style="animation-delay:${i * 60}ms">
      <div class="course__media">
        <img class="course__img" src="${c.image}" alt="" loading="lazy" width="800" height="500">
        ${c.badge ? `<span class="course__badge${c.featured ? " course__badge--featured" : ""}">${c.badge}</span>` : ""}
      </div>
      <div class="course__body">
        <span class="course__stage">${c.stageLabel}</span>
        <h3>${c.title}</h3>
        <p>${c.short}</p>
        <div class="course__meta">
          <span>⏱ ${c.duration}</span>
          <span>💻 ${c.mode}</span>
          <span>🗣 ${c.languages.join(" · ")}</span>
        </div>
        <div class="course__foot">
          <span class="course__price">${c.oldPrice ? `<s>${rupees(c.oldPrice)}</s>` : ""}${rupees(c.price)}<small>${PRICE_NOTE}</small></span>
          <span class="btn btn--primary">View details &rarr;</span>
        </div>
      </div>
    </a>`).join("");
}
document.querySelectorAll(".filter").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    renderCourses(btn.dataset.filter);
  })
);
renderCourses("all");

// ----- Feedback slider -----
const track = document.getElementById("fb-track");
track.innerHTML = FEEDBACK.map((f) => `
  <figure class="fb">
    <span class="fb__course">${f.course}</span>
    <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>${f.text}</blockquote>
    <figcaption>
      <span class="img-ph" aria-hidden="true">IMG</span>
      <div><div class="fb__name">${f.name}</div><div class="fb__meta">${f.meta}</div></div>
    </figcaption>
  </figure>`).join("");

let fbIndex = 0;
const perView = () => (innerWidth <= 640 ? 1 : innerWidth <= 960 ? 2 : 3);
function moveFeedback(dir) {
  const max = Math.max(0, FEEDBACK.length - perView());
  fbIndex = (fbIndex + dir + max + 1) % (max + 1);
  const card = track.children[0];
  const step = card.getBoundingClientRect().width + 22;
  track.style.transform = `translateX(${-fbIndex * step}px)`;
}
document.querySelectorAll(".fb-btn").forEach((b) => b.addEventListener("click", () => moveFeedback(Number(b.dataset.dir))));
addEventListener("resize", () => { fbIndex = 0; track.style.transform = "none"; });

// ----- WhatsApp links -----
document.querySelectorAll(".js-whatsapp").forEach((a) => {
  a.href = waLink(a.dataset.msg || `Hi ${EXPERT}!`);
  a.target = "_blank";
  a.rel = "noopener";
});

// ----- Mobile menu -----
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

// ----- Contact form → WhatsApp -----
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((f) => {
    const bad = !f.value.trim();
    f.classList.toggle("is-invalid", bad);
    if (bad) ok = false;
  });
  if (!ok) { note.textContent = "Please add your name and phone number."; note.className = "form__note err"; return; }
  const d = new FormData(form);
  window.open(waLink(`Hi ${EXPERT}, I'm ${d.get("name")} (${d.get("phone")}). ${d.get("stage")}. Which course would suit me?`), "_blank", "noopener");
  note.textContent = "Your message is ready in WhatsApp. Just press send.";
  note.className = "form__note ok";
  form.reset();
});

// ----- Reveal sections on scroll -----
const revealEls = document.querySelectorAll(".section__head, .exp, .about__media, .about__text, .step, .gallery__grid, .cta__inner");
if ("IntersectionObserver" in window) {
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
}

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
