const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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

// Native horizontal scrolling remains available without JavaScript.
const sportsTrack = document.querySelector('.carousel-track');
if (sportsTrack && !sportsTrack.closest('[hidden]')) {
  const slides = [...sportsTrack.querySelectorAll('.sports-slide')];
  const controls = document.querySelector('.carousel-controls');
  const previous = controls.querySelector('.carousel-prev');
  const next = controls.querySelector('.carousel-next');
  const status = controls.querySelector('.carousel-status');
  let current = 0;
  function updateCarousel() {
    const maximum = sportsTrack.scrollWidth - sportsTrack.clientWidth;
    const position = sportsTrack.scrollLeft;
    current = slides.reduce((best, slide, index) => Math.abs(slide.offsetLeft - slides[0].offsetLeft - position) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - position) ? index : best, 0);
    if (position >= maximum - 2) current = slides.length - 1;
    status.textContent = `${current + 1} / ${slides.length}`;
    previous.disabled = position <= 2;
    next.disabled = position >= maximum - 2;
  }
  function movePhoto(direction) {
    const gap = parseFloat(getComputedStyle(sportsTrack).columnGap) || 0;
    const distance = slides[0].getBoundingClientRect().width + gap;
    sportsTrack.scrollBy({ left: direction * distance, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => movePhoto(-1));
  next.addEventListener('click', () => movePhoto(1));
  sportsTrack.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); movePhoto(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  let scheduled = false;
  sportsTrack.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateCarousel(); scheduled = false; });
  }, { passive: true });
  window.addEventListener('resize', updateCarousel);
  controls.hidden = slides.length < 2;
  updateCarousel();
}

// A non-blocking contact panel appears only beyond work experience.
const contactFloat = document.querySelector('.contact-float');
const experience = document.querySelector('#experience');
const contact = document.querySelector('#contact');
let contactDismissed = false;
function updateContactFloat() {
  contactFloat.hidden = contactDismissed || experience.getBoundingClientRect().bottom > 0 || contact.getBoundingClientRect().top < window.innerHeight;
}
contactFloat.querySelector('button').addEventListener('click', () => {
  contactDismissed = true;
  updateContactFloat();
});
window.addEventListener('scroll', updateContactFloat, { passive: true });
window.addEventListener('resize', updateContactFloat);
updateContactFloat();
