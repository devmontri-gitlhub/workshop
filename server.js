const express = require('express'); // import library express
const bodyParser = require('body-parser'); // import library body-parser
const cors = require('cors'); // import library cors
const db = require('./db'); // import โมดูล db.js

const app = express(); // ตัวแปร app = โปรแกรมหลัก

app.use(cors()); 
// 👉 เปิดใช้งาน CORS → ทำไมต้องเปิด? 
// เพราะ frontend (index.html) รันบน browser และเรียก API ที่อยู่คนละ origin (localhost:3000)
// ถ้าไม่เปิด browser จะบล็อก → เปิดแล้ว frontend สามารถเรียก API ได้

app.use(bodyParser.json()); 
// 👉 เปิดใช้งาน body-parser → ทำไมต้องเปิด?
// เพราะเวลามีการส่งข้อมูลจาก client มาที่ server (เช่น JSON)
// เราต้องแปลงข้อมูลนั้นให้อ่านได้ง่ายเป็น object
// ถ้าไม่เปิด เราจะอ่าน req.body ไม่ได้
