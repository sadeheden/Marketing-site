import { login, showUserName, createNewUser, logout, saveBanner, displayBanner } from './functions.js';

// Login form listener on index or root page
if (location.href.includes('index') || location.pathname === '/') {
    document.querySelector('#login').addEventListener('submit', login);
}

// Logout form listener on main and other specific pages
if (location.href.includes('main') || location.href.includes('customize-banners') || 
    location.href.includes('terms') || location.href.includes('privacy') ||
    location.href.includes('newsletter') || location.href.includes('landing-page') ||
    location.pathname === '/') {
    document.querySelector('#logout').addEventListener('submit', logout);
}

// User registration form listener on signup or root page
if (location.href.includes('signup') || location.pathname === '/') {
    document.querySelector('#register').addEventListener('submit', createNewUser);
}

// Show user name on profile page
if (location.href.includes('profile')) {
    showUserName();
}

// Handle popup visibility and positioning
document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.querySelector('.create-button');
    const popupBox = document.getElementById('popupBox');

    createButton.addEventListener('click', function() {
        popupBox.classList.toggle('visible');
        
        // Position the popup box relative to the button
        const rect = createButton.getBoundingClientRect();
        popupBox.style.top = `${rect.bottom + window.scrollY}px`;
        popupBox.style.left = `${rect.left}px`;
    });

    // Close popup if clicked outside of it
    document.addEventListener('click', function(event) {
        if (!popupBox.contains(event.target) && !createButton.contains(event.target)) {
            popupBox.classList.remove('visible');
        }
    });
});

