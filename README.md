# katha_of_life

Website for **Katha of Life by Dr. Monica**: Childbirth Educator, Advanced Certified Lactation Professional, Pregnancy, Labour Management, MYICAN.

Live domain: https://kathaoflife.in/

## Files
- `index.html`: the home page
- `course.html` + `course.js`: one page per course (`course.html?c=breastfeeding` etc.)
- `articles.html` + `article.html` + `articles.js`: articles list and one page per article. **Edit articles in `articles-data.js`**
- `faq.html` + `faq.js`: full FAQ page (the home page shows only 4 questions)
- `courses.js`: **edit courses here**: titles, prices, timings, languages and what is taught. Also the WhatsApp number and email
- `styles.css`: design and colour themes
- `robots.txt`, `sitemap.xml`, `llms.txt`: for Google and AI tools (SEO / AEO / GEO). Add new pages to `sitemap.xml`
- SEO structured data: in `<head>` of `index.html` (organisation, Dr. Monica, FAQ) and created by `course.js` for each course. **If you edit an FAQ, change it in both the FAQ section and the structured data.**
- `script.js`: home page script (feedback list at the top)
- `images/`: photos (`monica-about.jpg` = Dr. Monica, About section (her own photo); `monica.jpg` = older photo, not used; `hero-mother-child.jpg` = top section, Pexels free licence: https://www.pexels.com/photo/33204399/)
- `images/logo/`: logos used on the site (`logo-horizontal.png` = header logo, `logo-main.png` = main square logo, `logo-icon.png`, `logo-badge.png`, favicons). Full-size originals are in `images/logo/original/` (older logo versions in `original/v1/`)

## After editing courses or articles (important for Google)
Course and article pages are ready-made HTML files (`course-<slug>.html`, `article-<slug>.html`) so Google and AI tools can read them.
After changing `courses.js` or `articles-data.js`, rebuild them:

```bash
node tools/build-pages.js
```

This also updates `articles.html` and `sitemap.xml`. Old links (`course.html?c=...`, `article.html?a=...`) redirect to the new pages.

## Run locally
No build step. Open `index.html` in a browser, or run:

```bash
python -m http.server 5510
```

and open http://127.0.0.1:5510

## Photo credits
Gallery photos in `images/gallery/` are from [Unsplash](https://unsplash.com/license) (free to use, including commercially):
- pregnancy-sari.jpg: https://unsplash.com/photos/pregnant-woman-in-gold-sari-dtOWecpRKSE
- mother-baby-bonding.jpg: https://unsplash.com/photos/a-smiling-mother-and-baby-bonding-on-a-blue-background-jgjsXTfMgrQ
- grandmother-newborn.jpg: https://unsplash.com/photos/grandmother-smiling-at-a-baby-on-a-bed-m2wHjaS4j0Y
- happy-family.jpg: https://unsplash.com/photos/a-family-of-five-including-a-baby-posing-F4AsoI38xTk
- new-mother.jpg: https://unsplash.com/photos/a-happy-mother-holding-her-cute-baby-vWiBKrKRM1o

Article photos in `images/articles/` (free licences):
- good-latch.jpg: https://unsplash.com/photos/baby-with-wide-eyes-looking-upward-EgtLW0teNyg
- enough-breast-milk.jpg: https://www.pexels.com/photo/32830547/
- true-vs-false-labour.jpg: https://www.pexels.com/photo/21792124/
- hospital-bag.jpg: https://www.pexels.com/photo/3875082/

Course photos in `images/courses/*.jpg` are object photos from [Pexels](https://www.pexels.com/license/) (free to use, including commercially):
- early-pregnancy.jpg: https://www.pexels.com/photo/7055860/
- breastfeeding.jpg: https://www.pexels.com/photo/27355922/
- labour-management.jpg: https://www.pexels.com/photo/3984370/
- labour-and-breastfeeding.jpg: Daiv, photo shared by Dr. Monica (her own photo, 17 Nov 2026)
The `.svg` files in the same folder are the earlier line illustrations (not used now).
