/* /partners/: "We'll set up your partner account" form. No PII in the console: only field names. */
const f = document.getElementById('partnerForm');
f.addEventListener('submit', async (e) => {
  e.preventDefault();
  const bad = (id, c) => { document.getElementById(id).closest('.field').classList.toggle('invalid', c); return c; };
  const err = f.querySelector('[data-err]'); err.hidden = true;
  const n = bad('p-name', !f.name.value.trim()), p = bad('p-phone', !/^[0-9 +\-()]{7,16}$/.test(f.mobile.value.trim())), m = bad('p-email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()));
  if (n || p || m) { err.textContent = 'A couple of fields need a look.'; err.hidden = false; return; }
  const fd = new FormData(f); const payload = { form: 'partner' }; fd.forEach((v, k) => { payload[k] = v; });
  const ep = (window.LENTY && window.LENTY.leadEndpoint) || null;
  try {
    if (ep) { const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!r.ok) throw new Error('HTTP ' + r.status); }
    else console.log('[lenty] partner form (not sent — PUBLIC_LEAD_ENDPOINT not set). Fields:', Object.keys(payload).join(', '));
    (window.dataLayer = window.dataLayer || []).push({ event: 'partner_form_submit', role: payload.role });
    f.querySelector('[data-ok]').hidden = false; f.querySelector('button[type=submit]').disabled = true;
  } catch (x) { err.textContent = "Something went wrong and the form didn't send. Please try again or WhatsApp us."; err.hidden = false; }
});
