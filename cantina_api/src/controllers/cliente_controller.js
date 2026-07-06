const cliente_service = require('../services/cliente_service');

async function buscar_todos(req, res) {
    try {
        const resultado = await cliente_service.listar_todos();
        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao buscar clientes.', detalhe: erro.message });
    }
}

async function buscar_por_id(req, res) {
    try {
        const resultado = await cliente_service.buscar_por_id(req.params.id);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao buscar cliente.', detalhe: erro.message });
    }
}

async function criar(req, res) {
    try {
        const resultado = await cliente_service.criar(req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao criar cliente.', detalhe: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const resultado = await cliente_service.atualizar(req.params.id, req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao atualizar cliente.', detalhe: erro.message });
    }
}

async function remover(req, res) {
    try {
        const resultado = await cliente_service.remover(req.params.id);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao remover cliente.', detalhe: erro.message });
    }
}

module.exports = {
    buscar_todos,
    buscar_por_id,
    criar,
    atualizar,
    remover
};