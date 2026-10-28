const MonstruoModel = require('../models/MonstruoModel');

class MonstruoController {
    static async obtenerTodos(req, res) {
        try {
            const monstruos = await MonstruoModel.obtenerTodos();
            res.status(200).json(monstruos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los monstruos', detalle: error.message });
        }
    }

    static async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const monstruo = await MonstruoModel.obtenerPorId(id);
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
            const nuevoMonstruo = await MonstruoModel.crear(req.body);
            res.status(201).json(nuevoMonstruo);
        } catch (error) {
            res.status(400).json({ error: 'Error al registrar el monstruo', detalle: error.message });
        }
    }
}

// ⚠️ Asegúrate de incluir esta línea:
module.exports = MonstruoController;