const categoria_repository = require('../repositories/categoria_repository');
const { validar_nome, validar_descricao } = require('../validators/categoria_validator');

function checar_nome(nome) {
    return validar_nome(nome);
}

function checar_descricao(descricao) {
    return validar_descricao(descricao);
}

async function checar_existe(id) {
    return await categoria_repository.buscar_por_id(id);
}


async function listar_todas() {
    const categorias = await categoria_repository.buscar_todas();
    return { sucesso: true, status: 200, dados: categorias };
}

async function buscar_por_id(id) {
    const categoria = await checar_existe(id);

    if (!categoria) {
        return { sucesso: false, status: 404, erros: ['Categoria nao encontrada.'] };
    }

    return { sucesso: true, status: 200, dados: categoria };
}

async function criar(dados) {
    const erros = [];

    const erro_nome = checar_nome(dados.nome);
    if (erro_nome) erros.push(erro_nome);

    const erro_descricao = checar_descricao(dados.descricao);
    if (erro_descricao) erros.push(erro_descricao);

    if (erros.length > 0) {
        return { sucesso: false, status: 400, erros };
    }

    const nova_categoria = await categoria_repository.criar(dados);
    return { sucesso: true, status: 201, dados: nova_categoria };
}

async function atualizar(id, dados) {
    const erros = [];

    const erro_nome = checar_nome(dados.nome);
    if (erro_nome) erros.push(erro_nome);

    const erro_descricao = checar_descricao(dados.descricao);
    if (erro_descricao) erros.push(erro_descricao);

    if (erros.length > 0) {
        return { sucesso: false, status: 400, erros };
    }

    const categoria_existente = await checar_existe(id);
    if (!categoria_existente) {
        return { sucesso: false, status: 404, erros: ['Categoria nao encontrada.'] };
    }

    const categoria_atualizada = await categoria_repository.atualizar(id, dados);
    return { sucesso: true, status: 200, dados: categoria_atualizada };
}

async function remover(id) {
    const categoria_existente = await checar_existe(id);

    if (!categoria_existente) {
        return { sucesso: false, status: 404, erros: ['Categoria nao encontrada.'] };
    }

    await categoria_repository.remover(id);
    return {
        sucesso: true,
        status: 200,
        dados: { mensagem: 'Categoria deletada com sucesso.' }
    };
}

module.exports = {
    checar_nome,
    checar_descricao,
    checar_existe,
    listar_todas,
    buscar_por_id,
    criar,
    atualizar,
    remover
};