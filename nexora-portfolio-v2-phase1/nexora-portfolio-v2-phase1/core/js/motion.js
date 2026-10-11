/* ============================================================
   NEXORA — Motion (Experience V2, Phase 1)
   Registers into the same window.NEXORA module system every
   other core/js file uses. Purely additive: does nothing unless
   a page marks an element with one of this module's data
   attributes (data-nx-magnetic, data-nx-tilt, data-nx-glow) —
   existing pages are unaffected until they opt in.

   Uses event delegation (one listener per interaction type on
   document, not one per element) so this scales to any number
   of magnetic/tilt/glow elements without adding per-element
   listeners — consistent with the "no duplicated rendering /
   event delegation" performance principle already established.
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const Motion = {
    init() {
      if (prefersReduced) return; // every effect below is purely cosmetic — skip entirely
      this._initMagnetic();
      this._initTilt();
      this._initGlow();
    },

    _initMagnetic() {
      const strength = 0.25; // fraction of cursor offset actually applied — subtle, not chasing the cursor
      document.addEventListener("mousemove", (e) => {
        const target = e.target.closest("[data-nx-magnetic]");
        document.querySelectorAll("[data-nx-magnetic].nx-magnetic--active").forEach((el) => {
          if (el !== target) {
            el.style.setProperty("--nx-mx", "0px");
            el.style.setProperty("--nx-my", "0px");
            el.classList.remove("nx-magnetic--active");
          }
        });
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
        target.style.setProperty("--nx-mx", `${offsetX}px`);
        target.style.setProperty("--nx-my", `${offsetY}px`);
        target.classList.add("nx-magnetic--active");
      });
    },

    _initTilt() {
      const maxTilt = 6; // degrees — kept deliberately small, depth not a gimmick
      document.addEventListener("mousemove", (e) => {
        const target = e.target.closest("[data-nx-tilt]");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width; // 0..1
        const py = (e.clientY - rect.top) / rect.height;
        const tiltX = (0.5 - py) * maxTilt;
        const tiltY = (px - 0.5) * maxTilt;
        target.style.setProperty("--nx-tilt-x", `${tiltX}deg`);
        target.style.setProperty("--nx-tilt-y", `${tiltY}deg`);
      });
      document.addEventListener("mouseout", (e) => {
        const target = e.target.closest("[data-nx-tilt]");
        if (!target) return;
        target.style.setProperty("--nx-tilt-x", "0deg");
        target.style.setProperty("--nx-tilt-y", "0deg");
      });
    },

    _initGlow() {
      document.addEventListener("mousemove", (e) => {
        const target = e.target.closest(".nx-glow-surface");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--nx-glow-x", `${e.clientX - rect.left}px`);
        target.style.setProperty("--nx-glow-y", `${e.clientY - rect.top}px`);
      });
    },

    /**
     * Applies staggered reveal classes (nx-stagger-1..6, cycling)
     * to a NodeList/array, then hands them to the existing
     * animations module to actually observe/reveal — this module
     * never reimplements the IntersectionObserver Phase 1 already
     * built, only adds the stagger timing on top of it.
     * @param {NodeListOf<Element>|Element[]} elements
     */
    staggerReveal(elements) {
      const list = Array.from(elements);
      list.forEach((el, i) => {
        el.classList.add("nx-anim-fade-up", `nx-stagger-${(i % 6) + 1}`);
        el.setAttribute("data-nx-reveal", "");
      });
      const animations = window.NEXORA.modules.animations;
      if (animations) animations.observe(list);
    },
  };

  window.NEXORA.register("motion", Motion);
})();
