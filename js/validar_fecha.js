const datetimeInput = document.getElementById('fecha-hora');

// Configuración del horario de atención (Ejemplo: 09:00 a 18:00)
const HORA_INICIO = 9;
const HORA_FIN = 18;

// Función para formatear una fecha local al string 'YYYY-MM-DDTHH:mm'
function toLocalISOString(date) {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().slice(0, 16);
}

function setMinDatetime() {
  const now = new Date();
  const horaActual = now.getHours();

  // Si hoy es antes del horario de apertura, ajustar el min a la hora de apertura de hoy
  if (horaActual < HORA_INICIO) {
    now.setHours(HORA_INICIO, 0, 0, 0);
  } 
  // Si hoy ya pasó el horario de cierre, ajustar el min a la apertura del día siguiente
  else if (horaActual >= HORA_FIN) {
    now.setDate(now.getDate() + 1);
    now.setHours(HORA_INICIO, 0, 0, 0);
  }

  // Asigna el límite mínimo al input
  datetimeInput.min = toLocalISOString(now);
}

// Inicializa el límite al cargar la página
setMinDatetime();

// Validación al cambiar el valor
datetimeInput.addEventListener('change', () => {
  if (!datetimeInput.value) return;

  // 1. Validar que no sea una fecha/hora pasada
  if (datetimeInput.value < datetimeInput.min) {
    alert('Por favor selecciona una fecha y hora futura válida.');
    datetimeInput.value = '';
    return;
  }

  // 2. Extraer la hora elegida por el usuario
  const fechaSeleccionada = new Date(datetimeInput.value);
  const hora = fechaSeleccionada.getHours();

  // 3. Validar que la hora esté dentro del horario de atención
  if (hora < HORA_INICIO || hora >= HORA_FIN) {
    alert(`Nuestro horario de atención es de ${HORA_INICIO}:00 a ${HORA_FIN}:00. Por favor selecciona otra hora.`);
    datetimeInput.value = '';
  }
});