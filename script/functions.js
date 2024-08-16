import { global } from "./vars.js";
import { User } from "../model/user.model.js";

export function login(event) {
    event.preventDefault();
    alert(JSON.stringify(global.users));
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    const loginUser = global.users.find((user) => user.email === email && user.password === password);

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
    const loginUser = JSON.parse(localStorage.getItem('user'));

    if (!loginUser) {
        location.href = "/";
        return;
    }

    document.querySelector('#username').textContent = loginUser.username || 'Guest';
}

// export function createNewUser(event) {
//     event.preventDefault();

//     const email = document.querySelector("#email").value.trim();
//     const password = document.querySelector("#password").value.trim();
//     const username = document.querySelector("#name").value.trim();

//     const userExists = global.users.some(user => user.email === email);
    
//     if (userExists) {
//         alert('User already exists');
//         return null;
//     }

//     const newUser = new User(email, password, username);
//     global.users.push(newUser);
//     localStorage.setItem('user', JSON.stringify(newUser));

//     return newUser;
// }

export function saveBanner() {
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const text = document.getElementById('text').value.trim();

    const bannerData = { size, color, text };
    localStorage.setItem('banner', JSON.stringify(bannerData));

    displayBanner();
}

export function displayBanner() {
    const banner = document.getElementById('banner');
    const bannerData = JSON.parse(localStorage.getItem('banner'));

    if (bannerData) {
        banner.className = `banner ${bannerData.size}`;
        banner.style.backgroundColor = bannerData.color;
        banner.textContent = bannerData.text;
    }
}
export function createNewUser(event) {
    // Prevent page refresh on form submission
    event.preventDefault();

    // Get form values
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username = document.querySelector("#name").value;

    // Check if the user already exists in global.users
    const existingUser = global.users.find((user) => user.email === email);

    alert(JSON.stringify(existingUser));
    if (existingUser) {
        alert("User with this email already exists.");
        return;
    }

    // Create a new User object and add it to global.users
    const newUser = new User(email, password, username);
    global.users.push(newUser);
    alert(JSON.stringify(global.users));

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(global.users));

    // NOT WORKING - Optionally, save the new user in localStorage for auto login later on
    // localStorage.setItem('user', JSON.stringify(newUser));

    // Alert the user that signup was successful
    alert("User signup successfully!");

    // Redirect to the login page or another page
    document.location.href = '/index.html';
}