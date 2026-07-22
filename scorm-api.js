/* ============================================================
   SCORM 1.2 API Wrapper — Harmony Projects · Somos Harmony
   Busca el objeto API en la ventana actual, en padres o en el
   opener (según especificación SCORM 1.2), y expone funciones
   sencillas: initialize, get, set, save, finish.
   Si no se encuentra ningún LMS (por ejemplo al abrir el curso
   directamente en el navegador para revisión), funciona en modo
   "standalone" simulando el almacenamiento en memoria para que
   el curso no se rompa.
   ============================================================ */

var SCORM = (function () {
  var API = null;
  var initialized = false;
  var standalone = false;
  var LS_KEY = "somos_harmony_standalone_progress";

  function lsGetAll() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function lsSetAll(obj) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  var standaloneData = {};

  function setStandaloneUser(name) {
    var slug = String(name || "anonimo")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    LS_KEY = "somos_harmony_progress_" + (slug || "anonimo");
    standaloneData = lsGetAll();
  }

  function findAPI(win) {
    var attempts = 0;
    while (win && !win.API && win.parent && win.parent !== win && attempts < 10) {
      attempts++;
      win = win.parent;
    }
    return win ? win.API : null;
  }

  function getAPI() {
    var theAPI = findAPI(window);
    if (!theAPI && window.opener) {
      theAPI = findAPI(window.opener);
    }
    return theAPI;
  }

  function init() {
    API = getAPI();
    if (!API) {
      standalone = true;
      console.warn("SCORM: no se encontró un LMS. Ejecutando en modo standalone (sin tracking real).");
      initialized = true;
      return true;
    }
    var result = API.LMSInitialize("");
    initialized = (result === "true" || result === true);
    if (!initialized) {
      console.warn("SCORM: LMSInitialize falló. Continuando en modo standalone.");
      standalone = true;
      initialized = true;
    }
    return initialized;
  }

  function get(param) {
    if (standalone) return standaloneData[param] || "";
    if (!API) return "";
    var value = API.LMSGetValue(param);
    return value;
  }

  function set(param, value) {
    if (standalone) {
      standaloneData[param] = value;
      lsSetAll(standaloneData);
      return true;
    }
    if (!API) return false;
    var result = API.LMSSetValue(param, value);
    return result === "true" || result === true;
  }

  function save() {
    if (standalone) return true;
    if (!API) return false;
    var result = API.LMSCommit("");
    return result === "true" || result === true;
  }

  function finish() {
    if (standalone) return true;
    if (!API) return false;
    save();
    var result = API.LMSFinish("");
    return result === "true" || result === true;
  }

  function setStatus(status) {
    // status: "incomplete", "completed", "passed", "failed"
    set("cmi.core.lesson_status", status);
    save();
  }

  function setScore(raw, min, max) {
    set("cmi.core.score.raw", String(raw));
    set("cmi.core.score.min", String(min !== undefined ? min : 0));
    set("cmi.core.score.max", String(max !== undefined ? max : 100));
    save();
  }

  function setSuspendData(obj) {
    try {
      var str = JSON.stringify(obj);
      set("cmi.suspend_data", str);
      save();
    } catch (e) {
      console.warn("SCORM: no se pudo guardar suspend_data", e);
    }
  }

  function getSuspendData() {
    var raw = get("cmi.suspend_data");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  return {
    setStandaloneUser: setStandaloneUser,
    init: init,
    get: get,
    set: set,
    save: save,
    finish: finish,
    setStatus: setStatus,
    setScore: setScore,
    setSuspendData: setSuspendData,
    getSuspendData: getSuspendData,
    isStandalone: function () { return standalone; }
  };
})();
