/* ============================================================
   APP.JS — Motor del curso "Somos Harmony"
   ============================================================ */

var STATE = {
  unlocked: 1,          // hasta qué nivel (id) está desbloqueado
  completed: {},        // { levelId: { correct, total, percent } }
  badges: [],           // [{icon,name}]
  totalPoints: 0,
  certName: "",
  userName: "",
  userRole: ""
};

var RUNTIME = {
  currentLevel: null,   // objeto de nivel abierto actualmente
  stepIndex: 0,
  steps: [],
  quizIndex: 0,
  quizCorrect: 0,
  matchState: null
};

var ALL_LEVEL_IDS = LEVELS.map(function (l) { return l.id; }).concat([FINAL_LEVEL.id]);
var TOTAL_LEVELS = ALL_LEVEL_IDS.length;

/* ---------------- Inicialización ---------------- */
window.addEventListener("DOMContentLoaded", function () {
  goToScreen("screen-namegate");

  document.getElementById("btn-confirm-name").addEventListener("click", confirmNameGate);
  document.getElementById("gate-name-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") confirmNameGate();
  });

  document.getElementById("btn-start-mission").addEventListener("click", function () {
    goToScreen("screen-map");
  });
  document.getElementById("btn-back-map").addEventListener("click", function () {
    saveProgress();
    goToScreen("screen-map");
  });

  window.addEventListener("beforeunload", function () {
    SCORM.save();
  });
});

function confirmNameGate() {
  var nameInput = document.getElementById("gate-name-input");
  var roleInput = document.getElementById("gate-role-input");
  var error = document.getElementById("gate-error");
  var name = (nameInput.value || "").trim();

  if (name.length < 3) {
    error.style.display = "block";
    nameInput.focus();
    return;
  }
  error.style.display = "none";

  STATE.userName = name;
  STATE.userRole = (roleInput.value || "").trim();

  SCORM.setStandaloneUser(name);
  SCORM.init();
  loadProgress();
  renderMap();
  updateTopbar();

  var displayName = STATE.userName || name;
  document.getElementById("welcome-title").textContent = "¡Bienvenido(a), " + displayName.split(" ")[0] + "!";
  var certPreview = document.getElementById("cert-name-preview");
  if (certPreview) certPreview.textContent = displayName;

  REPORTING.send("inicio_curso", {});

  goToScreen("screen-welcome");
}

/* ---------------- Persistencia ---------------- */
function loadProgress() {
  var data = SCORM.getSuspendData();
  if (data) {
    STATE.unlocked = data.unlocked || 1;
    STATE.completed = data.completed || {};
    STATE.badges = data.badges || [];
    STATE.totalPoints = data.totalPoints || 0;
    STATE.certName = data.certName || "";
    if (data.userName) STATE.userName = data.userName;
    if (data.userRole) STATE.userRole = data.userRole;
  }
  var status = SCORM.get("cmi.core.lesson_status");
  if (!status || status === "not attempted") {
    SCORM.setStatus("incomplete");
  }
}

function saveProgress() {
  SCORM.setSuspendData(STATE);
  var completedCount = Object.keys(STATE.completed).length;
  var percent = Math.round((completedCount / TOTAL_LEVELS) * 100);
  SCORM.set("cmi.core.score.raw", String(STATE.totalPoints));
  SCORM.save();
}

/* ---------------- Navegación entre pantallas ---------------- */
function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(function (s) { s.classList.remove("active"); });
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

function updateTopbar() {
  var completedCount = Object.keys(STATE.completed).length;
  var percent = Math.round((completedCount / TOTAL_LEVELS) * 100);
  document.getElementById("topbar-progress-fill").style.width = percent + "%";
  document.getElementById("topbar-points").textContent = STATE.totalPoints;
  document.getElementById("topbar-percent").textContent = percent + "%";
}

