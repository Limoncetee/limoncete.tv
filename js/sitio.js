// Menú del celular, reels que se cargan recién al tocarlos (la web queda liviana) y copiar la mira
(function () {
  var boton = document.querySelector('.menu-boton');
  var nav = document.getElementById('menu');
  if (boton && nav) {
    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.embed button[data-src]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = b.getAttribute('data-src');
      f.title = b.getAttribute('data-titulo') || 'Video de Limoncete';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      b.parentNode.replaceChild(f, b);
    });
  });
  // Botón para copiar el código de la mira
  document.querySelectorAll('button[data-copiar]').forEach(function (b) {
    b.addEventListener('click', function () {
      var texto = b.getAttribute('data-copiar');
      var aviso = b.parentNode.querySelector('.copiado');
      var listo = function () { if (aviso) { aviso.textContent = '¡Copiado!'; setTimeout(function () { aviso.textContent = ''; }, 2500); } };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(listo);
      } else {
        var t = document.createElement('textarea');
        t.value = texto; t.setAttribute('readonly', ''); t.style.position = 'absolute'; t.style.left = '-9999px';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); listo(); } catch (err) {}
        document.body.removeChild(t);
      }
    });
  });
})();
