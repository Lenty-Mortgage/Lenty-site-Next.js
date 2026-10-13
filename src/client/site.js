/* Site-wide behaviour: analytics delegation, cookie bar, dropdown hover. Progressive — the page works without it. */
(function () {
  window.dataLayer = window.dataLayer || [];
  var push = function (ev, data) {
    try { window.dataLayer.push(Object.assign({ event: ev }, data || {})); } catch (e) {}
  };

  /* click delegation: whatsapp_click / call_click / partner_app_click (+ data-cta) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-event]');
    if (!a) return;
    var p = { page: a.getAttribute('data-page') || location.pathname };
    if (a.getAttribute('data-cta')) p.cta = a.getAttribute('data-cta');
    push(a.getAttribute('data-event'), p);
  });

  /* cookie bar (one line, localStorage) */
  var bar = document.getElementById('cookie');
  if (bar) {
    var KEY = 'lenty-cookies';
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    if (!choice) {
      var showBar = function () { bar.hidden = false; bar.classList.add('show'); };
      // On phones, don't cover the first screen's buttons: show after the first scroll (or after 8 s).
      if (window.matchMedia('(max-width: 900px)').matches) {
        var onScroll = function () { if (window.scrollY > 240) { showBar(); window.removeEventListener('scroll', onScroll); } };
        window.addEventListener('scroll', onScroll, { passive: true });
        setTimeout(showBar, 8000);
      } else showBar();
    }
    else push('cookie_consent', { choice: choice });
    bar.querySelectorAll('[data-cookie]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-cookie');
        try { localStorage.setItem(KEY, v); } catch (e) {}
        bar.classList.remove('show'); bar.hidden = true;
        if (v === 'all' && window.LENTY && window.LENTY.analytics) window.LENTY.analytics();
        push('cookie_consent', { choice: v });
      });
    });
  }

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

  /* A/B preview switch (floating pill on desktop, mobile menu → Settings): Original / Test / Test 1 */
  var vBtns = document.querySelectorAll('[data-variant-btn]');
  var markVariant = function () {
    var cur = document.documentElement.getAttribute('data-variant') || 'original';
    vBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-variant-btn') === cur)); });
  };
  vBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-variant-btn');
      if (v === 'test' || v === 'test1') document.documentElement.setAttribute('data-variant', v);
      else document.documentElement.removeAttribute('data-variant');
      try { localStorage.setItem('lenty-variant', v); } catch (e) {}
      markVariant();
    });
  });
  markVariant();

  /* Test 1 carousels: one dot per card (active one follows the scroll); ← → arrows on desktop */
  document.querySelectorAll('[data-carousel]').forEach(function (car) {
    var nav = car.parentElement.querySelector('.car-dots');
    if (!nav) return;
    var items = car.children;
    var arrow = function (dir, label) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'car-arr'; b.textContent = dir < 0 ? '←' : '→'; b.setAttribute('aria-label', label);
      b.addEventListener('click', function () {
        var w = items[0] ? items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(car).columnGap || 0) : car.clientWidth;
        car.scrollBy({ left: dir * w, behavior: 'smooth' });
      });
      return b;
    };
    var prev = arrow(-1, 'Previous'), next = arrow(1, 'Next');
    nav.removeAttribute('aria-hidden');
    nav.appendChild(prev);
    var dots = [];
    for (var i = 0; i < items.length; i++) { var d = document.createElement('i'); d.setAttribute('aria-hidden', 'true'); nav.appendChild(d); dots.push(d); }
    nav.appendChild(next);
    var mark = function () {
      var max = car.scrollWidth - car.clientWidth;
      nav.classList.toggle('off', max <= 2 && getComputedStyle(car).overflowX !== 'visible');
      var w = items[0] ? items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(car).columnGap || 0) : 1;
      var idx = Math.round(car.scrollLeft / w);
      if (car.scrollLeft >= max - 4) idx = items.length - 1;
      dots.forEach(function (d, j) { d.classList.toggle('on', j === idx); });
      prev.disabled = car.scrollLeft <= 2;
      next.disabled = car.scrollLeft >= max - 2;
    };
    car.addEventListener('scroll', mark, { passive: true });
    window.addEventListener('resize', mark);
    document.querySelectorAll('[data-variant-btn]').forEach(function (b) { b.addEventListener('click', function () { setTimeout(mark, 0); }); });
    mark();
  });

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
