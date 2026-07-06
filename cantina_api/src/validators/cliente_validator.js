function validar_matricula(matricula) {
    if (!matricula || typeof matricula !== 'string' || matricula.trim() === '') {
        return 'O campo "matricula" eh obrigatorio e deve ser uma string nao vazia.';
    }
    return null;
}

function validar_nome(nome) {
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return 'O campo "nome" eh obrigatorio e deve ser uma string nao vazia.';
    }
    return null;
}

function validar_email(email) {
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return 'O campo "email" eh obrigatorio e deve ser uma string nao vazia.';
    }

    const email_limpo = email.trim();
    if (!email_limpo.includes('@') || !email_limpo.includes('.')) {
        return 'O campo "email" deve ser um endereco de e-mail valido (ex: nome@dominio.com).';
    }

    return null;
}

module.exports = {
    validar_matricula,
    validar_nome,
    validar_email
};