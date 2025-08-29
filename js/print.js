
(function () {
  var btn = document.getElementById('printBtn');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    // interceptamos para aplicar filtro si corresponde
    e.preventDefault && e.preventDefault();
    // evitar que otros handlers se ejecuten (si existieran)
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e.stopPropagation) e.stopPropagation();

    var applyGray = !!document.getElementById('gray').checked;

    // Obtener la imagen del canvas (snapshot)
    // Usamos el toDataURL del objeto fabric (funciona igual que canvas DOM)
    var dataUrl = canvas.toDataURL({ format: 'png' });

    // Abrir ventana inmediatamente para evitar popup-blockers
    var printWin = window.open('', '_blank');
    if (!printWin) {
      alert('El navegador bloqueó la ventana de impresión. Permite popups para este sitio e inténtalo de nuevo.');
      return;
    }

    // Función que escribe y dispara print en la ventana abierta
    function writeAndPrint(finalDataUrl) {
      var towrite = '<html>' +
        '<head><title>Imprimir</title></head>' +
        '<body style="margin:0; display:flex; justify-content:center; align-items:center;">' +
        '<img src="' + finalDataUrl + '" style="width:100%; height:auto;" />' +
        '<script>' +
        'window.onload = function(){ window.print(); window.onafterprint = function(){ window.close(); }; };' +
        '<\/script>' +
        '</body>' +
        '</html>';

      printWin.document.open();
      printWin.document.write(towrite);
      printWin.document.close();
    }

    // Si NO hay que aplicar gris, imprimimos directo
    if (!applyGray) {
      writeAndPrint(dataUrl);
      return;
    }

    // Si hay que aplicar gris, dibujamos en un canvas offscreen con ctx.filter
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      try {
        var off = document.createElement('canvas');
        off.width = img.width;
        off.height = img.height;
        var ctx = off.getContext('2d');

        // aplicar filtro global antes de dibujar
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(img, 0, 0, off.width, off.height);

        var grayData = off.toDataURL('image/png');
        writeAndPrint(grayData);
      } catch (err) {
        // fallback: si algo falla (por CORS raro), imprimimos el original
        console.error('Error aplicando filtro gris:', err);
        writeAndPrint(dataUrl);
      }
    };
    img.onerror = function () {
      // si no carga la imagen por alguna razón, imprimimos original
      writeAndPrint(dataUrl);
    };
    img.src = dataUrl;

  }, true); // use capture true para interceptar antes que otros listeners si los hay
})();
