import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const { verbose } = sqlite3;

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));

// allow CORS everywhere
app.use(cors());
app.use(express.static(join(_dirname, 'dist')));



// // use SQLite database
// const sqlite3 = require('sqlite3').verbose();

// open database in file named database
let db = new sqlite3.Database('./oddlebase', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// create users table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, games_played INTEGER, games_won INTEGER)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Created users table.');
});

// create session tokens table
db.run('CREATE TABLE IF NOT EXISTS session_tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, token TEXT NOT NULL UNIQUE)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Created session tokens table.');
});

// create daily stats table for users and leaderboard
db.run('CREATE TABLE IF NOT EXISTS daily_stats (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, date TEXT NOT NULL, rounds_played INTEGER)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Created daily stats table.');
});

// allow log in with username and password
app.post('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }
    const token = Math.random().toString(36).substr(2);
    const sql = 'INSERT INTO session_tokens (user_id, token) VALUES (?, ?)';
    db.run(sql, [row.id, token], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ token: token });
    });
  });
});

// allow sign up with name, email, and password
app.post('/signup', (req, res) => {
  const username = req.query.username;
  const email = req.query.email;
  const password = req.query.password;
  const games_played = 0;
  const games_won = 0;

  const sql = 'INSERT INTO users (username, email, password, games_played, games_won) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [username, email, password, games_played, games_won], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ success: 'User created.' });
  });
});

// allow log out with token
app.post('/logout', (req, res) => {
  const token = req.query.token;
  const sql = 'DELETE FROM session_tokens WHERE token = ?';
  db.run(sql, [token], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ success: 'User logged out.' });
  });
});

// allow getting user info with token
app.get('/user', (req, res) => {
  const token = req.query.token;
  const sql = 'SELECT users.id, users.username, users.email, users.games_played, users.games_won FROM users INNER JOIN session_tokens ON users.id = session_tokens.user_id WHERE session_tokens.token = ?';
  db.get(sql, [token], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    return res.json({ id: row.id, username: row.username, email: row.email, games_played: row.games_played, games_won: row.games_won });
  });
});

// update daily stats - called when they are done with the daily game
app.post('/updatedaily', (req, res) => {
  // user_id INTEGER NOT NULL, token TEXT NOT NULL UNIQUE, date TEXT NOT NULL, rounds_played INTEGER
  const username = req.query.username;
  // const token = req.query.token;
  const date = req.query.date;
  const rounds_played = req.query.rounds_played;

  const sql = 'INSERT INTO daily_stats (username, date, rounds_played) VALUES (?, ?, ?)'
  db.get(sql, [username, date, rounds_played], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ success: 'Daily stats updated.' });
  });
});

// leaderboard: get all players in order
app.get('/dailyplayers', (req, res) => {
  const date = req.query.date;

  const sql = 'SELECT username, rounds_played FROM daily_stats WHERE date = ? ORDER BY rounds_played DESC';
  db.all(sql, [date], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows || rows.length == 0) {
      return res.status(401).json({ error: 'Nobody has played yet today.' });
    }
    return res.json(rows);
  });
});

// leaderboard: get top 10 players
app.get('/topten', (req, res) => {
  const date = req.query.date;

  const sql = 'SELECT username, rounds_played FROM daily_stats WHERE date = ? ORDER BY rounds_played DESC LIMIT 10';
  db.all(sql, [date], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows || rows.length == 0) {
      return res.status(401).json({ error: 'Nobody has played yet today.' });
    }
    return res.json(rows);
  });
});

// personal stats: get win %
app.get('/winrate', (req, res) => {
  const username = req.query.username;

  const sql = 'SELECT games_won, games_played FROM users WHERE username = ?';
  db.get(sql, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Nobody has played yet today.' });
    }
    return res.json(row);
  });
});

// personal stats: get round count for all games played
app.get('/roundcount', (req, res) => {
  const username = req.query.username;

  const sql = 'SELECT rounds_played, COUNT(*) FROM daily_stats WHERE username = ? GROUP BY rounds_played';
  db.all(sql, [username], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows || rows.length == 0) {
      return res.status(401).json({ error: 'This user has not played the game.' });
    }
    return res.json(rows);
  });
});

// personal stats: get daily round count
app.get('/dailycount', (req, res) => {
  const username = req.query.username;
  const date = req.query.date;

  const sql = 'SELECT rounds_played FROM daily_stats WHERE username = ? AND date = ?';
  db.get(sql, [username, date], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'This user has not played yet today'});
    }
    return res.json(row);
  });
});

app.get('*', (req, res) => {
  res.sendFile(join(_dirname, 'dist', 'index.html'));
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});