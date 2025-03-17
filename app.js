const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

require('dotenv').config(); // importa as variáveis de ambiente.

// configuração do pool de conexão com o banco de dados.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // necessário para conexões com AWS RDS.
  },
});

// middleware.
app.use(cors());
app.use(bodyParser.json()); // suporte para JSON.
app.use(bodyParser.urlencoded({ extended: true })); // suporte para URL-encoded.
app.use(express.static('public'));

// SELECT * FROM professionals.
app.get('/professionals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM professionals');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// INSERT INTO professionals.
app.post('/professionals', async (req, res) => {
  const { name, email, age } = req.body;

  // conversões necessárias.
  const ageInt = parseInt(age, 10);

  try {
    await pool.query(
      'INSERT INTO professionals (name, email, age) VALUES ($1, $2, $3)',
      [name, email, ageInt]
    );
    res.status(201).json({ message: "Profissional cadastrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// inicializando o servidor.
app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`);
});