/* ---------------- Mapa de misión ---------------- */
function renderMap() {
  var wrap = document.getElementById("map-nodes");
  wrap.innerHTML = "";
  var allLevels = LEVELS.concat([FINAL_LEVEL]);

  allLevels.forEach(function (lvl) {
    var isDone = !!STATE.completed[lvl.id];
    var isLocked = lvl.id > STATE.unlocked;
    var isCurrent = !isDone && !isLocked;

    var node = document.createElement("div");
    node.className = "node" + (isLocked ? " locked" : "") + (isDone ? " done" : "") + (isCurrent ? " current" : "");

    var badgeHtml = "";
    if (isDone) {
      badgeHtml = '<div class="node-check">✓</div>';
    } else if (isLocked) {
      badgeHtml = '<div class="node-lock">🔒</div>';
    }

    node.innerHTML =
      '<div class="node-circle">' + lvl.icon + badgeHtml + '</div>' +
      '<div class="node-label">' + lvl.title + '</div>' +
      '<div class="node-sub">' + (isDone ? "Completado" : (isLocked ? "Bloqueado" : "Nivel " + lvl.id)) + '</div>';

    if (!isLocked) {
      node.addEventListener("click", function () { openLevel(lvl.id); });
    }
    wrap.appendChild(node);
  });

  renderBadgeShelf();
}

function renderBadgeShelf() {
  var shelf = document.getElementById("badges-shelf");
  shelf.innerHTML = "";
  var allLevels = LEVELS.concat([FINAL_LEVEL]);
  allLevels.forEach(function (lvl) {
    var earned = STATE.badges.find(function (b) { return b.name === lvl.badge.name; });
    var chip = document.createElement("div");
    chip.className = "badge-chip" + (earned ? "" : " locked");
    chip.innerHTML = '<span class="em">' + lvl.badge.icon + '</span> ' + lvl.badge.name;
    shelf.appendChild(chip);
  });
}

/* ---------------- Abrir nivel ---------------- */
function openLevel(id) {
  var lvl = LEVELS.find(function (l) { return l.id === id; });
  if (!lvl) {
    if (FINAL_LEVEL.id === id) {
      openFinalLevel();
      return;
    }
    return;
  }
  RUNTIME.currentLevel = lvl;
  RUNTIME.stepIndex = 0;
  RUNTIME.quizIndex = 0;
  RUNTIME.quizCorrect = 0;

  RUNTIME.steps = lvl.content.map(function (html) { return { type: "content", html: html }; });
  if (lvl.activity) RUNTIME.steps.push({ type: "activity" });
  RUNTIME.steps.push({ type: "quiz" });
  RUNTIME.steps.push({ type: "result" });

  setLevelHero(lvl);
  renderStep();
  goToScreen("screen-level");
}

function setLevelHero(lvl) {
  var hero = document.getElementById("level-hero");
  hero.style.backgroundImage = lvl.hero ? "url('" + lvl.hero + "')" : "none";
  hero.style.backgroundColor = "#1f3a2c";
  document.getElementById("level-kicker").textContent = "Nivel " + lvl.id + " · " + (lvl.subtitle || "");
  document.getElementById("level-title").textContent = lvl.title;
}

/* ---------------- Render de pasos dentro de un nivel ---------------- */
function renderStep() {
  var body = document.getElementById("level-body");
  var step = RUNTIME.steps[RUNTIME.stepIndex];
  renderStepDots();
  body.innerHTML = "";

  if (step.type === "content") {
    var div = document.createElement("div");
    div.innerHTML = step.html;
    body.appendChild(div);
    body.appendChild(navButtons(true, "Siguiente"));
  } else if (step.type === "activity") {
    renderActivity(body, RUNTIME.currentLevel.activity);
  } else if (step.type === "quiz") {
    renderQuizQuestion(body, RUNTIME.currentLevel.quiz);
  } else if (step.type === "result") {
    renderLevelResult(body, RUNTIME.currentLevel);
  }
}

