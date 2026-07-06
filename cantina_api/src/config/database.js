const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'cantina_db',
    user: 'postgres',
    password: 'AnimateWeapon'
});

pool.connect()
    .then(() => console.log('Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('Erro ao conectar no PostgreSQL:', err.message));

module.exports = pool;