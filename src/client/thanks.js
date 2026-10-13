/* /thanks/: personalise the heading from sessionStorage and fire the conversion event once per lead. */
(function () {
  (window.dataLayer = window.dataLayer || []);
  var lead = null;
  try { lead = JSON.parse(sessionStorage.getItem('lenty-lead') || 'null'); } catch (e) {}
  if (lead) {
    if (lead.firstName) document.getElementById('thanksName').textContent = ', ' + lead.firstName;
    if (lead.channel) document.getElementById('thanksChannel').textContent = lead.channel === 'Email' ? 'email' : lead.channel === 'Phone call' ? 'the phone' : 'WhatsApp';
  }
  // conversion event fires only here, once per lead
  var fired = false; try { fired = sessionStorage.getItem('lenty-conv') === '1'; } catch (e) {}
  if (!fired) { window.dataLayer.push({ event: 'form_submit', form: 'check', situation: (lead && lead.situation) || '' }); try { sessionStorage.setItem('lenty-conv', '1'); } catch (e) {} }
})();
