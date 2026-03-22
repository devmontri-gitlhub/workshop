const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // 👉 เสิร์ฟไฟล์ static จาก root

// ========== API Routes ==========

// ✅ GET - ดึงผู้ใช้ทั้งหมด
app.get('/users', async (req, res) => {
  try {
    const users = await db.getUsersPostgres();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST - สร้างผู้ใช้ใหม่
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await db.createUserPostgres(name, email);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT - แก้ไขผู้ใช้
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await db.updateUserPostgres(id, name, email);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE - ลบผู้ใช้
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.deleteUserPostgres(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});