document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store current user in session
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect based on user type
        if (user.isAdmin) {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'customer/dashboard.html';
        }
    } else {
        alert('Invalid username or password');
    }
}); 