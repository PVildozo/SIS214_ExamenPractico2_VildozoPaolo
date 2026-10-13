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