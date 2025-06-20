// Check if user is logged in and is an admin
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || !currentUser.isAdmin) {
    window.location.href = '../index.html';
}

// DOM Elements
const ticketStatsBody = document.getElementById('ticketStatsBody');
const quarterlySalesBody = document.getElementById('quarterlySalesBody');
const customerTableBody = document.getElementById('customerTableBody');
const adminManagement = document.getElementById('adminManagement');
const addAdminForm = document.getElementById('addAdminForm');
const adminTableBody = document.getElementById('adminTableBody');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const logoutBtn = document.getElementById('logoutBtn');

// Show admin management section only for master admin
if (currentUser.isMasterAdmin) {
    adminManagement.style.display = 'block';
}

// Load initial data
loadTicketStats();
loadQuarterlySales();
loadCustomerList();
if (currentUser.isMasterAdmin) {
    loadAdminList();
}

// Event Listeners
addAdminForm.addEventListener('submit', handleAddAdmin);
confirmDelete.addEventListener('click', handleDelete);
cancelDelete.addEventListener('click', () => deleteModal.style.display = 'none');
logoutBtn.addEventListener('click', handleLogout);

// Functions
function loadTicketStats() {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const stats = {
        'First Class': 0,
        'Second Class': 0,
        'Third Class': 0
    };

    tickets.forEach(ticket => {
        stats[ticket.class]++;
    });

    ticketStatsBody.innerHTML = Object.entries(stats)
        .map(([className, count]) => `
            <tr>
                <td>${className}</td>
                <td>${count}</td>
            </tr>
        `).join('');
}

function loadQuarterlySales() {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const sales = {
        'Q1': 0,
        'Q2': 0,
        'Q3': 0,
        'Q4': 0
    };

    tickets.forEach(ticket => {
        const date = new Date(ticket.bookingDate);
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        sales[`Q${quarter}`] += ticket.price;
    });

    quarterlySalesBody.innerHTML = Object.entries(sales)
        .map(([quarter, amount]) => `
            <tr>
                <td>${quarter}</td>
                <td>₹${amount}</td>
            </tr>
        `).join('');
}

function loadCustomerList() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    
    const customerList = users
        .filter(user => !user.isAdmin)
        .map(user => {
            const userTickets = tickets.filter(ticket => ticket.userId === user.id);
            return {
                ...user,
                ticketCount: userTickets.length
            };
        });

    customerTableBody.innerHTML = customerList.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.mobile}</td>
            <td>${user.ticketCount}</td>
            <td>
                <button onclick="deleteUser('${user.id}')" class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadAdminList() {
    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const adminList = users.filter(user => user.isAdmin);

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

    // Reload lists
    loadCustomerList();
    if (currentUser.isMasterAdmin) {
        loadAdminList();
    }

    deleteModal.style.display = 'none';
    userToDelete = null;
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
} 