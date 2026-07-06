const express = require('express');
const router = express.Router();

const categoria_routes = require('./categoria_routes');
const cliente_routes = require('./cliente_routes');
const fornecedor_routes = require('./fornecedor_routes');

router.use('/categorias', categoria_routes);
router.use('/clientes', cliente_routes);
router.use('/fornecedores', fornecedor_routes);

module.exports = router;