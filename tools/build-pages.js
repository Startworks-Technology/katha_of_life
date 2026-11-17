// Builds ready-made HTML pages for every course and article, so Google and AI
// tools can read the full content without running JavaScript (SEO / AEO / GEO).
//
// Run after editing courses.js or articles-data.js:
//     node tools/build-pages.js
//
// It creates:  course-<slug>.html  and  article-<slug>.html
// and fills the article cards inside articles.html. It also rewrites sitemap.xml.
// It uses the same page scripts as the browser (course.js / articles.js),
// so the ready-made pages look exactly like the live ones.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
const TODAY = new Date().toISOString().slice(0, 10);

// ---------- run a page script against a tiny fake page ----------
function render(templateHtml, scripts, bodyData) {
  const ids = new Set([...templateHtml.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const els = {};
  const head = { appended: [], appendChild(el) { this.appended.push(el); } };
  const mk = (id) => ({
    id, textContent: undefined, _html: undefined, src: undefined, alt: undefined, href: undefined, className: undefined,
    dataset: {}, classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, setAttribute(k, v) { this["attr_" + k] = v; }, querySelector() { return null; },
    get innerHTML() { return this._html; }, set innerHTML(v) { this._html = v; },
  });
  const document = {
    title: "",
    head,
    body: { dataset: bodyData },
    getElementById(id) { if (!ids.has(id)) return null; return (els[id] = els[id] || mk(id)); },
    querySelector(sel) { return sel.startsWith("meta") || sel.startsWith("script") ? null : mk("x"); },
    querySelectorAll() { return []; },
    createElement(tag) { const e = mk(""); e.tag = tag; return e; },
  };
  const ctx = {
    document, location: { search: "", replace(u) { throw new Error("redirect to " + u); } },
    URLSearchParams, console, Date, JSON, Math, encodeURIComponent, String, Number, Array, Object, Set, setTimeout() {},
    window: {}, addEventListener() {}, navigator: {}, innerWidth: 1280,
  };
  vm.createContext(ctx);
  for (const s of scripts) vm.runInContext(read(s).replace(/^const /gm, "var "), ctx, { filename: s });
  return { els, head, title: document.title };
}

// ---------- put rendered values into the template ----------
function fill(html, r) {
  for (const [id, el] of Object.entries(r.els)) {
    const open = new RegExp(`<(\\w+)([^>]*\\bid="${id}"[^>]*)>`);
    const m = html.match(open);
    if (!m) continue;
    const [tagFull, tag] = m;
    let newOpen = tagFull;
    if (el.className) newOpen = newOpen.replace(/class="[^"]*"/, `class="${el.className}"`);
    if (el.src !== undefined) {
      newOpen = newOpen.replace(/src="[^"]*"/, `src="${escAttr(el.src)}"`).replace(/alt="[^"]*"/, `alt="${escAttr(el.alt || "")}"`);
    }
    if (el.href !== undefined && tag === "link") newOpen = newOpen.replace(/href="[^"]*"/, `href="${escAttr(el.href)}"`);
    const inner = el._html !== undefined ? el._html : el.textContent !== undefined ? esc(el.textContent) : undefined;
    const start = m.index;
    if (tag === "img" || tag === "link" || inner === undefined) {
      html = html.slice(0, start) + newOpen + html.slice(start + tagFull.length);
      continue;
    }
    const close = `</${tag}>`;
    const end = html.indexOf(close, start + tagFull.length);
    html = html.slice(0, start) + newOpen + inner + html.slice(end);
  }
  // <title>, meta tags, structured data
  if (r.title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  let ld = "";
  for (const el of r.head.appended) {
    if (el.tag === "meta") {
      const key = el.attr_name ? "name" : "property";
      const val = el.attr_name || el.attr_property;
      const re = new RegExp(`<meta ${key}="${val}" content="[^"]*">`);
      const tagStr = `<meta ${key}="${val}" content="${escAttr(el.content)}">`;
      html = re.test(html) ? html.replace(re, tagStr) : html.replace("</head>", `  ${tagStr}\n</head>`);
    }
    if (el.tag === "script") ld += `  <script type="application/ld+json" data-prerendered>${el.textContent}</script>\n`;
  }
  html = html.replace('<meta name="robots" content="noindex, follow">', '<meta name="robots" content="index, follow, max-image-preview:large">');
  if (ld) html = html.replace("</head>", ld + "</head>");
  return html;
}

// ---------- data ----------
const data = {};
vm.createContext(data);
vm.runInContext(read("courses.js").replace(/^const /gm, "var ") + "\n" + read("articles-data.js").replace(/^const /gm, "var "), data);

const built = [];

// Courses
const courseTpl = read("course.html");
for (const c of data.COURSES) {
  const r = render(courseTpl, ["courses.js", "course.js"], { course: c.slug });
  // the page script skips structured data on prerendered pages, so build it here once
  const url = data.SITE + data.courseUrl(c);
  let html = fill(courseTpl, r);
  html = html.replace("<body>", `<body data-course="${c.slug}">`);
  html = html.replace(/<link rel="canonical" id="canonical" href="[^"]*">/, `<link rel="canonical" id="canonical" href="${url}">`);
  const file = data.courseUrl(c);
  write(file, html);
  built.push(file);
}

// Articles
const artTpl = read("article.html");
for (const a of data.ARTICLES) {
  const r = render(artTpl, ["courses.js", "articles-data.js", "articles.js"], { article: a.slug });
  const url = data.SITE + data.articleUrl(a);
  let html = fill(artTpl, r);
  html = html.replace("<body>", `<body data-article="${a.slug}">`);
  html = html.replace(/<link rel="canonical" id="canonical" href="[^"]*">/, `<link rel="canonical" id="canonical" href="${url}">`);
  const file = data.articleUrl(a);
  write(file, html);
  built.push(file);
}

// Articles list: fill the cards + filter buttons between the markers
{
  let list = read("articles.html");
  const shell = list.replace(/<!--prerender-->[\s\S]*?<!--\/prerender-->/g, "");
  const r = render(shell, ["courses.js", "articles-data.js", "articles.js"], {});
  const put = (id, inner) => {
    const re = new RegExp(`(id="${id}"[^>]*>)<!--prerender-->[\\s\\S]*?<!--/prerender-->`);
    list = list.replace(re, `$1<!--prerender-->${inner}<!--/prerender-->`);
  };
  if (r.els["art-grid"]) put("art-grid", r.els["art-grid"]._html);
  if (r.els["art-filters"]) put("art-filters", r.els["art-filters"]._html);
  list = list.replace(/\s*<script type="application\/ld\+json" data-prerendered>[\s\S]*?<\/script>/g, "");
  const blog = r.head.appended.find((e) => e.tag === "script");
  if (blog) list = list.replace("</head>", `  <script type="application/ld+json" data-prerendered>${blog.textContent}</script>\n</head>`);
  write("articles.html", list);
}

// Sitemap
const pages = ["", "faq.html", "articles.html", ...built];
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${data.SITE}${p}</loc><lastmod>${TODAY}</lastmod><priority>${p === "" ? "1.0" : p.startsWith("course-") ? "0.9" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`;
write("sitemap.xml", sm);

console.log("Built", built.length, "pages:", built.join(", "));
console.log("Updated articles.html and sitemap.xml");
