// Enhanced train data with departure times and journey durations
const trains = [
	{
		id: 1,
		name: "Rajdhani Express",
		number: "12951",
		origin: "Mumbai",
		destination: "Delhi",
		departure: "18:30",
		arrival: "13:00",
		duration: "18h 30m",
		classes: [
			{ name: "First AC", seats: 12, price: "₹4,320" },
			{ name: "Second AC", seats: 24, price: "₹2,580" },
			{ name: "Third AC", seats: 36, price: "₹1,840" },
		],
	},
	{
		id: 2,
		name: "Duronto Express",
		number: "12267",
		origin: "Mumbai",
		destination: "Ahmedabad",
		departure: "07:45",
		arrival: "14:00",
		duration: "6h 15m",
		classes: [
			{ name: "Second AC", seats: 18, price: "₹1,850" },
			{ name: "Third AC", seats: 32, price: "₹1,250" },
			{ name: "Sleeper", seats: 48, price: "₹680" },
		],
	},
	{
		id: 3,
		name: "Shatabdi Express",
		number: "12009",
		origin: "Delhi",
		destination: "Jaipur",
		departure: "06:15",
		arrival: "11:00",
		duration: "4h 45m",
		classes: [
			{ name: "Executive", seats: 15, price: "₹1,950" },
			{ name: "AC Chair Car", seats: 40, price: "₹1,250" },
		],
	},
	{
		id: 4,
		name: "Garib Rath",
		number: "12201",
		origin: "Kolkata",
		destination: "Delhi",
		departure: "20:00",
		arrival: "13:20",
		duration: "17h 20m",
		classes: [{ name: "Third AC", seats: 45, price: "₹1,350" }],
	},
	{
		id: 5,
		name: "Tejas Express",
		number: "22120",
		origin: "Chennai",
		destination: "Bangalore",
		departure: "06:00",
		arrival: "11:10",
		duration: "5h 10m",
		classes: [
			{ name: "Executive", seats: 10, price: "₹2,150" },
			{ name: "AC Chair Car", seats: 35, price: "₹1,450" },
		],
	},
	{
		id: 6,
		name: "Howrah Mail",
		number: "12301",
		origin: "Kolkata",
		destination: "Chennai",
		departure: "22:45",
		arrival: "01:00",
		duration: "26h 15m",
		classes: [
			{ name: "First AC", seats: 8, price: "₹3,850" },
			{ name: "Second AC", seats: 22, price: "₹2,200" },
			{ name: "Sleeper", seats: 40, price: "₹850" },
		],
	},
	{
		id: 7,
		name: "Deccan Queen",
		number: "12123",
		origin: "Pune",
		destination: "Mumbai",
		departure: "07:15",
		arrival: "10:25",
		duration: "3h 10m",
		classes: [
			{ name: "Executive", seats: 12, price: "₹1,050" },
			{ name: "AC Chair Car", seats: 30, price: "₹750" },
		],
	},
	{
		id: 8,
		name: "Gujarat Express",
		number: "12933",
		origin: "Mumbai",
		destination: "Ahmedabad",
		departure: "23:30",
		arrival: "06:55",
		duration: "7h 25m",
		classes: [
			{ name: "Second AC", seats: 20, price: "₹1,800" },
			{ name: "Third AC", seats: 35, price: "₹1,200" },
			{ name: "Sleeper", seats: 50, price: "₹700" },
		],
	},
	{
		id: 9,
		name: "Chennai Mail",
		number: "12602",
		origin: "Delhi",
		destination: "Chennai",
		departure: "08:45",
		arrival: "17:55",
		duration: "32h 10m",
		classes: [
			{ name: "First AC", seats: 10, price: "₹4,500" },
			{ name: "Second AC", seats: 25, price: "₹2,800" },
			{ name: "Third AC", seats: 40, price: "₹1,900" },
		],
	},
	{
		id: 10,
		name: "Bangalore Express",
		number: "12628",
		origin: "Chennai",
		destination: "Bangalore",
		departure: "15:20",
		arrival: "20:50",
		duration: "5h 30m",
		classes: [
			{ name: "AC Chair Car", seats: 42, price: "₹1,100" },
			{ name: "Sleeper", seats: 60, price: "₹600" },
		],
	},
	{
		id: 11,
		name: "Pune Express",
		number: "11020",
		origin: "Mumbai",
		destination: "Pune",
		departure: "09:10",
		arrival: "12:25",
		duration: "3h 15m",
		classes: [
			{ name: "Executive", seats: 15, price: "₹950" },
			{ name: "AC Chair Car", seats: 35, price: "₹650" },
		],
	},
	{
		id: 12,
		name: "Lucknow Mail",
		number: "12230",
		origin: "Delhi",
		destination: "Lucknow",
		departure: "21:30",
		arrival: "04:10",
		duration: "6h 40m",
		classes: [
			{ name: "Second AC", seats: 18, price: "₹1,650" },
			{ name: "Third AC", seats: 32, price: "₹1,100" },
			{ name: "Sleeper", seats: 45, price: "₹550" },
		],
	},
	{
		id: 13,
		name: "Patna Express",
		number: "12310",
		origin: "Kolkata",
		destination: "Patna",
		departure: "19:45",
		arrival: "08:15",
		duration: "12h 30m",
		classes: [
			{ name: "Second AC", seats: 15, price: "₹1,550" },
			{ name: "Third AC", seats: 28, price: "₹1,050" },
			{ name: "Sleeper", seats: 42, price: "₹500" },
		],
	},
	{
		id: 14,
		name: "Bhopal Superfast",
		number: "12156",
		origin: "Delhi",
		destination: "Bhopal",
		departure: "10:20",
		arrival: "18:40",
		duration: "8h 20m",
		classes: [
			{ name: "Second AC", seats: 16, price: "₹1,750" },
			{ name: "Third AC", seats: 30, price: "₹1,150" },
			{ name: "Sleeper", seats: 44, price: "₹600" },
		],
	},
	{
		id: 15,
		name: "Indore Intercity",
		number: "12415",
		origin: "Bhopal",
		destination: "Indore",
		departure: "13:10",
		arrival: "16:55",
		duration: "3h 45m",
		classes: [
			{ name: "AC Chair Car", seats: 40, price: "₹850" },
			{ name: "Sleeper", seats: 55, price: "₹450" },
		],
	},
	{
		id: 16,
		name: "Guwahati Express",
		number: "15603",
		origin: "Kolkata",
		destination: "Guwahati",
		departure: "08:30",
		arrival: "02:20",
		duration: "17h 50m",
		classes: [
			{ name: "Second AC", seats: 14, price: "₹1,950" },
			{ name: "Third AC", seats: 26, price: "₹1,350" },
			{ name: "Sleeper", seats: 38, price: "₹750" },
		],
	},
	{
		id: 17,
		name: "Varanasi Express",
		number: "14265",
		origin: "Delhi",
		destination: "Varanasi",
		departure: "20:15",
		arrival: "07:30",
		duration: "11h 15m",
		classes: [
			{ name: "Second AC", seats: 17, price: "₹1,650" },
			{ name: "Third AC", seats: 31, price: "₹1,150" },
			{ name: "Sleeper", seats: 46, price: "₹550" },
		],
	},
	{
		id: 18,
		name: "Hyderabad Superfast",
		number: "12708",
		origin: "Chennai",
		destination: "Hyderabad",
		departure: "22:00",
		arrival: "12:20",
		duration: "14h 20m",
		classes: [
			{ name: "First AC", seats: 9, price: "₹2,850" },
			{ name: "Second AC", seats: 22, price: "₹1,950" },
			{ name: "Third AC", seats: 36, price: "₹1,350" },
		],
	},
];

