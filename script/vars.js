import { User } from "../model/user.model.js";

// Load users from localStorage, or use default if not available
const storedUsers = JSON.parse(localStorage.getItem('users')) || [
    new User("maradh@gmail.com", "1223", "Kuku"),
    new User("Yurugy@gmail.com", "1!2@3#", "Y0Y0")
];

export const global = {
    users:storedUsers
}
