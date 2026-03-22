// ✅ โหลดผู้ใช้เมื่อเปิดหน้า
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  document.getElementById('userForm').addEventListener('submit', addUser);
});

// ✅ ฟังก์ชันโหลดผู้ใช้ทั้งหมดจาก API
async function loadUsers() { 
  try {
    const response = await fetch('http://localhost:3000/users'); 
    if (!response.ok) throw new Error('Failed to load users');
    
    const users = await response.json(); 
    const tbody = document.querySelector('#userTable tbody'); 
    tbody.innerHTML = '';

    if (users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">ไม่มีข้อมูลผู้ใช้</td></tr>';
      return;
    }

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn-delete" onclick="deleteUser(${user.id})">🗑️ Delete</button>
          <button class="btn-edit" onclick="editUser(${user.id})">✏️ Edit</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading users:', err);
    alert('❌ ไม่สามารถโหลดข้อมูลได้');
  }
}

// ✅ ฟังก์ชันเพิ่มผู้ใช้ใหม่
async function addUser(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert('❌ กรุณากรอกชื่อและอีเมลให้สมบูรณ์');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add user');
    }

    document.getElementById('userForm').reset();
    loadUsers();
    alert('✅ เพิ่มผู้ใช้สำเร็จ');
  } catch (err) {
    console.error('Error:', err);
    alert(`❌ ไม่สามารถเพิ่มผู้ใช้ได้: ${err.message}`);
  }
}

// ✅ ฟังก์ชันลบผู้ใช้
async function deleteUser(id) {
  if (!confirm('คุณแน่ใจที่จะลบผู้ใช้นี้หรือไม่?')) return;

  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete user');
    }

    loadUsers();
    alert('✅ ลบผู้ใช้สำเร็จ');
  } catch (err) {
    console.error('Error:', err);
    alert(`❌ ไม่สามารถลบผู้ใช้ได้: ${err.message}`);
  }
}

// ✅ ฟังก์ชันแก้ไขผู้ใช้
async function editUser(id) {
  const name = prompt('ชื่อใหม่:');
  if (!name) return;
  
  const email = prompt('อีเมลใหม่:');
  if (!email) return;

  if (!name.trim() || !email.trim()) {
    alert('❌ กรุณากรอกชื่อและอีเมลให้สมบูรณ์');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim() })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }

    loadUsers();
    alert('✅ แก้ไขผู้ใช้สำเร็จ');
  } catch (err) {
    console.error('Error:', err);
    alert(`❌ ไม่สามารถแก้ไขผู้ใช้ได้: ${err.message}`);
  }
}