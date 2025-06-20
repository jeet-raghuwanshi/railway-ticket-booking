// Check if user is logged in
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = '../index.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Load ticket statistics
function loadTicketStats() {
    const tickets = currentUser.tickets || [];
    const stats = {};
    
    tickets.forEach(ticket => {
        if (!stats[ticket.category]) {
            stats[ticket.category] = 0;
        }
        stats[ticket.category]++;
    });
    
    const tbody = document.getElementById('ticketStatsBody');
    tbody.innerHTML = '';
    
    Object.entries(stats).forEach(([category, count]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category}</td>
            <td>${count}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load quarterly sales
function loadQuarterlySales() {
    const tickets = currentUser.tickets || [];
    const quarters = {
        'Q1': 0,
        'Q2': 0,
        'Q3': 0,
        'Q4': 0
    };
    
    tickets.forEach(ticket => {
        const date = new Date(ticket.date);
        const month = date.getMonth();
        const quarter = Math.floor(month / 3) + 1;
        quarters[`Q${quarter}`]++;
    });
    
    const tbody = document.getElementById('quarterlySalesBody');
    tbody.innerHTML = '';
    
    Object.entries(quarters).forEach(([quarter, count]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${quarter}</td>
            <td>${count}</td>
        `;
        tbody.appendChild(row);
    });
}

// Quick book ticket form submission
document.getElementById('quickBookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const boardingStation = document.getElementById('boardingStation').value;
    const destinationStation = document.getElementById('destinationStation').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('ticketCategory').value;
    const numTickets = parseInt(document.getElementById('numTickets').value);
    
    // Create new ticket
    const ticket = {
        id: Date.now().toString(),
        boardingStation,
        destinationStation,
        date,
        category,
        numTickets,
        status: 'confirmed'
    };
    
    // Add ticket to user's tickets
    if (!currentUser.tickets) {
        currentUser.tickets = [];
    }
    currentUser.tickets.push(ticket);
    
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update session storage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Show confirmation
    alert(`Ticket booked successfully! Your ticket ID is: ${ticket.id}`);
    
    // Reload statistics
    loadTicketStats();
    loadQuarterlySales();
    
    // Reset form
    e.target.reset();
});

// Initial load of statistics
loadTicketStats();
loadQuarterlySales(); 