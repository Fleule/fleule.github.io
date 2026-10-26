// Fleule website interactions: spotlight, mobile navigation, current year and reveal animations.
document.addEventListener('DOMContentLoaded', () => {
  const spotlight = document.getElementById('spotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      spotlight.style.setProperty('--x', `${event.clientX}px`);
      spotlight.style.setProperty('--y', `${event.clientY}px`);
    }, { passive: true });
  }

  const menu = document.querySelector('.menu');
  const links = document.getElementById('navLinks');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.textContent = isOpen ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        menu.textContent = '☰';
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }
});
