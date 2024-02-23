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
app.post('/guilds', (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO Guild SET ?";
  db.query(sql, data, (error, results) => {
    if (error) throw error;
    res.json({ message: "Gilda creata con successo", data: results });
  });
});

app.get('/guilds', (req, res) => {
  const sql = "SELECT * FROM Guild";
  db.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/guilds/:id', (req, res) => {
  const sql = `SELECT * FROM Guild WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.put('/guilds/:id', (req, res) => {
  const data = req.body;
  const sql = `UPDATE Guild SET ? WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, data, (error, result) => {
    if (error) throw error;
    res.json({ message: "Gilda aggiornata con successo", data: result });
  });
});

app.delete('/guilds/:id', (req, res) => {
  const sql = `DELETE FROM Guild WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.json({ message: "Gilda eliminata con successo" });
  });
});

// Endpoint per il login delle Guild
app.post('/guilds/login', (req, res) => {
  const { name, authentication_seal } = req.body;
  const sql = "SELECT * FROM Guild WHERE name = ? AND authentication_seal = ?";
  
  db.query(sql, [name, authentication_seal], (error, results) => {
    if (error) {
      console.error('Errore durante la query:', error);
      return res.status(500).json({ message: "Errore interno del server" });
    }
    
    if (results.length > 0) {
      // Guild trovata, login riuscito
      return res.status(200).json({ message: "Login riuscito", guild: results[0] });
    } else {
      // Nessuna guild corrispondente trovata
      return res.status(404).json({ message: "Credenziali non valide" });
    }
  });
});


// CRUD per Quest
app.post('/quests', (req, res) => {
    const data = req.body;
    const sql = "INSERT INTO Quest SET ?";
    db.query(sql, data, (error, results) => {
      if (error) throw error;
      res.json({ message: "Missione creata con successo", data: results });
    });
  });
  
  app.get('/quests', (req, res) => {
    const sql = "SELECT * FROM Quest";
    db.query(sql, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  app.get('/quests/:id', (req, res) => {
    const sql = `SELECT * FROM Quest WHERE id = ${db.escape(req.params.id)}`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      res.json(result);
    });
  });
  
  app.put('/quests/:id', (req, res) => {
    const data = req.body;
    const sql = `UPDATE Quest SET ? WHERE id = ${db.escape(req.params.id)}`;
    db.query(sql, data, (error, result) => {
      if (error) throw error;
      res.json({ message: "Missione aggiornata con successo", data: result });
    });
  });
  
  app.delete('/quests/:id', (req, res) => {
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
