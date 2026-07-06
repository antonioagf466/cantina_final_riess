const express = require('express');
const router = express.Router();
const cliente_controller = require('../controllers/cliente_controller');

router.get('/',        cliente_controller.buscar_todos);   // Listar todos
router.get('/:id',     cliente_controller.buscar_por_id);  // Buscar por ID
router.post('/',       cliente_controller.criar);          // Criar novo
router.put('/:id',     cliente_controller.atualizar);      // Atualizar existente
router.delete('/:id',  cliente_controller.remover);        // Remover

module.exports = router;