function renderStepDots() {
  var dotsWrap = document.getElementById("step-dots");
  dotsWrap.innerHTML = "";
  RUNTIME.steps.forEach(function (s, i) {
    var d = document.createElement("div");
    d.className = "dot" + (i === RUNTIME.stepIndex ? " active" : (i < RUNTIME.stepIndex ? " past" : ""));
    dotsWrap.appendChild(d);
  });
}

function navButtons(showNext, nextLabel) {
  var row = document.createElement("div");
  row.className = "btn-row";
  if (showNext) {
    var btn = document.createElement("button");
    btn.className = "btn gold";
    btn.textContent = nextLabel || "Siguiente";
    btn.addEventListener("click", function () {
      RUNTIME.stepIndex++;
      renderStep();
    });
    row.appendChild(btn);
  }
  return row;
}

/* ---------------- Actividad: juego de emparejar ---------------- */
function renderActivity(body, activity) {
  var card = document.createElement("div");
  card.className = "card";
  card.innerHTML =
    '<div class="eyebrow">Actividad</div><h3>Emparejar</h3><p>' + activity.instructions + '</p>' +
    '<div class="match-wrap"><div class="match-col" id="match-left"><h4>Elemento</h4></div>' +
    '<div class="match-col" id="match-right"><h4>Descripción</h4></div></div>' +
    '<div id="activity-continue"></div>';
  body.appendChild(card);

  var pairs = activity.pairs.map(function (p, i) { return { id: i, left: p.left, right: p.right }; });
  var leftItems = pairs.slice();
  var rightItems = shuffle(pairs.slice());

  RUNTIME.matchState = { matched: 0, total: pairs.length, selectedLeft: null };

  var leftCol = card.querySelector("#match-left");
  var rightCol = card.querySelector("#match-right");

  leftItems.forEach(function (item) {
    var el = document.createElement("div");
    el.className = "match-item";
    el.dataset.id = item.id;
    el.innerHTML = renderMatchContent(item.left);
    el.addEventListener("click", function () { onMatchLeftClick(el, item); });
    leftCol.appendChild(el);
  });

  rightItems.forEach(function (item) {
    var el = document.createElement("div");
    el.className = "match-item";
    el.dataset.id = item.id;
    el.innerHTML = renderMatchContent(item.right);
    el.addEventListener("click", function () { onMatchRightClick(el, item); });
    rightCol.appendChild(el);
  });

  updateActivityContinue(false);
}

function renderMatchContent(text) {
  if (typeof text === "string" && text.indexOf("img:") === 0) {
    return '<img src="' + text.substring(4) + '" alt="">';
  }
  return text;
}

function onMatchLeftClick(el, item) {
  if (el.classList.contains("correct")) return;
  document.querySelectorAll("#match-left .match-item").forEach(function (n) { n.classList.remove("selected"); });
  el.classList.add("selected");
  RUNTIME.matchState.selectedLeft = { el: el, item: item };
}

function onMatchRightClick(el, item) {
  if (el.classList.contains("correct")) return;
  var sel = RUNTIME.matchState.selectedLeft;
  if (!sel) return;
  if (sel.item.id === item.id) {
    sel.el.classList.add("correct", "disabled");
    el.classList.add("correct", "disabled");
    RUNTIME.matchState.matched++;
    RUNTIME.matchState.selectedLeft = null;
    if (RUNTIME.matchState.matched >= RUNTIME.matchState.total) {
      updateActivityContinue(true);
    }
  } else {
    el.classList.add("wrong");
    sel.el.classList.add("wrong");
    setTimeout(function () {
      el.classList.remove("wrong");
      sel.el.classList.remove("wrong", "selected");
    }, 450);
    RUNTIME.matchState.selectedLeft = null;
  }
}

