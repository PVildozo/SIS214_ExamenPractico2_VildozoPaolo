# 🌐 Portafolio Web Profesional - Paolo Matias Vildozo Vidal

Un sitio web y portafolio profesional interactivo, totalmente responsivo y accesible, diseñado para presentar el perfil académico, habilidades técnicas, experiencia laboral y proyectos de **Paolo Matias Vildozo Vidal**[cite: 11, 13, 17, 20]. 

El proyecto combina marcado semántico **HTML5**, una arquitectura de estilos **CSS3 modular** (con soporte para modo claro/oscuro) y dinamismo en **JavaScript (ES6+)** con integración a la **API de GitHub** y **EmailJS**[cite: 1, 2, 9, 11].

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura de Estilos CSS](#-arquitectura-de-estilos-css)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos y Funcionalidades JS](#-módulos-y-funcionalidades-js)
- [Páginas del Sitio Web](#-páginas-del-sitio-web)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso y Pruebas Localmente](#-uso-y-pruebas-localmente)

---

## ✨ Características Principales

1. **🎨 Sistema de Temas Personalizado (Modo Oscuro / Modo Claro):**
   - Transición fluida entre temas claro y oscuro utilizando variables CSS (`--bg-body`, `--color-primary`, `--color-gold-old`, etc.)[cite: 6, 10].
   - Detección automática del esquema preferido del navegador o sistema operativo (`prefers-color-scheme`).
   - Persistencia del tema seleccionado en `localStorage`.

2. **📱 Navegación Responsiva y Accesible (WAI-ARIA):**
   - Menú hamburguesa interactivo para pantallas móviles y tabletas (`@media max-width: 900px`)[cite: 8].
   - Estándares de accesibilidad **WAI-ARIA** (`aria-expanded`, `aria-label`, `aria-controls`, `aria-current="page"`)[cite: 2, 11, 20].
   - Navegación accesible mediante teclado con enlace de salto directo (`.skip-link`)[cite: 6, 11].

3. **📡 Consumo Asíncrono de GitHub API REST:**
   - Carga simultánea en paralelo (`Promise.all`) de repositorios públicos de múltiples cuentas (`pmatz2109` y `PVildozo`).
   - **Búsqueda en tiempo real:** Filtro dinámico e instantáneo por nombre, lenguaje de programación o descripción sin recargar ni reconsultar la API.
   - Sanitización de texto para prevenir ataques de inyección de código (**XSS**)[cite: 1].

4. **✉️ Formulario de Contacto & EmailJS:**
   - Procesamiento e integración asíncrona de mensajes directamente con **EmailJS SDK**.
   - Indicadores y alertas visuales dinámicas de estado (*Enviando*, *Éxito*, *Error*).

5. **⏳ Validaciones Inteligentes:**
   - **Horario Comercial y Fechas:** Control que deshabilita fechas pasadas y valida el rango de atención comercial (09:00 a 18:00).
   - **Contador Dinámico de Caracteres:** Indicador visual para el `textarea` con clases de advertencia (`warning` y `limit-reached`)[cite: 3].

6. **🎥 Portafolio Multimedia y Elementos Interactivos:**
   - Integración semántica de audio (`<audio>`), video (`<video>`) e imágenes adaptativas (`<picture>`, `loading="lazy"`)[cite: 7, 19].
   - Diálogos y ventanas modales nativas (`<dialog>`) con backdrop en efecto *Glassmorphism*[cite: 2, 7, 11].

---

## 🎨 Arquitectura de Estilos CSS

El diseño visual está estructurado de manera modular y se importa a través del punto central `css/styles.css`[cite: 9]:

- **`variables.css`**: Define las fuentes de Google Fonts (*Playfair Display* y *Plus Jakarta Sans*), radios, espaciados, efectos de sombra y la paleta de colores para los temas oscuro y claro[cite: 10].
- **`base.css`**: Reseteo de estilos globales, scrollbar personalizada, diseño de hipervínculos, citas (`blockquote`) y tipografía base[cite: 6].
- **`components.css`**: Estilos de tablas adaptativas (`.table-responsive`), barras de progreso (`<progress>`), medidores (`<meter>`), campos de texto, ventanas modales (`<dialog>`) y tarjetas de repositorios[cite: 7].
- **`layouts.css`**: Estructura del encabezado fijo (*sticky header*), listas de habilidades, distribución de contenido principal y diseño del menú desplegable móvil[cite: 8].
- **`animations.css`**: Keyframe animations (`fadeIn`, `fadeInDown`, `pulseGlow`, `modalPop`) que enriquecen la experiencia de usuario[cite: 5].

---

## 📁 Estructura del Proyecto

```text
├── index.html               # Página de inicio / Información personal
├── perfil.html              # Perfil profesional, fortalezas y objetivos
├── formacion.html           # Historial de formación académica
├── experiencia.html         # Experiencia laboral y logros
├── habilidades.html         # Habilidades técnicas y medidores de nivel
├── cursos.html              # Certificaciones y cursos de capacitación
├── idiomas.html             # Competencias en idiomas con tabla comparativa
├── proyectos.html           # Proyectos destacados y consumo de GitHub API
├── portafolio.html          # Portafolio multimedia (Audio, Video, Imágenes)
├── contactos.html           # Formulario de contacto, modal y validaciones
├── css/                     # Modulos de estilos CSS
│   ├── animations.css
│   ├── base.css
│   ├── components.css
│   ├── layouts.css
│   ├── styles.css
│   └── variables.css
└── js/                      # Modulos de código JavaScript
    ├── api_module.js        # Consumo de GitHub API y buscador en tiempo real
    ├── main.js              # Control de temas, menú navegable y EmailJS
    ├── textarea_cont.js     # Contador dinámico de caracteres
    └── validar_fecha.js     # Validación de fecha y franja horaria