const pool = require('../config/database');


async function gerar_proximo_id() {
    const resultado = await pool.query(
        'SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) AS maior_id FROM fornecedores'
    );

    const maior_id = resultado.rows[0].maior_id;

    return String(maior_id + 1).padStart(3, '0');
}

async function buscar_todos() {
    const resultado = await pool.query(
        'SELECT * FROM fornecedores ORDER BY id ASC'
    );
    return resultado.rows;
}

async function buscar_por_id(id) {
    const resultado = await pool.query(
        'SELECT * FROM fornecedores WHERE id = $1',
        [id]
    );
    return resultado.rows[0];
}

async function buscar_por_cnpj(cnpj) {
    const resultado = await pool.query(
        'SELECT * FROM fornecedores WHERE cnpj = $1',
        [cnpj]
    );
    return resultado.rows[0];
}

async function criar(dados) {
    const novo_id = await gerar_proximo_id();

    const resultado = await pool.query(
        'INSERT INTO fornecedores (id, cnpj, nome, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
        [novo_id, dados.cnpj, dados.nome, dados.telefone]
    );

    return resultado.rows[0];
}

async function atualizar(id, dados) {
    const resultado = await pool.query(
        'UPDATE fornecedores SET cnpj = $1, nome = $2, telefone = $3 WHERE id = $4 RETURNING *',
        [dados.cnpj, dados.nome, dados.telefone, id]
    );

    if (resultado.rowCount === 0) return null;

    return resultado.rows[0];
}

async function remover(id) {
    const resultado = await pool.query(
        'DELETE FROM fornecedores WHERE id = $1',
        [id]
    );

    return resultado.rowCount > 0;
}

module.exports = {
    buscar_todos,
    buscar_por_id,
    buscar_por_cnpj,
    criar,
    atualizar,
    remover
};