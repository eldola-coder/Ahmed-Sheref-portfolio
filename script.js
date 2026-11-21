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
