/* ============================================================
   CONFIG.JS — Conexión con el backend de resultados (Google Sheets)
   ============================================================

   PASOS PARA ACTIVAR EL REGISTRO DE RESULTADOS:
   1. Crea una Google Sheet nueva (vacía).
   2. Extensiones → Apps Script.
   3. Borra el contenido y pega el código del archivo "google-apps-script.gs"
      que viene junto a este curso.
   4. Guarda. Luego Implementar → Nueva implementación → tipo "Aplicación web".
      - Ejecutar como: Yo (tu cuenta)
      - Quién tiene acceso: Cualquier usuario
   5. Copia la URL que te da ("Web app URL") y pégala abajo en
      GOOGLE_SHEETS_URL, reemplazando el texto de ejemplo.
   6. Sube este archivo actualizado a tu repositorio de GitHub.

   Si dejas GOOGLE_SHEETS_URL sin configurar, el curso funciona
   igual mostrando el mapa y el certificado, simplemente no
   quedará registro remoto de los resultados (solo localStorage
   en el navegador de cada persona).
   ============================================================ */

var GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxBN3U3e-bBaFwa_22Uk0cW7UrZIlpJng5m_7eTvSioPQ8dvc5BjRb_CS7LC1QyTl8Q/exec";

var REPORTING = {
  isConfigured: function () {
    return GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL.indexOf("https://") === 0;
  },

  send: function (evento, data) {
    if (!REPORTING.isConfigured()) {
      console.warn("REPORTING: GOOGLE_SHEETS_URL no está configurado. Evento no enviado:", evento, data);
      return;
    }
    var payload = Object.assign({
      evento: evento,
      timestamp: new Date().toISOString(),
      nombre: STATE.userName || "",
      puesto: STATE.userRole || "",
      cursoId: "somos-harmony-induccion-2026"
    }, data || {});

    try {
      fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script no soporta CORS estándar; esto evita que el navegador bloquee el envío.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      }).catch(function (err) {
        console.warn("REPORTING: no se pudo enviar el evento", evento, err);
      });
    } catch (e) {
      console.warn("REPORTING: error inesperado al enviar", e);
    }
  }
};
