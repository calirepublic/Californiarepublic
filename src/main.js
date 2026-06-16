const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
const forms = document.querySelectorAll('form');
const revealItems = document.querySelectorAll('.reveal');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('nav-open', !isOpen);
});

navLinks?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }
});

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Request Received';
      button.setAttribute('disabled', 'true');
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}


const optionalPhotos = [
  ['.photo-hero', './assets/photos/hero-tacos-drinks.jpg'],
  ['.photo-order', './assets/photos/order-burger.jpg'],
  ['.photo-reserve', './assets/photos/reserve-venue.jpg'],
  ['.photo-special-tacos', './assets/photos/special-tacos.jpg'],
  ['.photo-special-burger', './assets/photos/special-burger.jpg'],
  ['.photo-special-margarita', './assets/photos/special-margarita.jpg'],
  ['.photo-special-kids', './assets/photos/special-kids.jpg'],
  ['.photo-feature-tacos', './assets/photos/feature-tacos.jpg'],
  ['.photo-feature-burger', './assets/photos/feature-burger.jpg'],
  ['.photo-feature-grill', './assets/photos/feature-grill.jpg'],
  ['.photo-feature-mexican', './assets/photos/feature-mexican.jpg'],
  ['.photo-drink-margarita', './assets/photos/drink-margarita.jpg'],
  ['.photo-drink-cocktail', './assets/photos/drink-cocktail.jpg'],
  ['.photo-drink-mocktail', './assets/photos/drink-mocktail.jpg'],
  ['.photo-gallery-tacos', './assets/photos/gallery-tacos.jpg'],
  ['.photo-gallery-burgers', './assets/photos/gallery-burgers.jpg'],
  ['.photo-gallery-ribs', './assets/photos/gallery-ribs.jpg'],
  ['.photo-gallery-mocktails', './assets/photos/gallery-mocktails.jpg'],
  ['.photo-gallery-kids', './assets/photos/gallery-kids.jpg'],
  ['.photo-gallery-venue', './assets/photos/gallery-venue.jpg'],
];

optionalPhotos.forEach(([selector, src]) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const photo = new Image();
  photo.onload = () => {
    element.classList.add('has-photo');
    element.style.backgroundImage = `url("${src}")`;
  };
  photo.src = src;
});
