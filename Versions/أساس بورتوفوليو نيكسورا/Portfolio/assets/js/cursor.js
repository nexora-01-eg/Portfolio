/* ═══════════════════════════════════════════════════════════
   NEXORA Portfolio — Custom Cursor Module
   ═══════════════════════════════════════════════════════════ */

/**
 * Initialize custom cursor effects
 */
export function initCursor() {
  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = createCursor();
  const cursorDot = cursor.querySelector('.cursor-dot');
  const cursorRing = cursor.querySelector('.cursor-ring');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let isActive = false;
  let rafId = null;

  function animate() {
    const ease = 0.15;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isActive) {
      isActive = true;
      cursor.classList.add('active');
      animate();
    }
  });

  // Pause cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });

  document.addEventListener('mouseenter', () => {
    if (isActive) cursor.classList.add('active');
  });

  // Interactive element detection
  initInteractiveDetection(cursor);
}

/**
 * Create cursor DOM elements
 */
function createCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
  `;
  document.body.appendChild(cursor);
  return cursor;
}

/**
 * Detect interactive elements and update cursor state
 */
function initInteractiveDetection(cursor) {
  const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .card--interactive, .btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.add('cursor--interactive');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.remove('cursor--interactive');
    }
  });
}
