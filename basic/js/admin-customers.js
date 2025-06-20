// Check if user is logged in and is an admin
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || !currentUser.isAdmin) {
    window.location.href = '../index.html';
}

// DOM Elements
const customerTableBody = document.getElementById('customerTableBody');
const searchCustomer = document.getElementById('searchCustomer');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const logoutBtn = document.getElementById('logoutBtn');

// Event Listeners
searchCustomer.addEventListener('input', handleSearch);
confirmDelete.addEventListener('click', handleDelete);
cancelDelete.addEventListener('click', () => deleteModal.style.display = 'none');
logoutBtn.addEventListener('click', handleLogout);

// Load initial data
loadCustomerList();

// Functions
function loadCustomerList() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    
    const customerList = users
        .filter(user => !user.isAdmin)
        .map(user => {
            const userTickets = tickets.filter(ticket => ticket.userId === user.id);
            return {
                ...user,
                // Ensure required fields exist
                id: user.id || user.username, // Use username as ID for old records
                name: user.name || user.username, // Use username as name for old records
                email: user.email || 'N/A',
                mobile: user.mobile || 'N/A',
                ticketCount: userTickets.length
            };
        });

    displayCustomers(customerList);
}

function displayCustomers(customers) {
    customerTableBody.innerHTML = customers.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.ticketCount}</td>
            <td>
                <button onclick="deleteUser('${user.id}')" class="delete-btn">Delete</button>
            </td>
        </tr>
    `).join('');
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    
    const filteredCustomers = users
        .filter(user => !user.isAdmin && (
            (user.name && user.name.toLowerCase().includes(searchTerm)) ||
            (user.username && user.username.toLowerCase().includes(searchTerm)) ||
            (user.email && user.email.toLowerCase().includes(searchTerm)) ||
            (user.mobile && user.mobile.includes(searchTerm))
        ))
        .map(user => {
            const userTickets = tickets.filter(ticket => ticket.userId === user.id);
            return {
                ...user,
                // Ensure required fields exist
                id: user.id || user.username, // Use username as ID for old records
                name: user.name || user.username, // Use username as name for old records
                email: user.email || 'N/A',
                mobile: user.mobile || 'N/A',
                ticketCount: userTickets.length
            };
        });

    displayCustomers(filteredCustomers);
}

let userToDelete = null;

function deleteUser(userId) {
    userToDelete = userId;
    deleteModal.style.display = 'block';
}

function handleDelete() {
    if (!userToDelete) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => (user.id || user.username) !== userToDelete);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Reload customer list
    loadCustomerList();
    deleteModal.style.display = 'none';
    userToDelete = null;
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
} 