(() => {
  const modal = document.querySelector('#enquiry-dialog');
  if (!modal) return;
  const form = modal.querySelector('#enquiry-form');
  const status = modal.querySelector('[data-enquiry-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  let opener = null;
  let openedFromNavigation = false;
  let sending = false;
  function syncViewport() {
    if (!modal.open) return;
    const viewport = window.visualViewport;
    modal.style.maxHeight = `${Math.max(160, (viewport?.height || window.innerHeight) - 24)}px`;
    modal.style.setProperty('--enquiry-top', `${viewport?.offsetTop || 0}px`);
  }
  window.visualViewport?.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('scroll', syncViewport);
  function openEnquiry(trigger) {
    opener = trigger;
    openedFromNavigation = Boolean(trigger?.closest('#site-nav'));
    if (typeof setMenuOpen === 'function') setMenuOpen(false);
    modal.showModal();
    document.body.classList.add('enquiry-open');
    syncViewport();
    modal.querySelector('#make-enquiry-title').focus();
  }
  document.querySelectorAll('[data-enquiry-open]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    openEnquiry(trigger);
  }));
  modal.querySelectorAll('[data-enquiry-close]').forEach(button => button.addEventListener('click', () => modal.close()));
  form.addEventListener('input', () => { if (!sending) status.hidden = true; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.hidden = true;
    const payload = new FormData(form);
    // FormSubmit uses the visitor's email as Reply-To; do not make staff reply to its no-reply sender.
    payload.set('_replyto', form.elements.email.value);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, { method: 'POST', body: payload, headers: { Accept: 'application/json' }, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('The enquiry service did not confirm acceptance.');
      form.reset();
      status.textContent = 'Your enquiry has been accepted for delivery to the California Republic team. Thank you.';
      status.dataset.state = 'success';
    } catch (error) {
      status.textContent = 'We couldn’t confirm your enquiry was sent. Your details are still here. Please email hellocalirepublic@gmail.com or call (02) 9411 3424 instead; avoid resending until you have checked.';
      status.dataset.state = 'error';
    } finally {
      clearTimeout(timeout);
      sending = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Send enquiry';
      status.hidden = false;
      if (modal.open) status.focus();
    }
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('enquiry-open');
    const target = openedFromNavigation && matchMedia('(max-width:1200px)').matches
      ? document.querySelector('.menu-toggle') : opener || document.querySelector('.site-header a');
    target?.focus();
  });
  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });
  if (location.hash === '#enquiry-dialog') openEnquiry(null);
})();
