/* ═══════════════════════════════════════════════════════════
   NEXORA Portfolio — Animations Module
   ═══════════════════════════════════════════════════════════ */

/**
 * Initialize all animation systems
 */
export function initAnimations() {
  initScrollReveal();
  initParallaxEffects();
  initHeroGradient();
}

/**
 * Scroll Reveal System
 * Elements with .reveal class animate in when scrolled into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add small delay for natural feel
        requestAnimationFrame(() => {
          entry.target.classList.add('revealed');
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Parallax Effects
 * Subtle parallax on hero sections
 */
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const relativeScroll = scrollY - elementTop + window.innerHeight;

      if (relativeScroll > 0 && rect.bottom > 0) {
        const yPos = relativeScroll * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Hero Gradient Mouse Follow
 * Subtle gradient movement following cursor in hero sections
 */
function initHeroGradient() {
  const heroes = document.querySelectorAll('.hero-section');
  if (!heroes.length) return;

  // Check for touch device
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;

  heroes.forEach(hero => {
    const gradient = hero.querySelector('.floating-gradient');
    if (!gradient) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isActive = false;
    let rafId = null;

    function animate() {
      const ease = 0.08;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      gradient.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;

      if (isActive) {
        rafId = requestAnimationFrame(animate);
      }
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (!isActive) {
        isActive = true;
        animate();
      }
    });

    hero.addEventListener('mouseleave', () => {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
    });
  });
}

/**
 * Stagger Children Animation
 * Adds staggered reveal to child elements
 */
export function staggerReveal(container, selector = '.reveal', staggerDelay = 50) {
  const children = container.querySelectorAll(selector);
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * staggerDelay}ms`;
    child.classList.add('reveal');
  });
}

/**
 * Animate elements with CSS class toggling
 */
export function animateElement(element, animationClass, duration = 600) {
  return new Promise(resolve => {
    element.classList.add(animationClass);

    setTimeout(() => {
      element.classList.remove(animationClass);
      resolve();
    }, duration);
  });
}
