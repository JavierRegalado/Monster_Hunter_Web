class Monstruo {
    constructor({ id, nombre, especie, elemento, debilidad, descripcion, imagen }) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.elemento = elemento || 'Ninguno';
        this.debilidad = debilidad;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    // Ejemplo de método de objeto (comportamiento propio del monstruo)
    obtenerResumen() {
        return `${this.nombre} (${this.especie}) - Elemento: ${this.elemento}, Debilidad: ${this.debilidad}`;
    }
}

module.exports = Monstruo;