/* ============================================================
   Build script — generates /lessons/<id>.html for every entry
   in js/lessons-data.js. Re-run this any time you edit the
   curriculum data:

     node build/gen-lessons.js

   ============================================================ */
const fs = require("fs");
const path = require("path");

const { ETH_CURRICULUM } = require("../js/lessons-data.js");
const { renderCodeBlock } = require("../js/codeblock.js");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "lessons");

function levelClass(level){
  return level === "Beginner" ? "beginner" : level === "Intermediate" ? "intermediate" : "advanced";
}

function renderSection(sec, sIdx){
  const anchor = `sec-${sIdx}`;
  const paras = (sec.paragraphs || []).map(p => `<p>${p}</p>`).join("\n");
  const bullets = sec.bullets
    ? `<ul class="bullets">${sec.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`
    : "";
  return `<h2 id="${anchor}">${sec.heading}</h2>\n${paras}\n${bullets}`;
}

function renderPage(lesson, idx){
  const prev = ETH_CURRICULUM[idx - 1];
  const next = ETH_CURRICULUM[idx + 1];
  const sectionsHTML = lesson.sections.map(renderSection).join("\n");
  const tocLinks = lesson.sections.map((s, i) => `<a href="#sec-${i}">${s.heading}</a>`).join("");
  const codeHTML = renderCodeBlock(lesson.code, 0);
  const codeMapJSON = JSON.stringify({ "0": lesson.code.code });

  const prevHTML = prev ? `
    <a class="lesson-nav__btn lesson-nav__btn--prev" href="${prev.id}.html">
      <div class="lesson-nav__dir">&larr; Previous</div>
      <div class="lesson-nav__title">${prev.title}</div>
    </a>` : `<span></span>`;
  const nextHTML = next ? `
    <a class="lesson-nav__btn lesson-nav__btn--next" href="${next.id}.html">
      <div class="lesson-nav__dir">Next &rarr;</div>
      <div class="lesson-nav__title">${next.title}</div>
    </a>` : `
    <a class="lesson-nav__btn lesson-nav__btn--next" href="../playground.html">
      <div class="lesson-nav__dir">Next &rarr;</div>
      <div class="lesson-nav__title">Open the Live Playground</div>
    </a>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${lesson.title} — Node.js Academy by ETH</title>
<meta name="description" content="${lesson.lede.replace(/"/g,'&quot;')}" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%233c873a%22/><text x=%2250%22 y=%2264%22 font-size=%2242%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22monospace%22>ETH</text></svg>">
<link rel="stylesheet" href="../css/style.css" />
</head>
<body>

<header id="site-topbar" class="topbar"></header>
<nav id="site-sidebar" class="sidebar"></nav>

<div class="shell">
  <main class="content">
    <div class="content-with-toc">
      <div class="content-main fade-up">
        <span class="eyebrow">${lesson.group} &bull; <span class="level-${levelClass(lesson.level)}">${lesson.level}</span></span>
        <h1>${lesson.title}</h1>
        <p class="lede">${lesson.lede}</p>

        ${sectionsHTML}

        <h3>Try it live</h3>
        ${codeHTML}

        <div class="lesson-nav">
          ${prevHTML}
          ${nextHTML}
        </div>
      </div>

      <aside class="toc">
        <div class="toc__card">
          <div class="toc__title">On this page</div>
          ${tocLinks}
          <div class="reading-time">
            <div class="reading-time__value">${lesson.minutes} min</div>
            <div class="reading-time__label">Reading time</div>
          </div>
        </div>
      </aside>
    </div>
  </main>
</div>

<footer id="site-footer" class="site-footer"></footer>

<script src="../js/codeblock.js"></script>
<script src="../js/lessons-data.js"></script>
<script src="../js/sandbox.js"></script>
<script src="../js/main.js"></script>
<script>
  ETH_SITE.mount("curriculum", "${lesson.id}", "../");
  ETH_SITE.wireCodeBlocks(document, ${codeMapJSON});
</script>
</body>
</html>
`;
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

ETH_CURRICULUM.forEach((lesson, idx) => {
  const html = renderPage(lesson, idx);
  fs.writeFileSync(path.join(OUT_DIR, `${lesson.id}.html`), html, "utf-8");
});

console.log(`Generated ${ETH_CURRICULUM.length} lesson pages in /lessons`);
