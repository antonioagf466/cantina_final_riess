// Validacoes, retorna null se valido ou string com o erro
function validar_nome(nome) {
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return 'O campo "nome" eh obrigatorio e deve ser uma string nao vazia.';
    }
    return null;
}

function validar_descricao(descricao) {
    if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
        return 'O campo "descricao" eh obrigatorio e deve ser uma string nao vazia.';
    }
    return null;
}

module.exports = {
    validar_nome,
    validar_descricao
};