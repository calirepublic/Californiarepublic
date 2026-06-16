const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
const forms = document.querySelectorAll('form');

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks?.classList.toggle('is-open', !isOpen);
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
