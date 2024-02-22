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

// CRUD per Quest
app.post('/quest', (req, res) => {
    const data = req.body;
    const sql = "INSERT INTO Quest SET ?";
    db.query(sql, data, (error, results) => {
      if (error) throw error;
      res.json({ message: "Missione creata con successo", data: results });
    });
  });
  
  app.get('/quest', (req, res) => {
    const sql = "SELECT * FROM Quest";
    db.query(sql, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  app.get('/quest/:id', (req, res) => {
    const sql = `SELECT * FROM Quest WHERE id = ${db.escape(req.params.id)}`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json(result);
    });
  });
  
  app.put('/quest/:id', (req, res) => {
    const data = req.body;
    const sql = `UPDATE Quest SET ? WHERE id = ${db.escape(req.params.id)}`;
    db.query(sql, data, (error, result) => {
      if (error) throw error;
      res.json({ message: "Missione aggiornata con successo", data: result });
    });
  });
  
  app.delete('/quest/:id', (req, res) => {
    const sql = `DELETE FROM Quest WHERE id = ${db.escape(req.params.id)}`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json({ message: "Missione eliminata con successo" });
    });
  });  

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
