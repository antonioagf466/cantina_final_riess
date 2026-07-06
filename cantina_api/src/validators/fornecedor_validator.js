function normalizar_cnpj(cnpj) {
    if (typeof cnpj !== 'string') return '';
    return cnpj.replace(/[.\-\/]/g, '').trim();
}

function normalizar_telefone(telefone) {
    if (typeof telefone !== 'string') return '';
    return telefone.replace(/[\s()\-]/g, '');
}

function validar_cnpj(cnpj) {
    if (!cnpj || typeof cnpj !== 'string' || cnpj.trim() === '') {
        return 'O campo "cnpj" eh obrigatorio e deve ser uma string nao vazia.';
    }

    const cnpj_limpo = normalizar_cnpj(cnpj);
    if (!/^\d{14}$/.test(cnpj_limpo)) {
        return 'CNPJ invalido. Informe 14 digitos numericos (com ou sem formatacao).';
    }

    return null;
}

function validar_nome(nome) {
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return 'O campo "nome" eh obrigatorio e deve ser uma string nao vazia.';
    }
    return null;
}

function validar_telefone(telefone) {
    if (!telefone || typeof telefone !== 'string' || telefone.trim() === '') {
        return 'O campo "telefone" eh obrigatorio e deve ser uma string nao vazia.';
    }

    const telefone_limpo = normalizar_telefone(telefone);
    if (!/^\d{10,11}$/.test(telefone_limpo)) {
        return 'Telefone invalido. Informe um numero com DDD (10 ou 11 digitos).';
    }

    return null;
}

module.exports = {
    validar_cnpj,
    validar_nome,
    validar_telefone,
    normalizar_cnpj,
    normalizar_telefone
};