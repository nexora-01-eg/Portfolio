/* ═══════════════════════════════════════════════════════════
   NEXORA Portfolio — Navigation Module
   ═══════════════════════════════════════════════════════════ */

/**
 * Initialize navigation functionality
 */
export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  initScrollBehavior(navbar);
  initMobileMenu(navbar);
  initActiveLink();
}

/**
 * Handle navbar appearance on scroll
 */
function initScrollBehavior(navbar) {
  let lastScroll = 0;
  let ticking = false;

  function updateNavbar() {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateNavbar();
}

/**
 * Mobile menu toggle
 */
function initMobileMenu(navbar) {
  const toggle = navbar.querySelector('.navbar__toggle');
  const mobile = navbar.querySelector('.navbar__mobile');

  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobile.classList.toggle('active');
    document.body.style.overflow = mobile.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  const mobileLinks = mobile.querySelectorAll('.navbar__mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobile.classList.contains('active')) {
      toggle.classList.remove('active');
      mobile.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Highlight active navigation link based on current page
 */
function initActiveLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  // Desktop links
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.split('/').pop();
      if (linkPage === pageName || (pageName === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    }
  });

  // Mobile links
  document.querySelectorAll('.navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.split('/').pop();
      if (linkPage === pageName || (pageName === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    }
  });
}
