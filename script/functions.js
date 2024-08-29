import { global } from "./vars.js";
import { User } from "../model/user.model.js";

export function login(event) {
    event.preventDefault();
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
export function createNewUser(event) {
    // Prevent page refresh on form submission
    event.preventDefault();

    // Get form values
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username = document.querySelector("#name").value;

    // Check if the user already exists in global.users
    const existingUser = global.users.find((user) => user.email === email);

    if (existingUser) {
        alert("User with this email already exists.");
        return;
    }

    // Create a new User object and add it to global.users
    const newUser = new User(email, password, username);
    global.users.push(newUser);
  

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(global.users));

    // NOT WORKING - Optionally, save the new user in localStorage for auto login later on
    // localStorage.setItem('user', JSON.stringify(newUser));

    // Alert the user that signup was successful
    alert("User signup successfully!");

    // Redirect to the login page or another page
    document.location.href = '/index.html';
}

//
export function saveBanner() {
    const sizeSelect = document.getElementById("size");
    const colorInput = document.getElementById("color");
    const textInput = document.getElementById("text");
    const imageUpload = document.getElementById("imageUpload");

    const reader = new FileReader();
    reader.onloadend = function() {
        const bannerData = {
            size: sizeSelect.value,
            color: colorInput.value,
            text: textInput.value,
            image: reader.result // Use Base64 string for image
        };
        localStorage.setItem("savedBanner", JSON.stringify(bannerData));
        window.location.href = "/save.html";
    };
    
    if (imageUpload.files[0]) {
        reader.readAsDataURL(imageUpload.files[0]);
    } else {
        const bannerData = {
            size: sizeSelect.value,
            color: colorInput.value,
            text: textInput.value,
            image: null
        };
        localStorage.setItem("savedBanner", JSON.stringify(bannerData));
        window.location.href = "/save.html";
    }
}