const fornecedor_repository = require('../repositories/fornecedor_repository');
const {
    validar_cnpj,
    validar_nome,
    validar_telefone,
    normalizar_cnpj,
    normalizar_telefone
} = require('../validators/fornecedor_validator');


function checar_cnpj(cnpj) {
    return validar_cnpj(cnpj);
}

function checar_nome(nome) {
    return validar_nome(nome);
}

function checar_telefone(telefone) {
    return validar_telefone(telefone);
}

async function checar_existe(id) {
    return await fornecedor_repository.buscar_por_id(id);
}

async function checar_cnpj_unico(cnpj_normalizado, id_atual = null) {
    const existente = await fornecedor_repository.buscar_por_cnpj(cnpj_normalizado);

    if (!existente) return null;
    if (id_atual && existente.id === id_atual) return null;

    return 'Ja existe um fornecedor cadastrado com esse CNPJ.';
}


async function listar_todos() {
    const fornecedores = await fornecedor_repository.buscar_todos();
    return { sucesso: true, status: 200, dados: fornecedores };
}

async function buscar_por_id(id) {
    const fornecedor = await checar_existe(id);

    if (!fornecedor) {
        return { sucesso: false, status: 404, erros: ['Fornecedor nao encontrado.'] };
    }

    return { sucesso: true, status: 200, dados: fornecedor };
}
async function criar(dados) {
    const erros = [];

    const erro_cnpj = checar_cnpj(dados.cnpj);
    if (erro_cnpj) erros.push(erro_cnpj);

    const erro_nome = checar_nome(dados.nome);
    if (erro_nome) erros.push(erro_nome);

    const erro_telefone = checar_telefone(dados.telefone);
    if (erro_telefone) erros.push(erro_telefone);

    if (erros.length > 0) {
        return { sucesso: false, status: 400, erros };
    }

    const dados_limpos = {
        cnpj: normalizar_cnpj(dados.cnpj),
        nome: dados.nome.trim(),
        telefone: normalizar_telefone(dados.telefone)
    };

    const erro_unico = await checar_cnpj_unico(dados_limpos.cnpj);
    if (erro_unico) {
        return { sucesso: false, status: 400, erros: [erro_unico] };
    }

    const novo_fornecedor = await fornecedor_repository.criar(dados_limpos);
    return { sucesso: true, status: 201, dados: novo_fornecedor };
}

async function atualizar(id, dados) {
    const erros = [];

    const erro_cnpj = checar_cnpj(dados.cnpj);
    if (erro_cnpj) erros.push(erro_cnpj);

    const erro_nome = checar_nome(dados.nome);
    if (erro_nome) erros.push(erro_nome);

    const erro_telefone = checar_telefone(dados.telefone);
    if (erro_telefone) erros.push(erro_telefone);

    if (erros.length > 0) {
        return { sucesso: false, status: 400, erros };
    }

    const fornecedor_existente = await checar_existe(id);
    if (!fornecedor_existente) {
        return { sucesso: false, status: 404, erros: ['Fornecedor nao encontrado.'] };
    }

    const dados_limpos = {
        cnpj: normalizar_cnpj(dados.cnpj),
        nome: dados.nome.trim(),
        telefone: normalizar_telefone(dados.telefone)
    };

    const erro_unico = await checar_cnpj_unico(dados_limpos.cnpj, id);
    if (erro_unico) {
        return { sucesso: false, status: 400, erros: [erro_unico] };
    }


    const fornecedor_atualizado = await fornecedor_repository.atualizar(id, dados_limpos);
    return { sucesso: true, status: 200, dados: fornecedor_atualizado };
}

async function remover(id) {
    const fornecedor_existente = await checar_existe(id);

    if (!fornecedor_existente) {
        return { sucesso: false, status: 404, erros: ['Fornecedor nao encontrado.'] };
    }

    await fornecedor_repository.remover(id);
    return {
        sucesso: true,
        status: 200,
        dados: { mensagem: 'Fornecedor deletado com sucesso.' }
    };
}

module.exports = {
    checar_cnpj,
    checar_nome,
    checar_telefone,
    checar_existe,
    checar_cnpj_unico,
    listar_todos,
    buscar_por_id,
    criar,
    atualizar,
    remover
};