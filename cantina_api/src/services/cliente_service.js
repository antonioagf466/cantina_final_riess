const cliente_repository = require('../repositories/cliente_repository');
const {
    validar_matricula,
    validar_nome,
    validar_email
} = require('../validators/cliente_validator');


function checar_matricula(matricula) {
    return validar_matricula(matricula);
}

function checar_nome(nome) {
    return validar_nome(nome);
}

function checar_email(email) {
    return validar_email(email);
}

async function checar_existe(id) {
    return await cliente_repository.buscar_por_id(id);
}

async function checar_matricula_unica(matricula, id_atual = null) {
    const existente = await cliente_repository.buscar_por_matricula(matricula);

    if (!existente) return null;

    if (id_atual && existente.id === id_atual) return null;

    return 'Matricula ja cadastrada para outro cliente.';
}


async function listar_todos() {
    const clientes = await cliente_repository.buscar_todos();
    return { sucesso: true, status: 200, dados: clientes };
}

async function buscar_por_id(id) {
    const cliente = await checar_existe(id);

    if (!cliente) {
        return { sucesso: false, status: 404, erros: ['Cliente nao encontrado.'] };
    }

    return { sucesso: true, status: 200, dados: cliente };
}

async function criar(dados) {
    const erros = [];

    const erro_matricula = checar_matricula(dados.matricula);
    if (erro_matricula) erros.push(erro_matricula);

    const erro_nome = checar_nome(dados.nome);
    if (erro_nome) erros.push(erro_nome);

    const erro_email = checar_email(dados.email);
    if (erro_email) erros.push(erro_email);

    if (erros.length > 0) {
        return { sucesso: false, status: 400, erros };
    }

    const erro_unica = await checar_matricula_unica(dados.matricula);
    if (erro_unica) {
        return { sucesso: false, status: 400, erros: [erro_unica] };
    }

    const novo_cliente = await cliente_repository.criar(dados);
    return { sucesso: true, status: 201, dados: novo_cliente };
}
async function atualizar(id, dados) {
    const erros = [];

    const erro_matricula = checar_matricula(dados.matricula);
    if (erro_matricula) erros.push(erro_matricula);

    const erro_nome = checar_nome(dados.nome);
    if (erro_nome) erros.push(erro_nome);

    const erro_email = checar_email(dados.email);
    if (erro_email) erros.push(erro_email);

    if (erros.length > 0) {
        return { sucesso: false, status: 400, erros };
    }

    const cliente_existente = await checar_existe(id);
    if (!cliente_existente) {
        return { sucesso: false, status: 404, erros: ['Cliente nao encontrado.'] };
    }

    const erro_unica = await checar_matricula_unica(dados.matricula, id);
    if (erro_unica) {
        return { sucesso: false, status: 400, erros: [erro_unica] };
    }

    const cliente_atualizado = await cliente_repository.atualizar(id, dados);
    return { sucesso: true, status: 200, dados: cliente_atualizado };
}

async function remover(id) {
    const cliente_existente = await checar_existe(id);

    if (!cliente_existente) {
        return { sucesso: false, status: 404, erros: ['Cliente nao encontrado.'] };
    }

    await cliente_repository.remover(id);
    return {
        sucesso: true,
        status: 200,
        dados: { mensagem: 'Cliente deletado com sucesso.' }
    };
}

module.exports = {
    checar_matricula,
    checar_nome,
    checar_email,
    checar_existe,
    checar_matricula_unica,
    listar_todos,
    buscar_por_id,
    criar,
    atualizar,
    remover
};