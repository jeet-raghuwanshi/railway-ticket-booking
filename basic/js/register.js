document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const aadhar = document.getElementById('aadhar').value;
    
    // Username validation
    if (username.length < 6) {
        alert('Username must be at least 6 characters long');
        return;
    }
    if (!/^[a-zA-Z]+$/.test(username)) {
        alert('Username should only contain letters');
        return;
    }
    
    // Password validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert('Password must contain at least one uppercase letter');
        return;
    }
    if (!/[0-9]/.test(password)) {
        alert('Password must contain at least one number');
        return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
        alert('Password must contain at least one special character');
        return;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Mobile validation
    if (!/^\d{10}$/.test(mobile)) {
        alert('Mobile number must be 10 digits long');
        return;
    }
    
    // Aadhar validation
    if (!aadhar) {
        alert('Aadhar number is required');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(), // Add unique ID
        name: username, // Use username as name initially
        username,
        password,
        email,
        mobile,
        aadhar,
        isAdmin: false,
        tickets: []
    };
    
    // Add user to storage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please login.');
    window.location.href = 'index.html';
}); 