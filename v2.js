const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

function setMenuOpen(open) {
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  const label = menuButton?.querySelector('span');
  const icon = menuButton?.querySelector('b');
  if (label) label.textContent = open ? 'Close' : 'Menu';
  if (icon) icon.textContent = open ? '×' : '•••';
  nav?.classList.toggle('open', open);
}
menuButton?.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('pointerdown', event => {
  if (nav?.classList.contains('open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) setMenuOpen(false);
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function selectTab(tab) {
  tabs.forEach((item) => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  panels.forEach((panel) => {
    const active = panel.id === tab.getAttribute('aria-controls');
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    if (['ArrowUp', 'ArrowDown'].includes(event.key) && !matchMedia('(max-width:900px)').matches) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowDown') nextIndex = (index + 2) % tabs.length;
    if (event.key === 'ArrowUp') nextIndex = (index - 2 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    tabs[nextIndex].focus();
    selectTab(tabs[nextIndex]);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Motion can be paused explicitly as well as by hover, focus or touch.
const motionButton = document.querySelector('#motion-toggle');
motionButton?.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
});
document.querySelectorAll('.marquee').forEach(bar => {
  bar.addEventListener('pointerdown', () => document.body.classList.add('motion-paused'));
});
tabs.forEach(tab => tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1);
tabs.forEach(tab => tab.addEventListener('click', () => tabs.forEach(t => t.tabIndex = t === tab ? 0 : -1)));
document.querySelectorAll('[data-promo]').forEach(link => link.addEventListener('click', (event) => {
  const tab = document.querySelector('#tab-' + link.dataset.promo);
  if (tab) {
    event.preventDefault();
    selectTab(tab);
    document.querySelector('#specials')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}));
const requestedSpecial = new URLSearchParams(location.search).get('special');
const requestedTab = tabs.find(tab => tab.dataset.special === requestedSpecial);
if (requestedTab) selectTab(requestedTab);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) { setMenuOpen(false); menuButton?.focus(); }
});
const categories = document.querySelectorAll('.web-category');
if (categories.length) {
  const menuHeader = document.querySelector('.site-header');
  const categoryNav = document.querySelector('.category-nav');
  const updateMenuOffsets = () => {
    document.body.style.setProperty('--menu-header-height', `${menuHeader.offsetHeight}px`);
    document.body.style.setProperty('--menu-nav-height', `${categoryNav.offsetHeight}px`);
  };
  new ResizeObserver(updateMenuOffsets).observe(menuHeader);
  new ResizeObserver(updateMenuOffsets).observe(categoryNav);
  updateMenuOffsets();
  const categoryObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.category-nav a').forEach(a => {
      if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }), { rootMargin: '-20% 0px -60% 0px' });
  categories.forEach(category => categoryObserver.observe(category));
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.body.classList.add('motion-ready');
document.querySelectorAll('.marquee-group[aria-hidden] a').forEach(a => a.tabIndex = -1);

// Retain compatibility with earlier private-preview FAQ links.
if (location.hash === '#faqs') location.replace('faq.html');
