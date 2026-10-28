import TarjetaMonstruo from './components/TarjetaMonstruo.js';

class BestiarioApp {
    constructor(apiUrl, contenedorId) {
        this.apiUrl = apiUrl;
        this.contenedor = document.getElementById(contenedorId);
    }

    async cargarMonstruos() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Error al conectarse con la API`);
            }
            const monstruos = await response.json();
            this.renderizar(monstruos);
        } catch (error) {
            console.error('Error:', error);
            this.contenedor.innerHTML = '<p class="error-msg">No se pudieron cargar los monstruos. Intenta nuevamente más tarde.</p>';
        }
    }

    renderizar(listaMonstruos) {
        if(!listaMonstruos || listaMonstruos.length === 0) {
            this.contenedor.innerHTML = '<p class="no-monstruos-msg">No hay monstruos disponibles en este momento.</p>';
            return;
        }

        this.contenedor.innerHTML = listaMonstruos
        .map(m => new TarjetaMonstruo(m).render())
        .join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new BestiarioApp('http://localhost:3000/api/monstruos', 'grid-bestiario');
    app.cargarMonstruos();
});