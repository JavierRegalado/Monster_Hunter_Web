// Importamos el DAO desde la carpeta dao/
const MonstruoDAO = require('../dao/MonstruoDAO');

class MonstruoController {
    static async obtenerTodos(req, res) {
        try {
            const monstruos = await MonstruoDAO.obtenerTodos();
            res.status(200).json(monstruos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los monstruos', detalle: error.message });
        }
    }

    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const monstruo = await MonstruoDAO.obtenerPorId(id);
            if (!monstruo) {
                return res.status(404).json({ mensaje: 'Monstruo no encontrado' });
            }
            res.status(200).json(monstruo);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar el monstruo', detalle: error.message });
        }
    }

    static async crear(req, res) {
        try {
            const nuevoMonstruo = await MonstruoDAO.crear(req.body);
            res.status(201).json(nuevoMonstruo);
        } catch (error) {
            res.status(400).json({ error: 'Error al registrar el monstruo', detalle: error.message });
        }
    }

    static async actualizar(req, res) {
        try {
            const { id } = req.params;
            const monstruoActualizado = await MonstruoDAO.actualizar(id, req.body);
            if (!monstruoActualizado) {
                return res.status(404).json({ mensaje: 'Monstruo no encontrado' });
            }
            res.status(200).json(monstruoActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el monstruo', detalle: error.message });
        }
    }

    static async eliminar(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await MonstruoDAO.eliminar(id);
            if (!eliminado) {
                return res.status(404).json({ mensaje: 'Monstruo no encontrado' });
            }
            res.status(200).json({ mensaje: 'Monstruo eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el monstruo', detalle: error.message });
        }
    }
}

module.exports = MonstruoController;