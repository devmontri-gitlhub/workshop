// ฟังก์ชันโหลดผู้ใช้ทั้งหมดจาก API
async function loadUsers() { 
  const response = await fetch('http://localhost:3000/users'); 
  // คำสั่ง: fetch() เรียก API GET /users
  // ตัวแปร response: เก็บผลลัพธ์จาก server

  const users = await response.json(); 
  // คำสั่ง: แปลง response เป็น JSON
  // ตัวแปร users: เก็บข้อมูลผู้ใช้ทั้งหมดเป็น array

  const tbody = document.querySelector('#userTable tbody'); 
  // คำสั่ง: เลือก element tbody
  // ตัวแปร tbody: อ้างอิงตาราง

  tbody.innerHTML = ''; // คำสั่ง: เคลียร์ข้อมูลเก่า

  users.forEach(user => { // โครงสร้าง: วนลูป array
    const row = document.createElement('tr'); // คำสั่ง: สร้าง element tr
    // ตัวแปร row: แถวใหม่

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="deleteUser(${user.id})">Delete</button>
        <button onclick="updateUser(${user.id})">Edit</button>
      </td>
    `;
    tbody.appendChild(row); // คำสั่ง: เพิ่มแถวลงตาราง
  });
}
