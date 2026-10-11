/* ============================================================
   NEXORA MANIFEST
   Foundation only. Single point of access for the platform's
   JSON data sources (/data/*.json). Reads happen dynamically
   at runtime rather than being bundled at build time — there
   is no build step in this platform.
   ============================================================ */

(function () {
  "use strict";

  const DATA_PATHS = {
    projects: "/data/projects.json",
    industries: "/data/industries.json",
    designSystems: "/data/design-systems.json",
    components: "/data/components.json",
    navigation: "/data/navigation.json",
    settings: "/data/settings.json",
    searchIndex: "/data/search-index.json",
  };

  const cache = {};

  const Manifest = {
    init() {
      // Intentionally does not eager-load everything —
      // each page/module requests only what it needs via get().
    },

    /**
     * Fetches (and caches) one of the named data sources.
     * @param {keyof typeof DATA_PATHS} name
     * @returns {Promise<object|Array>}
     */
    async get(name) {
      if (cache[name]) return cache[name];

      const path = DATA_PATHS[name];
      if (!path) {
        throw new Error(`[NEXORA] Unknown manifest source: "${name}"`);
      }

      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`[NEXORA] Failed to load "${name}" from ${path}`);
      }

      const data = await response.json();
      cache[name] = data;
      return data;
    },

    clearCache(name) {
      if (name) {
        delete cache[name];
      } else {
        Object.keys(cache).forEach((key) => delete cache[key]);
      }
    },
  };

  window.NEXORA.register("manifest", Manifest);
})();
