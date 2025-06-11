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

// Load current user data
document.getElementById('email').value = currentUser.email || '';
document.getElementById('mobile').value = currentUser.mobile || '';
document.getElementById('address').value = currentUser.address || '';

// Toggle password fields
document.getElementById('updatePasswordCheck').addEventListener('change', function() {
    const passwordFields = document.getElementById('passwordFields');
    passwordFields.style.display = this.checked ? 'block' : 'none';
    
    // Toggle required attribute
    const passwordInputs = passwordFields.querySelectorAll('input');
    passwordInputs.forEach(input => {
        input.required = this.checked;
    });
});

// Form submission
document.getElementById('updateProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const updatePassword = document.getElementById('updatePasswordCheck').checked;
    
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
    
    // Password validation if updating
    if (updatePassword) {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Check current password
        if (currentPassword !== currentUser.password) {
            alert('Current password is incorrect');
            return;
        }
        
        // New password validation
        if (newPassword.length < 8) {
            alert('New password must be at least 8 characters long');
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            alert('New password must contain at least one uppercase letter');
            return;
        }
        if (!/[0-9]/.test(newPassword)) {
            alert('New password must contain at least one number');
            return;
        }
        if (!/[!@#$%^&*]/.test(newPassword)) {
            alert('New password must contain at least one special character');
            return;
        }
        
        // Confirm password
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        
        // Update password
        currentUser.password = newPassword;
    }
    
    // Update user data
    currentUser.email = email;
    currentUser.mobile = mobile;
    currentUser.address = address;
    
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update session storage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Profile updated successfully!');
}); 