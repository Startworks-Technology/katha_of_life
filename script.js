// =====================================================
//  SETTINGS: change these
// =====================================================
const WHATSAPP_NUMBER = "917207310485"; // country code + number, no "+" or spaces
const EXPERT = "Dr. Monica";

// =====================================================
//  COURSES: edit this list to add / change courses
//  stage:  pregnancy | birth | baby   (used by the filter buttons)
//  colour: rose | teal | lilac         (placeholder image colour)
//  badge:  small label on the image (optional)
//  featured: true gives the card a highlight border
// =====================================================
const COURSES = [
  {
    title: "Breastfeeding",
    stage: "baby", stageLabel: "Lactation",
    colour: "rose", badge: "Most popular", featured: true,
    text: "Latch, positions, milk supply, pumping and common problems, taught by an Advanced Certified Lactation Professional.",
    duration: "2 sessions", mode: "Live online", price: 2500,
  },
  {
    title: "The Birth Prep",
    stage: "birth", stageLabel: "Childbirth education",
    colour: "teal", badge: "New batch · 5 Dec",
    text: "A complete childbirth programme: stages of labour, birth choices, C-section, the first hour and coming home.",
    duration: "8 weeks", mode: "Live + replays", price: 4999, oldPrice: 6499,
  },
  {
    title: "Labour Management Session",
    stage: "birth", stageLabel: "Labour",
    colour: "lilac",
    text: "Breathing, positions, comfort measures and partner support so you can work with your body during labour.",
    duration: "3 hours", mode: "Online / in-person", price: 1999,
  },
  {
    title: "Pregnancy Care Essentials",
    stage: "pregnancy", stageLabel: "Pregnancy",
    colour: "teal",
    text: "Nutrition, safe exercise, common discomforts and warning signs, trimester by trimester.",
    duration: "2 sessions", mode: "Live online", price: 1500,
  },
  {
    title: "Newborn Care Basics",
    stage: "baby", stageLabel: "After birth",
    colour: "lilac",
    text: "Bathing, cord care, burping, sleep, crying and when to call the doctor in the first weeks.",
    duration: "2 hours", mode: "Live online", price: 1200,
  },
  {
    title: "1:1 Lactation Consultation",
    stage: "baby", stageLabel: "Private session",
    colour: "rose",
    text: "A private video or home visit for personal help with feeding, latch or supply. Includes a written plan.",
    duration: "60 min", mode: "Video / home visit", price: 1800,
  },
];

// =====================================================
//  FEEDBACK: sample feedback, replace with real ones
// =====================================================
const FEEDBACK = [
  { name: "Priya R.", meta: "Mother of one · Bengaluru", course: "The Birth Prep", text: "The Birth Prep classes took away so much of my fear. I knew what each stage of labour would feel like and what to ask for. My husband felt involved and confident too." },
  { name: "Ananya S.", meta: "First-time mother", course: "Breastfeeding", text: "I was struggling with latch and pain in the first week. Dr. Monica's breastfeeding guidance fixed it in two sessions. I'm so thankful I found her." },
  { name: "Kavya M.", meta: "Mother of two", course: "Labour Management", text: "The breathing and positions from the labour management session really worked. I stayed calm through most of my labour, which I never thought was possible." },
  { name: "Divya K.", meta: "Working mother", course: "1:1 Lactation", text: "Her pumping plan made going back to work so much easier. Practical, kind and always available on WhatsApp when I had doubts." },
  { name: "Meera & Karthik", meta: "New parents", course: "Newborn Care", text: "We came home from hospital feeling ready instead of panicked. Every question we had was answered patiently." },
];

// =====================================================
//  Helpers
// =====================================================
const rupees = (n) => "₹" + n.toLocaleString("en-IN");
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const imgIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 8"/></svg>`;

// ----- Courses -----
const grid = document.getElementById("course-grid");
function renderCourses(filter) {
  const list = filter === "all" ? COURSES : COURSES.filter((c) => c.stage === filter);
  grid.innerHTML = list.map((c, i) => `
    <article class="course course--${c.colour}${c.featured ? " course--featured" : ""}" style="animation-delay:${i * 60}ms">
      <div class="course__media">
        <div class="img-ph">${imgIcon}<span>Image placeholder<br><small>${c.title}</small></span></div>
        ${c.badge ? `<span class="course__badge${c.featured ? " course__badge--featured" : ""}">${c.badge}</span>` : ""}
      </div>
      <div class="course__body">
        <span class="course__stage">${c.stageLabel}</span>
        <h3>${c.title}</h3>
        <p>${c.text}</p>
        <div class="course__meta">
          <span>⏱ ${c.duration}</span>
          <span>💻 ${c.mode}</span>
        </div>
        <div class="course__foot">
          <span class="course__price">${c.oldPrice ? `<s>${rupees(c.oldPrice)}</s>` : ""}${rupees(c.price)}</span>
          <a class="btn btn--primary" target="_blank" rel="noopener"
             href="${waLink(`Hi ${EXPERT}, I'd like to book "${c.title}".`)}">Book now</a>
        </div>
      </div>
    </article>`).join("");
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

// ----- Colour themes -----
// name shown in the picker + 3 preview colours (main, accent, dark)
const THEMES = [
  { id: "blush",    name: "Blush Rose", colours: ["#d9667f", "#3f9e9a", "#2d1b3d"] },
  { id: "sage",     name: "Sage Green", colours: ["#5f8f6e", "#c98a5b", "#23322a"] },
  { id: "lavender", name: "Lavender",   colours: ["#8b6bbf", "#d9789a", "#2a1f45"] },
  { id: "ocean",    name: "Ocean Teal", colours: ["#2f8f9d", "#f08a5d", "#15343c"] },
  { id: "peach",    name: "Warm Peach", colours: ["#e07a4f", "#4f8a8b", "#3a2418"] },
  { id: "night",    name: "Night",      colours: ["#e58aa0", "#6cc4bf", "#17121c"] },
];
const picker = document.getElementById("theme-picker");
const pickerBtn = picker.querySelector(".theme-picker__toggle");
const themeList = document.getElementById("theme-list");
const currentTheme = () => document.documentElement.dataset.theme || "blush";

themeList.innerHTML = THEMES.map((t) => `
  <button class="theme-opt" role="radio" data-theme-id="${t.id}" aria-checked="${t.id === currentTheme()}">
    <span class="swatch">${t.colours.map((c) => `<i style="background:${c}"></i>`).join("")}</span>
    ${t.name}
  </button>`).join("");

function setTheme(id) {
  if (id === "blush") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = id;
  themeList.querySelectorAll(".theme-opt").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.themeId === id)));
  try { localStorage.setItem("katha-theme", id); } catch (e) {}
}
themeList.addEventListener("click", (e) => {
  const opt = e.target.closest(".theme-opt");
  if (opt) setTheme(opt.dataset.themeId);
});
const setPicker = (open) => { picker.classList.toggle("is-open", open); pickerBtn.setAttribute("aria-expanded", String(open)); };
pickerBtn.addEventListener("click", () => setPicker(!picker.classList.contains("is-open")));
document.addEventListener("click", (e) => { if (!picker.contains(e.target)) setPicker(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setPicker(false); });

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