// User authentication functions
function showAuth(type) {
	if (type === "login") {
		document.getElementById("login-container").style.display = "block";
		document.getElementById("register-container").style.display = "none";
		document.getElementById("login-error").style.display = "none";
	} else {
		document.getElementById("login-container").style.display = "none";
		document.getElementById("register-container").style.display = "block";
		document.getElementById("register-error").style.display = "none";
	}
}

function login() {
	const email = document.getElementById("login-email").value;
	const password = document.getElementById("login-password").value;

	if (!email || !password) {
		document.getElementById("login-error").style.display = "block";
		return;
	}

	// Get registered users from localStorage
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		// Set current user
		localStorage.setItem("currentUser", JSON.stringify(user));

		// Show main app
		document.getElementById("auth-container").style.display = "none";
		document.getElementById("main-app").style.display = "block";

	} else {
		document.getElementById("login-error").style.display = "block";
	}
}

function register() {
	const name = document.getElementById("register-name").value;
	const email = document.getElementById("register-email").value;
	const phone = document.getElementById("register-phone").value;
	const password = document.getElementById("register-password").value;
	const confirm = document.getElementById("register-confirm").value;

	if (!name || !email || !phone || !password || !confirm) {
		document.getElementById("register-error").style.display = "block";
		return;
	}

	if (password !== confirm) {
		document.getElementById("register-error").textContent =
			"Passwords don't match!";
		document.getElementById("register-error").style.display = "block";
		return;
	}

	// Get existing users
	const users = JSON.parse(localStorage.getItem("users") || "[]");

	// Check if email already exists
	if (users.some((u) => u.email === email)) {
		document.getElementById("register-error").textContent =
			"Email already registered!";
		document.getElementById("register-error").style.display = "block";
		return;
	}

	// Create user object
	const user = {
		id: Date.now(),
		name,
		email,
		phone,
		password,
		bookings: [],
	};

	// Add to users
	users.push(user);
	localStorage.setItem("users", JSON.stringify(users));

	// Set as current user
	localStorage.setItem("currentUser", JSON.stringify(user));

	// Show main app
	document.getElementById("auth-container").style.display = "none";
	document.getElementById("main-app").style.display = "block";

	// Update user greeting
	document.getElementById(
		"user-greeting"
	).textContent = `Welcome, ${user.name}!`;
}

