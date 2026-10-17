document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('comentario');
  const charCount = document.getElementById('char-count');
  const counterInfo = document.getElementById('counter-info');

  if (!textarea || !charCount) return;

  const maxChars = parseInt(textarea.getAttribute('maxlength'), 10) || 300;
  const warningThreshold = Math.floor(maxChars * 0.9);

  // Escucha el evento 'input' para contar en tiempo real
  textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    charCount.textContent = currentLength;

    if (counterInfo) {
      counterInfo.classList.remove('warning', 'limit-reached');

      if (currentLength >= maxChars) {
        counterInfo.classList.add('limit-reached');
      } else if (currentLength >= warningThreshold) {
        counterInfo.classList.add('warning');
      }
    }
  });
});