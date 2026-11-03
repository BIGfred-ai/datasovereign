// DataSovereign — interactive demonstration only.
// All values and choices are illustrative. Nothing is uploaded or sold.
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.data-category-card')];
  const pricingValue = document.querySelector('.pricing-value');

  function updateCard(card) {
    const selected = card.querySelector('.sharing-option.active');
    const level = selected?.dataset.value || 'none';
    card.querySelectorAll('.sharing-option').forEach(button => {
      button.setAttribute('aria-pressed', String(button === selected));
    });
    card.querySelectorAll('.data-point-value').forEach((point, index) => {
      const included = level === 'full' || (level === 'partial' && index % 2 === 0);
      point.textContent = included ? 'Selected in demo' : 'Not selected';
    });
  }

  function updatePricing() {
    let total = 0;
    cards.forEach(card => {
      const selected = card.querySelector('.sharing-option.active');
      const amount = Number.parseFloat(card.querySelector('.category-value')?.textContent.replace(/[^0-9.]/g, '') || '0');
      const factor = { none: 0, partial: 0.5, full: 1 }[selected?.dataset.value] ?? 0;
      total += amount * factor;
    });
    if (pricingValue) {
      pricingValue.textContent = '$' + total.toFixed(2) + '/month (example)';
    }
  }

  cards.forEach(card => {
    card.querySelectorAll('.sharing-option').forEach(button => {
      button.addEventListener('click', () => {
        card.querySelectorAll('.sharing-option').forEach(other => {
          other.classList.toggle('active', other === button);
        });
        updateCard(card);
        updatePricing();
      });
    });
    updateCard(card);
  });
  updatePricing();

  const navLinks = [...document.querySelectorAll('.nav-links a')];
  navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(other => other.classList.toggle('active', other === link));
  }));
});