function logout() {
	if (confirm("Are you sure you want to logout?")) {
		localStorage.removeItem("currentUser");
		document.getElementById("auth-container").style.display = "block";
		document.getElementById("main-app").style.display = "none";
		showAuth("login");
	}
}

// Check if user is logged in
function checkAuth() {
	const currentUser = localStorage.getItem("currentUser");
	if (currentUser) {
		const user = JSON.parse(currentUser);
		document.getElementById("auth-container").style.display = "none";
		document.getElementById("main-app").style.display = "block";
		document.getElementById(
			"user-greeting"
		).textContent = `Welcome, ${user.name}!`;

		// Set user data in profile form
		document.getElementById("update-name").value = user.name;
		document.getElementById("update-email").value = user.email;
		document.getElementById("update-phone").value = user.phone;
	}
}

// Page navigation
function showPage(pageId) {
	// Hide all pages
	document.querySelectorAll(".page").forEach((page) => {
		page.classList.remove("active");
	});

	// Show selected page
	document.getElementById(`${pageId}-page`).classList.add("active");

	// Store current page in localStorage
	localStorage.setItem("currentPage", pageId);

	// Update navigation links
	document.querySelectorAll(".nav-links a").forEach((link) => {
		link.classList.remove("active");
		if (link.textContent.toLowerCase().includes(pageId.toLowerCase())) {
			link.classList.add("active");
		}
	});

	// Load bookings when tickets page is shown
	if (pageId === "tickets") {
		loadBookings();
	}
}

// Toggle train details
function toggleDetails(detailsId) {
	const details = document.getElementById(detailsId);
	details.classList.toggle("active");
}