function updateActivityContinue(done) {
  var wrap = document.getElementById("activity-continue");
  wrap.innerHTML = "";
  if (done) {
    var msg = document.createElement("p");
    msg.style.textAlign = "center";
    msg.style.color = "#3f5c46";
    msg.style.fontWeight = "700";
    msg.textContent = "¡Excelente! Emparejaste todo correctamente. +20 pts";
    wrap.appendChild(msg);
    STATE.totalPoints += 20;
    updateTopbar();
    wrap.appendChild(navButtons(true, "Continuar"));
  }
}

/* ---------------- Quiz ---------------- */
function renderQuizQuestion(body, quiz) {
  var q = quiz[RUNTIME.quizIndex];
  var card = document.createElement("div");
  card.className = "card";
  var letters = ["A", "B", "C", "D", "E"];

  card.innerHTML =
    '<div class="quiz-progress"><span>Pregunta ' + (RUNTIME.quizIndex + 1) + ' de ' + quiz.length + '</span><span>⭐ ' + STATE.totalPoints + ' pts</span></div>' +
    '<div class="quiz-q">' + q.q + '</div>' +
    '<div class="quiz-options" id="quiz-options"></div>' +
    '<div class="quiz-feedback" id="quiz-feedback"></div>' +
    '<div id="quiz-continue"></div>';
  body.appendChild(card);

  var optsWrap = card.querySelector("#quiz-options");
  q.options.forEach(function (opt, i) {
    var el = document.createElement("div");
    el.className = "quiz-opt";
    el.innerHTML = '<span class="letter">' + letters[i] + '</span><span>' + opt + '</span>';
    el.addEventListener("click", function () { onQuizAnswer(el, i, q, quiz); });
    optsWrap.appendChild(el);
  });
}

function onQuizAnswer(el, index, q, quiz) {
  var options = document.querySelectorAll("#quiz-options .quiz-opt");
  options.forEach(function (o) { o.classList.add("locked"); });

  var feedback = document.getElementById("quiz-feedback");
  var isCorrect = index === q.correct;

  if (isCorrect) {
    el.classList.add("correct");
    feedback.className = "quiz-feedback show good";
    feedback.textContent = "¡Correcto! +10 pts";
    STATE.totalPoints += 10;
    RUNTIME.quizCorrect++;
  } else {
    el.classList.add("wrong");
    options[q.correct].classList.add("correct");
    feedback.className = "quiz-feedback show bad";
    feedback.textContent = "No exactamente. La respuesta correcta está resaltada.";
  }
  updateTopbar();

  var contWrap = document.getElementById("quiz-continue");
  contWrap.innerHTML = "";
  var btn = document.createElement("button");
  btn.className = "btn gold";
  btn.style.marginTop = "16px";
  btn.textContent = (RUNTIME.quizIndex < quiz.length - 1) ? "Siguiente pregunta" : "Ver resultado";
  btn.addEventListener("click", function () {
    RUNTIME.quizIndex++;
    if (RUNTIME.quizIndex < quiz.length) {
      renderStep_QuizOnly(quiz);
    } else {
      RUNTIME.stepIndex++;
      renderStep();
    }
  });
  var row = document.createElement("div");
  row.className = "btn-row";
  row.appendChild(btn);
  contWrap.appendChild(row);
}

function renderStep_QuizOnly(quiz) {
  var body = document.getElementById("level-body");
  body.innerHTML = "";
  renderQuizQuestion(body, quiz);
}

