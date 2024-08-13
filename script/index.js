import { login, showUserName, createNewUser, logout, saveBanner, displayBanner, managePopup } from "./functions.js";

// Handle Login, Logout, and Registration
if (location.href.includes('index') || location.pathname == '/') {
    document.querySelector('#login').addEventListener('submit', login);
}

if (location.href.includes('signup') || location.pathname == '/') {
    document.querySelector('#register').addEventListener('submit', createNewUser);
}

if (location.href.includes('main') || location.href.includes('customize-banners') ||
    location.href.includes('terms') || location.href.includes('privacy') ||
    location.href.includes('newsletter') || location.href.includes('landing-page') ||
    location.pathname == '/') {
    document.querySelector('#logout').addEventListener('submit', logout);
}

// Handle Profile Page
if (location.href.includes('profile')) {
    showUserName();
}

// Manage Popup Visibility
document.addEventListener('DOMContentLoaded', managePopup);

// Display Banner on Page Load
window.onload = displayBanner;
