/* ============================================================
   NEXORA ROUTER
   Foundation only. Tracks the current route and exposes
   subscribe/navigate hooks. Route-to-page resolution and
   history-state rendering are Phase 2 concerns.
   ============================================================ */

(function () {
  "use strict";

  const listeners = new Set();

  const Router = {
    current: window.location.pathname,

    init() {
      window.addEventListener("popstate", () => {
        this.current = window.location.pathname;
        this._notify();
      });
    },

    /**
     * Navigates to a new path without a full page reload.
     * Actual view rendering is wired up in Phase 2.
     * @param {string} path
     */
    navigate(path) {
      window.history.pushState({}, "", path);
      this.current = path;
      this._notify();
    },

    /**
     * @param {(path: string) => void} callback
     * @returns {() => void} unsubscribe function
     */
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },

    _notify() {
      listeners.forEach((cb) => cb(this.current));
    },
  };

  window.NEXORA.register("router", Router);
})();
