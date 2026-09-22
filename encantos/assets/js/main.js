/* =============================================================
   ENCANTOS FLORES E CHOCOLATES — interações
   Sem dependências externas. Tudo respeita prefers-reduced-motion.
   ============================================================= */
(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 1. Navegação fixa ---------- */
  var nav = $('#nav');
  var barra = $('#barra-zap');
  var ultimo = 0;

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('fixa', y > 40);
    // barra de WhatsApp aparece depois que o hero sai de cena
    if (barra) barra.setAttribute('data-visivel', y > window.innerHeight * 0.6 ? 'true' : 'false');
    ultimo = y;
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
      // prende o foco dentro do menu enquanto ele estiver aberto
      var foco = $$('a[href], button', menu).filter(function (el) { return el.offsetParent !== null; });
      if (!foco.length) return;
      var primeiro = foco[0], ultimoEl = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimoEl.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimoEl) { e.preventDefault(); primeiro.focus(); }
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
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- 4. Entrada do hero ---------- */
  var hero = $('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('pronto'); });

  /* ---------- 5. Pétalas ---------- */
  (function petalas() {
    if (semMovimento) return;
    var caixa = document.getElementById('petalas');
    if (!caixa) return;
    var cores = ['rgba(239,199,194,.75)', 'rgba(246,220,216,.7)', 'rgba(6,96,47,.16)', 'rgba(201,166,107,.4)'];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 9; i++) {
      var p = document.createElement('span');
      var t = 13 + Math.random() * 16;
      p.className = 'petala';
      p.style.cssText =
        'left:' + (Math.random() * 96) + '%;' +
        'width:' + t + 'px;height:' + (t * 1.25) + 'px;' +
        'color:' + cores[i % cores.length] + ';' +
        'animation-duration:' + (16 + Math.random() * 16) + 's;' +
        'animation-delay:-' + (Math.random() * 18) + 's;';
      p.innerHTML = '<svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><use href="#i-petala"></use></svg>';
      frag.appendChild(p);
    }
    caixa.appendChild(frag);
  })();

  /* ---------- 6. Parallax leve do hero ---------- */
  (function parallax() {
    if (semMovimento) return;
    var arte = $('.hero__arte');
    if (!arte) return;
    var rodando = false;
    window.addEventListener('scroll', function () {
      if (rodando) return;
      rodando = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        if (y < window.innerHeight * 1.3) {
          arte.style.transform = 'translate3d(0,' + (y * -0.055).toFixed(2) + 'px,0)';
        }
        rodando = false;
      });
    }, { passive: true });
  })();

  /* ---------- 7. Fotografias reais (drop-in) ----------
     Cada moldura declara data-foto="nome". Basta salvar o arquivo
     assets/img/fotos/nome.jpg (ou .webp/.png) que a foto entra no lugar
     da arte, sem mexer no código. Enquanto o arquivo não existir, nada
     quebra: o HTML não pede nenhuma imagem inexistente.
     Se houver um assets/img/fotos/fotos.json com a lista de arquivos,
     ele é usado e nenhuma requisição extra é feita.                       */
  (function fotos() {
    var molduras = $$('[data-foto]');
    if (!molduras.length) return;

    function aplicar(moldura, url) {
      var alvo = $('.ph__foto', moldura);
      if (!alvo) return;
      alvo.style.backgroundImage = 'url("' + url + '")';
      moldura.classList.add('tem-foto');
    }

    function porManifesto(lista) {
      var mapa = {};
      lista.forEach(function (arq) { mapa[arq.replace(/\.[^.]+$/, '')] = arq; });
      molduras.forEach(function (m) {
        var n = m.getAttribute('data-foto');
        if (mapa[n]) aplicar(m, 'assets/img/fotos/' + mapa[n]);
      });
    }

    function porSondagem(moldura) {
      var exts = ['jpg', 'webp', 'png', 'jpeg'], i = 0;
      var nome = moldura.getAttribute('data-foto');
      (function tentar() {
        if (i >= exts.length) return;            // sem foto: mantém a arte
        var url = 'assets/img/fotos/' + nome + '.' + exts[i++];
        var img = new Image();
        img.onload = function () { aplicar(moldura, url); };
        img.onerror = tentar;
        img.src = url;
      })();
    }

    function sondarSobDemanda() {
      if (!('IntersectionObserver' in window)) { molduras.forEach(porSondagem); return; }
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          porSondagem(e.target);
        });
      }, { rootMargin: '300px 0px' });
      molduras.forEach(function (m) { io.observe(m); });
    }

    if (!window.fetch) { sondarSobDemanda(); return; }
    fetch('assets/img/fotos/fotos.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (lista) { Array.isArray(lista) ? porManifesto(lista) : sondarSobDemanda(); })
      .catch(sondarSobDemanda);
  })();

  /* ---------- 8. Ano corrente (caso seja usado) ---------- */
  $$('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
