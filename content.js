/* ============================================================
   CONTENIDO DEL CURSO — Basado en:
   "IDH39 Presentación Inducción Nuevos Colaboradores 2026 V2"
   ============================================================ */

var COURSE = {
  title: "Somos Harmony",
  subtitle: "Inducción de Nuevos Colaboradores · Harmony Projects",
  passPercent: 70, // porcentaje mínimo para aprobar cada quiz y la certificación
};

var LEVELS = [

  /* ---------------- NIVEL 1 ---------------- */
  {
    id: 1,
    key: "historia",
    icon: "🌱",
    title: "Nuestra Historia",
    subtitle: "De Nosara 2002 al Harmony de hoy",
    hero: "assets/founders_photo.jpg",
    badge: { icon: "🌱", name: "Raíces de Harmony" },
    content: [
      `<div class="card">
        <div class="eyebrow">Nuestra Historia</div>
        <h2>Nace del amor, cultivada con cariño, prosperando juntos en armonía.</h2>
        <img class="figure" src="assets/founders_photo.jpg" alt="Fundadores Susan y John">
        <p>Todo comenzó con dos personas y una ola en Nosara. Desde entonces, Harmony Projects ha crecido como un ecosistema de negocios conectados por una misma visión de hospitalidad.</p>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Línea de tiempo</div>
        <h3>Los momentos que nos formaron</h3>
        <div class="timeline">
          <div class="timeline-item"><div class="yr">2002</div><p>Fundadores de HP, Susan y John, se conocieron y enamoraron surfeando en Nosara.</p></div>
          <div class="timeline-item"><div class="yr">2004</div><p>Compra del Hotel Villa Tay Pey.</p></div>
          <div class="timeline-item"><div class="yr">2004–2006</div><p>Renovación de la propiedad y apertura del Hotel Harmony como un proyecto de arte, expresión de su visión de hospitalidad.</p></div>
          <div class="timeline-item"><div class="yr">2006–pres.</div><p>Harmony Hotel se convierte en un destino popular para surfistas, yoguis y creativos.</p></div>
          <div class="timeline-item"><div class="yr">2013</div><p>Compra del hotel Casa Tucan y reapertura como The Sunset Shack.</p></div>
          <div class="timeline-item"><div class="yr">2014</div><p>Compra de la propiedad de El Bosque.</p></div>
          <div class="timeline-item"><div class="yr">2015</div><p>Se funda Harmony Projects para la administración de nuevas iniciativas, negocios y proyectos.</p></div>
          <div class="timeline-item"><div class="yr">2017</div><p>Se abre Harbor Reef como hotel.</p></div>
          <div class="timeline-item"><div class="yr">2021</div><p>Re-lanzamiento de Harmony Projects como empresa.</p></div>
          <div class="timeline-item"><div class="yr">2022</div><p>Apertura de Campo y La Ventanita.</p></div>
          <div class="timeline-item"><div class="yr">2023</div><p>Compra y apertura de El Pueblo.</p></div>
        </div>
      </div>`
    ],
    quiz: [
      {
        q: "¿En qué año se conocieron Susan y John, fundadores de Harmony Projects, surfeando en Nosara?",
        options: ["2002", "2004", "2015", "2021"],
        correct: 0
      },
      {
        q: "¿Qué ocurrió en el año 2015?",
        options: [
          "Se abrió Harbor Reef como hotel",
          "Se fundó Harmony Projects para la administración de nuevas iniciativas, negocios y proyectos",
          "Se compró el Hotel Villa Tay Pey",
          "Apertura de Campo y La Ventanita"
        ],
        correct: 1
      },
      {
        q: "¿En qué año se abrió Harbor Reef como hotel?",
        options: ["2013", "2017", "2021", "2023"],
        correct: 1
      },
      {
        q: "¿Qué propiedad se compró en 2013 y reabrió como \"The Sunset Shack\"?",
        options: ["Villa Tay Pey", "Casa Tucan", "El Bosque", "El Pueblo"],
        correct: 1
      },
      {
        q: "La renovación de la propiedad comprada en 2004 dio origen a...",
        options: ["Harbor Reef", "El Hotel Harmony, como un proyecto de arte", "The Sunset Shack", "Campo"],
        correct: 1
      }
    ]
  },

  /* ---------------- NIVEL 2 ---------------- */
  {
    id: 2,
    key: "esencia",
    icon: "💚",
    title: "Nuestra Esencia",
    subtitle: "Misión, Visión, Valores y Hospitalidad Radical",
    hero: "assets/icon_amor.png",
    badge: { icon: "💚", name: "Esencia Harmony" },
    content: [
      `<div class="card">
        <div class="eyebrow">Harmony Projects · Visión</div>
        <blockquote>"Anhelamos un futuro donde todos podamos vivir en creciente armonía con nuestro entorno natural, nuestros vecinos y la mejor versión de sí mismos."</blockquote>
        <div class="eyebrow">Harmony Projects · Misión</div>
        <blockquote>"Somos una empresa que cuestiona los modelos tradicionales de hospitalidad, bienes raíces y desarrollo comunitario para crear nuevas formas de vivir en armonía."</blockquote>
        <p>Nuestras empresas respaldan el estilo de vida Harmony: saludable, consciente y lleno de amigos, familia y diversión.</p>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Nuestros Valores</div>
        <h3>Harmony = Amor + Integridad + Creatividad</h3>
        <div class="value-pill"><img src="assets/icon_amor.png" alt="Amor"><div class="txt"><strong>Amor</strong><span>"Tratamos todo lo que nos rodea con respeto y cuidado."</span></div></div>
        <div class="value-pill"><div class="em">💡</div><div class="txt"><strong>Creatividad</strong><span>"Somos libres de jugar con nuevas formas de hacer las cosas."</span></div></div>
        <div class="value-pill"><img src="assets/icon_integridad.png" alt="Integridad"><div class="txt"><strong>Integridad</strong><span>"Construimos nuestra fuerza a través de las conexiones."</span></div></div>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Filosofía central</div>
        <h3>Hospitalidad Radical</h3>
        <p>Para nuestro ecosistema humano.</p>
        <blockquote>"Las personas olvidarán lo que dijiste, pero nunca olvidarán cómo las hiciste sentir." — Maya Angelou</blockquote>
      </div>`
    ],
    activity: {
      type: "match",
      instructions: "Une cada valor con su frase. Toca una tarjeta de la izquierda y luego su pareja a la derecha.",
      pairs: [
        { left: "Amor", right: "\"Tratamos todo lo que nos rodea con respeto y cuidado.\"" },
        { left: "Creatividad", right: "\"Somos libres de jugar con nuevas formas de hacer las cosas.\"" },
        { left: "Integridad", right: "\"Construimos nuestra fuerza a través de las conexiones.\"" }
      ]
    },
    quiz: [
      {
        q: "Según la misión de Harmony Projects, ¿qué modelos tradicionales cuestiona la empresa?",
        options: [
          "Hospitalidad, bienes raíces y desarrollo comunitario",
          "Agricultura, turismo y transporte",
          "Educación y tecnología",
          "Ninguno, la empresa sigue los modelos tradicionales"
        ],
        correct: 0
      },
      {
        q: "¿Cuáles son los tres valores que forman la fórmula \"Harmony = \"?",
        options: [
          "Amor + Disciplina + Servicio",
          "Amor + Integridad + Creatividad",
          "Integridad + Puntualidad + Servicio",
          "Creatividad + Innovación + Rapidez"
        ],
        correct: 1
      },
      {
        q: "\"Construimos nuestra fuerza a través de las conexiones\" corresponde al valor de...",
        options: ["Amor", "Creatividad", "Integridad", "Servicio"],
        correct: 2
      },
      {
        q: "\"Somos libres de jugar con nuevas formas de hacer las cosas\" corresponde al valor de...",
        options: ["Creatividad", "Amor", "Integridad", "Profesionalismo"],
        correct: 0
      },
      {
        q: "¿A quién pertenece la frase \"Las personas olvidarán lo que dijiste, pero nunca olvidarán cómo las hiciste sentir\"?",
        options: ["Susan, cofundadora de Harmony", "Maya Angelou", "John, cofundador de Harmony", "Un colaborador de Harmony"],
        correct: 1
      }
    ]
  },

  /* ---------------- NIVEL 3 ---------------- */
  {
    id: 3,
    key: "ecosistema",
    icon: "🧩",
    title: "Nuestro Ecosistema",
    subtitle: "Las unidades de negocio de Harmony Projects",
    hero: "assets/logo_harmony_hotel.png",
    badge: { icon: "🧩", name: "Ecosistema Harmony" },
    content: [
      `<div class="card">
        <div class="eyebrow">Harmony Projects</div>
        <h2>Unidades de Negocio</h2>
        <p>Un ecosistema de 12 marcas conectadas entre sí: si una enfrenta un reto, las demás sostienen la salud financiera del conjunto.</p>
        <div class="logo-grid">
          <div class="logo-card"><img src="assets/logo_harmony_hotel.png" alt="The Harmony Hotel"></div>
          <div class="logo-card"><img src="assets/logo_healing_centre.png" alt="The Healing Centre"></div>
          <div class="logo-card"><img src="assets/logo_juice_bar.png" alt="The Juice Bar"></div>
          <div class="logo-card"><img src="assets/logo_la_tiendita.png" alt="La Tiendita"></div>
          <div class="logo-card"><img src="assets/logo_sunset_shack.png" alt="The Sunset Shack"></div>
          <div class="logo-card"><img src="assets/logo_al_chile.png" alt="Al Chile"></div>
          <div class="logo-card"><img src="assets/logo_la_ventanita.png" alt="La Ventanita"></div>
          <div class="logo-card"><img src="assets/logo_campo.png" alt="Campo"></div>
          <div class="logo-card"><img src="assets/logo_la_salita.png" alt="La Salita"></div>
          <div class="logo-card"><img src="assets/logo_las_ceramicas.png" alt="Las Cerámicas"></div>
          <div class="logo-card"><img src="assets/logo_el_bosque.png" alt="El Bosque"></div>
          <div class="logo-card"><img src="assets/logo_canu.png" alt="Canu"></div>
        </div>
      </div>`
    ],
    activity: {
      type: "match",
      instructions: "Une cada logo con el nombre correcto de su unidad de negocio.",
      pairs: [
        { left: "img:assets/logo_harmony_hotel.png", right: "The Harmony Hotel" },
        { left: "img:assets/logo_healing_centre.png", right: "The Healing Centre" },
        { left: "img:assets/logo_al_chile.png", right: "Al Chile" },
        { left: "img:assets/logo_la_ventanita.png", right: "La Ventanita" },
        { left: "img:assets/logo_las_ceramicas.png", right: "Las Cerámicas" },
        { left: "img:assets/logo_el_bosque.png", right: "El Bosque" }
      ]
    },
    quiz: [
      {
        q: "¿Cuántas unidades de negocio conforman el ecosistema de Harmony Projects?",
        options: ["8", "10", "12", "15"],
        correct: 2
      },
      {
        q: "¿Cuál de las siguientes NO es una unidad de negocio de Harmony Projects?",
        options: ["La Salita", "Al Chile", "Harmony Bank", "Canu"],
        correct: 2
      },
      {
        q: "¿Cómo se llama la boutique/tienda de Harmony Projects?",
        options: ["La Tiendita", "La Ventanita", "Campo", "El Bosque"],
        correct: 0
      },
      {
        q: "¿Cuál es la unidad de negocio dedicada a la cerámica?",
        options: ["Las Cerámicas", "La Salita", "Canu", "The Healing Centre"],
        correct: 0
      },
      {
        q: "Si un huésped busca tratamientos de bienestar dentro del Harmony Hotel, ¿a qué unidad acude?",
        options: ["The Juice Bar", "The Healing Centre", "Al Chile", "La Tiendita"],
        correct: 1
      }
    ]
  },

  /* ---------------- NIVEL 4 ---------------- */
  {
    id: 4,
    key: "trabajo",
    icon: "🤝",
    title: "Cómo Trabajamos",
    subtitle: "Profesionalismo, Servicio y Hospitalidad Radical",
    hero: "assets/illustration_guia.jpg",
    badge: { icon: "🤝", name: "Hospitalidad Radical" },
    content: [
      `<div class="card">
        <div class="eyebrow">Valores de Trabajo · Harmony Projects</div>
        <h3>Dos pilares guían nuestro comportamiento diario:</h3>
        <div class="two-col">
          <div class="value-pill"><div class="em">✦</div><div class="txt"><strong>Profesionalismo</strong><span>Observar, conectar y dar seguimiento con intención.</span></div></div>
          <div class="value-pill"><div class="em">✦</div><div class="txt"><strong>Servicio</strong><span>Entrega, empatía y proactividad con sentido de urgencia.</span></div></div>
        </div>
        <blockquote>La hospitalidad radical es nuestra forma de marcar la diferencia, anticipando necesidades y ofreciendo una atención que supera toda expectativa.</blockquote>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Profesionalismo</div>
        <p>Es la práctica consciente de observar, conectar y dar seguimiento con intención.</p>
        <div class="value-pill"><div class="em">👁️</div><div class="txt"><strong>Notar / Observar</strong><span>La conciencia es la semilla del cuidado.</span></div></div>
        <div class="value-pill"><div class="em">🎯</div><div class="txt"><strong>Atención personalizada</strong><span>Transforma el servicio en conexión.</span></div></div>
        <div class="value-pill"><div class="em">🔄</div><div class="txt"><strong>Excelente seguimiento</strong><span>El seguimiento es donde el cuidado se convierte en confianza.</span></div></div>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Servicio</div>
        <p>La actitud constante de entrega, empatía y proactividad para superar expectativas.</p>
        <div class="value-pill"><div class="em">😊</div><div class="txt"><strong>Disfruto / Pasión</strong><span>Vivimos nuestra labor con alegría y entrega diaria.</span></div></div>
        <div class="value-pill"><div class="em">💡</div><div class="txt"><strong>Proactividad y Creatividad</strong><span>¿Qué puedo hacer antes de un no?</span></div></div>
        <div class="value-pill"><div class="em">🤝</div><div class="txt"><strong>Juego para el equipo</strong><span>Soy empático y apoyo activamente a mis compañeros.</span></div></div>
        <div class="value-pill"><div class="em">🚀</div><div class="txt"><strong>Voy más allá</strong><span>Respondemos con agilidad, superando cualquier expectativa.</span></div></div>
      </div>`
    ],
    quiz: [
      {
        q: "Los dos pilares que guían el comportamiento diario en Harmony Projects son Profesionalismo y...",
        options: ["Puntualidad", "Servicio", "Disciplina", "Rentabilidad"],
        correct: 1
      },
      {
        q: "\"La conciencia es la semilla del cuidado\" describe la práctica de...",
        options: ["Voy más allá", "Notar / Observar", "Disfruto / Pasión", "Enfoque correctivo"],
        correct: 1
      },
      {
        q: "\"¿Qué puedo hacer antes de un no?\" ejemplifica cuál elemento del Servicio:",
        options: ["Intencionalidad", "Proactividad y Creatividad", "Juego para el equipo", "Debido proceso"],
        correct: 1
      },
      {
        q: "Según Profesionalismo, el seguimiento es donde el cuidado se convierte en...",
        options: ["Confianza", "Rentabilidad", "Sanción", "Rotación"],
        correct: 0
      },
      {
        q: "¿Cómo se llama la filosofía central que anticipa necesidades y supera expectativas?",
        options: ["Hospitalidad Radical", "Servicio Express", "Cultura Harmony", "Escucha Activa"],
        correct: 0
      }
    ]
  },

  /* ---------------- NIVEL 5 ---------------- */
  {
    id: 5,
    key: "camino",
    icon: "🧭",
    title: "Tu Camino como Colaborador",
    subtitle: "Guía, Desempeño, Proceso Disciplinario, Beneficios y People Experience",
    hero: null,
    badge: { icon: "🧭", name: "Tu Camino" },
    content: [
      `<div class="card">
        <div class="eyebrow">Guía del Colaborador</div>
        <p>¿Ya leíste y firmaste la guía del colaborador desde <strong>Humand</strong>? Es un paso fundamental para comenzar tu camino en Harmony Projects.</p>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Desarrollo Profesional</div>
        <h3>Desempeño</h3>
        <p>Un proceso continuo diseñado para acompañar tu crecimiento, reconocer tu esfuerzo y trazar juntos el camino hacia tus metas profesionales.</p>
        <div class="value-pill"><div class="em">📝</div><div class="txt"><strong>Autoevaluación Consciente</strong><span>Reflexiona sobre tus logros y retos.</span></div></div>
        <div class="value-pill"><div class="em">🔁</div><div class="txt"><strong>Retroalimentación 360°</strong><span>Perspectivas constructivas para el crecimiento mutuo.</span></div></div>
        <div class="value-pill"><div class="em">🎯</div><div class="txt"><strong>Plan de seguimiento</strong><span>Metas claras para tu plan de carrera.</span></div></div>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Normativa Interna</div>
        <h3>Proceso Disciplinario</h3>
        <p>Un proceso transparente y justo para asegurar un ambiente de respeto, claridad y armonía.</p>
        <div class="value-pill"><div class="em">📋</div><div class="txt"><strong>Claridad y Transparencia</strong><span>Pautas y expectativas de conducta desde el inicio.</span></div></div>
        <div class="value-pill"><div class="em">🌱</div><div class="txt"><strong>Enfoque Correctivo</strong><span>Aprendizaje y mejora continua antes que la sanción.</span></div></div>
        <div class="value-pill"><div class="em">⚖️</div><div class="txt"><strong>Debido Proceso</strong><span>Escucha activa y respeto mutuo en cada etapa.</span></div></div>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Harmony Projects</div>
        <h3>Beneficios</h3>
        <div class="value-pill"><div class="em">🚗</div><div class="txt"><strong>Tarifa Harmony</strong><span>Rent a Car, vuelos, restaurantes y tiendas.</span></div></div>
        <div class="value-pill"><div class="em">📚</div><div class="txt"><strong>Desarrollo y Carrera</strong><span>Capacitación profesional, técnica y planes de carrera.</span></div></div>
        <div class="value-pill"><div class="em">🩺</div><div class="txt"><strong>Salud Integral</strong><span>Consultorio médico familiar, odontología y laboratorio clínico.</span></div></div>
        <div class="value-pill"><div class="em">🍽️</div><div class="txt"><strong>Alimentación</strong><span>Subvencionada durante tus turnos de trabajo.</span></div></div>
        <div class="value-pill"><div class="em">🏆</div><div class="txt"><strong>Reconocimientos</strong><span>Cuponera en Humand para canjear premios según puntajes.</span></div></div>
      </div>`,
      `<div class="card">
        <div class="eyebrow">Harmony Projects</div>
        <h3>People Experience</h3>
        <p>Escucha activa en tiempo real, no reactiva.</p>
        <blockquote>El eNPS es nuestra brújula estratégica: nuestro "termómetro de lealtad".</blockquote>
        <p>Convertimos la queja en oportunidad de co-creación: los colaboradores dejan de ser evaluados para convertirse en co-creadores de la cultura.</p>
      </div>`
    ],
    quiz: [
      {
        q: "¿En qué plataforma debes leer y firmar la Guía del Colaborador?",
        options: ["Humand", "Slack", "Correo electrónico", "Google Drive"],
        correct: 0
      },
      {
        q: "El proceso de Desempeño incluye Autoevaluación Consciente, Plan de Seguimiento y...",
        options: ["Retroalimentación 360°", "Proceso Disciplinario", "Tarifa Harmony", "eNPS"],
        correct: 0
      },
      {
        q: "El Proceso Disciplinario se basa en Claridad y Transparencia, Debido Proceso y...",
        options: ["Enfoque Correctivo", "Sanción inmediata", "Rotación de personal", "Evaluación anual"],
        correct: 0
      },
      {
        q: "¿Qué beneficio incluye consultorio médico familiar, odontología y laboratorio clínico?",
        options: ["Tarifa Harmony", "Salud Integral", "Desarrollo y Carrera", "Programa de reconocimientos"],
        correct: 1
      },
      {
        q: "El eNPS funciona en Harmony Projects como...",
        options: [
          "Un examen de desempeño individual",
          "Nuestra brújula estratégica, el \"termómetro de lealtad\"",
          "El sistema de nómina",
          "El manual de bienvenida"
        ],
        correct: 1
      }
    ]
  }
];

