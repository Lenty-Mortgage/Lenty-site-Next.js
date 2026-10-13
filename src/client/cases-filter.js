/* /cases/: filter chips. */
const grid = document.getElementById('caseGrid'), empty = document.getElementById('caseEmpty');
document.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((x) => x.setAttribute('aria-current', String(x === b)));
  const f = b.dataset.filter; let n = 0;
  grid.querySelectorAll('[data-situation]').forEach((c) => { const on = !f || c.dataset.situation === f; c.hidden = !on; if (on) n++; });
  empty.hidden = n > 0;
}));
