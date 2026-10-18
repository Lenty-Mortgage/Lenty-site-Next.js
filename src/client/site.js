/* Site-wide behaviour: analytics delegation, cookie bar, dropdown hover, theme switch. Progressive — the page works without it. */
(function () {
  window.dataLayer = window.dataLayer || [];
  var push = function (ev, data) {
    try { window.dataLayer.push(Object.assign({ event: ev }, data || {})); } catch (e) {}
  };

  /* click delegation: whatsapp_click / call_click / email_click / cta_check_click / social_click / partner_app_click (+ data-cta) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-event]');
    if (!a) return;
    var p = { page: a.getAttribute('data-page') || location.pathname };
    if (a.getAttribute('data-cta')) p.cta = a.getAttribute('data-cta');
    push(a.getAttribute('data-event'), p);
  });

  /* cookie bar (one line, localStorage) → Google Consent Mode v2 update + cookie_consent_update for GTM.
     The default state is set inline in <head> (app/layout.tsx) before GTM loads. */
  var bar = document.getElementById('cookie');
  if (bar) {
    var KEY = 'lenty-cookies';
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    var showBar = function () { bar.hidden = false; bar.classList.add('show'); };
    if (!choice) {
      // On phones, don't cover the first screen's buttons: show after the first scroll (or after 8 s).
      if (window.matchMedia('(max-width: 900px)').matches) {
        var onScroll = function () { if (window.scrollY > 240) { showBar(); window.removeEventListener('scroll', onScroll); } };
        window.addEventListener('scroll', onScroll, { passive: true });
        setTimeout(showBar, 8000);
      } else showBar();
    }
    /* first-party cookies of analytics/ads tags, removed when consent is withdrawn */
    var dropTrackingCookies = function () {
      document.cookie.split('; ').forEach(function (c) {
        var name = c.split('=')[0];
        if (/^(_ga|_gid|_gcl_|_clck|_clsk|_fbp|_fbc)/.test(name)) {
          [location.hostname, '.' + location.hostname.replace(/^www\./, '')].forEach(function (d) {
            document.cookie = name + '=; Max-Age=0; path=/; domain=' + d;
          });
          document.cookie = name + '=; Max-Age=0; path=/';
        }
      });
    };
    var source = 'banner';
    bar.querySelectorAll('[data-cookie]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-cookie');
        var prev = null;
        try { prev = localStorage.getItem(KEY); localStorage.setItem(KEY, v); } catch (e) {}
        bar.classList.remove('show'); bar.hidden = true;
        var ok = v === 'all', s = ok ? 'granted' : 'denied';
        if (window.gtag) window.gtag('consent', 'update', {
          functionality_storage: s, personalization_storage: s,
          analytics_storage: s, ad_storage: s, ad_user_data: s, ad_personalization: s
        });
        if (window.gtag) window.gtag('set', 'ads_data_redaction', !ok);
        push('cookie_consent_update', {
          consent_state: { necessary: true, preferences: ok, analytics: ok, marketing: ok },
          consent_action: ok ? 'accept_all' : 'reject_all',
          consent_source: source
        });
        if (!ok && prev === 'all') dropTrackingCookies();
      });
    });
    /* "Cookie settings" in the footer reopens the bar */
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-cookie-settings]')) { source = 'settings'; showBar(); }
    });
  }

  /* FAQ: faq_open with the question text (toggle does not bubble, so capture) */
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d && d.tagName === 'DETAILS' && d.classList.contains('qa') && d.open) {
      var q = d.querySelector('summary');
      push('faq_open', { question: q ? q.textContent.trim().slice(0, 100) : '' });
    }
  }, true);

  /* "My situation" dropdown: open on hover (desktop), click works natively via <details>; close on outside click / Esc */
  var dd = document.querySelector('[data-dd]');
  if (dd) {
    var hoverOk = window.matchMedia('(hover: hover)').matches;
    var t;
    if (hoverOk) {
      dd.addEventListener('mouseenter', function () { clearTimeout(t); dd.open = true; });
      dd.addEventListener('mouseleave', function () { t = setTimeout(function () { dd.open = false; }, 180); });
    }
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) dd.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dd.open = false; });
  }
  var mn = document.querySelector('.mobile-nav');
  if (mn) document.addEventListener('click', function (e) { if (!mn.contains(e.target)) mn.open = false; });

  /* home page: dark header only while the Hero C is on screen */
  var hero = document.querySelector('.hero-c');
  if (hdrEl() && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { hdrEl().classList.toggle('on-hero', es[0].isIntersecting); }, { rootMargin: '-64px 0px 0px 0px', threshold: 0 }).observe(hero);
  }
  function hdrEl() { return document.querySelector('header.site'); }

  /* theme switch (mobile menu → Settings, footer): Auto follows the system, Light / Dark are remembered */
  var tBtns = document.querySelectorAll('[data-theme-btn]');
  var markTheme = function () {
    var cur = document.documentElement.getAttribute('data-theme') || 'auto';
    tBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-btn') === cur)); });
  };
  tBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-theme-btn');
      if (t === 'auto') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', t);
      try { if (t === 'auto') localStorage.removeItem('lenty-theme'); else localStorage.setItem('lenty-theme', t); } catch (e) {}
      markTheme();
    });
  });
  markTheme();

  /* keep --hdr-h in sync with the real header height (Hero C tucks under it) */
  var hdr = document.querySelector('header.site');
  if (hdr) {
    var sync = function () { document.documentElement.style.setProperty('--hdr-h', hdr.offsetHeight + 'px'); };
    sync(); window.addEventListener('resize', sync);
  }
})();

/* Mobile bar: hide it while the hero buttons are on screen, so the same buttons don't show twice */
(function () {
  var ctas = document.querySelector('.hc-ctas');
  if (!ctas || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (entries) {
    document.body.classList.toggle('hero-ctas-visible', entries[0].isIntersecting);
  }, { threshold: 0.2 }).observe(ctas);
})();
