import { User } from "../model/user.model.js";//important for login based on local file we did in class

// Load users from localStorage, or use default if not available
//this users are saved for the next time you try to log on on a diffrent brownser or device
const storedUsers = JSON.parse(localStorage.getItem('users')) || [
    new User("maradh@gmail.com", "1223", "Kuku"),
    new User("Yurugy@gmail.com", "1!2@3#", "Y0Y0"),
    new User("edenk@mail.com", "1123", "eden")
];
//we recive data as string then it converts it with json.parse data becomes a js object
//here will be added if in the browser or device we create a user
export const global = {
    users:storedUsers
}
