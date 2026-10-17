document.addEventListener('DOMContentLoaded', () => {
  // tema claro a oscuro
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('ballet_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Modo Claro';
    } else {
      htmlElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Modo Oscuro';
    }
    localStorage.setItem('ballet_theme', theme);
  }
  // manejo de la ventana de dialogo
  const dialogModal = document.querySelector('dialog');
  if (dialogModal) {
    dialogModal.addEventListener('click', (event) => {
      const rect = dialogModal.getBoundingClientRect();
      const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.bottom &&
        rect.left <= event.clientX && event.clientX <= rect.right);
      if (!isInDialog) {
        dialogModal.close();
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-menu');
    const header = document.querySelector('header[role="banner"]');
    const navLinks = document.querySelectorAll('nav.main-nav a');

    if (hamburgerBtn && mainNav) {
        // Función para abrir/cerrar el menú
        const toggleMenu = (open) => {
            const isOpen = open !== undefined ? open : !mainNav.classList.contains('is-active');

            // Mutar atributos WAI-ARIA y clases CSS
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            hamburgerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
            
            mainNav.classList.toggle('is-active', isOpen);
            hamburgerBtn.classList.toggle('is-active', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        };

        // 1. Clic en el botón hamburguesa
        hamburgerBtn.addEventListener('click', () => toggleMenu());

        // 2. Clic en cualquiera de los enlaces
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // 3. Clic fuera de la cabecera
        document.addEventListener('click', (event) => {
            if (mainNav.classList.contains('is-active') && header && !header.contains(event.target)) {
                toggleMenu(false);
            }
        });

        // 4. Tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mainNav.classList.contains('is-active')) {
                toggleMenu(false);
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const apiContainer = document.getElementById('api-container');

    if (apiContainer) {
        cargarProyectosAPI();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (!contactForm) return;

    // Escuchador del evento submit
    contactForm.addEventListener('submit', (event) => {
        // 1. Intercepta el ciclo de vida y previene la recarga predeterminada de la página
        event.preventDefault();

        // 2. Extracción de valores del formulario
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const fechaHora = document.getElementById('fecha-hora')?.value;
        const comentario = document.getElementById('comentario')?.value.trim();

        // 3. Validación básica previa al envío
        if (!nombre || !email || !fechaHora || !comentario) {
            showFeedback('⚠️ Por favor completa todos los campos requeridos antes de enviar.', 'error');
            return;
        }

        // Validación básica de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback('⚠️ Por favor ingresa un correo electrónico válido.', 'error');
            return;
        }

        // 4. Indicador de carga previo al envío asíncrono
        showFeedback('⏳ Enviando tu mensaje...', 'success');

        // 5. Mapeo de campos hacia la plantilla de EmailJS
        const templateParams = {
            user_name: nombre,
            user_email: email,
            fecha_hora: fechaHora,
            message: comentario
        };

        // 6. Envío real a EmailJS
        // Sustituye únicamente el primer y segundo argumento con tus identificadores locales
        emailjs.send('service_gv1ciqs', 'template_r7rjfsc', templateParams, '0xH-7YstwK65uSUMp')
            .then((response) => {
                console.log('Correo enviado con éxito!', response.status, response.text);

                // Limpia el formulario tras el envío exitoso
                contactForm.reset();

                // Restablecer contador de caracteres si existe
                const charCount = document.getElementById('char-count');
                if (charCount) charCount.textContent = '0';

                // Mensaje de éxito persistente
                showFeedback(`✅ ¡Gracias ${nombre}! Tu mensaje ha sido enviado exitosamente.`, 'success');
            })
            .catch((error) => {
                console.error('Error al enviar el correo vía EmailJS:', error);
                showFeedback('⚠️ Ocurrió un error al enviar el correo. Por favor, reintenta más tarde.', 'error');
            });
    });

    /**
     * Muestra la realimentación dinámica en el DOM
     */
    function showFeedback(message, type) {
        if (!formFeedback) return;

        const cssClass = type === 'success' ? 'feedback-success' : 'feedback-error';
        formFeedback.innerHTML = `
            <div class="${cssClass}" role="alert">
                <p>${escapeHTML(message)}</p>
            </div>
        `;
    }

    /**
     * Sanitización de cadenas para prevención de vulnerabilidades XSS
     */
    function escapeHTML(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});