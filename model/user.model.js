  //FILE OF CLASS USER CREATES OBJECT IN THE TYPE USER NEED TO HAVE ALL
  // THE CONSTRUCTOR INFO TO SAVE THE OBJECT like logon/signin
export class User {
    email;
    password;
    username;
    
    constructor(email, password, username){
        this.email = email;
        this.password = password;
        this.username = username;
    }


}