// Search trains function
function searchTrains() {
	const origin = document.getElementById("origin").value;
	const destination = document.getElementById("destination").value;

	if (!origin || !destination) {
		alert("Please select origin and destination");
		return;
	}

	// Filter trains by origin and destination
	const filteredTrains = trains.filter(
		(train) => train.origin === origin && train.destination === destination
	);

	const resultsContainer = document.getElementById("search-results");

	if (filteredTrains.length === 0) {
		// Create a dynamic train for any route
		const durationHours = Math.floor(Math.random() * 15) + 5;
		const newTrain = {
			id: 1000 + Math.floor(Math.random() * 1000),
			name: `${origin} ${destination} Express`,
			number: Math.floor(10000 + Math.random() * 90000),
			origin: origin,
			destination: destination,
			departure: `${Math.floor(Math.random() * 24)}:${Math.floor(
				Math.random() * 60
			)}`,
			arrival: `${Math.floor(Math.random() * 24)}:${Math.floor(
				Math.random() * 60
			)}`,
			duration: `${durationHours}h ${Math.floor(Math.random() * 60)}m`,
			classes: [
				{
					name: "Second AC",
					seats: Math.floor(Math.random() * 20) + 10,
					price: `₹${Math.floor(Math.random() * 2000) + 1500}`,
				},
				{
					name: "Third AC",
					seats: Math.floor(Math.random() * 30) + 20,
					price: `₹${Math.floor(Math.random() * 1500) + 1000}`,
				},
				{
					name: "Sleeper",
					seats: Math.floor(Math.random() * 50) + 30,
					price: `₹${Math.floor(Math.random() * 1000) + 500}`,
				},
			],
		};

		resultsContainer.innerHTML = createTrainCard(newTrain);
		return;
	}

	resultsContainer.innerHTML = "";

	filteredTrains.forEach((train) => {
		resultsContainer.innerHTML += createTrainCard(train);
	});
}

// Create train card HTML with departure time
function createTrainCard(train) {
	const detailsId = `details-${train.id}`;

	let classesHTML = "";
	train.classes.forEach((cls, index) => {
		classesHTML += `
                <div class="class-card">
                    <h4>${cls.name}</h4>
                    <div class="seats">${cls.seats} Seats</div>
                    <div class="price">${cls.price}</div>
                    <button class="book-btn" onclick="prepareBooking(${train.id}, ${index})">Book Now</button>
                </div>
                `;
	});

	return `
                <div class="train-card">
                    <div class="train-header" onclick="toggleDetails('${detailsId}')">
                        <div class="train-info">
                            <div class="train-icon">
                                <i class="fas fa-train"></i>
                            </div>
                            <div class="train-details">
                                <h3>${train.name} (${train.number})</h3>
                                <p>${train.origin} → ${train.destination}</p>
                                <div class="departure">Departure: ${train.departure}</div>
                                <div class="arrival">Arrival: ${train.arrival}</div>
                            </div>
                        </div>
                        <div class="duration">${train.duration}</div>
                    </div>
                    <div class="availability-details" id="${detailsId}">
                        <div class="classes-grid">
                            ${classesHTML}
                        </div>
                    </div>
                </div>
            `;
}

// Prepare booking from search results
function prepareBooking(trainId, classIndex) {
	const train = trains.find((t) => t.id === trainId);
	if (!train) {
		// Handle dynamic train
		const origin = document.getElementById("origin").value;
		const destination = document.getElementById("destination").value;

		document.getElementById("book-origin").value = origin;
		document.getElementById("book-destination").value = destination;
		document.getElementById("book-date").value =
			document.getElementById("date").value;
		document.getElementById("book-class").value = [
			"Second AC",
			"Third AC",
			"Sleeper",
		][classIndex];
	} else {
		const travelClass = train.classes[classIndex];

		// Set the train name and class in booking form
		document.getElementById("book-origin").value = train.origin;
		document.getElementById("book-destination").value = train.destination;
		document.getElementById("book-date").value =
			document.getElementById("date").value;
		document.getElementById("book-class").value = travelClass.name;
	}

	// Navigate to booking page
	showPage("book");
}

