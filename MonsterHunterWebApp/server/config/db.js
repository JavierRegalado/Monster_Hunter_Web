const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../bestiario.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('⚔️ Conectado a la BBDD del Gremio.');
        inicializarTablas();
    }
});

function inicializarTablas() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS monstruos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                especie TEXT NOT NULL,
                elemento TEXT,
                debilidad TEXT NOT NULL,
                descripcion TEXT,
                imagen TEXT
            )
        `, (err) => {
            if (!err) {
                poblarDatosIniciales();
            }
        });
    });
}

function poblarDatosIniciales() {
    db.get("SELECT COUNT(*) AS total FROM monstruos", (err, row) => {
        if (err) {
            console.error('Error al verificar la tabla:', err.message);
            return;
        }

        // Si la tabla no tiene ningún registro, insertamos monstruos de ejemplo
        if (row.total === 0) {
            console.log('📜 Insertando expediente inicial de monstruos...');

            const stmt = db.prepare(`
                INSERT INTO monstruos (nombre, especie, elemento, debilidad, descripcion, imagen)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            stmt.run(
                'Rathalos',
                'Wyvern Volador',
                'Fuego',
                'Rayo',
                'El Rey de los Cielos. Domina el aire y ataca con sus garras envenenadas y potentes llamaradas.',
                'Proyectos/MonsterHunterWebApp/styles/images/rathalos.png'
            );

            stmt.run(
                'Zinogre',
                'Wyvern de Colmillo',
                'Rayo',
                'Hielo',
                'Wyvern envuelto en relámpagos gracias a los Bichos Eléctricos que convoca para cargarse.',
                'Proyectos/MonsterHunterWebApp/styles/images/zinogre.png'
            );

            stmt.finalize(() => {
                console.log('✅ Monstruos de prueba registrados correctamente.');
            });
        }
    });
}

module.exports = db;