class TarjetaMonstruo {
    constructor(monstruo) {
        this.nombre = monstruo.nombre;
        this.especie = monstruo.especie;
        this.elemento = monstruo.elemento || 'ninguno';
        this.debilidad = monstruo.debilidad;
        this.descripcion = monstruo.descripcion;
        this.imagen = monstruo.imagen;
    }

    render() {
        return `
            <article class="tarjeta-monstruo">
                <div class="tarjeta-header">
                    <h3>${this.nombre}</h3>
                    <span class="especie-tag">${this.especie}</span>
                </div>
                <div class="tarjeta-imagen">
                    <img src="${this.imagen}" alt="${this.nombre}" loading="lazy">
                </div>
                <div class="tarjeta-info">
                    <p><strong>Elemento:</strong> ${this.elemento}</p>
                    <p><strong>Debilidad:</strong> <span class="debilidad-highlight">${this.debilidad}</span></p>
                    <p class="descripcion">${this.descripcion}</p>
                </div>
            </article>
        `;
    }
}