// Book ticket function
function bookTicket() {
	const origin = document.getElementById("book-origin").value;
	const destination = document.getElementById("book-destination").value;
	const date = document.getElementById("book-date").value;
	const travelClass = document.getElementById("book-class").value;
	const name = document.getElementById("passenger-name").value;
	const age = document.getElementById("passenger-age").value;
	const email = document.getElementById("passenger-email").value;
	const phone = document.getElementById("passenger-phone").value;

	if (!origin || !destination || !date || !travelClass || !name || !age) {
		alert("Please fill in all required fields");
		return;
	}

	// Get current user
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	// Create booking object
	const booking = {
		id: Date.now(),
		pnr: "PNR" + Math.floor(10000 + Math.random() * 90000),
		train: `${origin} → ${destination}`,
		date: new Date(date).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		}),
		class: travelClass,
		passenger: name,
		age: age,
		email: email,
		phone: phone,
		status: "Confirmed",
	};

	// Add to user's bookings
	currentUser.bookings = currentUser.bookings || [];
	currentUser.bookings.push(booking);
	localStorage.setItem("currentUser", JSON.stringify(currentUser));

	// Update users in localStorage
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	const userIndex = users.findIndex((u) => u.id === currentUser.id);
	if (userIndex !== -1) {
		users[userIndex] = currentUser;
		localStorage.setItem("users", JSON.stringify(users));
	}

	alert(
		`Ticket booked successfully for ${name} from ${origin} to ${destination} in ${travelClass} class!\nYour PNR: ${booking.pnr}`
	);
	showPage("tickets");
}

// Load bookings for view tickets page
function loadBookings() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	const bookings = currentUser?.bookings || [];
	const container = document.getElementById("bookings-container");

	if (bookings.length === 0) {
		container.innerHTML = `
                    <div class="no-bookings">
                        <i class="fas fa-ticket-alt"></i>
                        <h3>No Bookings Found</h3>
                        <p>You haven't booked any tickets yet.</p>
                        <button class="btn" onclick="showPage('search')" style="margin-top: 20px; width: auto;">
                            <i class="fas fa-search"></i> Search Trains
                        </button>
                    </div>
                `;
		return;
	}

	let tableHTML = `
            <table class="history-table">
                <thead>
                    <tr>
                        <th>PNR</th>
                        <th>Route</th>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Passenger</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
            `;

	bookings.forEach((booking) => {
		tableHTML += `
                <tr>
                    <td>${booking.pnr}</td>
                    <td>${booking.train}</td>
                    <td>${booking.date}</td>
                    <td>${booking.class}</td>
                    <td>${booking.passenger} (${booking.age})</td>
                    <td><span class="status ${booking.status.toLowerCase()}">${
			booking.status
		}</span></td>
                    <td class="text-center">
                        <div class="action-buttons">
                            <button class="btn btn-danger" onclick="cancelBooking('${
															booking.id
														}')" ${
			booking.status === "Cancelled" ? "disabled" : ""
		}>
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </td>
                </tr>
                `;
	});

	tableHTML += `
                </tbody>
            </table>
            `;

	container.innerHTML = tableHTML;
}

// Cancel booking
function cancelBooking(bookingId) {
	if (!confirm("Are you sure you want to cancel this ticket?")) {
		return;
	}

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	const bookingIndex = currentUser.bookings.findIndex((b) => b.id == bookingId);

	if (bookingIndex !== -1) {
		currentUser.bookings[bookingIndex].status = "Cancelled";
		localStorage.setItem("currentUser", JSON.stringify(currentUser));

		// Update users in localStorage
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		const userIndex = users.findIndex((u) => u.id === currentUser.id);
		if (userIndex !== -1) {
			users[userIndex] = currentUser;
			localStorage.setItem("users", JSON.stringify(users));
		}

		alert("Ticket has been cancelled successfully!");
		loadBookings();
	}
}

