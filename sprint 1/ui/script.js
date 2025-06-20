document.addEventListener('DOMContentLoaded', () => {

    // --- Train Search Page ---
    const trainSearchForm = document.getElementById('train-search-form');
    if (trainSearchForm) {
        trainSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;
            
            console.log('Searching for trains:', { origin, destination, date });

            fetch(`/api/trains/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${date}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // The dummy data had a slightly different structure, so we adapt the display function
                    displayTrains(data);
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    const trainsList = document.getElementById('trains-list');
                    trainsList.innerHTML = '<p>Error searching for trains. Please try again later.</p>';
                });
        });
    }

    function displayTrains(trains) {
        const trainsList = document.getElementById('trains-list');
        trainsList.innerHTML = '';
        if (trains.length === 0) {
            trainsList.innerHTML = '<p>No trains found for the selected route.</p>';
            return;
        }

        trains.forEach(train => {
            const trainElement = document.createElement('div');
            trainElement.className = 'train-item';
            // Note: The backend returns 'departure' as a full ISO string. We can format it.
            const departureDate = new Date(train.departure);
            const formattedDeparture = departureDate.toLocaleDateString() + ' ' + departureDate.toLocaleTimeString();

            trainElement.innerHTML = `
                <h3>${train.name} (${train.number})</h3>
                <p><strong>From:</strong> ${train.origin} <strong>To:</strong> ${train.destination}</p>
                <p><strong>Departure:</strong> ${formattedDeparture}</p>
                <div class="train-classes">
                    ${train.classes.map(c => `
                        <div class="class-item">
                            <span>${c.name} (₹${c.fare})</span>
                            <span>Available: ${c.available}</span>
                            <button class="btn book-btn" data-train-id="${train.id}" data-class-id="${c.id}" data-class-name="${c.name}">Book Now</button>
                        </div>
                    `).join('')}
                </div>
            `;
            trainsList.appendChild(trainElement);
        });

        // Add event listeners to new "Book Now" buttons
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const trainId = e.target.getAttribute('data-train-id');
                const classId = e.target.getAttribute('data-class-id');
                const className = e.target.getAttribute('data-class-name');
                // Redirect to booking page with parameters
                window.location.href = `booking.html?trainId=${trainId}&classId=${classId}&className=${encodeURIComponent(className)}`;
            });
        });
    }

    // --- Booking Page ---
    const bookingDetailsSection = document.getElementById('booking-details');
    if (bookingDetailsSection) {
        // Get trainId and class from URL
        const params = new URLSearchParams(window.location.search);
        const trainId = params.get('trainId');
        const classId = params.get('classId');
        const className = params.get('className'); // Assuming we pass this for display

        // For now, just log it. A real app would fetch full train details.
        console.log(`Booking for Train ID: ${trainId}, Class ID: ${classId}`);
        const selectedTrainInfo = document.getElementById('selected-train-info');
        selectedTrainInfo.innerHTML = `
            <p><strong>Train ID:</strong> ${trainId}</p>
            <p><strong>Class:</strong> ${className || 'Selected Class'}</p>
            <p><em>Note: Full train details would be fetched from the backend.</em></p>
        `;
    }

    const addPassengerBtn = document.getElementById('add-passenger-btn');
    if (addPassengerBtn) {
        let passengerCount = 0;
        addPassengerBtn.addEventListener('click', () => {
            passengerCount++;
            const passengerFields = document.getElementById('passenger-fields');
            const newField = document.createElement('div');
            newField.className = 'passenger-entry';
            newField.innerHTML = `
                <h4>Passenger ${passengerCount}</h4>
                <div class="form-group">
                    <label for="passenger-name-${passengerCount}">Name</label>
                    <input type="text" id="passenger-name-${passengerCount}" name="passenger-name" required>
                </div>
                <div class="form-group">
                    <label for="passenger-age-${passengerCount}">Age</label>
                    <input type="number" id="passenger-age-${passengerCount}" name="passenger-age" required>
                </div>
            `;
            passengerFields.appendChild(newField);
        });
        
        // Trigger once for the first passenger
        addPassengerBtn.click();
    }
    
    const paymentForm = document.getElementById('payment-form');
    if(paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const params = new URLSearchParams(window.location.search);
            const trainId = parseInt(params.get('trainId'));
            const classId = parseInt(params.get('classId'));

            // Collect passenger data
            const passengers = [];
            const passengerEntries = document.querySelectorAll('.passenger-entry');
            passengerEntries.forEach(entry => {
                const name = entry.querySelector('input[name="passenger-name"]').value;
                const age = parseInt(entry.querySelector('input[name="passenger-age"]').value);
                if(name && age) {
                    passengers.push({ name, age });
                }
            });

            if (passengers.length === 0) {
                alert('Please add at least one passenger.');
                return;
            }

            const bookingData = {
                userId: 1, // Hardcoded user ID for now
                trainId: trainId,
                classId: classId,
                passengers: passengers
            };

            // TODO: Send booking request to backend
            fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    console.log('Booking successful:', data);
                    document.getElementById('booking-details').style.display = 'none';
                    document.getElementById('payment-section').style.display = 'none';
                    document.getElementById('passenger-details').style.display = 'none';
                    document.getElementById('booking-confirmation').style.display = 'block';
                    document.getElementById('confirmation-summary').innerHTML = `<p>Booking confirmed! Your Booking ID is: <strong>${data.bookingId}</strong></p>`;
                } else {
                    throw new Error(data.message || 'Booking failed.');
                }
            })
            .catch(error => {
                console.error('Booking error:', error);
                alert(`Booking failed: ${error.message}`);
            });
        });
    }

    // --- Booking History Page ---
    const historyItemsContainer = document.getElementById('history-items');
    if (historyItemsContainer) {
        // Fetch and display history for a hardcoded user
        const userId = 1; 
        fetch(`/api/booking/history/${userId}`)
            .then(response => response.json())
            .then(history => {
                if (history.length === 0) {
                    historyItemsContainer.innerHTML = '<p>No booking history found.</p>';
                    return;
                }
                let html = '<ul>';
                history.forEach(booking => {
                    html += `
                        <li class="booking-history-item">
                            <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                            <p><strong>Date:</strong> ${booking.bookingDate}</p>
                            <p><strong>Train:</strong> ${booking.trainName} (${booking.trainNumber})</p>
                            <p><strong>Passengers:</strong> ${booking.passengers}</p>
                            <p><strong>Status:</strong> ${booking.status}</p>
                        </li>
                    `;
                });
                html += '</ul>';
                historyItemsContainer.innerHTML = html;
            })
            .catch(err => {
                console.error('Failed to fetch booking history:', err);
                historyItemsContainer.innerHTML = '<p>Error loading booking history.</p>';
            });
    }

    const historyFilterForm = document.getElementById('history-filter-form');
    if (historyFilterForm) {
        historyFilterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // TODO: Fetch filtered history from backend
            console.log('Filtering history...');
        });
         historyFilterForm.addEventListener('reset', (e) => {
            // TODO: Fetch full history from backend
            console.log('Resetting filters...');
        });
    }

}); 