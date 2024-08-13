import { global } from "./vars.js";
import { User } from "../model/user.model.js";

export function login(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let loginUser = global.users.find((user) => user.email == email && user.password == password);

    if (!loginUser) {
        alert("Invalid Login info");
    } else {
        localStorage.setItem('user', JSON.stringify(loginUser));
        document.location.href = '/main.html';
    }
}

export function logout(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    document.location.href = '/index.html';
}

export function showUserName() {
    let loginUser = JSON.parse(localStorage.getItem('user'));

    if (!loginUser) {
        location.href = "/";
    }

    document.querySelector('#username').textContent = loginUser.username;
}

export function createNewUser(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let username = document.querySelector("#name").value;

    const newUser = new User(email, password, username);
    global.users.push(newUser);
    return newUser;
}
export function saveBanner() {
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const text = document.getElementById('text').value;

    const bannerData = {
        size: size,
        color: color,
        text: text
    };

    localStorage.setItem('banner', JSON.stringify(bannerData));
    displayBanner(); // Update the preview immediately after saving
}

export function displayBanner() {
    const banner = document.getElementById('banner');
    const bannerData = JSON.parse(localStorage.getItem('banner'));

    if (bannerData) {
        banner.className = `banner ${bannerData.size}`;
        banner.style.backgroundColor = bannerData.color;
        banner.textContent = bannerData.text;
    } else {
        banner.className = 'banner small';
        banner.style.backgroundColor = '#ffffff';
        banner.textContent = 'Your Banner Preview';
    }
}

export function managePopup() {
    const createButton = document.querySelector('.create-button');
    const popupBox = document.getElementById('popupBox');

    createButton.addEventListener('click', function() {
        popupBox.classList.toggle('visible');
        
        const rect = createButton.getBoundingClientRect();
        popupBox.style.top = `${rect.bottom + window.scrollY}px`;
        popupBox.style.left = `${rect.left}px`;
    });

    document.addEventListener('click', function(event) {
        if (!popupBox.contains(event.target) && !createButton.contains(event.target)) {
            popupBox.classList.remove('visible');
        }
    });
}
