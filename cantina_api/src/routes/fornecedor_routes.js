const express = require('express');
const router = express.Router();
const fornecedor_controller = require('../controllers/fornecedor_controller');

router.get('/',        fornecedor_controller.buscar_todos);   // Listar todos
router.get('/:id',     fornecedor_controller.buscar_por_id);  // Buscar por ID
router.post('/',       fornecedor_controller.criar);          // Criar novo
router.put('/:id',     fornecedor_controller.atualizar);      // Atualizar existente
router.delete('/:id',  fornecedor_controller.remover);        // Remover

module.exports = router;