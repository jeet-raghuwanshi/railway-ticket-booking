// Check if user is logged in and is a master admin
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || !currentUser.isAdmin || !currentUser.isMasterAdmin) {
    window.location.href = '../index.html';
}

// DOM Elements
const addAdminForm = document.getElementById('addAdminForm');
const adminTableBody = document.getElementById('adminTableBody');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const logoutBtn = document.getElementById('logoutBtn');

// Event Listeners
addAdminForm.addEventListener('submit', handleAddAdmin);
confirmDelete.addEventListener('click', handleDelete);
cancelDelete.addEventListener('click', () => deleteModal.style.display = 'none');
logoutBtn.addEventListener('click', handleLogout);

// Load initial data
loadAdminList();

// Functions
function loadAdminList() {
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const adminList = adminUsers.filter(user => user.isAdmin);

    adminTableBody.innerHTML = adminList.map(admin => `
        <tr>
            <td>${admin.username}</td>
            <td>${admin.email}</td>
            <td>${admin.isMasterAdmin ? 'Master Admin' : 'Admin'}</td>
            <td>
                ${!admin.isMasterAdmin ? `
                    <button onclick="deleteUser('${admin.id}')" class="delete-btn">Delete</button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

function handleAddAdmin(e) {
    e.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const email = document.getElementById('adminEmail').value;

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and contain 1 uppercase letter, 1 number, and 1 special character');
        return;
    }

    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
    
    // Check if username already exists
    if (adminUsers.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }

    // Create new admin user
    const newAdmin = {
        id: Date.now().toString(),
        username,
        password,
        email,
        isAdmin: true,
        isMasterAdmin: false
    };

    adminUsers.push(newAdmin);
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers));

    // Reset form and reload admin list
    addAdminForm.reset();
    loadAdminList();
    alert('Admin user added successfully');
}

let userToDelete = null;

function deleteUser(userId) {
    userToDelete = userId;
    deleteModal.style.display = 'block';
}

function handleDelete() {
    if (!userToDelete) return;

    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const updatedUsers = adminUsers.filter(user => user.id !== userToDelete);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    // If deleted user was the current user, log them out
    if (userToDelete === currentUser.id) {
        handleLogout();
        return;
    }

    // Reload admin list
    loadAdminList();
    deleteModal.style.display = 'none';
    userToDelete = null;
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
} 