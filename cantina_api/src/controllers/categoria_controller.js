const categoria_service = require('../services/categoria_service');

async function buscar_todas(req, res) {
    try {
        const resultado = await categoria_service.listar_todas();
        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao buscar categorias.', detalhe: erro.message });
    }
}

async function buscar_por_id(req, res) {
    try {
        const resultado = await categoria_service.buscar_por_id(req.params.id);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao buscar categoria.', detalhe: erro.message });
    }
}

async function criar(req, res) {
    try {
        const resultado = await categoria_service.criar(req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao criar categoria.', detalhe: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const resultado = await categoria_service.atualizar(req.params.id, req.body);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao atualizar categoria.', detalhe: erro.message });
    }
}

async function remover(req, res) {
    try {
        const resultado = await categoria_service.remover(req.params.id);

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({ erros: resultado.erros });
        }

        return res.status(resultado.status).json(resultado.dados);
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao remover categoria.', detalhe: erro.message });
    }
}

module.exports = {
    buscar_todas,
    buscar_por_id,
    criar,
    atualizar,
    remover
};