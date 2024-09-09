import { login, showUserName, createNewUser, logout } from './functions.js';
//the adress where they get the option to do the change=>
// Login form listener on index or root page
if (location.href.includes('index') || location.pathname === '/') {
    document.querySelector('#login').addEventListener('submit', login);
}

// Logout form listener on main and other specific pages
if (location.href.includes('main') || location.href.includes('customize-banners') || 
    location.href.includes('terms') || location.href.includes('save') || location.href.includes('privacy') ||
    location.href.includes('newsletter') || location.href.includes('landing-page')|| location.href.includes('customize-newsletter')  ||
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

// Handle popup visibility and positioning before the log in
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
//users see the list that we created using signin
import { global } from "./vars.js";

document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.querySelector('#user-table tbody');

    // Iterate over the global.users array and create table rows for the user page just for the admin
    global.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
        `;
        userTableBody.appendChild(row);
    });
});