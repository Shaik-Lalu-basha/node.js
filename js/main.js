/* ============================================================
   ETH Site Chrome — topbar, sidebar, footer, highlighter,
   and the shared "Run" button behaviour for every code block.
   ============================================================ */

const ETH_SITE = (() => {

  const NAV_LINKS = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "curriculum", label: "Curriculum", href: "lessons/what-is-nodejs.html" },
    { key: "playground", label: "Playground", href: "playground.html" }
  ];

  function levelBadgeColor(level){
    if (level === "Beginner") return "beginner";
    if (level === "Intermediate") return "intermediate";
    return "advanced";
  }

  function topbarHTML(activeKey, basePrefix){
    const links = NAV_LINKS.map(l => {
      const isActive = l.key === activeKey || (l.key === "home" && activeKey === "about");
      return `<a href="${basePrefix}${l.href}" class="${isActive ? 'is-active' : ''}">${l.label}</a>`;
    }).join("");
    return `
    <button class="topbar__menu-btn" id="ethMenuBtn" aria-label="Toggle navigation">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
    <a href="${basePrefix}index.html" class="brand">
      <span class="brand__mark">ETH</span>
      <span class="brand__name">Node.js Academy<small>Escort Tech Hub</small></span>
    </a>
    <nav class="topnav">${links}</nav>
    <div class="topbar__spacer"></div>
    <div class="topbar__search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input type="text" placeholder="Search lessons..." id="ethSearchInput" />
      <span class="topbar__kbd">⌘K</span>
    </div>
    <a class="topbar__cta" href="${basePrefix}playground.html">Open Playground</a>
    `;
  }

  function sidebarHTML(activeId, basePrefix){
    const groups = ETH_GROUPS.map(group => {
      const items = ETH_CURRICULUM.filter(l => l.group === group).map(l => `
        <a class="sidebar__link ${l.id===activeId?'is-active':''}" href="${basePrefix}lessons/${l.id}.html">
          <span class="sidebar__dot"></span>${l.title}
        </a>`).join("");
      return `<div class="sidebar__group">
        <div class="sidebar__group-title">${group}</div>
        ${items}
      </div>`;
    }).join("");

    return `
    <div class="sidebar__group">
      <a class="sidebar__link ${activeId==='about'?'is-active':''}" href="${basePrefix}index.html"><span class="sidebar__dot"></span>About Node.js Academy</a>
      <a class="sidebar__link ${activeId==='playground'?'is-active':''}" href="${basePrefix}playground.html"><span class="sidebar__dot"></span>Live Playground</a>
    </div>
    ${groups}`;
  }

  function footerHTML(){
    const year = new Date().getFullYear();
    return `
      <div>© ${year} <b>Escort Tech Hub (ETH)</b>. All rights reserved.</div>
      <div>Founded &amp; developed by <b>Shaik Lalu Basha</b></div>
    `;
  }

  function mount(pageKey, activeLessonId, basePrefix=""){
    const top = document.getElementById("site-topbar");
    const side = document.getElementById("site-sidebar");
    const foot = document.getElementById("site-footer");
    const isAboutPage = pageKey === "about";

    document.body.classList.toggle("page--about", isAboutPage);

    if (top) {
      top.innerHTML = isAboutPage ? "" : topbarHTML(pageKey, basePrefix);
      top.style.display = isAboutPage ? "none" : "";
    }
    if (side) {
      if (isAboutPage) {
        side.innerHTML = "";
        side.style.display = "none";
      } else {
        side.innerHTML = sidebarHTML(activeLessonId || pageKey, basePrefix);
        side.style.display = "";
      }
    }
    if (foot) {
      foot.innerHTML = isAboutPage ? "" : footerHTML();
      foot.style.display = isAboutPage ? "none" : "";
    }

    const menuBtn = document.getElementById("ethMenuBtn");
    const sidebar = document.getElementById("site-sidebar");
    let backdrop = document.querySelector(".sidebar__backdrop");
    if (!backdrop){
      backdrop = document.createElement("div");
      backdrop.className = "sidebar__backdrop";
      document.body.appendChild(backdrop);
    }
    if (menuBtn){
      menuBtn.style.display = isAboutPage ? "none" : "";
      if (!isAboutPage){
        menuBtn.addEventListener("click", () => {
          sidebar.classList.toggle("is-open");
          backdrop.classList.toggle("is-open");
        });
      }
    }
    if (backdrop){
      backdrop.removeEventListener("click", backdrop._ethClickHandler);
      backdrop._ethClickHandler = () => {
        sidebar.classList.remove("is-open");
        backdrop.classList.remove("is-open");
      };
      backdrop.addEventListener("click", backdrop._ethClickHandler);
    }

    const searchInput = document.getElementById("ethSearchInput");
    if (searchInput){
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter"){
          const q = searchInput.value.trim().toLowerCase();
          const match = ETH_CURRICULUM.find(l => l.title.toLowerCase().includes(q));
          if (match) window.location.href = `${basePrefix}lessons/${match.id}.html`;
        }
      });
    }
  }

  /* ---------- syntax highlighting + code block markup (shared module) ---------- */
  const highlight = ETH_CODEBLOCK.highlight;
  const renderCodeBlock = ETH_CODEBLOCK.renderCodeBlock;

  /* ---------- run wiring ---------- */
  function wireCodeBlocks(root, codeMap){
    root.querySelectorAll("[data-run]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-run");
        const code = codeMap[idx];
        const body = root.querySelector(`#console-body-${idx}`) || document.getElementById(`console-body-${idx}`);
        btn.disabled = true;
        btn.textContent = "⏳ Running…";
        body.innerHTML = "";
        setTimeout(() => {
          const { lines } = ETHSandbox.run(code);
          lines.forEach((line, i) => {
            setTimeout(() => {
              const el = document.createElement("div");
              el.className = `line console__line--${line.type}`;
              el.textContent = (line.type === "err" ? "✖ " : line.type === "info" ? "ℹ " : "› ") + line.text;
              body.appendChild(el);
            }, i * 70);
          });
          btn.disabled = false;
          btn.textContent = "▶ Run again";
        }, 220);
      });
    });
    root.querySelectorAll("[data-copy]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-copy");
        const code = codeMap[idx];
        navigator.clipboard?.writeText(code).then(() => {
          const old = btn.textContent;
          btn.textContent = "✓ Copied";
          setTimeout(() => btn.textContent = old, 1400);
        });
      });
    });
  }

  return { mount, highlight, renderCodeBlock, wireCodeBlocks, levelBadgeColor };
})();
