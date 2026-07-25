const root = document.documentElement;
const header = document.querySelector('[data-header]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#07111f' : '#f6f7f3');
}

setTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

function closeMenu() {
  menu.classList.remove('is-open');
  header.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  header.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const sections = [...document.querySelectorAll('main section[id]')];
function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - window.innerHeight * 0.35) current = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px' });

  root.classList.add('js');
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}
document.querySelector('[data-year]').textContent = new Date().getFullYear();
