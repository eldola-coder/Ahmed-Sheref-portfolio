'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const menu = document.getElementById('menuBtn');
const nav = document.getElementById('navLinks');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const modal = document.getElementById('projectModal');
let trigger;
const fill = (id, value) => { document.getElementById(id).textContent = value; };
document.querySelectorAll('button[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = window.portfolioProjects[button.dataset.project];
    if (!project) return;
    trigger = button;
    fill('projectModalTitle', project.title);
    fill('projectModalDate', project.date);
    fill('projectModalSummary', project.summary);
    const image = document.getElementById('projectModalImage');
    image.src = project.image;
    image.alt = `${project.title} project preview`;
    const list = document.getElementById('projectModalHighlights');
    list.replaceChildren(...project.highlights.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    const tech = document.getElementById('projectModalTech');
    tech.replaceChildren(...project.tech.map(text => { const span = document.createElement('span'); span.textContent = text; return span; }));
    const links = document.getElementById('projectModalLinks');
    links.replaceChildren(...project.links.map(([label, href]) => { const a = document.createElement('a'); a.textContent = label; a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'btn ghost'; return a; }));
    modal.showModal();
    modal.scrollTop = 0;
    document.body.classList.add('modal-open');
    modal.querySelector('button').focus();
  });
});
modal.querySelector('.project-modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) modal.close();
});
modal.addEventListener('close', () => { document.body.classList.remove('modal-open'); trigger?.focus({preventScroll:true}); });
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    nav.querySelectorAll('a').forEach(a => {
      if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  });
}, {rootMargin:'-15% 0px -65% 0px', threshold:0});
sections.forEach(section => observer.observe(section));

const certificateCards = [...document.querySelectorAll('.certificate-card')];
const certificateFilters = [...document.querySelectorAll('[data-certificate-filter]')];
const showMoreCertificates = document.getElementById('showMoreCertificates');
const certificateStatus = document.getElementById('certificateStatus');
let certificateCategory = 'all';
let certificateLimit = 6;
function updateCertificates() {
  const matches = certificateCards.filter(card => certificateCategory === 'all' || card.dataset.category === certificateCategory);
  const visible = new Set(matches.slice(0, certificateLimit));
  certificateCards.forEach(card => { card.hidden = !visible.has(card); });
  certificateFilters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.certificateFilter === certificateCategory)));
  const remaining = Math.max(0, matches.length - certificateLimit);
  showMoreCertificates.hidden = remaining === 0;
  showMoreCertificates.textContent = `Show ${Math.min(6, remaining)} more certificates`;
  certificateStatus.textContent = `${visible.size} of ${matches.length} credentials`;
}
certificateFilters.forEach(button => button.addEventListener('click', () => {
  certificateCategory = button.dataset.certificateFilter;
  certificateLimit = 6;
  updateCertificates();
}));
showMoreCertificates.addEventListener('click', () => {
  const previouslyVisible = new Set(certificateCards.filter(card => !card.hidden));
  certificateLimit += 6;
  updateCertificates();
  certificateCards.find(card => !card.hidden && !previouslyVisible.has(card))?.querySelector('a')?.focus({preventScroll: true});
});
document.querySelector('.certificate-toolbar').hidden = false;
updateCertificates();

// Motion is progressive: content stays visible if animation support is unavailable.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const activeAnimations = new Set();
function playEntrance(element, delay = 0) {
  if (reducedMotion.matches || !element.animate) return;
  const animation = element.animate([
    { opacity: 0.15, transform: 'translateY(24px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 760, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
  activeAnimations.add(animation);
  animation.finished.then(() => activeAnimations.delete(animation), () => activeAnimations.delete(animation));
}
document.querySelectorAll('.hero-copy > *, .hero-profile').forEach((element, index) => {
  playEntrance(element, Math.min(index * 80, 400));
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children];
    playEntrance(entry.target, Math.min(siblings.indexOf(entry.target) * 65, 180));
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.section-head, .project-card, .skill-card, .experience-row, .about-grid > div, .certificate-card, .contact-inner > div').forEach(element => revealObserver.observe(element));

const portrait = document.querySelector('.portrait-frame');
let tiltFrame = 0;
function resetTilt() {
  cancelAnimationFrame(tiltFrame);
  portrait.style.removeProperty('--tilt-x');
  portrait.style.removeProperty('--tilt-y');
  portrait.style.removeProperty('--light-x');
  portrait.style.removeProperty('--light-y');
}
portrait.addEventListener('pointermove', event => {
  if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
  const rect = portrait.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
  cancelAnimationFrame(tiltFrame);
  tiltFrame = requestAnimationFrame(() => {
    portrait.style.setProperty('--tilt-x', `${(0.5 - y) * 9}deg`);
    portrait.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`);
    portrait.style.setProperty('--light-x', `${x * 100}%`);
    portrait.style.setProperty('--light-y', `${y * 100}%`);
  });
});
portrait.addEventListener('pointerleave', resetTilt);
portrait.addEventListener('pointercancel', resetTilt);
finePointer.addEventListener('change', resetTilt);
reducedMotion.addEventListener('change', () => {
  resetTilt();
  if (reducedMotion.matches) activeAnimations.forEach(animation => animation.cancel());
});
// Suspend ambient motion while the hero is outside the viewport or the tab is hidden.
let heroVisible = true;
function syncAmbientMotion() {
  document.querySelector('.hero').classList.toggle('motion-paused', !heroVisible || document.hidden);
}
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
  syncAmbientMotion();
}).observe(document.querySelector('.hero'));
document.addEventListener('visibilitychange', syncAmbientMotion);
