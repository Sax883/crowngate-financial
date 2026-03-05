const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

app.use(cors());
app.use(express.json());

// Initialize SQLite DB (file: data.db)
const dbPath = path.join(__dirname, 'data.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    passwordHash TEXT,
    accountType TEXT,
    interests TEXT,
    message TEXT,
    createdAt TEXT
  )`);
});

// Helper: create JWT
function createToken(payload){
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, accountType, interests, message } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const passwordHash = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    const stmt = db.prepare(`INSERT INTO clients (firstName,lastName,email,phone,passwordHash,accountType,interests,message,createdAt) VALUES (?,?,?,?,?,?,?,?,?)`);
    stmt.run(firstName, lastName, email, phone, passwordHash, accountType, JSON.stringify(interests||[]), message, createdAt, function(err){
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ error: 'Email already registered' });
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      const userId = this.lastID;
      const token = createToken({ userId, email });
      res.json({ ok:true, token });
    });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', (req,res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  db.get('SELECT id, passwordHash FROM clients WHERE email = ?', [email], async (err,row)=>{
    if (err) { console.error(err); return res.status(500).json({ error: 'DB error' }); }
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, row.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = createToken({ userId: row.id, email });
    res.json({ ok:true, token });
  });
});

// Me - returns client profile (protected)
app.get('/api/me', (req,res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/i,'');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, JWT_SECRET, (err, decoded)=>{
    if (err) return res.status(401).json({ error: 'Invalid token' });
    const userId = decoded.userId;
    db.get('SELECT id, firstName, lastName, email, phone, accountType, interests, message, createdAt FROM clients WHERE id = ?', [userId], (err,row)=>{
      if (err) { console.error(err); return res.status(500).json({ error: 'DB error' }); }
      if (!row) return res.status(404).json({ error: 'Not found' });
      row.interests = row.interests ? JSON.parse(row.interests) : [];
      res.json({ ok:true, user: row });
    });
  });
});

// Serve static site optionally (useful during development)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, ()=>{
  console.log(`Auth server running on http://localhost:${PORT}`);
});
