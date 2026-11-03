const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "poketto-chave",
    resave: false,
    saveUninitialized: false
}));

const usuários = [];
const leilões = [];
let id = 1;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro</title>
        </head>
        <body>
            <h2>Cadastro de Usuário</h2>
            <form action="/cadastro" method="POST">
                <input type="text" name="nome" placeholder="Nome" required><br><br>
                <input type="email" name="email" placeholder="E-mail" required><br><br>
                <input type="password" name="senha" placeholder="Senha" required><br><br>
                <button type="submit">Cadastrar</button>
            </form>
        </body>
        </html>
    `);
});

app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send('Preencha todos os campos.');
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = {
        id: id++,
        nome,
        email,
        senha: hashSenha,
        aprovado: false
    };

    usuários.push(novoUsuario);

    res.send('Cadastro realizado com sucesso! Aguarde a aprovação da sua conta.');
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
