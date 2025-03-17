const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cpxnjfyhrw5s.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: '8BhSqw5JRjngnHpBhvRP',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões com AWS RDS
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Suporte para JSON
app.use(bodyParser.urlencoded({ extended: true })); // Suporte para URL-encoded
app.use(express.static('public'));

// Rota para obter todos os profissionais
app.get('/professionals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM professionals');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para adicionar um profissional
app.post('/professionals', async (req, res) => {
  const { name, email, age } = req.body;

  // Conversões
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

// Iniciando o servidor
app.listen(port, () => {
  console.log(`App rodando na porta ${port}.`);
});
