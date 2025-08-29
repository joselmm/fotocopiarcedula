document.getElementById('printBtn').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;

  // Exportar imagen del canvas
  var dataUrl = canvas.toDataURL("image/png");

  // Crear PDF tamaño carta (Letter)
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter" // 612 x 792 pt
  });

  const pageWidth = pdf.internal.pageSize.getWidth();

  // insertamos imagen escalada al ancho
  pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, 0);

  // Generar blob
  const pdfBlob = pdf.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // 1️⃣ Abrir en nueva pestaña (preview para el usuario)
 // window.open(pdfUrl, "_blank");

  // 2️⃣ (Opcional) Intentar imprimir automáticamente con iframe oculto
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.src = pdfUrl;
  document.body.appendChild(iframe);

  iframe.onload = function () {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      console.error("No se pudo imprimir automáticamente:", err);
    }
  };
});
