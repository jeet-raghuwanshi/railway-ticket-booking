// Check if user is logged in and is admin
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser || !currentUser.isAdmin) {
    window.location.href = '../index.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Load registered trains
function loadTrains() {
    const trains = JSON.parse(localStorage.getItem('trains')) || [];
    const tbody = document.getElementById('trainsTableBody');
    tbody.innerHTML = '';
    
    trains.forEach(train => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${train.name}</td>
            <td>${train.numSeats}</td>
            <td>${train.from}</td>
            <td>${train.to}</td>
            <td>${train.ownership}</td>
        `;
        tbody.appendChild(row);
    });
}

// Register train form submission
document.getElementById('registerTrainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const trainName = document.getElementById('trainName').value;
    const numSeats = parseInt(document.getElementById('numSeats').value);
    const fromStation = document.getElementById('fromStation').value;
    const toStation = document.getElementById('toStation').value;
    const ownership = document.getElementById('ownership').value;
    
    // Basic validation
    if (!trainName || !numSeats || !fromStation || !toStation || !ownership) {
        alert('Please fill in all fields');
        return;
    }
    
    if (numSeats < 1) {
        alert('Number of seats must be at least 1');
        return;
    }
    
    // Get existing trains
    const trains = JSON.parse(localStorage.getItem('trains')) || [];
    
    // Check if train name already exists
    if (trains.some(train => train.name === trainName)) {
        alert('Train with this name already exists');
        return;
    }
    
    // Create new train
    const newTrain = {
        name: trainName,
        numSeats,
        from: fromStation,
        to: toStation,
        ownership
    };
    
    // Add train to storage
    trains.push(newTrain);
    localStorage.setItem('trains', JSON.stringify(trains));
    
    alert('Train registered successfully!');
    
    // Reload trains list
    loadTrains();
    
    // Reset form
    e.target.reset();
});

// Initial load of trains
loadTrains(); 