/* ---------------- Resultado de nivel ---------------- */
function renderLevelResult(body, lvl) {
  var total = lvl.quiz.length;
  var correct = RUNTIME.quizCorrect;
  var percent = Math.round((correct / total) * 100);
  var passed = percent >= COURSE.passPercent;
  var stars = percent >= 90 ? "★★★" : percent >= 70 ? "★★☆" : percent >= 50 ? "★☆☆" : "☆☆☆";

  var card = document.createElement("div");
  card.className = "card result-card";
  card.innerHTML =
    '<div class="eyebrow">Resultado del nivel</div>' +
    '<h2>' + lvl.title + '</h2>' +
    '<div class="result-score">' + percent + '%</div>' +
    '<div class="result-stars">' + stars + '</div>' +
    '<p>' + correct + ' de ' + total + ' respuestas correctas.</p>' +
    (passed
      ? '<p style="color:#2c5e3f;font-weight:700;">¡Nivel superado! Desbloqueaste el siguiente nivel de tu misión.</p>'
      : '<p style="color:#8a3a30;font-weight:700;">Necesitas al menos ' + COURSE.passPercent + '% para superar el nivel. ¡Inténtalo de nuevo!</p>');
  body.appendChild(card);

  var row = document.createElement("div");
  row.className = "btn-row";

  if (passed) {
    if (!STATE.completed[lvl.id]) {
      STATE.completed[lvl.id] = { correct: correct, total: total, percent: percent };
      STATE.unlocked = Math.max(STATE.unlocked, lvl.id + 1);
      awardBadge(lvl.badge);
      REPORTING.send("nivel_completado", {
        nivel: lvl.id + " - " + lvl.title,
        correctas: correct,
        total: total,
        porcentaje: percent,
        puntosAcumulados: STATE.totalPoints,
        aprobado: true
      });
    }
    saveProgress();
    updateTopbar();

    var btnMap = document.createElement("button");
    btnMap.className = "btn gold";
    btnMap.textContent = "Volver al mapa de misión";
    btnMap.addEventListener("click", function () { renderMap(); goToScreen("screen-map"); });
    row.appendChild(btnMap);
  } else {
    REPORTING.send("nivel_no_aprobado", {
      nivel: lvl.id + " - " + lvl.title,
      correctas: correct,
      total: total,
      porcentaje: percent,
      puntosAcumulados: STATE.totalPoints,
      aprobado: false
    });
    var btnRetry = document.createElement("button");
    btnRetry.className = "btn gold";
    btnRetry.textContent = "Reintentar quiz";
    btnRetry.addEventListener("click", function () {
      RUNTIME.quizIndex = 0;
      RUNTIME.quizCorrect = 0;
      RUNTIME.stepIndex = RUNTIME.steps.findIndex(function (s) { return s.type === "quiz"; });
      renderStep();
    });
    var btnBack = document.createElement("button");
    btnBack.className = "btn ghost";
    btnBack.textContent = "Volver al mapa";
    btnBack.addEventListener("click", function () { renderMap(); goToScreen("screen-map"); });
    row.appendChild(btnRetry);
    row.appendChild(btnBack);
  }
  body.appendChild(row);
}

/* ---------------- Insignias ---------------- */
function awardBadge(badge) {
  var exists = STATE.badges.find(function (b) { return b.name === badge.name; });
  if (exists) return;
  STATE.badges.push(badge);
  showBadgePopup(badge);
}

function showBadgePopup(badge) {
  var overlay = document.getElementById("badge-overlay");
  document.getElementById("badge-em").textContent = badge.icon;
  document.getElementById("badge-name").textContent = badge.name;
  overlay.classList.add("show");
}
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "badge-close") {
    document.getElementById("badge-overlay").classList.remove("show");
  }
});

/* ---------------- Nivel final: certificación ---------------- */
function openFinalLevel() {
  RUNTIME.currentLevel = FINAL_LEVEL;
  RUNTIME.stepIndex = 0;
  RUNTIME.quizIndex = 0;
  RUNTIME.quizCorrect = 0;
  RUNTIME.steps = [
    { type: "content", html: FINAL_LEVEL.intro },
    { type: "quiz" },
    { type: "result" }
  ];
  setLevelHero({ id: FINAL_LEVEL.id, subtitle: FINAL_LEVEL.subtitle, title: FINAL_LEVEL.title, hero: "assets/badge_somos_harmony.png" });
  renderStep();
  goToScreen("screen-level");
}

