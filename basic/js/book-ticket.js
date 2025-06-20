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

// Load user data
document.getElementById('userId').value = currentUser.username;
document.getElementById('name').value = currentUser.username;
document.getElementById('mobile').value = currentUser.mobile || '';

// Load available trains
function loadTrains() {
    const trains = JSON.parse(localStorage.getItem('trains')) || [];
    const trainSelect = document.getElementById('train');
    trainSelect.innerHTML = '<option value="">Select Train</option>';
    
    trains.forEach(train => {
        const option = document.createElement('option');
        option.value = train.name;
        option.textContent = `${train.name} (${train.from} to ${train.to})`;
        trainSelect.appendChild(option);
    });
}

// Form submission
document.getElementById('bookTicketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const age = document.getElementById('age').value;
    const date = document.getElementById('date').value;
    const boardingStation = document.getElementById('boardingStation').value;
    const destinationStation = document.getElementById('destinationStation').value;
    const ticketCategory = document.getElementById('ticketCategory').value;
    const train = document.getElementById('train').value;
    const numTickets = parseInt(document.getElementById('numTickets').value);
    
    // Basic validation
    if (!name || !mobile || !age || !date || !boardingStation || !destinationStation || !ticketCategory || !train || !numTickets) {
        alert('Please fill in all fields');
        return;
    }
    
    // Mobile validation
    if (!/^\d{10}$/.test(mobile)) {
        alert('Mobile number must be 10 digits long');
        return;
    }
    
    // Age validation
    if (age < 1 || age > 120) {
        alert('Please enter a valid age');
        return;
    }
    
    // Create new ticket
    const ticket = {
        id: Date.now().toString(),
        trainId: train,
        userId: currentUser.username,
        userName: name,
        boardingStation,
        destinationStation,
        date,
        category: ticketCategory,
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
    
    // Redirect to view tickets page
    window.location.href = 'view-tickets.html';
});

// Initial load of trains
loadTrains(); 