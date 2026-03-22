// ========== PostgreSQL ==========
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',     // ตัวแปร: ชื่อผู้ใช้ DB
  host: 'localhost',    // ตัวแปร: ที่อยู่ DB
  database: 'workshop', // ตัวแปร: ชื่อฐานข้อมูล
  password: 'password', // ตัวแปร: รหัสผ่าน
  port: 5432,           // ตัวแปร: พอร์ต PostgreSQL
});

// 👉 จัดการข้อผิดพลาดการเชื่อมต่อ PostgreSQL
pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err);
});

// ========== MongoDB ==========
const mongoose = require('mongoose');

// 👉 เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/workshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB เชื่อมต่อสำเร็จ'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 👉 กำหนด Schema สำหรับ MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 👉 สร้าง Model จาก Schema
const User = mongoose.model('User', userSchema);

// ========== PostgreSQL Functions ==========

// CREATE - สร้างผู้ใช้ใหม่
async function createUserPostgres(name, email) {
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return result.rows[0];
  } catch (err) {
    console.error('PostgreSQL INSERT error:', err);
    throw err;
  }
}

// READ - ดึงผู้ใช้ทั้งหมด
async function getUsersPostgres() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error('PostgreSQL SELECT error:', err);
    throw err;
  }
}

// UPDATE - แก้ไขผู้ใช้
async function updateUserPostgres(id, name, email) {
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('PostgreSQL UPDATE error:', err);
    throw err;
  }
}

// DELETE - ลบผู้ใช้
async function deleteUserPostgres(id) {
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('PostgreSQL DELETE error:', err);
    throw err;
  }
}

// ========== MongoDB Functions ==========

// CREATE - สร้างผู้ใช้ใหม่
async function createUserMongo(name, email) {
  try {
    const user = new User({ name, email });
    return await user.save();
  } catch (err) {
    console.error('MongoDB CREATE error:', err);
    throw err;
  }
}

// READ - ดึงผู้ใช้ทั้งหมด
async function getUsersMongo() {
  try {
    return await User.find();
  } catch (err) {
    console.error('MongoDB READ error:', err);
    throw err;
  }
}

// UPDATE - แก้ไขผู้ใช้
async function updateUserMongo(id, name, email) {
  try {
    return await User.findByIdAndUpdate(
      id,
      { name, email, updatedAt: Date.now() },
      { new: true }
    );
  } catch (err) {
    console.error('MongoDB UPDATE error:', err);
    throw err;
  }
}

// DELETE - ลบผู้ใช้
async function deleteUserMongo(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    console.error('MongoDB DELETE error:', err);
    throw err;
  }
}

// ========== Export Functions ==========
module.exports = {
  pool,
  User,
  // PostgreSQL
  createUserPostgres,
  getUsersPostgres,
  updateUserPostgres,
  deleteUserPostgres,
  // MongoDB
  createUserMongo,
  getUsersMongo,
  updateUserMongo,
  deleteUserMongo
};