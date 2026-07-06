const express = require('express');
const router = express.Router();
const categoria_controller = require('../controllers/categoria_controller');

router.get('/',        categoria_controller.buscar_todas);   // Listar todas
router.get('/:id',     categoria_controller.buscar_por_id);  // Buscar por ID
router.post('/',       categoria_controller.criar);          // Criar nova
router.put('/:id',     categoria_controller.atualizar);      // Atualizar existente
router.delete('/:id',  categoria_controller.remover);        // Remover

module.exports = router;