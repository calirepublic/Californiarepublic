document.querySelectorAll('.faq-item summary').forEach((summary) => {
  summary.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    const item = summary.closest('details');
    if (item) item.open = !item.open;
  });
});
