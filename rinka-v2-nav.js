
/* Rinka Shop V2 — Concept A navigation (Staging). No backend calls. */
(function () {
  'use strict';

  function init() {
    if (document.getElementById('rinka-v2-bottom-nav')) return;

    var nav = document.createElement('nav');
    nav.id = 'rinka-v2-bottom-nav';
    nav.setAttribute('aria-label', 'เมนูทางลัด');

    var icons = {
      home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
      browse: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      cart: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
      account: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'
    };

    function icon(name) {
      return '<svg class="nav-ico" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        icons[name] + '</svg>';
    }

    nav.innerHTML =
      '<a href="home.html" data-page="home">' + icon('home') + '<span>หน้าแรก</span></a>' +
      '<a href="browse.html" data-page="browse">' + icon('browse') + '<span>สินค้า</span></a>' +
      '<button type="button" data-cart aria-label="เปิดตะกร้าสินค้า">' + icon('cart') + '<span>ตะกร้า</span></button>' +
      '<a href="account.html" data-page="account">' + icon('account') + '<span>บัญชี</span></a>';

    document.body.appendChild(nav);

    var page = (location.pathname.split('/').pop() || 'home.html').replace(/\.html$/, '');
    if (page === 'index') page = 'home';

    var active = nav.querySelector('[data-page="' + page + '"]');

    if (active) {
      active.classList.add('is-active');
      active.setAttribute('aria-current', 'page');
    }

    nav.querySelector('[data-cart]').addEventListener('click', function () {
      if (typeof window.openCartDrawer === 'function') {
        window.openCartDrawer();
      } else {
        window.location.href = 'cart.html';
      }
    });

    var ticking = false;

    function update() {
      // Hide floating navigation when the purchase bar is visible.
      var purchaseBar = document.querySelector('.product-page .actions');
      var purchaseVisible = false;

      if (purchaseBar) {
        var rect = purchaseBar.getBoundingClientRect();
        purchaseVisible =
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < window.innerHeight;
      }

      document.body.classList.toggle(
        'rinka-v2-purchase-visible',
        purchaseVisible
      );

      var visible = window.scrollY > 170 && !purchaseVisible;

      nav.classList.toggle('is-visible', visible);
      nav.setAttribute('aria-hidden', visible ? 'false' : 'true');

      nav.querySelectorAll('a,button').forEach(function (el) {
        el.tabIndex = visible ? 0 : -1;
      });

      ticking = false;
    }

    window.addEventListener('resize', update, { passive: true });

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
