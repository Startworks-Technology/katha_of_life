// Course detail page. Reads ?c=<slug> and fills the page from COURSES (courses.js).

const $ = (id) => document.getElementById(id);
const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20z"/></svg>';

const slug = new URLSearchParams(location.search).get("c");
const course = COURSES.find((c) => c.slug === slug);

if (!course) {
  // Unknown or missing course: go back to the course list
  location.replace("index.html#courses");
} else {
  renderCourse(course);
}

function bookButtons(c, extraClass = "") {
  return c.languages.map((lang, i) => `
    <a class="btn ${i === 0 ? "btn--primary" : "btn--ghost"} btn--lg ${extraClass}" target="_blank" rel="noopener"
       href="${waLink(`Hi ${EXPERT}, I'd like to book "${c.title}" in ${lang}. Please share the next batch details.`)}">
      ${WA_ICON} Book in ${lang}
    </a>`).join("");
}

function renderCourse(c) {
  document.title = `${c.title} | Katha of Life by Dr. Monica`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = `${c.title} with Dr. Monica: ${c.short} ${c.duration}, ${c.mode}, ${c.languages.join(" & ")}. ${rupees(c.price)}.`;

  $("cd-crumb").textContent = c.title;
  $("cd-stage").textContent = c.stageLabel;
  $("cd-title").textContent = c.title;
  $("cd-short").textContent = c.short;
  $("cd-img").src = c.image;
  $("cd-img").alt = c.title;
  $("cd-langs").innerHTML = c.languages.map((l) => `<span class="cd-chip">🗣 ${l}</span>`).join("") +
    `<span class="cd-chip">💻 ${c.mode}</span><span class="cd-chip">⏱ ${c.duration}</span>`;
  $("cd-price").innerHTML = (c.oldPrice ? `<s>${rupees(c.oldPrice)}</s>` : "") + rupees(c.price);
  $("cd-price-note").textContent = PRICE_NOTE;
  $("cd-per").textContent = PER_EMAIL_NOTE;
  $("cd-actions").innerHTML = bookButtons(c);
  $("cd-cta-actions").innerHTML = bookButtons(c, "btn--on-dark");

  // Key facts
  const facts = [
    { icon: "👩‍🍼", label: "Who is it for", value: c.forWho },
    { icon: "⏱", label: "Duration", value: c.duration },
    { icon: "💻", label: "Mode", value: c.mode },
    { icon: "🗣", label: "Language", value: c.languages.join(" or ") },
    { icon: "📅", label: "Next batches", value: c.schedule.map((s) => `<strong>${s.label}:</strong> ${s.text}`).join("<br>") },
  ];
  $("cd-facts").innerHTML = facts.map((f) => `
    <div class="cd-fact${f.label === "Next batches" ? " cd-fact--wide" : ""}">
      <span class="cd-fact__icon" aria-hidden="true">${f.icon}</span>
      <div><p class="cd-fact__label">${f.label}</p><p class="cd-fact__value">${f.value}</p></div>
    </div>`).join("");

  // Curriculum: one card per day (or one card when there is a single block)
  const multi = c.curriculum.length > 1;
  $("cd-days").className = "cd-days" + (multi ? " cd-days--" + c.curriculum.length : " cd-days--single");
  $("cd-days").innerHTML = c.curriculum.map((block) => `
    <article class="cd-day">
      ${block.title ? `<h3 class="cd-day__title">${block.title}</h3>` : ""}
      <ol class="cd-list">${block.items.map((it) => `<li>${it}</li>`).join("")}</ol>
    </article>`).join("");

  // Other courses
  $("cd-more").innerHTML = COURSES.filter((o) => o.slug !== c.slug).map((o) => `
    <a class="cd-mini" href="${courseUrl(o)}">
      <img src="${o.image}" alt="" loading="lazy" width="800" height="500">
      <div>
        <span class="course__stage">${o.stageLabel}</span>
        <h3>${o.title}</h3>
        <p>${o.duration} · ${rupees(o.price)}</p>
      </div>
    </a>`).join("");
}

// ----- WhatsApp links in header/footer -----
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

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
