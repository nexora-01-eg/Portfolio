/* ============================================================
   NEXORA FILTERS
   Foundation only. Holds active filter state for the future
   project-library UI (industry, service, tier, difficulty,
   technology, status, tags, version, responsive, dark mode).
   Filtering logic and UI are Phase 2+.
   ============================================================ */

(function () {
  "use strict";

  const FILTER_KEYS = [
    "industry",
    "service",
    "tier",
    "difficulty",
    "technology",
    "status",
    "tags",
    "version",
    "responsive",
    "darkMode",
  ];

  const Filters = {
    active: {},

    init() {
      FILTER_KEYS.forEach((key) => {
        this.active[key] = null;
      });
    },

    /**
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
      if (!FILTER_KEYS.includes(key)) {
        console.warn(`[NEXORA] Unknown filter key: "${key}"`);
        return;
      }
      this.active[key] = value;
    },

    reset() {
      FILTER_KEYS.forEach((key) => {
        this.active[key] = null;
      });
    },

    /**
     * @returns {object} the currently active filter set
     */
    getActive() {
      return { ...this.active };
    },
  };

  window.NEXORA.register("filters", Filters);
})();