/* ---------------- NIVEL FINAL: CERTIFICACIÓN ---------------- */
var FINAL_LEVEL = {
  id: 6,
  key: "final",
  icon: "🏅",
  title: "Certificación Somos Harmony",
  subtitle: "Demuestra todo lo aprendido en tu camino",
  badge: { icon: "🏅", name: "Somos Harmony" },
  intro: `<div class="card">
      <div class="eyebrow">Nivel Final</div>
      <h2>¡Es hora de certificarte!</h2>
      <p>Responde estas preguntas finales que combinan todo lo que recorriste en tu misión: Historia, Esencia, Ecosistema, Cómo Trabajamos y Tu Camino como Colaborador.</p>
      <p>Necesitas al menos <strong>${COURSE.passPercent}%</strong> de respuestas correctas para obtener tu insignia <strong>"Somos Harmony"</strong>.</p>
    </div>`,
  quiz: [
    { q: "¿En qué año se fundó Harmony Projects para la administración de nuevas iniciativas?", options: ["2006", "2015", "2017", "2021"], correct: 1 },
    { q: "Harmony = Amor + Integridad + ...", options: ["Puntualidad", "Creatividad", "Disciplina", "Rentabilidad"], correct: 1 },
    { q: "¿Cuántas unidades de negocio conforman el ecosistema Harmony?", options: ["8", "10", "12", "14"], correct: 2 },
    { q: "Los dos pilares del comportamiento diario en Harmony son Profesionalismo y...", options: ["Servicio", "Puntualidad", "Rentabilidad", "Disciplina"], correct: 0 },
    { q: "¿Dónde firmas la Guía del Colaborador?", options: ["Humand", "Slack", "Un formulario impreso", "Correo electrónico"], correct: 0 },
    { q: "\"Construimos nuestra fuerza a través de las conexiones\" es el valor de...", options: ["Amor", "Creatividad", "Integridad", "Servicio"], correct: 2 },
    { q: "El eNPS es descrito como...", options: ["El manual de beneficios", "Nuestra brújula estratégica / termómetro de lealtad", "El proceso disciplinario", "La tarifa Harmony"], correct: 1 },
    { q: "La filosofía que anticipa necesidades y supera expectativas se llama...", options: ["Hospitalidad Radical", "Servicio Express", "Cultura Harmony", "Plan de Carrera"], correct: 0 }
  ]
};
