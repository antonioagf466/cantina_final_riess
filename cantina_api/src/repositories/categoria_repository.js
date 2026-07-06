const pool = require('../config/database');


async function gerar_proximo_id() {
    const resultado = await pool.query(
        'SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) AS maior_id FROM categorias'
    );

    const maior_id = resultado.rows[0].maior_id;

    return String(maior_id + 1).padStart(3, '0');
}

async function buscar_todas() {
    const resultado = await pool.query(
        'SELECT * FROM categorias ORDER BY id ASC'
    );
    return resultado.rows;
}

async function buscar_por_id(id) {
    const resultado = await pool.query(
        'SELECT * FROM categorias WHERE id = $1',
        [id]
    );
    return resultado.rows[0]; 
}

async function criar(dados) {
    const novo_id = await gerar_proximo_id();

    const resultado = await pool.query(
        'INSERT INTO categorias (id, nome, descricao) VALUES ($1, $2, $3) RETURNING *',
        [novo_id, dados.nome, dados.descricao]
    );

    return resultado.rows[0];
}

async function atualizar(id, dados) {
    const resultado = await pool.query(
        'UPDATE categorias SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
        [dados.nome, dados.descricao, id]
    );

    if (resultado.rowCount === 0) return null;

    return resultado.rows[0];
}

async function remover(id) {
    const resultado = await pool.query(
        'DELETE FROM categorias WHERE id = $1',
        [id]
    );

    return resultado.rowCount > 0;
}

module.exports = {
    buscar_todas,
    buscar_por_id,
    criar,
    atualizar,
    remover
};