function renderFinalResult(body) {
  var total = FINAL_LEVEL.quiz.length;
  var correct = RUNTIME.quizCorrect;
  var percent = Math.round((correct / total) * 100);
  var passed = percent >= COURSE.passPercent;

  var card = document.createElement("div");
  card.className = "card result-card";
  card.innerHTML =
    '<div class="eyebrow">Resultado final</div>' +
    '<h2>Certificación Somos Harmony</h2>' +
    '<div class="result-score">' + percent + '%</div>' +
    '<p>' + correct + ' de ' + total + ' respuestas correctas.</p>';
  body.appendChild(card);

  var row = document.createElement("div");
  row.className = "btn-row";

  if (passed) {
    if (!STATE.completed[FINAL_LEVEL.id]) {
      STATE.completed[FINAL_LEVEL.id] = { correct: correct, total: total, percent: percent };
      awardBadge(FINAL_LEVEL.badge);
      REPORTING.send("certificacion_aprobada", {
        nivel: "Final - Certificación",
        correctas: correct,
        total: total,
        porcentaje: percent,
        puntosAcumulados: STATE.totalPoints,
        aprobado: true
      });
    }
    saveProgress();
    updateTopbar();
    var btn = document.createElement("button");
    btn.className = "btn gold";
    btn.textContent = "Generar mi certificado";
    btn.addEventListener("click", function () { goToScreen("screen-cert"); });
    row.appendChild(btn);
  } else {
    var p = document.createElement("p");
    p.style.textAlign = "center";
    p.style.color = "#8a3a30";
    p.style.fontWeight = "700";
    p.textContent = "Necesitas al menos " + COURSE.passPercent + "% para certificarte. ¡Vuelve a intentarlo!";
    body.appendChild(p);
    var btnRetry = document.createElement("button");
    btnRetry.className = "btn gold";
    btnRetry.textContent = "Reintentar";
    btnRetry.addEventListener("click", function () {
      RUNTIME.quizIndex = 0;
      RUNTIME.quizCorrect = 0;
      RUNTIME.stepIndex = 1;
      renderStep();
    });
    var btnBack = document.createElement("button");
    btnBack.className = "btn ghost";
    btnBack.textContent = "Volver al mapa";
    btnBack.addEventListener("click", function () { renderMap(); goToScreen("screen-map"); });
    row.appendChild(btnRetry);
    row.appendChild(btnBack);
  }
  body.appendChild(row);
}

/* Sobrescribimos el despachador de pasos para incluir el resultado final */
var _originalRenderStep = renderStep;
renderStep = function () {
  var step = RUNTIME.steps[RUNTIME.stepIndex];
  if (RUNTIME.currentLevel && RUNTIME.currentLevel.id === FINAL_LEVEL.id && step.type === "result") {
    var body = document.getElementById("level-body");
    renderStepDots();
    body.innerHTML = "";
    renderFinalResult(body);
    return;
  }
  _originalRenderStep();
};

/* ---------------- Certificado ---------------- */
document.addEventListener("DOMContentLoaded", function () {
  var nameDisplay = document.getElementById("cert-name-display");
  var btnGenerate = document.getElementById("btn-generate-cert");
  var btnPrint = document.getElementById("btn-print-cert");

  if (btnGenerate) {
    btnGenerate.addEventListener("click", function () {
      var name = STATE.userName || "";
      STATE.certName = name;
      nameDisplay.textContent = name;
      document.getElementById("cert-form").style.display = "none";
      document.getElementById("cert-result").style.display = "block";
      var today = new Date();
      document.getElementById("cert-date").textContent = today.toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" });
      SCORM.setStatus("passed");
      saveProgress();
      SCORM.finish();
      REPORTING.send("certificado_generado", {
        puntosAcumulados: STATE.totalPoints,
        aprobado: true
      });
    });
  }
  if (btnPrint) {
    btnPrint.addEventListener("click", function () { window.print(); });
  }
});

/* ---------------- Utilidades ---------------- */
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
