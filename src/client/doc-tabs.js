/* /how-it-works/: documents-by-situation tabs. */
document.querySelectorAll('[role=tablist] [role=tab]').forEach((t) => t.addEventListener('click', () => {
  const list = t.closest('[role=tablist]');
  list.querySelectorAll('[role=tab]').forEach((x) => x.setAttribute('aria-selected', String(x === t)));
  list.parentElement.querySelectorAll('[role=tabpanel]').forEach((p) => { p.hidden = p.id !== t.getAttribute('aria-controls'); });
}));