// Filter bookings
function filterBookings() {
	const searchTerm = document
		.getElementById("booking-search")
		.value.toLowerCase();
	const statusFilter = document.getElementById("booking-status").value;
	const dateFilter = document.getElementById("booking-date").value;

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	const bookings = currentUser?.bookings || [];

	let filtered = bookings.filter((booking) => {
		let matches = true;

		// Search term filter
		if (searchTerm) {
			matches =
				matches &&
				(booking.pnr.toLowerCase().includes(searchTerm) ||
					booking.train.toLowerCase().includes(searchTerm));
		}

		// Status filter
		if (statusFilter !== "All Status") {
			matches = matches && booking.status === statusFilter;
		}

		// Date filter
		if (dateFilter) {
			const bookingDate = new Date(booking.date);
			const filterDate = new Date(dateFilter);

			matches =
				matches &&
				bookingDate.getDate() === filterDate.getDate() &&
				bookingDate.getMonth() === filterDate.getMonth() &&
				bookingDate.getFullYear() === filterDate.getFullYear();
		}

		return matches;
	});

	const container = document.getElementById("bookings-container");

	if (filtered.length === 0) {
		container.innerHTML = `
                    <div class="message">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <h3>No bookings match your criteria</h3>
                        <p>Try adjusting your search filters</p>
                    </div>
                `;
		return;
	}

	let tableHTML = `
            <table class="history-table">
                <thead>
                    <tr>
                        <th>PNR</th>
                        <th>Route</th>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Passenger</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
            `;

	filtered.forEach((booking) => {
		tableHTML += `
                <tr>
                    <td>${booking.pnr}</td>
                    <td>${booking.train}</td>
                    <td>${booking.date}</td>
                    <td>${booking.class}</td>
                    <td>${booking.passenger} (${booking.age})</td>
                    <td><span class="status ${booking.status.toLowerCase()}">${
			booking.status
		}</span></td>
                    <td class="text-center">
                        <div class="action-buttons">
                            <button class="btn btn-danger" onclick="cancelBooking('${
															booking.id
														}')" ${
			booking.status === "Cancelled" ? "disabled" : ""
		}>
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </td>
                </tr>
                `;
	});

	tableHTML += `
                </tbody>
            </table>
            `;

	container.innerHTML = tableHTML;
}

// Reset filters
function resetFilters() {
	document.getElementById("booking-search").value = "";
	document.getElementById("booking-status").value = "All Status";
	document.getElementById("booking-date").value = "";
	loadBookings();
}

// Update profile function
function updateDetails() {
	const name = document.getElementById("update-name").value;
	const email = document.getElementById("update-email").value;
	const phone = document.getElementById("update-phone").value;
	const password = document.getElementById("update-password").value;
	const confirm = document.getElementById("update-confirm").value;

	if (!name || !email || !phone) {
		alert("Please fill in all required fields");
		return;
	}

	if (password && password !== confirm) {
		alert("Passwords do not match!");
		return;
	}

	// Get current user
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	// Update user data
	currentUser.name = name;
	currentUser.email = email;
	currentUser.phone = phone;
	if (password) {
		currentUser.password = password;
	}

	// Save updated user
	localStorage.setItem("currentUser", JSON.stringify(currentUser));

	// Update users in localStorage
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	const userIndex = users.findIndex((u) => u.id === currentUser.id);
	if (userIndex !== -1) {
		users[userIndex] = currentUser;
		localStorage.setItem("users", JSON.stringify(users));
	}

	// Update user greeting
	document.getElementById(
		"user-greeting"
	).textContent = `Welcome, ${currentUser.name}!`;

	alert("Your profile has been updated successfully!");
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
	const today = new Date();
	const nextWeek = new Date(today);
	nextWeek.setDate(today.getDate() + 7);

	const formatDate = (date) => {
		return date.toISOString().split("T")[0];
	};

	document.getElementById("date").value = formatDate(nextWeek);
	document.getElementById("book-date").value = formatDate(nextWeek);

	// Check authentication
	checkAuth();

	// Check if we have a stored page
	const currentPage = localStorage.getItem("currentPage") || "home";
	showPage(currentPage);
});
