// =====================================================
//  ARTICLES: edit this list to add / change articles.
//  Each article gets its own page: article-<slug>.html
//  After editing, run:  node tools/build-pages.js   (rebuilds the course + article pages)
//  body: one line per paragraph. Start a line with "## " for a sub-heading.
//  course: slug of the related course (shown at the end of the article)
//  Source text: Google Doc "Website Data" -> Articles tab
// =====================================================
const ARTICLES = [
  {
    "slug": "good-latch",
    "title": "Getting a Good Latch: A Simple Step-by-Step Guide for New Mothers",
    "category": "Breastfeeding",
    "summary": "A good latch is the key to comfortable breastfeeding and a well-fed baby. Here is how to get it right, and how to tell when it is not.",
    "image": "images/articles/good-latch.jpg",
    "course": "breastfeeding",
    "date": "2026-11-16",
    "body": [
      "In the first days after birth, almost every new mother asks the same question: \"Is my baby latching properly?\" A good latch protects your nipples from pain and cracks, helps your baby drink well, and tells your body to make more milk. The good news is that latching is a skill, and both you and your baby get better at it with practice.",
      "## Step 1: Get comfortable first",
      "Sit with your back supported and your feet resting flat. Keep a pillow on your lap so your arms do not tire. Bring your baby close, tummy to tummy, with their ear, shoulder and hip in one straight line. A baby who has to turn their head to feed cannot swallow easily.",
      "## Step 2: Nose to nipple",
      "Hold your baby so that their nose is level with your nipple. This makes them tilt their head back slightly and open wide, just like we do when we take a big bite.",
      "## Step 3: Wait for a wide mouth",
      "Gently brush your nipple from your baby's nose down to their upper lip. Wait until they open their mouth really wide, like a yawn. Then bring your baby quickly to the breast, chin first. Always bring the baby to the breast, not the breast to the baby.",
      "## Step 4: Check the latch",
      "Signs of a good latch: your baby's lips are turned outwards like a fish; their chin is pressed into your breast; you see more of the dark area (areola) above their top lip than below the bottom lip; their cheeks look round and full, not sucked in; you hear swallowing, not clicking; and after the first few seconds, feeding does not hurt.",
      "## If it hurts, start again",
      "Some tenderness in the first week is common, but sharp pain all through the feed usually means a shallow latch. Do not pull your baby off. Slip your clean little finger into the corner of their mouth to break the suction, then try again.",
      "## Try different positions",
      "The cradle, cross-cradle, football (rugby) and side-lying holds each suit different mothers and babies. The football hold is often comfortable after a C-section because the baby stays away from your tummy.",
      "## When to get help",
      "Ask a lactation professional if your nipples are cracked or bleeding, if every feed is painful, if your baby is very sleepy at the breast, or if you are worried your baby is not getting enough. Small changes in position often make a big difference."
    ]
  },
  {
    "slug": "enough-breast-milk",
    "title": "Is My Baby Getting Enough Breast Milk? 7 Signs to Look For",
    "category": "Breastfeeding",
    "summary": "You cannot see how much milk your baby drinks from the breast, but your baby shows you every day. Here are the simple signs to check.",
    "image": "images/articles/enough-breast-milk.jpg",
    "course": "breastfeeding",
    "date": "2026-11-16",
    "body": [
      "One of the biggest worries for breastfeeding mothers is \"Is my milk enough?\" Family members often add to the worry when the baby cries. Since you cannot measure breast milk in millilitres, look at your baby instead. These signs tell you a lot.",
      "## 1. Frequent feeds",
      "Newborns usually feed 8 to 12 times in 24 hours. Frequent feeding is normal. It is how your baby builds up your milk supply.",
      "## 2. You can hear swallowing",
      "After a few quick sucks, your baby settles into slower, deeper sucks with soft swallowing sounds. Short pauses are normal.",
      "## 3. Wet nappies",
      "In the first few days, the number of wet nappies goes up day by day. From around day 5 or 6, expect at least 6 heavy wet nappies in 24 hours, with pale, almost clear urine.",
      "## 4. Dirty nappies",
      "The first dark, sticky stools (meconium) change to greenish and then yellow, seedy stools by around day 4 or 5. In the early weeks, most breastfed babies pass at least 2 to 3 yellow stools a day.",
      "## 5. Weight gain",
      "It is normal for babies to lose some weight in the first few days. Most babies are back to their birth weight by 10 to 14 days and then gain steadily. Your doctor or nurse will check this at your baby's visits.",
      "## 6. A content baby after feeds",
      "After a good feed, most babies let go of the breast on their own and look relaxed, with open hands and a sleepy face.",
      "## 7. Your breasts feel softer",
      "Your breasts often feel fuller before a feed and softer after it.",
      "## When to call your doctor or lactation professional",
      "Get help early if your baby has fewer wet nappies, dark yellow urine, is too sleepy to feed, looks more yellow (jaundice), or is not back to birth weight by 2 weeks. Getting support quickly can protect your milk supply and your baby's health."
    ]
  },
  {
    "slug": "true-vs-false-labour",
    "title": "True Labour vs False Labour: How to Tell the Difference",
    "category": "Labour",
    "summary": "Not every tightening means labour has started. Learn the difference between practice contractions and real labour, and when to go to the hospital.",
    "image": "images/articles/true-vs-false-labour.jpg",
    "course": "labour-management",
    "date": "2026-11-16",
    "body": [
      "In the last weeks of pregnancy, many mothers feel their tummy tighten and wonder, \"Is this it?\" These can be practice contractions, called Braxton Hicks or false labour. Knowing the difference helps you stay calm and go to the hospital at the right time.",
      "## False labour (practice contractions)",
      "False labour contractions come at irregular times; they do not get closer together; they do not become much stronger; they are usually felt only in the front of the tummy; and they often ease when you rest, change position, walk or drink water.",
      "## True labour",
      "True labour contractions come at regular times; they get closer together, last longer and become stronger; they often start in the lower back and wrap around to the front; and they do not go away when you rest or change position.",
      "## Other signs that labour is starting",
      "A \"show\" (a little mucus, sometimes with a streak of blood), waters breaking (a gush or a steady trickle of fluid), lower back ache that comes and goes, and loose motions in some mothers.",
      "## Timing your contractions",
      "Time from the start of one contraction to the start of the next, and note how long each one lasts. Many doctors ask first-time mothers to come in when contractions are about 5 minutes apart, last about 1 minute, and have continued like this for about 1 hour. Always follow your own doctor's advice.",
      "## Go to the hospital straight away if",
      "your waters break (especially if the fluid is green, brown or smelly); you have bleeding like a period; your baby is moving less than usual; you have severe or constant pain in the tummy; you have a bad headache, blurred vision or swelling of the face and hands; you have a fever; or you have regular contractions before 37 weeks.",
      "## Stay calm and prepared",
      "Keep your hospital bag packed by 36 weeks, save your hospital and doctor's numbers in your phone, and plan who will take you there. In our Labour Management sessions, we practise breathing and comfort positions so you can manage early labour calmly at home."
    ]
  },
  {
    "slug": "hospital-bag-checklist",
    "title": "Hospital Bag Checklist for Indian Mothers: What to Pack for Delivery",
    "category": "Labour",
    "summary": "A simple, practical checklist of what to pack for you, your baby and your birth partner, so you are ready when labour begins.",
    "image": "images/articles/hospital-bag.jpg",
    "course": "labour-management",
    "date": "2026-11-16",
    "body": [
      "Packing your hospital bag early takes away last-minute stress. Try to have it ready by 36 weeks and keep it near the door. Here is a practical checklist. Check with your hospital too, as some provide baby clothes or pads.",
      "## Documents",
      "Your hospital file and scan reports, ID proof (Aadhaar or similar), health insurance card and papers, your doctor's and hospital's phone numbers, and some cash and a card or UPI on your phone.",
      "## For the mother",
      "Two or three loose, front-opening nighties or kurtis that make breastfeeding easy; feeding (nursing) bras; extra-absorbent maternity pads; comfortable cotton or disposable underwear; a soft shawl or stole; slippers with a good grip; toothbrush, toothpaste, comb, hair bands, lip balm and moisturiser; a water bottle with a straw; light snacks such as dry fruits or biscuits; and your phone charger with a long cable.",
      "## For the baby",
      "Four to six soft cotton jablas or onesies; caps, mittens and socks; two or three soft cotton swaddle cloths or towels; a warm blanket; newborn-size nappies; soft cotton or wipes for cleaning; and an outfit for going home.",
      "## For your birth partner",
      "A change of clothes, toiletries, phone charger, some snacks, and a list of people to call after the baby arrives.",
      "## Nice to have",
      "A pillow from home, earphones and calming music, a small notebook to note feeding times, and a nursing pillow if you have one.",
      "## Keep it simple",
      "You do not need to pack everything you own. Pack the basics, keep the bag light, and let your partner know where everything is."
    ]
  }
];

const articleUrl = (a) => `article-${a.slug}.html`;
const readMins = (a) => Math.max(2, Math.round(a.body.join(" ").split(/\s+/).length / 200));
