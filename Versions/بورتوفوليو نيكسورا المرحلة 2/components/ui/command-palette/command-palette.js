/* ============================================================
   NEXORA — Command Palette
   Opens via trigger click or the Cmd/Ctrl+K shortcut. Arrow
   keys move a roving highlight through options, Enter activates
   the highlighted option, Escape closes. Filtering is
   substring-match here as the Phase 2 baseline — swap in
   core/js/search.js's real index once Phase 3 implements it.
   ============================================================ */
(function () {
  "use strict";

  const overlay = document.querySelector("[data-nx-command-palette]");
  if (!overlay) return;

  const input = overlay.querySelector(".nx-command__input");
  const list = overlay.querySelector(".nx-command__list");
  let lastFocused = null;

  function options() {
    return Array.from(list.querySelectorAll('[role="option"]')).filter((o) => !o.hidden);
  }

  function highlight(index) {
    const opts = options();
    opts.forEach((o) => o.removeAttribute("aria-selected"));
    if (opts[index]) {
      opts[index].setAttribute("aria-selected", "true");
      opts[index].scrollIntoView({ block: "nearest" });
    }
  }

  function open() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    input.value = "";
    input.focus();
    filter("");
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  function filter(query) {
    const q = query.trim().toLowerCase();
    list.querySelectorAll('[role="option"]').forEach((option) => {
      option.hidden = q.length > 0 && !option.textContent.toLowerCase().includes(q);
    });
    // Hide group labels whose group has no visible options
    list.querySelectorAll(".nx-command__group-label").forEach((label) => {
      let sibling = label.nextElementSibling;
      let hasVisible = false;
      while (sibling && !sibling.classList.contains("nx-command__group-label")) {
        if (!sibling.hidden) hasVisible = true;
        sibling = sibling.nextElementSibling;
      }
      label.hidden = !hasVisible;
    });
    highlight(0);
  }

  document.querySelectorAll("[data-nx-command-trigger]").forEach((trigger) =>
    trigger.addEventListener("click", open)
  );

  document.addEventListener("keydown", (e) => {
    const isMeta = e.metaKey || e.ctrlKey;
    if (isMeta && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay.hidden ? open() : close();
      return;
    }
    if (overlay.hidden) return;

    if (e.key === "Escape") close();

    const opts = options();
    const currentIndex = opts.findIndex((o) => o.getAttribute("aria-selected") === "true");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlight((currentIndex + 1) % opts.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlight((currentIndex - 1 + opts.length) % opts.length);
    } else if (e.key === "Enter" && opts[currentIndex]) {
      overlay.dispatchEvent(new CustomEvent("nx:command-select", { bubbles: true, detail: { value: opts[currentIndex].textContent } }));
      close();
    }
  });

  input.addEventListener("input", () => filter(input.value));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
    const option = e.target.closest('[role="option"]');
    if (option) {
      overlay.dispatchEvent(new CustomEvent("nx:command-select", { bubbles: true, detail: { value: option.textContent } }));
      close();
    }
  });
})();
