// ============================================
// NAV SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ============================================
// SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// TAG POPOVERS
// ============================================
document.querySelectorAll('.tag-more').forEach(btn => {
  const popover = btn.nextElementSibling;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !popover.hidden;
    // Close all others first
    document.querySelectorAll('.tag-popover').forEach(p => { p.hidden = true; });
    document.querySelectorAll('.tag-more').forEach(b => b.setAttribute('aria-expanded', 'false'));
    // Toggle this one
    popover.hidden = isOpen;
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.tag-popover').forEach(p => { p.hidden = true; });
  document.querySelectorAll('.tag-more').forEach(b => b.setAttribute('aria-expanded', 'false'));
});

// ============================================
// SMOOTH ANCHOR SCROLLING (offset for fixed nav)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 24;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
