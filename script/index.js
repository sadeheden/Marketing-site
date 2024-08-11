// index.js
import { login, showUserName, createNewUser, logout} from "./functions.js";

//אם אנחנו נמצאים בדף הראשי - לוגין
if (location.href.includes('index') || location.pathname == '/') {
    document.querySelector('#login').addEventListener('submit', login);
}
if (location.href.includes('main') ||location.href.includes('customize-banners')|| location.href.includes('terms')|| location.href.includes('privacy')||location.href.includes('newsletter')||location.href.includes('landing-page')||location.pathname == '/') {
    document.querySelector('#logout').addEventListener('submit', logout);
}
//אם אנחנו נמצאים בדף הראשי - לוגין
if (location.href.includes('signup') || location.pathname == '/') {
    document.querySelector('#register').addEventListener('submit', createNewUser);
}

//אם אנחנו נמצאים בדף הפרופיל
if (location.href.includes('profile')) {
    showUserName();
}

// JavaScript to handle popup visibility
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

    document.addEventListener('click', function(event) {
        if (!popupBox.contains(event.target) && !createButton.contains(event.target)) {
            popupBox.classList.remove('visible');
        }
    });
});

function changeLogo(logoSrc) {
    document.getElementById('logo').src = logoSrc;
}