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
  document.querySelectorAll('h1,.hero-bottom,.section-heading,.case,.pet-project,.skill-group,.education-intro,.education-records article,.contact-email').forEach(element => entrance.observe(element));
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

// Keep contact available from the end of projects through the footer.
const contactFloat = document.querySelector('.contact-float');
const projects = document.querySelector('#projects');
const pageScroll = document.querySelector('.page-scroll');
document.body.classList.add('enhanced-layout');
function updateContactFloat() {
  // Use the full viewport threshold so reserving dock space cannot toggle it back off.
  const visible = projects.getBoundingClientRect().bottom <= window.innerHeight;
  contactFloat.hidden = !visible;
  document.body.classList.toggle('contact-visible', visible);
}
pageScroll.addEventListener('scroll', updateContactFloat, { passive: true });
window.addEventListener('resize', updateContactFloat);
new ResizeObserver(updateContactFloat).observe(projects);
updateContactFloat();

const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
const mobileMenu = window.matchMedia('(max-width: 650px)');
menuToggle.hidden = false;
function closeMenu() {
  header.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
header.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
header.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); menuToggle.focus(); }
});
mobileMenu.addEventListener('change', closeMenu);

const preview = document.querySelector('.preview-dialog');
const previewImage = preview.querySelector('img');
document.querySelectorAll('.project-preview').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !preview.showModal) return;
    event.preventDefault();
    previewImage.src = link.href;
    previewImage.alt = link.querySelector('img').alt;
    preview.querySelector('h2').textContent = link.closest('article').querySelector('h3').textContent;
    preview.showModal();
  });
});
preview.querySelector('.preview-close').addEventListener('click', () => preview.close());
preview.addEventListener('click', event => {
  const bounds = preview.getBoundingClientRect();
  if (event.target === preview && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) preview.close();
});
