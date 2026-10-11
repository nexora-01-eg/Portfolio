/* ═══════════════════════════════════════════════════════════
   NEXORA Portfolio — Main JavaScript Module
   ═══════════════════════════════════════════════════════════ */

import { initNavbar } from './navbar.js';
import { initAnimations } from './animations.js';
import { initCursor } from './cursor.js';
import { initSearch } from './search.js';

/**
 * Initialize all modules when DOM is ready
 */
function init() {
  initNavbar();
  initAnimations();
  initCursor();
  initSearch();
  initPageTransition();
  initButtonRipples();
  initCounters();
  initComponentTabs();
}

/**
 * Page Transition System
 * Handles smooth transitions between pages
 */
function initPageTransition() {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Handle internal link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    const isInternal = href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:');

    if (isInternal && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      overlay.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });

  // Fade out overlay on page load
  window.addEventListener('pageshow', () => {
    overlay.classList.remove('active');
  });
}

/**
 * Button Ripple Effect
 * Adds material-style ripple to buttons on click
 */
function initButtonRipples() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.btn-ripple, .btn');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

/**
 * Counter Animation
 * Animates number counters on scroll
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.counter, 10);
  const suffix = element.dataset.counterSuffix || '';
  const prefix = element.dataset.counterPrefix || '';
  const duration = parseInt(element.dataset.counterDuration, 10) || 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Component Explorer Tabs
 * Handles tab switching on the components page
 */
function initComponentTabs() {
  const tabContainer = document.querySelector('.components-showcase__nav');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('.components-showcase__tab');
  const panels = document.querySelectorAll('.components-showcase__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === targetTab) {
          panel.classList.add('active');
        }
      });
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
