const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const descontoGamesRoutes = require('./routes/descontoGames');
const db = require('./db');

const app = express();
const port = 3000;

// Habilitar o CORS
app.use(cors());

app.use(bodyParser.json());

app.use('/usuarios', usuariosRoutes); // Rota para usuários
app.use('/descontoGames', descontoGamesRoutes);

// Middleware para capturar e logar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = db;
