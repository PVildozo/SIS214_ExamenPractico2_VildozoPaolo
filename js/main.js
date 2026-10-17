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
    const menuToggle = document.getElementById('menu-toggle');
    const header = document.querySelector('header[role="banner"]');
    const navLinks = document.querySelectorAll('nav.main-nav a');

    if (menuToggle) {
        // Función auxiliar para actualizar el scroll del body
        const updateBodyScroll = () => {
            if (menuToggle.checked) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        };

        // 1. Escuchar el cambio de estado en el checkbox
        menuToggle.addEventListener('change', updateBodyScroll);

        // 2. Cerrar al hacer clic en un enlace de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                    updateBodyScroll();
                }
            });
        });

        // 3. Cerrar al hacer clic fuera de la cabecera
        document.addEventListener('click', (event) => {
            if (menuToggle.checked && header && !header.contains(event.target)) {
                menuToggle.checked = false;
                updateBodyScroll();
            }
        });

        // 4. Accesibilidad: Cerrar al presionar la tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.checked) {
                menuToggle.checked = false;
                updateBodyScroll();
            }
        });
    }
});