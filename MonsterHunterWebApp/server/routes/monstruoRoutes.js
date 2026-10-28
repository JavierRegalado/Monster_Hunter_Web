const express = require('express');
const router = express.Router();
const MonstruoController = require('../controllers/MonstruoController');

// Rutas
router.get('/', MonstruoController.obtenerTodos);
router.get('/:id', MonstruoController.obtenerPorId);
router.post('/', MonstruoController.crear);

// ⚠️ Asegúrate de incluir esta línea:
module.exports = router;