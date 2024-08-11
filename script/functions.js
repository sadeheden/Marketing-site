import { global } from "./vars.js";
import { User } from "../model/user.model.js";

export function login(event) {
    //ביטול רענון הדף
    event.preventDefault();

    //שליפת הנתונים מתוך הטופס
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    //מציאת האובייקט המתאים מתוך המאגר
    let loginUser = global.users.find((user) => user.email == email && user.password == password);

    //בדיקה האם בכלל נמצא משתמש כזה
    if (!loginUser) {
        alert("Invalid Login info");
    }
    else {
        //במידה והמשתמש נמצא - נרצה לשמור בלוקאל סטורג
        localStorage.setItem('user', JSON.stringify(loginUser));
        //עבור לדף פרופיל
        document.location.href = '/main.html';
    }

}

export function showUserName(){
    //localStorage.getItem('user') - תמיד יהיה מחרוזת
    //ניגשים ללוקאל סטורג כדי לשלוף את נתוני המשתמש שהתחבר
    //ממירים את המחרוזת לאובייקט
    let loginUser = JSON.parse(localStorage.getItem('user'));

    //אם ניגשנו ישירות לדף בלי להתחבר
    if(!loginUser){
        location.href= "/";
    }

    document.querySelector('#username').textContent = loginUser.username;
}

// export function isValid(email, password) {
//     return global.users.some(user => user.email === email && user.password === password);
// }

export function createNewUser(event) {
        //ביטול רענון הדף
        event.preventDefault();

        //שליפת הנתונים מתוך הטופס
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let username = document.querySelector("#name").value;

    // if (!User.isValid(email, password)) {
        const newUser = new User(email, password, username);
        global.users.push(newUser);
        return newUser;
    // } else {
    //     return null; // User already exists
    // }
}