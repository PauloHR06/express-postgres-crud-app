const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'my-user',
  host: 'localhost',
  database: 'my-database',
  password: 'PauloHR0512#',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/professionals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM professional');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/professionals', async (req, res) => {
  const { name, email, age, is_active } = req.body;
  try {
    await pool.query(
      'INSERT INTO professional (name, email, age, is_active) VALUES ($1, $2, $3, $4)',
      [name, email, age, is_active]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});