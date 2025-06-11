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

// Load tickets
function loadTickets() {
    const tickets = currentUser.tickets || [];
    const tbody = document.getElementById('ticketsTableBody');
    tbody.innerHTML = '';
    
    tickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.id}</td>
            <td>${ticket.trainId || 'N/A'}</td>
            <td>${ticket.boardingStation}</td>
            <td>${ticket.destinationStation}</td>
            <td>${ticket.date}</td>
            <td>${ticket.category}</td>
            <td>${ticket.numTickets}</td>
            <td>${ticket.status}</td>
            <td>
                ${ticket.status === 'confirmed' ? 
                    `<button onclick="showCancelModal('${ticket.id}')">Cancel</button>` : 
                    'Cancelled'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Cancel ticket modal
let ticketToCancel = null;

function showCancelModal(ticketId) {
    ticketToCancel = ticketId;
    document.getElementById('cancelModal').style.display = 'block';
}

document.getElementById('confirmCancel').addEventListener('click', function() {
    if (ticketToCancel) {
        cancelTicket(ticketToCancel);
        document.getElementById('cancelModal').style.display = 'none';
        ticketToCancel = null;
    }
});

document.getElementById('cancelCancel').addEventListener('click', function() {
    document.getElementById('cancelModal').style.display = 'none';
    ticketToCancel = null;
});

// Cancel ticket function
function cancelTicket(ticketId) {
    const tickets = currentUser.tickets || [];
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    
    if (ticketIndex !== -1) {
        tickets[ticketIndex].status = 'cancelled';
        
        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update session storage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Reload tickets
        loadTickets();
        
        alert('Ticket cancelled successfully!');
    }
}

// Initial load of tickets
loadTickets(); 