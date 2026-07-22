# Somos Harmony · Curso de Inducción Gamificado

Curso interactivo tipo "misión por niveles" para la inducción de nuevos
colaboradores de Harmony Projects, con quizzes, insignias, certificado
final y registro de resultados en Google Sheets.

## 1. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado con
   GitHub Pages habilitado en tu plan).
2. Sube **todo el contenido de esta carpeta** (index.html, css/, js/,
   assets/) a la raíz del repositorio.
3. Ve a **Settings → Pages** en el repositorio.
4. En "Branch", selecciona `main` (o la rama donde subiste los archivos)
   y la carpeta `/root`. Guarda.
5. GitHub te dará una URL pública, algo como:
   `https://tu-usuario.github.io/tu-repositorio/`
6. Comparte esa URL con los nuevos colaboradores.

No necesitas configurar nada más para que el curso funcione: sin el
paso 2 (backend), el curso funciona igual, pero los resultados solo
quedan guardados en el navegador de cada persona (localStorage), no
centralizados.

## 2. Conectar el backend de resultados (Google Sheets) — opcional pero recomendado

1. Crea una Google Sheet nueva y vacía. Nómbrala, por ejemplo,
   "Resultados Inducción Harmony".
2. Menú **Extensiones → Apps Script**.
3. Borra el código de ejemplo y pega el contenido completo del archivo
   `google-apps-script.gs` (incluido en esta carpeta).
4. Guarda el proyecto.
5. Haz clic en **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo** (tu cuenta)
   - Quién tiene acceso: **Cualquier usuario**
6. Autoriza los permisos que te pida Google.
7. Copia la **URL de la aplicación web** que te entrega.
8. Abre el archivo `js/config.js` de este proyecto y reemplaza:
   ```js
   var GOOGLE_SHEETS_URL = "PEGA_AQUI_LA_URL_DE_TU_WEB_APP_DE_GOOGLE_APPS_SCRIPT";
   ```
   con tu URL real, entre comillas.
9. Sube (commit) el archivo `config.js` actualizado a GitHub.
10. Cada vez que alguien complete un nivel o se certifique, se agregará
    una fila automáticamente en la pestaña "Resultados" de tu Google Sheet,
    con: fecha y hora, nombre, puesto, evento, nivel, correctas, total,
    porcentaje, puntos acumulados y si aprobó.

**Importante:** si en el futuro modificas el código del Apps Script,
debes crear una **nueva versión** de la implementación (Implementar →
Gestionar implementaciones → editar → Nueva versión) para que los
cambios se reflejen en la URL ya publicada.

## 3. Identificación obligatoria

Antes de comenzar la misión, el curso pide **nombre completo
(obligatorio)** y puesto/área (opcional). Esto identifica cada registro
en la hoja de resultados y evita que el progreso se mezcle entre
distintas personas que usen el mismo navegador.

## 4. Estructura de archivos

```
index.html                 → página principal del curso
css/styles.css              → estilos visuales
js/scorm-api.js             → compatibilidad opcional con SCORM/LMS
js/content.js                → contenido, niveles y preguntas del quiz
js/config.js                  → URL del backend de Google Sheets (edítalo aquí)
js/app.js                      → lógica del curso (mapa, niveles, quiz, certificado)
assets/                          → imágenes del curso
google-apps-script.gs             → código para el backend de Google Sheets
imsmanifest.xml                    → (opcional) permite empaquetar este mismo curso como SCORM 1.2 para subirlo a un LMS
```

## 5. Editar contenido o preguntas

Todo el contenido (textos, niveles, preguntas de quiz) vive en
`js/content.js`, en español simple y comentado — puedes editarlo
directamente sin tocar el resto del código.
