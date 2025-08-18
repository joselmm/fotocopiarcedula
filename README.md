# Generador de “fotocopia” de cédula al 150% (anverso + reverso)

**Descripción corta**
Repositorio con una pequeña herramienta web (HTML + JS) que, a partir de dos fotos (anverso y reverso), genera automáticamente un **PDF** tamaño Letter u Ofício/Legal con cada lado de la cédula escalado **exactamente** al **150%** (128.4 × 81 mm) y posicionado en la página para imprimir como una fotocopia simulada. Ideal para preparar una hoja imprimible sin usar software pesado.

---

# Características principales

* Subir anverso y reverso (archivos JPG/PNG) desde el navegador.
* Genera PDF con unidades en **mm** para coincidencia exacta de medida.
* Escala las imágenes a **128.4 × 81 mm** (150% del tamaño ID-1).
* Posiciona las imágenes centradas horizontalmente y con gap configurable verticalmente.
* Soporta páginas **Letter** (8.5×11 in) y **Legal/Oficio** (8.5×14 in).
* Genera un PDF descargable listo para imprimir (nombre por defecto `cedula_150_pct.pdf`).
* Código simple, sin backend — todo se procesa localmente en el navegador (privacidad).

---
