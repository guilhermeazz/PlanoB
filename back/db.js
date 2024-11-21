const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'data', 'meuprojeto.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Falha ao conectar ao banco de dados', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');
    }
});

module.exports = db;
