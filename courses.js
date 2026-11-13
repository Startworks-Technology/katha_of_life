// =====================================================
//  SETTINGS (used on every page)
// =====================================================
const WHATSAPP_NUMBER = "917207310485"; // country code + number, no "+" or spaces
const EXPERT = "Dr. Monica";
const EMAIL = "thekathaofyours.7@gmail.com";

// =====================================================
//  COURSES: edit this list to add / change courses.
//  Each course gets its own page: course.html?c=<slug>
//
//  slug:       short id used in the page link (no spaces)
//  stage:      pregnancy | birth | baby   (home page filter buttons)
//  badge:      small label on the card picture (optional)
//  featured:   true gives the card a highlight border
//  price:      in rupees; oldPrice shows a crossed-out price (optional)
//  schedule:   next batches, one line per language group
//  curriculum: what is taught. One block = one day/session.
//              Leave "title" empty when there is only one block.
// =====================================================
const COURSES = [
  {
    slug: "early-pregnancy",
    title: "Early Pregnancy",
    image: "images/courses/pregnancy-care.svg",
    stage: "pregnancy", stageLabel: "Pregnancy",
    short: "Confirmation of pregnancy, nutrition, bonding with your baby and much more.",
    forWho: "Anyone who wants to know what pregnancy looks like: first-time and second-time mothers.",
    duration: "3 hours",
    mode: "Live online",
    price: 1500,
    languages: ["English", "Telugu"],
    schedule: [
      { label: "English & Telugu", text: "Every Tuesday & Saturday · 4:30 pm – 7:00 pm" },
    ],
    curriculum: [
      { title: "", items: [
        "Pregnancy confirmation",
        "Month by month: 1st to 9th month of pregnancy",
        "Mental readiness",
        "Development of your baby",
        "Nutrition needed to nourish mother and baby",
        "Diets",
        "Listening to your body",
        "Trusting your body",
        "Importance of consultations and scans",
        "Handling discomforts",
        "Bonding with your baby",
        "Taking care of yourself",
        "Partner's role",
        "Dos and don'ts in pregnancy",
        "Signs to visit the hospital without delay",
        "Hospital bag preparation",
      ]},
    ],
  },
  {
    slug: "breastfeeding",
    title: "Breastfeeding",
    image: "images/courses/breastfeeding.svg",
    stage: "baby", stageLabel: "Lactation",
    badge: "Most popular",
    short: "Latch, positions, milk supply, pumping, common problems and much more.",
    forWho: "Pregnant mothers in the 3rd trimester and new mothers.",
    duration: "2 hrs 30 min",
    mode: "Live online",
    price: 1500,
    languages: ["English", "Telugu"],
    schedule: [
      { label: "English & Telugu", text: "Every Tuesday & Saturday · time to be announced" },
    ],
    curriculum: [
      { title: "", items: [
        "Delayed cord clamping",
        "APGAR score",
        "The first hour after birth",
        "Breast crawl",
        "Latching",
        "Feeding positions",
        "Cluster feeding",
        "Postpartum diet and breastfeeding",
        "Is my baby getting enough milk?",
        "Increasing milk supply",
        "Hand expression and pumping",
        "Milk storage",
        "Nipple shield",
        "Formula feeding",
        "Baby's hunger cues",
        "Breastfeeding challenges: prevention and management",
        "Partner support",
        "Baby's weight tracking",
        "Burping and gagging",
      ]},
    ],
  },
  {
    slug: "labour-management",
    title: "Labour Management Session",
    image: "images/courses/labour-management.svg",
    stage: "birth", stageLabel: "Labour",
    short: "Breathing, positions, comfort measures and partner support so you can work with your body during labour.",
    forWho: "From the 5th month of pregnancy onwards, and second-time mothers.",
    duration: "2 sessions · 2 hrs 30 min each",
    mode: "Online",
    price: 2500,
    languages: ["English", "Telugu"],
    schedule: [
      { label: "Telugu", text: "Friday 5:00 – 7:30 pm & Saturday 10:00 am – 12:30 pm" },
      { label: "English", text: "Saturday 5:00 – 7:30 pm & Sunday 10:00 am – 12:30 pm" },
    ],
    curriculum: [
      { title: "Day 1", items: [
        "Giving birth without fear: emotional and mental readiness",
        "Types of birth: vaginal and C-section",
        "Birth anatomy",
        "Fetal positioning",
        "Stages of labour",
        "Signs and symptoms of labour",
        "Difference between true and false labour",
        "Breathing techniques to manage contractions",
        "Natural pain management for comfort and to help labour progress",
      ]},
      { title: "Day 2", items: [
        "Partner's support and role: physically and emotionally",
        "When to go to the hospital",
        "Exercises for a shorter labour",
        "When and how to push the baby",
        "Medical interventions",
        "Epidural: pain-relief medication",
        "Episiotomy",
        "Delayed cord clamping",
        "Breast crawl and immediate skin-to-skin",
        "The first hour after birth",
        "Starting breastfeeding",
      ]},
    ],
  },
];

// The 3-day programme = Labour Management (Day 1 + 2) + Breastfeeding (Day 3)
(function addComboCourse() {
  const labour = COURSES.find((c) => c.slug === "labour-management");
  const feeding = COURSES.find((c) => c.slug === "breastfeeding");
  COURSES.push({
    slug: "labour-and-breastfeeding",
    title: "Labour Management + Breastfeeding",
    image: "images/courses/birth-prep.svg",
    stage: "birth", stageLabel: "Complete programme",
    badge: "Best value · Save ₹500", featured: true,
    short: "Our complete programme: the two-day Labour Management course plus the Breastfeeding session, together at a better price.",
    forWho: "Pregnant mothers and birth partners.",
    duration: "3 days · 3 hrs each",
    mode: "Online",
    price: 3500, oldPrice: labour.price + feeding.price,
    languages: ["English", "Telugu"],
    schedule: [
      { label: "English & Telugu", text: "Message us on WhatsApp for the next batch dates" },
    ],
    curriculum: [
      { title: "Day 1 · Labour", items: labour.curriculum[0].items },
      { title: "Day 2 · Labour", items: labour.curriculum[1].items },
      { title: "Day 3 · Breastfeeding", items: feeding.curriculum[0].items },
    ],
  });
})();

// Price note shown with every price
const PRICE_NOTE = "Inclusive of GST";
const PER_EMAIL_NOTE = "One price per registered email: join alone, as a couple or with family.";

// Shared helpers
const rupees = (n) => "₹" + n.toLocaleString("en-IN");
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const courseUrl = (c) => `course.html?c=${c.slug}`;
