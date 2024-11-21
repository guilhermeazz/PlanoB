const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

exports.getUsuarios = (req, res) => {
    db.all('SELECT * FROM Usuarios', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        } else {
            res.json(rows);
        }
    });
};

exports.getUsuarioById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM Usuarios WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        } else {
            res.json(row);
        }
    });
};

exports.createUsuario = (req, res) => {
    const { nome, email, senha } = req.body;
    db.run('INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        } else {
            res.status(201).json({ id: this.lastID, nome, email });
        }
    });
};


exports.updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    db.run('UPDATE Usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao atualizar usuário' });
        } else {
            res.json({ message: 'Usuário atualizado com sucesso' });
        }
    });
};

exports.deleteUsuario = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Usuarios WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao deletar usuário' });
        } else {
            res.json({ message: 'Usuário deletado com sucesso' });
        }
    });
};

exports.loginUsuario = (req, res) => {
    const { email, senha } = req.body;
    db.get('SELECT * FROM Usuarios WHERE email = ?', [email], (err, usuario) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        } else if (!usuario) {
            res.status(400).json({ message: 'Usuário não encontrado' });
        } else if (usuario.senha !== senha) {
            res.status(400).json({ message: 'Credenciais inválidas' });
        } else {
            const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, 'seuSegredo', { expiresIn: '1h' });
            res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
        }
    });
};

