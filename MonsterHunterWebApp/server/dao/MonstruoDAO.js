const db = require('../config/db');
const Monstruo = require('../models/Monstruo');

class MonstruoDAO {
    // Obtener todos los registros y convertirlos a instancias de Monstruo
    static obtenerTodos() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM monstruos';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const monstruos = rows.map(row => new Monstruo(row));
                    resolve(monstruos);
                }
            });
        });
    }

    // Buscar un monstruo por su ID
    static obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM monstruos WHERE id = ?';
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(null);
                } else {
                    resolve(new Monstruo(row));
                }
            });
        });
    }

    // Insertar un nuevo registro y devolver la entidad creada
    static crear(datos) {
        return new Promise((resolve, reject) => {
            const { nombre, especie, elemento, debilidad, descripcion, imagen } = datos;
            const sql = `
                INSERT INTO monstruos (nombre, especie, elemento, debilidad, descripcion, imagen)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.run(sql, [nombre, especie, elemento, debilidad, descripcion, imagen], function (err) {
                if (err) {
                    reject(err);
                } else {
                    const nuevoMonstruo = new Monstruo({ id: this.lastID, ...datos });
                    resolve(nuevoMonstruo);
                }
            });
        });
    }

    // Actualizar los datos de un monstruo existente
    static actualizar(id, datos) {
        return new Promise((resolve, reject) => {
            const { nombre, especie, elemento, debilidad, descripcion, imagen } = datos;
            const sql = `
                UPDATE monstruos 
                SET nombre = ?, especie = ?, elemento = ?, debilidad = ?, descripcion = ?, imagen = ?
                WHERE id = ?
            `;
            db.run(sql, [nombre, especie, elemento, debilidad, descripcion, imagen, id], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    resolve(null); // No se encontró el registro para actualizar
                } else {
                    resolve(new Monstruo({ id: Number(id), ...datos }));
                }
            });
        });
    }

    // Eliminar un monstruo por ID
    static eliminar(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM monstruos WHERE id = ?';
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes > 0); // Devuelve true si se borró alguna fila
                }
            });
        });
    }
}

module.exports = MonstruoDAO;