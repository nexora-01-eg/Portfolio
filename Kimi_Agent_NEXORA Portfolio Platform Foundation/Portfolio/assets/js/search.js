/* ═══════════════════════════════════════════════════════════
   NEXORA Portfolio — Global Search Module
   ═══════════════════════════════════════════════════════════ */

/**
 * Initialize global search overlay
 */
export function initSearch() {
  const searchTriggers = document.querySelectorAll('[data-search-trigger]');
  const overlay = document.querySelector('.search-overlay');

  if (!overlay) return;

  const input = overlay.querySelector('.search-overlay__input');
  const closeBtn = overlay.querySelector('[data-search-close]');

  // Open search
  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => openSearch(overlay, input));
  });

  // Close search
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeSearch(overlay));
  }

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeSearch(overlay);
      } else {
        openSearch(overlay, input);
      }
    }

    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeSearch(overlay);
    }
  });

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeSearch(overlay);
    }
  });
}

/**
 * Open search overlay
 */
function openSearch(overlay, input) {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus input after transition
  setTimeout(() => {
    if (input) input.focus();
  }, 100);
}

/**
 * Close search overlay
 */
function closeSearch(overlay) {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}
