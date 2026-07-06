const pool = require('../config/database');


async function gerar_proximo_id() {
    const resultado = await pool.query(
        'SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) AS maior_id FROM clientes'
    );

    const maior_id = resultado.rows[0].maior_id;

    return String(maior_id + 1).padStart(3, '0');
}

async function buscar_todos() {
    const resultado = await pool.query(
        'SELECT * FROM clientes ORDER BY id ASC'
    );
    return resultado.rows;
}

async function buscar_por_id(id) {
    const resultado = await pool.query(
        'SELECT * FROM clientes WHERE id = $1',
        [id]
    );
    return resultado.rows[0];
}

async function buscar_por_matricula(matricula) {
    const resultado = await pool.query(
        'SELECT * FROM clientes WHERE matricula = $1',
        [matricula]
    );
    return resultado.rows[0];
}

async function criar(dados) {
    const novo_id = await gerar_proximo_id();

    const resultado = await pool.query(
        'INSERT INTO clientes (id, matricula, nome, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [novo_id, dados.matricula, dados.nome, dados.email]
    );

    return resultado.rows[0];
}

async function atualizar(id, dados) {
    const resultado = await pool.query(
        'UPDATE clientes SET matricula = $1, nome = $2, email = $3 WHERE id = $4 RETURNING *',
        [dados.matricula, dados.nome, dados.email, id]
    );

    if (resultado.rowCount === 0) return null;

    return resultado.rows[0];
}

async function remover(id) {
    const resultado = await pool.query(
        'DELETE FROM clientes WHERE id = $1',
        [id]
    );

    return resultado.rowCount > 0;
}

module.exports = {
    buscar_todos,
    buscar_por_id,
    buscar_por_matricula,
    criar,
    atualizar,
    remover
};