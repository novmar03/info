// All experience remains readable without JavaScript.
const switcher = document.querySelector('.team-switcher');
const teamButtons = [...document.querySelectorAll('[data-select-team]')];
const teamPanels = [...document.querySelectorAll('[data-team]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function selectTeam(id) {
  teamButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.selectTeam === id)));
  teamPanels.forEach(panel => {
    panel.hidden = panel.dataset.team !== id;
    if (!panel.hidden && !reducedMotion.matches && panel.animate) {
      panel.animate([{ opacity: .5, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 240, easing: 'ease-out' });
    }
  });
}
if (switcher && teamPanels.length) {
  switcher.hidden = false;
  selectTeam('0');
  teamButtons.forEach(button => button.addEventListener('click', () => selectTeam(button.dataset.selectTeam)));
}

// Animate visible content without leaving anything hidden if scripting is unavailable.
if ('IntersectionObserver' in window) {
  const entrance = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entrance.unobserve(entry.target);
      if (!reducedMotion.matches && entry.target.animate) {
        entry.target.classList.add('arriving');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('arriving'), { once: true });
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('h1,.hero-bottom,.section-heading,.case,.pet-project,.skill-group,.education-intro,.education-records article,.photo-gallery,.contact-email').forEach(element => entrance.observe(element));
}
