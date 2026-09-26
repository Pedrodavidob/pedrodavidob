/* =============================================================
   DR. KAIO GALINDO — interações
   Sem dependências externas. Tudo respeita prefers-reduced-motion.
   ============================================================= */
(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 1. Header e botão flutuante ---------- */
  var topo = $('#topo');
  var flutuante = $('#flutuante');

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    if (topo) topo.classList.toggle('fixo', y > 40);
    if (flutuante) flutuante.setAttribute('data-visivel', y > window.innerHeight * 0.7 ? 'true' : 'false');
  }
  var travado = false;
  window.addEventListener('scroll', function () {
    if (travado) return;
    travado = true;
    requestAnimationFrame(function () { aoRolar(); travado = false; });
  }, { passive: true });
  aoRolar();

  /* ---------- 2. Menu mobile ---------- */
  var hamb = $('#hamb'), menu = $('#menu'), fechar = $('#fechar-menu');
  var focoAnterior = null;

  function abrirMenu() {
    focoAnterior = document.activeElement;
    menu.setAttribute('data-aberto', 'true');
    hamb.setAttribute('aria-expanded', 'true');
    hamb.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
    var alvo = $('.menu__l', menu);
    if (alvo) alvo.focus({ preventScroll: true });
  }
  function fecharMenu() {
    menu.setAttribute('data-aberto', 'false');
    hamb.setAttribute('aria-expanded', 'false');
    hamb.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
    if (focoAnterior) focoAnterior.focus({ preventScroll: true });
  }

  if (hamb && menu) {
    hamb.addEventListener('click', function () {
      menu.getAttribute('data-aberto') === 'true' ? fecharMenu() : abrirMenu();
    });
    if (fechar) fechar.addEventListener('click', fecharMenu);
    $$('.menu__l, .menu__rodape a', menu).forEach(function (a) {
      a.addEventListener('click', fecharMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (menu.getAttribute('data-aberto') !== 'true') return;
      if (e.key === 'Escape') { fecharMenu(); return; }
      if (e.key !== 'Tab') return;
      var foco = $$('a[href], button', menu).filter(function (el) { return el.offsetParent !== null; });
      if (!foco.length) return;
      var primeiro = foco[0], ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    });
  }

  /* ---------- 3. Revelação no scroll ---------- */
  var alvos = $$('.rev');
  if (semMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('visivel');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- 4. Link ativo conforme a seção visível ---------- */
  (function navAtiva() {
    if (!('IntersectionObserver' in window)) return;
    var links = $$('.nav a[href^="#"]');
    if (!links.length) return;
    var porId = {};
    links.forEach(function (l) { porId[l.getAttribute('href').slice(1)] = l; });
    var secoes = Object.keys(porId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        var l = porId[e.target.id];
        if (l) l.style.color = e.isIntersecting ? 'var(--teal-700)' : '';
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secoes.forEach(function (s) { io.observe(s); });
  })();

  /* ---------- 5. Ano corrente ---------- */
  $$('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
