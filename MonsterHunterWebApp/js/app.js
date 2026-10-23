const imagenes = document.querySelectorAll('.slider img');
const btnPrev = document.getElementById('prevBtn');
const btnNext = document.getElementById('nextBtn');

let indiceActual = 0;

function cambiarImagen(nuevoIndice) {
    // Quita la clase active de la imagen actual
    imagenes[indiceActual].classList.remove('active');

    // Manejo de límites para hacer el bucle
    if (nuevoIndice >= imagenes.length) {
        indiceActual = 0;
    } else if (nuevoIndice < 0) {
        indiceActual = imagenes.length - 1;
    } else {
        indiceActual = nuevoIndice;
    }

    // Añade la clase active a la nueva imagen
    imagenes[indiceActual].classList.add('active');
}

// Escuchadores de eventos para los botones
btnNext.addEventListener('click', () => {
    cambiarImagen(indiceActual + 1);
});

btnPrev.addEventListener('click', () => {
    cambiarImagen(indiceActual - 1);
});
// 1. Crear una variable para guardar el temporizador
let intervalo;

// 2. Función para arrancar el cambio automático (ejemplo: cada 4 segundos)
function iniciarAutoplay() {
    intervalo = setInterval(() => {
        cambiarImagen(indiceActual + 1);
    }, 4000); // 4000 ms = 4 segundos
}

// 3. Función para reiniciar el temporizador cuando el usuario hace clic
function reiniciarAutoplay() {
    clearInterval(intervalo); // Cancela el temporizador activo
    iniciarAutoplay();       // Arranca uno nuevo desde cero
}

// 4. Modificar los eventos de los botones para incluir el reinicio
btnNext.addEventListener('click', () => {
    cambiarImagen(indiceActual + 1);
    reiniciarAutoplay();
});

btnPrev.addEventListener('click', () => {
    cambiarImagen(indiceActual - 1);
    reiniciarAutoplay();
});

// 5. Iniciar la reproducción automática al cargar la página
iniciarAutoplay();