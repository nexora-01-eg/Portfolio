/* ============================================================
   NEXORA — Component Explorer
   Loads /data/components.json, renders a filterable grid using
   the actual Component Card component, and opens component
   detail (live preview / usage / docs) in the actual Drawer +
   Tabs components. No external libraries — a small hand-written
   Markdown-subset renderer covers the README format used across
   this library (headers, paragraphs, lists, code, bold, links).

   NOTE ON file:// USAGE: like core/js/manifest.js in Phase 1,
   this page fetches JSON/HTML/CSS/README files at runtime.
   Most browsers block fetch() of local files under the file://
   protocol (CORS). Serve this folder over a local static server
   (e.g. `npx serve`, `python3 -m http.server`) to use the
   Explorer — the rest of the platform's static pages still open
   directly via file:// with no server needed.
   ============================================================ */
(function () {
  "use strict";

  const DATA_URL = "../../data/components.json";
  const CORE_CSS = [
    "../../core/css/tokens.css",
    "../../core/css/base.css",
    "../../core/css/typography.css",
    "../../core/css/layout.css",
    "../../core/css/utilities.css",
    "../../core/css/animations.css",
  ];

  const grid = document.getElementById("explorer-grid");
  const empty = document.getElementById("explorer-empty");
  const countEl = document.getElementById("explorer-count");
  const categoryList = document.getElementById("explorer-category-list");
  const searchInput = document.getElementById("explorer-search");

  const detailDrawer = document.getElementById("explorer-detail");
  const detailTitle = document.getElementById("explorer-detail-title");
  const detailCategory = document.getElementById("explorer-detail-category");
  const previewFrame = document.getElementById("explorer-preview-frame");
  const usageCode = document.getElementById("explorer-usage-code");
  const docsContent = document.getElementById("explorer-docs-content");

  let registry = { categories: [], components: [] };
  let activeCategory = "all";
  let activeQuery = "";

  // ---------- Minimal Markdown renderer (subset used by our READMEs) ----------
  function renderMarkdown(md) {
    const lines = md.split("\n");
    let html = "";
    let inList = false;
    let inCode = false;
    let codeBuffer = [];

    function closeList() {
      if (inList) { html += "</ul>"; inList = false; }
    }

    function inline(text) {
      return text
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="nx-text-accent">$1</a>');
    }

    lines.forEach((line) => {
      if (line.trim().startsWith("```")) {
        if (inCode) {
          html += `<pre><code>${codeBuffer.join("\n").replace(/&/g, "&amp;").replace(/</g, "&lt;")}</code></pre>`;
          codeBuffer = [];
          inCode = false;
        } else {
          closeList();
          inCode = true;
        }
        return;
      }
      if (inCode) { codeBuffer.push(line); return; }

      if (/^#{1,2}\s+/.test(line)) {
        closeList();
        const level = line.match(/^#+/)[0].length <= 1 ? "h1" : "h2";
        html += `<${level}>${inline(line.replace(/^#{1,2}\s+/, ""))}</${level}>`;
      } else if (/^-\s+/.test(line)) {
        if (!inList) { html += "<ul>"; inList = true; }
        html += `<li>${inline(line.replace(/^-\s+/, ""))}</li>`;
      } else if (line.trim() === "") {
        closeList();
      } else {
        closeList();
        html += `<p>${inline(line)}</p>`;
      }
    });
    closeList();
    return html;
  }

  // ---------- Rendering ----------
  function renderCategories() {
    const items = [{ id: "all", label: "All Components" }, ...registry.categories];
    categoryList.innerHTML = items
      .map(
        (c) => `<li><button class="nx-sidebar__link${c.id === activeCategory ? " nx-sidebar__link--active" : ""}" data-category="${c.id}" type="button">${c.label}</button></li>`
      )
      .join("");
  }

  function filteredComponents() {
    return registry.components.filter((c) => {
      const matchesCategory = activeCategory === "all" || c.category === activeCategory;
      const matchesQuery = !activeQuery || c.label.toLowerCase().includes(activeQuery) || c.id.includes(activeQuery);
      return matchesCategory && matchesQuery;
    });
  }

  function renderGrid() {
    const items = filteredComponents();
    countEl.textContent = `${items.length} component${items.length === 1 ? "" : "s"}`;
    empty.hidden = items.length > 0;

    grid.innerHTML = items
      .map(
        (c) => `
      <a class="nx-card nx-card--interactive nx-component-card" href="#${c.id}" role="listitem" data-component-id="${c.id}">
        <div class="nx-component-card__preview">
          <span class="nx-small nx-text-muted">${c.label}</span>
        </div>
        <div class="nx-component-card__meta">
          <h3 class="nx-h4">${c.label}</h3>
          <span class="nx-badge nx-badge--neutral">${categoryLabel(c.category)}</span>
        </div>
      </a>`
      )
      .join("");
  }

  function categoryLabel(id) {
    const cat = registry.categories.find((c) => c.id === id);
    return cat ? cat.label : id;
  }

  // ---------- Detail drawer ----------
  async function openDetail(component) {
    detailTitle.textContent = component.label;
    detailCategory.textContent = categoryLabel(component.category);
    usageCode.textContent = "Loading…";
    docsContent.innerHTML = "";
    previewFrame.srcdoc = "";

    document.getElementById("tab-preview").click();
    document.getElementById("explorer-detail-title").closest(".nx-drawer-overlay").hidden = false;
    document.body.style.overflow = "hidden";

    const base = component.path; // e.g. /components/ui/button/ (absolute from site root)
    const relBase = `../..${base}`; // relative from /pages/component-explorer/

    try {
      const [htmlText, cssText, readmeText] = await Promise.all([
        fetch(relBase + component.files.html).then((r) => r.text()),
        fetch(relBase + component.files.css).then((r) => r.text()),
        fetch(relBase + component.files.readme).then((r) => r.text()),
      ]);

      let jsText = "";
      if (component.files.js) {
        jsText = await fetch(relBase + component.files.js).then((r) => r.text());
      }

      usageCode.textContent = htmlText.trim();
      docsContent.innerHTML = renderMarkdown(readmeText);

      const corePreviewLinks = CORE_CSS.map((href) => `<link rel="stylesheet" href="${href}" />`).join("");

      previewFrame.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          ${corePreviewLinks}
          <link rel="stylesheet" href="${relBase}${component.files.css}" />
          <style>body { padding: 24px; background: var(--nx-bg-primary); }</style>
        </head>
        <body>
          ${htmlText}
          ${jsText ? `<script>${jsText}<\/script>` : ""}
        </body>
        </html>
      `;
    } catch (err) {
      usageCode.textContent = "Could not load this component's files.\n\nIf you're viewing this page via file://, run a local static server (e.g. `npx serve` or `python3 -m http.server`) from the project root — browsers block fetch() of local files under file://.";
      docsContent.innerHTML = "";
      console.error("[NEXORA Explorer]", err);
    }
  }

  function closeDetail() {
    detailDrawer.hidden = true;
    document.body.style.overflow = "";
  }

  // ---------- Events ----------
  categoryList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    activeCategory = btn.getAttribute("data-category");
    renderCategories();
    renderGrid();
  });

  searchInput.addEventListener("input", () => {
    activeQuery = searchInput.value.trim().toLowerCase();
    renderGrid();
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-component-id]");
    if (!card) return;
    e.preventDefault();
    const id = card.getAttribute("data-component-id");
    const component = registry.components.find((c) => c.id === id && (activeCategory === "all" || c.category === activeCategory));
    const match = registry.components.find((c) => c.id === id);
    if (match) openDetail(match);
  });

  document.getElementById("explorer-detail").addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-nx-drawer-close") || e.target.classList.contains("nx-drawer-overlay")) {
      closeDetail();
    }
  });

  // ---------- Init ----------
  fetch(DATA_URL)
    .then((r) => r.json())
    .then((data) => {
      registry = data;
      renderCategories();
      renderGrid();
    })
    .catch((err) => {
      countEl.textContent = "Could not load the component registry.";
      empty.hidden = false;
      empty.textContent = "If you're viewing this via file://, run a local static server from the project root (browsers block fetch() of local JSON under file://).";
      console.error("[NEXORA Explorer]", err);
    });
})();
