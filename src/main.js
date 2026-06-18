const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');
const revealItems = document.querySelectorAll('.reveal');
const inquiryModal = document.querySelector('#inquiry-modal');
const inquiryOpenButtons = document.querySelectorAll('[data-inquiry-open]');
const inquiryCloseButtons = document.querySelectorAll('[data-inquiry-close]');
const inquiryForm = document.querySelector('#inquiry-form');
const inquiryStatus = inquiryForm?.querySelector('.form-status');

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

const openInquiryForm = () => {
  if (!inquiryModal) return;

  if (typeof inquiryModal.showModal === 'function') {
    inquiryModal.showModal();
  } else {
    inquiryModal.setAttribute('open', '');
  }

  document.body.classList.add('modal-open');
  inquiryForm?.querySelector('input:not([type="hidden"]), textarea')?.focus();
};

const closeInquiryForm = () => {
  if (!inquiryModal) return;

  if (typeof inquiryModal.close === 'function') {
    inquiryModal.close();
  } else {
    inquiryModal.removeAttribute('open');
  }

  document.body.classList.remove('modal-open');
};

inquiryOpenButtons.forEach((button) => {
  button.addEventListener('click', openInquiryForm);
});

inquiryCloseButtons.forEach((button) => {
  button.addEventListener('click', closeInquiryForm);
});

inquiryModal?.addEventListener('click', (event) => {
  if (event.target === inquiryModal) {
    closeInquiryForm();
  }
});

inquiryModal?.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
});

inquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = inquiryForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.textContent ?? 'Send';

  if (inquiryStatus) {
    inquiryStatus.textContent = '';
    inquiryStatus.className = 'form-status';
  }

  if (submitButton) {
    submitButton.textContent = 'Sending…';
    submitButton.setAttribute('disabled', 'true');
  }

  try {
    const response = await fetch(inquiryForm.action, {
      method: inquiryForm.method,
      body: new FormData(inquiryForm),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Inquiry service rejected the request.');
    }

    inquiryForm.reset();
    if (inquiryStatus) {
      inquiryStatus.textContent = 'Thanks — your inquiry has been sent to the California Republic team.';
      inquiryStatus.classList.add('is-success');
    }

    if (submitButton) {
      submitButton.textContent = 'Sent';
    }
  } catch (error) {
    if (inquiryStatus) {
      inquiryStatus.textContent = 'Sorry, something went wrong. Please try again in a moment.';
      inquiryStatus.classList.add('is-error');
    }

    if (submitButton) {
      submitButton.textContent = originalButtonText;
      submitButton.removeAttribute('disabled');
    }
  }
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
