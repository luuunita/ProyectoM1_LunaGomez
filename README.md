# Generador de Paletas Colorfly:
Es una aplicación web desarrollada con **HTML, CSS Y JavaScript** que genera paletas de colores aleatorios en tajetas.
Permite seleccionar el **tamaño** de la paleta (6, 8, o 9) y el **formato** del color (**HSL O RGB**).
Incluye microfeedback (tooltips y mensajes), copiado al portapapeles y consideraciones básicas de accesibilidad.

---

# Links
- **Repositorio:** https://github.com/luuunita/ProyectoM1_LunaGomez
- **Demo (GitHub Pages):** https://luuunita.github.io/ProyectoM1_LunaGomez/
- **Documentacion (Google Drive):** https://drive.google.com/drive/folders/1jLCoDr7DS_DPZM5atgVXqHlxEdmeVdEv?usp=sharing

## Objetivo del proyecto
Este poryecto ha sido desarrollado con el fin de:

- Generar paletas de colores aleatorios en tarjetas.
- Cambiar el formato de color entre **HSL y RGB**.
- Renderizar dinámicamente el número de tarjetas según la selección del usuario.
- Aplicar microfeedback (tooltips y mensajes) para mejorar la experiencia.
- Practicar manipulación del DOM con JavaSrcipt y buenas prácticas con Git/GitHub.
- Desplegar un MVP con **GitHub Pages**.

---

## Funcionalidades (Features)
- [x] Selección del tamaño de paleta **6 - 8 - 9** colores.
- [x] Formato de salidad: **HSL o RGB**.
- [x] Render dinámico: se generan exacatamente N tarjetas según el tamaño seleccionado.
- [x] Visualización del color y su código en cada tarjeta.
- [x] Tooltip en tarjetas:
  - "Clic para copiar" -> "Copiado en el portapapeles".
- [x] Mensajes del boton:
  - "Listo para generar..." al seleccionar.
  - "Colores generados..." al generar.
- [x] Funcionalidad correcta en desktop.
- [x] Labels asociados, foco visible y soporte de teclado en tarjetas.

---

## Estructura del proyecto
```text
ProyectoM1_LunaGomez/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
```

---

## Decisiones Técnicas (Manual Técnico)
### HTML SEMÁNTICO
Se usa la estructura semántica para organizar la interfaz:
- `header` para el título y descripción
- `main` como contenedor principal
- `section#controls` para controles
- `section#palette` para resultados

### CSS (buenas prácticas)
- Reset básico con `box-sizing: border-box`.
- Layout de tarjetas usando **CSS Grid** (`#colors-container`).
- Estilos de tarjetas consistentes (`.color-box`, `.color-sample`).
- Tooltips implementados con pseudo-elemento `::after`.
- Hover/animaciones simples con `transition` y `transform`.
- Foco visible con `:focus-visible`.

### JavaScript (lógica)
- Se leen valores desde los `select` (cantidad y formato).
- Se valida que el usuario haya seleccionado correctamente antes de generar.
- Se limpia el contenedor antes de renderizar una nueva paleta.
- Se crea cada tarjeta dinámicamente con `createElement` y `appendChild`.
- Generación de HSL aleatorio y conversión a RGB con una función.
- Copia al portapapeles con `navigator.clipboard.writeText`.

--- 

## Render dinámico según tamaño seleccionado
El render se actualiza así:
1. Se lee la cantidad seleccionada (6, 8, 9)
2. Se limpia el contenedor (`colors-container`).
3. Se ejecuta un `for` para crear exactamente **N** tarjetas.
4. Se insertan en el DOM con `appendChild`.

Lo que asegura que el número de tarjetas siempre coincidan con la selección del usuario.

---

## Generación y formato de color (HSL -> RGB)
- Se generan valores aleatorios en **HSL**:
  - `h` entre 0 y 359
  - `s` y `l` entre 0 y 100
- Si el usuario elige **HSL**, se muestra `hsl(h, s%, l%)`.
- Si el usuario elige **RGB**, se convierte desde HSL usando la función `hslToRGB(h, s, l)` y se muestra `rgb(r,g,b)`.
- La conversión se implementa manualmente, sin librerías externas.

---

## Validación de Selección
Antes de generar la paleta, la aplicación valida que:
- exista una cantidad válida (6/8/9)
- exista un formato válido (HSL/RGB)

Si falta alguna selección, mostrará el mensaje: **"Seleccoina cantidad y formato"** y no se generan nuevas tarjetas.

---

# Manipulación del DOM
Se utilizan funciones de JavaScript para manejar la interfaz:

- `getElementById()` para obtener controles del HTML.
- `addEventListener()` para escuchar cambios y clics.
- `createElement()` para crear tarjetas dinámicas.
- `appendChild()` para insertar elementos en el DOM.
- `innerHTML = ""` para limpiar el contenedor antes de renderizar.
- `classList.add()` / `classList.remove()` para estilos y estados (tooltips / animación).
- `style` para aplicar color de fondo a cada tarjeta.

---

# Copiar al Portapapeles
- Al hacer clic en una tarjeta se copia el texto mostrado en el `<p>` (HSL o RGB).
- Se usa `navigator.clipboard.writeText(...)`.
- El tooltip “Clic para copiar” se muestra al pasar el mouse sobre la tarjeta y al hacer clic se confirma la acción de copiado.

---

## Accesibilidad (consideraciones básicas)
- **Labels asociados:** `label for="..."` enlazado con `id="..."` en los `select`.
- **Foco visible:** navegación con **Tab** muestra foco en controles y tarjetas.
- **Contraste suficiente:** texto oscuro sobre fondo claro y botón con color sólido.

---

## Manual de usuario (cómo usar la app)
1. Selecciona la **cantidad** de colores (6, 8 o 9).
2. Selecciona el **formato** (HSL o RGB).
3. Haz clic en **Generar paleta**.
4. Se mostrarán las tarjetas con el color y su código.
5. Para copiar:
   - Pasa el mouse por una tarjeta para ver “Clic para copiar”.
   - Haz clic y verás “Copiado en el portapapeles”.

---

## Cómo ejecutar la aplicación en local 

### Opción 1 — Descarga manual
1. Descargar el repositorio como ZIP desde GitHub.
2. Extraer la carpeta.
3. Abrir `index.html` en el navegador.

## Opción 2 — Clonar con Git
```bash
git clone https://github.com/luuunita/ProyectoM1_LunaGomez.git
cd ProyectoM1_LunaGomez
``` 
Luego:
- Abrir index.html en el navegador, o usar **Live Server** en **Visual Studio Code**.

---
## Cómo desplegar la aplicación (GitHub Pages)

1. Subir el proyecto a GitHub (rama **main**).
2. Ir al repositorio → **Settings**.
3. Ir a **Pages**.
4. En **Build and deployment**:
   - **Source** → Deploy from a branch
   - **Branch** → main
   - **Folder** → /(root)
5. Guardar y esperar el enlace público.

## Autor
**Luna Catalina Gómez Amar**  
Estudiante de **Full Stack Development**  
GitHub: https://github.com/luuunita
