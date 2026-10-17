/**
 * Módulo Asíncrono para consumir repositorios de dos cuentas de GitHub
 */
async function cargarProyectosAPI() {
    const apiContainer = document.getElementById('api-container');
    if (!apiContainer) return;

    // Cuentas de GitHub a consultar
    const usuario1 = 'pmatz2109';
    const usuario2 = 'PVildozo'; 

    renderLoadingState(apiContainer);

    try {
        // Peticiones HTTP en paralelo para ambas cuentas
        const [res1, res2] = await Promise.all([
            fetch(`https://api.github.com/users/pmatz2109/repos`),
            fetch(`https://api.github.com/users/PVildozo/repos`)
        ]);

        // Validar que ambas respuestas sean exitosas
        if (!res1.ok || !res2.ok) {
            throw new Error(`Error en la solicitud HTTP (${res1.status} / ${res2.status})`);
        }

        const data1 = await res1.json();
        const data2 = await res2.json();

        // Combinar ambos arreglos de datos en uno solo
        const todosLosRepos = [...data1, ...data2];

        // Renderizar la lista unificada
        renderSuccessState(apiContainer, todosLosRepos);

    } catch (error) {
        console.error('Error al consumir las APIs de GitHub:', error);
        renderErrorState(apiContainer, error.message);
    }
}

/**
 * Renderiza la interfaz en estado "Cargando"
 */
function renderLoadingState(container) {
    container.innerHTML = `
        <div class="api-state-loading">
            <div class="spinner" role="status"></div>
            <p>Obteniendo datos de las cuentas de GitHub...</p>
        </div>
    `;
}

/**
 * Renderiza la interfaz en estado "Éxito" procesando el arreglo combinado
 */
function renderSuccessState(container, items) {
    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = `<p>No se encontraron repositorios públicos en ninguna de las cuentas.</p>`;
        return;
    }

    // Tubería funcional: .filter() para omitir forks y .map() para construir el HTML
    const cardsHTML = items
        .filter(repo => !repo.fork) // Filtra para mostrar solo repositorios propios
        .map(repo => `
            <article class="api-card">
                <h3>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        ${escapeHTML(repo.name)}
                    </a>
                </h3>
                <p>${escapeHTML(repo.description || 'Sin descripción disponible.')}</p>
                <p>
                    <strong>Cuenta:</strong> ${escapeHTML(repo.owner.login)} | 
                    <strong>Lenguaje:</strong> ${escapeHTML(repo.language || 'N/A')}
                </p>
            </article>
        `).join('');

    container.innerHTML = `
        <div class="api-grid">
            ${cardsHTML}
        </div>
    `;
}

/**
 * Renderiza la interfaz en estado "Error"
 */
function renderErrorState(container, errorMessage) {
    container.innerHTML = `
        <div class="api-state-error" role="alert">
            <h3>⚠️ Ocurrió un inconveniente al cargar los datos</h3>
            <p>${escapeHTML(errorMessage || 'No se pudo conectar con el servidor.')}</p>
            <button type="button" onclick="cargarProyectosAPI()">Reintentar</button>
        </div>
    `;
}

/**
 * Función de sanitización para evitar vulnerabilidades XSS
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}




document.addEventListener('DOMContentLoaded', () => {
    const apiContainer = document.getElementById('api-container');

    if (apiContainer) {
        cargarProyectosAPI();
    }
});

// Variable global en el módulo para preservar la inmutabilidad de la fuente de datos
let reposOriginales = [];

/**
 * Módulo Asíncrono para consumir repositorios de GitHub
 */
async function cargarProyectosAPI() {
    const apiContainer = document.getElementById('api-container');
    const searchInput = document.getElementById('repo-search');
    if (!apiContainer) return;

    const usuario1 = 'pmatz2109';
    const usuario2 = 'PVildozo'; // Segunda cuenta de GitHub

    renderLoadingState(apiContainer);

    try {
        // Consultas asíncronas en paralelo
        const [res1, res2] = await Promise.all([
            fetch(`https://api.github.com/users/${usuario1}/repos`),
            fetch(`https://api.github.com/users/${usuario2}/repos`)
        ]);

        if (!res1.ok || !res2.ok) {
            throw new Error(`Error en la solicitud HTTP (${res1.status} / ${res2.status})`);
        }

        const data1 = await res1.json();
        const data2 = await res2.json();

        // Almacenamos la lista completa original garantizando la inmutabilidad
        reposOriginales = [...data1, ...data2].filter(repo => !repo.fork);

        // Renderizado inicial con todos los elementos
        renderSuccessState(apiContainer, reposOriginales);

        // ----------------------------------------------------
        // FILTRO EN TIEMPO REAL CON LA TUBERÍA .filter()
        // ----------------------------------------------------
        if (searchInput) {
            searchInput.value = ''; // Limpiar campo al cargar
            
            searchInput.addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase().trim();

                // Tubería funcional: Aplicamos .filter() sobre la colección original inmutable
                const reposFiltrados = reposOriginales.filter(repo => {
                    const nombre = (repo.name || '').toLowerCase();
                    const lenguaje = (repo.language || '').toLowerCase();
                    const descripcion = (repo.description || '').toLowerCase();

                    return nombre.includes(query) || 
                           lenguaje.includes(query) || 
                           descripcion.includes(query);
                });

                // Re-renderizar la vista con los resultados filtrados
                renderSuccessState(apiContainer, reposFiltrados);
            });
        }

    } catch (error) {
        console.error('Error al consumir las APIs de GitHub:', error);
        renderErrorState(apiContainer, error.message);
    }
}

/**
 * Renderiza la interfaz en estado "Cargando"
 */
function renderLoadingState(container) {
    container.innerHTML = `
        <div class="api-state-loading">
            <div class="spinner" role="status"></div>
            <p>Obteniendo datos de los repositorios...</p>
        </div>
    `;
}

/**
 * Renderiza la interfaz en estado "Éxito" procesando el arreglo mediante .map()
 */
function renderSuccessState(container, items) {
    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML = `
            <div class="api-state-empty">
                <p>🔍 No se encontraron repositorios que coincidan con la búsqueda.</p>
            </div>
        `;
        return;
    }

    // Tubería funcional con .map() para transformar los objetos en elementos HTML
    const cardsHTML = items.map(repo => `
        <article class="api-card">
            <h3>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                    ${escapeHTML(repo.name)}
                </a>
            </h3>
            <p>${escapeHTML(repo.description || 'Sin descripción disponible.')}</p>
            <p>
                <strong>Cuenta:</strong> ${escapeHTML(repo.owner.login)} | 
                <strong>Lenguaje:</strong> ${escapeHTML(repo.language || 'N/A')}
            </p>
        </article>
    `).join('');

    container.innerHTML = `
        <div class="api-grid">
            ${cardsHTML}
        </div>
    `;
}

/**
 * Renderiza la interfaz en estado "Error"
 */
function renderErrorState(container, errorMessage) {
    container.innerHTML = `
        <div class="api-state-error" role="alert">
            <h3>⚠️ Ocurrió un inconveniente al cargar los datos</h3>
            <p>${escapeHTML(errorMessage || 'No se pudo conectar con el servidor.')}</p>
            <button type="button" onclick="cargarProyectosAPI()">Reintentar</button>
        </div>
    `;
}

/**
 * Sanitización para prevenir ataques XSS
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}