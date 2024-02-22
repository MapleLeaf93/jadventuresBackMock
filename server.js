const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'jaita', // sostituisci con il tuo username MySQL
  password: 'jaita107', // sostituisci con la tua password MySQL
  database: 'jadventures'
});

db.connect(error => {
  if (error) throw error;
  console.log('Connesso con successo al database MySQL.');
});

// CRUD per Guild
app.post('/guild', (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO Guild SET ?";
  db.query(sql, data, (error, results) => {
    if (error) throw error;
    res.json({ message: "Gilda creata con successo", data: results });
  });
});

app.get('/guild', (req, res) => {
  const sql = "SELECT * FROM Guild";
  db.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/guild/:id', (req, res) => {
  const sql = `SELECT * FROM Guild WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.put('/guild/:id', (req, res) => {
  const data = req.body;
  const sql = `UPDATE Guild SET ? WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, data, (error, result) => {
    if (error) throw error;
    res.json({ message: "Gilda aggiornata con successo", data: result });
  });
});

app.delete('/guild/:id', (req, res) => {
  const sql = `DELETE FROM Guild WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.json({ message: "Gilda eliminata con successo" });
  });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
