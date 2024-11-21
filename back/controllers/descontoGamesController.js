const db = require('../db');

exports.getDescontoGames = (req, res) => {
    db.all('SELECT * FROM DescontoGames', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao buscar descontos de jogos' });
        } else {
            res.json(rows);
        }
    });
};

exports.createDescontoGame = (req, res) => {
    const { nomeJogo, precoOriginal, porcentagemDesconto } = req.body;
    db.run('INSERT INTO DescontoGames (nomeJogo, precoOriginal, porcentagemDesconto) VALUES (?, ?, ?)', 
        [nomeJogo, precoOriginal, porcentagemDesconto], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao criar desconto de jogo' });
        } else {
            res.status(201).json({ id: this.lastID, nomeJogo, precoOriginal, porcentagemDesconto });
        }
    });
};

exports.getDescontoGameById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM DescontoGames WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao buscar desconto de jogo' });
        } else if (!row) {
            res.status(404).json({ message: 'Desconto de jogo não encontrado' });
        } else {
            res.json(row);
        }
    });
};

exports.updateDescontoGame = (req, res) => {
    const { id } = req.params;
    const { nomeJogo, precoOriginal, porcentagemDesconto } = req.body;
    db.run('UPDATE DescontoGames SET nomeJogo = ?, precoOriginal = ?, porcentagemDesconto = ? WHERE id = ?', 
        [nomeJogo, precoOriginal, porcentagemDesconto, id], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao atualizar desconto de jogo' });
        } else {
            res.json({ message: 'Desconto de jogo atualizado com sucesso' });
        }
    });
};

exports.deleteDescontoGame = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM DescontoGames WHERE id = ?', [id], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao deletar desconto de jogo' });
        } else {
            res.json({ message: 'Desconto de jogo deletado com sucesso' });
        }
    });
};
