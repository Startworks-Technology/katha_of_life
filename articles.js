// Articles list page (articles.html) and single article page (article.html).
// Data: ARTICLES in articles-data.js. Settings + courses: courses.js.

const $ = (id) => document.getElementById(id);
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function card(a) {
  return `
    <a class="art-card" href="${articleUrl(a)}">
      <img src="${a.image}" alt="" loading="lazy" width="800" height="500">
      <div class="art-card__body">
        <span class="art-cat">${esc(a.category)}</span>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.summary)}</p>
        <span class="art-meta">${readMins(a)} min read &middot; Read article &rarr;</span>
      </div>
    </a>`;
}

function setMeta(attr, key, value) {
  let m = document.querySelector(`meta[${attr}="${key}"]`);
  if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); }
  m.content = value;
}
function addLd(data) {
  if (document.querySelector("script[data-prerendered]")) return; // already in the page's HTML
  const sc = document.createElement("script");
  sc.type = "application/ld+json";
  sc.textContent = JSON.stringify(data);
  document.head.appendChild(sc);
}

// ---------- List page ----------
if ($("art-grid")) {
  const cats = ["All", ...new Set(ARTICLES.map((a) => a.category))];
  const render = (cat) => {
    const list = cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
    $("art-grid").innerHTML = list.map(card).join("");
  };
  $("art-filters").innerHTML = cats.map((c, i) => `<button class="filter${i === 0 ? " is-active" : ""}" data-cat="${c}">${c}</button>`).join("");
  $("art-filters").addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    document.querySelectorAll("#art-filters .filter").forEach((x) => x.classList.toggle("is-active", x === b));
    render(b.dataset.cat);
  });
  render("All");
  addLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Katha of Life articles",
    "url": SITE + "articles.html",
    "publisher": { "@type": "EducationalOrganization", "name": "Katha of Life", "url": SITE },
    "blogPost": ARTICLES.map((a) => ({ "@type": "BlogPosting", "headline": a.title, "url": SITE + articleUrl(a), "datePublished": a.date })),
  });
}

// ---------- Single article page ----------
if ($("article-body")) {
  const pageSlug = document.body.dataset.article;
  const slug = pageSlug || new URLSearchParams(location.search).get("a");
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) {
    location.replace("articles.html");
  } else if (!pageSlug) {
    location.replace(articleUrl(a));
  } else {
    const url = SITE + articleUrl(a);
    document.title = `${a.title} | Katha of Life`;
    document.getElementById("canonical").href = url;
    setMeta("name", "description", a.summary);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:title", a.title);
    setMeta("property", "og:description", a.summary);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", SITE + a.image);

    $("art-crumb").textContent = a.title;
    $("art-cat").textContent = a.category;
    $("art-title").textContent = a.title;
    $("art-summary").textContent = a.summary;
    $("art-meta").innerHTML = `By <strong>Dr. Monica</strong> &middot; ${fmtDate(a.date)} &middot; ${readMins(a)} min read`;
    $("art-img").src = a.image;
    $("art-img").alt = a.title;
    $("article-body").innerHTML = a.body
      .map((p) => (p.startsWith("## ") ? `<h2>${esc(p.slice(3))}</h2>` : `<p>${esc(p)}</p>`))
      .join("");

    const course = COURSES.find((c) => c.slug === a.course);
    if (course) {
      $("art-course").innerHTML = `
        <img src="${course.image}" alt="" loading="lazy" width="800" height="500">
        <div>
          <span class="art-cat">Learn more in our course</span>
          <h3>${esc(course.title)}</h3>
          <p>${esc(course.short)}</p>
          <p class="art-course__meta">${course.duration} &middot; ${course.mode} &middot; ${course.languages.join(" & ")} &middot; ${rupees(course.price)}</p>
          <a class="btn btn--primary" href="${courseUrl(course)}">View course &rarr;</a>
        </div>`;
    }
    $("art-more").innerHTML = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3).map(card).join("");

    addLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "headline": a.title,
          "description": a.summary,
          "image": SITE + a.image,
          "datePublished": a.date,
          "dateModified": a.date,
          "url": url,
          "mainEntityOfPage": url,
          "articleSection": a.category,
          "inLanguage": "en-IN",
          "author": { "@type": "Person", "name": "Dr. Monica", "jobTitle": "Certified Childbirth Educator (CCCE) and Advanced Lactation Professional (ACLP)", "url": SITE },
          "publisher": { "@type": "EducationalOrganization", "name": "Katha of Life", "url": SITE, "logo": { "@type": "ImageObject", "url": SITE + "images/logo/logo-main-cream.png" } },
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
            { "@type": "ListItem", "position": 2, "name": "Articles", "item": SITE + "articles.html" },
            { "@type": "ListItem", "position": 3, "name": a.title, "item": url },
          ],
        },
      ],
    });
  }
}

// ---------- Shared: WhatsApp links, mobile menu, year ----------
document.querySelectorAll(".js-whatsapp").forEach((el) => {
  el.href = waLink(el.dataset.msg || `Hi ${EXPERT}!`);
  el.target = "_blank";
  el.rel = "noopener";
});
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
document.getElementById("year").textContent = new Date().getFullYear();
