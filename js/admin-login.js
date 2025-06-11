// Master admin user
const MASTER_ADMIN = {
    username: 'masteradmin',
    password: 'Admin@123',
    email: 'master@admin.com',
    isAdmin: true,
    isMasterAdmin: true
};

// Initialize admin users in localStorage if not exists
if (!localStorage.getItem('adminUsers')) {
    localStorage.setItem('adminUsers', JSON.stringify([MASTER_ADMIN]));
}

document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Get admin users
    const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [MASTER_ADMIN];
    
    // Find admin user
    const admin = adminUsers.find(u => u.username === username && u.password === password);
    
    if (admin) {
        // Store current admin in localStorage instead of sessionStorage
        localStorage.setItem('currentUser', JSON.stringify(admin));
        
        // Redirect to admin dashboard
        window.location.href = 'admin/dashboard.html';
    } else {
        alert('Invalid username or password');
    }
}); 