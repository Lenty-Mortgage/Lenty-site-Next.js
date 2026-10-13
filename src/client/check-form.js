/* /check form controller. Steps are server-rendered; this only drives state, validation and submission.
   No PII is ever written to console: only the field names. */
(function () {
  const root = document.getElementById('check');
  if (!root) return;
  const form = document.getElementById('checkForm');
  const TOTAL = +root.dataset.total;
  const hasIntro = root.dataset.intro === '1';
  const steps = Array.from(form.querySelectorAll('[data-step]'));
  const intro = root.querySelector('[data-screen="0"]');
  const bar = document.getElementById('qbar');
  const answers = {};
  let current = hasIntro ? 0 : 1;
  let started = false;
  const dl = (ev, data) => { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, data || {})); };

  /* hidden fields: situation (?s=), utm_*, gclid */
  const q = new URLSearchParams(location.search);
  const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
  set('f-situation', q.get('s') || q.get('situation') || '');
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach((k) => set('f-' + k, q.get(k) || ''));

  function show(n) {
    current = n;
    if (intro) intro.hidden = n !== 0;
    steps.forEach((s) => { s.hidden = +s.dataset.step !== n; });
    bar.style.width = Math.round(Math.max(0, n - 1) / TOTAL * 100) + '%';
    const h = form.querySelector(`[data-step="${n}"] h2`);
    if (h) { h.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'auto' }); }
    if (n >= 1 && n <= TOTAL) dl('form_step_' + n, { step: n });
    if (n === 6) fillSummary();
  }
  function start() { if (!started) { started = true; dl('salesforce_form_start'); } }

  /* single-choice groups: select → auto-advance (unless the step has an extra field) */
  form.querySelectorAll('[data-single]').forEach((g) => {
    const key = g.dataset.single;
    g.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
      start();
      g.querySelectorAll('.opt').forEach((o) => o.setAttribute('aria-checked', 'false'));
      b.setAttribute('aria-checked', 'true');
      answers[key] = b.value;
      const step = g.closest('[data-step]');
      const err = step.querySelector('[data-err]'); if (err) err.hidden = true;
      const extra = step.querySelector('[data-extra]');
      const next = step.querySelector('[data-next]');
      if (extra) {
        const needs = b.dataset.needs === extra.dataset.extra;
        extra.hidden = !needs; if (next) next.hidden = !needs;
        if (!needs) { answers.country = ''; advance(); }
        else { extra.querySelector('select').focus(); }
        return;
      }
      /* step 4 has two single groups: advance when both chosen; step 3 has a currency chip row: use Continue */
      const groups = step.querySelectorAll('[data-single]');
      if (groups.length === 1 && !step.querySelector('.seg')) advance();
      else if (groups.length > 1 && Array.from(groups).every((x) => answers[x.dataset.single])) advance();
    }));
  });
  /* multi-choice */
  form.querySelectorAll('[data-multi]').forEach((g) => {
    const key = g.dataset.multi;
    g.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
      start();
      const on = b.getAttribute('aria-checked') !== 'true';
      if (b.hasAttribute('data-exclusive') && on) g.querySelectorAll('.opt').forEach((o) => o.setAttribute('aria-checked', 'false'));
      else if (on) g.querySelectorAll('[data-exclusive]').forEach((o) => o.setAttribute('aria-checked', 'false'));
      b.setAttribute('aria-checked', String(on));
      answers[key] = Array.from(g.querySelectorAll('.opt[aria-checked="true"]')).map((o) => o.value);
      const err = g.closest('[data-step]').querySelector('[data-err]'); if (err) err.hidden = true;
    }));
  });

  function validateStep(n) {
    const step = form.querySelector(`[data-step="${n}"]`);
    const err = step.querySelector('[data-err]');
    let ok = true;
    if (n === 2) {
      ok = !!answers.status;
      const extra = step.querySelector('[data-extra]');
      if (ok && !extra.hidden) { const sel = extra.querySelector('select'); ok = !!sel.value; extra.classList.toggle('invalid', !ok); answers.country = sel.value; }
    } else if (n === 3) { ok = !!answers.work; answers.currency = (form.querySelector('input[name=currency]:checked') || {}).value; }
    else if (n === 4) ok = !!answers.income && !!answers.price;
    else if (n === 5) ok = Array.isArray(answers.history) && answers.history.length > 0;
    else if (n === 1) ok = !!answers.stage;
    if (err) err.hidden = ok;
    return ok;
  }
  function advance() { if (current >= 1 && current <= 5 && !validateStep(current)) return; show(current + 1); }

  form.querySelectorAll('[data-next]').forEach((b) => b.addEventListener('click', advance));
  form.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => show(Math.max(hasIntro ? 0 : 1, current - 1))));
  root.querySelectorAll('[data-start]').forEach((b) => b.addEventListener('click', () => { start(); show(1); }));

  function fillSummary() {
    const s = (k, v) => { const el = form.querySelector(`[data-sum="${k}"]`); if (el) el.textContent = v || '—'; };
    s('stage', answers.stage); s('status', answers.status); s('work', answers.work); s('currency', answers.currency);
    s('income', answers.income); s('price', answers.price); s('history', (answers.history || []).join(', '));
    const cr = form.querySelector('[data-sum-row="country"]'); cr.hidden = !answers.country; s('country', answers.country);
    const nr = answers.status === 'Non-resident';
    form.querySelector('[data-callout="nonresident"]').hidden = !nr;
    form.querySelector('[data-callout="resident"]').hidden = nr;
    const h = answers.history || [];
    form.querySelector('[data-callout="declined"]').hidden = !(h.includes('A bank declined me') || h.includes('Credit cards or loans are high'));
  }

  /* contact step validation, human language */
  function field(id) { return document.getElementById(id).closest('.field'); }
  function validateContact() {
    let ok = true;
    const name = document.getElementById('f-name'), phone = document.getElementById('f-phone'), email = document.getElementById('f-email'), priv = document.getElementById('f-privacy');
    const bad = (el, cond) => { field(el.id).classList.toggle('invalid', cond); if (cond) ok = false; };
    bad(name, !name.value.trim());
    bad(phone, !/^[0-9 \-()]{6,16}$/.test(phone.value.trim()));
    bad(email, !!email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    bad(priv, !priv.checked);
    const first = form.querySelector('[data-step="7"] .field.invalid input, [data-step="7"] .field.invalid select');
    if (first) first.focus();
    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errBox = form.querySelector('[data-step="7"] [data-err]');
    errBox.hidden = true;
    if (!validateContact()) { errBox.textContent = 'A couple of fields need a look — see the notes above.'; errBox.hidden = false; return; }
    const fd = new FormData(form);
    const payload = {
      firstName: fd.get('firstName').trim(),
      mobile: fd.get('countryCode') + ' ' + fd.get('mobile').trim(),
      channel: fd.get('channel'), email: (fd.get('email') || '').trim(), language: fd.get('language'), bestTime: fd.get('bestTime'),
      privacy: true,
      answers: { stage: answers.stage, status: answers.status, country: answers.country || '', work: answers.work, currency: answers.currency, income: answers.income, price: answers.price, history: answers.history || [] },
      situation: fd.get('situation'), page: fd.get('page'),
      utm: { source: fd.get('utm_source'), medium: fd.get('utm_medium'), campaign: fd.get('utm_campaign'), term: fd.get('utm_term'), content: fd.get('utm_content') },
      gclid: fd.get('gclid'), submittedAt: new Date().toISOString(), referrer: document.referrer,
    };
    const btn = document.getElementById('submitBtn'); btn.disabled = true; btn.textContent = 'Sending…';
    const endpoint = (window.LENTY && window.LENTY.leadEndpoint) || null;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('HTTP ' + res.status);
      } else {
        /* no endpoint configured on this test site: log the STRUCTURE only (no values) */
        console.log('[lenty] lead (not sent — PUBLIC_LEAD_ENDPOINT not set). Fields:', Object.keys(payload).join(', '), '| answers:', Object.keys(payload.answers).join(', '));
      }
      try { sessionStorage.setItem('lenty-lead', JSON.stringify({ firstName: payload.firstName, channel: payload.channel, situation: payload.situation })); } catch (e) {}
      dl('salesforce_form_submit_success', { situation: payload.situation || '', status: payload.answers.status, channel: payload.channel });
      location.href = root.dataset.thanks;
    } catch (err) {
      btn.disabled = false; btn.textContent = 'Send to my advisor';
      errBox.textContent = "Something went wrong on our side and the form didn't send. Please try again, or message an advisor on WhatsApp.";
      errBox.hidden = false;
      dl('form_submit_error', { reason: String(err && err.message || err) });
    }
  });

  show(current);
})();
