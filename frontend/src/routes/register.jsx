import {API_URL} from "../constants";
import { Navigate } from "react-router-dom";

export default function Register(){
    function register(){
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;
        var email=document.getElementById("email").value;

        /*Replace these two lines with proper register logic*/
        console.log("Email: ", email);
        console.log("Username: ", username);
        console.log("Password: ", password);

        const registerApi = `${API_URL}/user`;
        const user = {
          username: username,
          password: password,
          email: email
        }
        fetch(registerApi, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {"Content-Type": "application/json"}
        })
        .then(response => {
          console.log(response);
        })
        .then(data => {
          alert("User registered successfully");
          <Navigate to="/login" />
        })
        .catch(error => {
          alert("Error registering user");
          alert(error);
        })
    }   

    return(
        /*Displays the register form */
    <div>
        <h1>Registration</h1>
        <form>
            <label>Email: </label>
            <input type="email" id="email" required/><br></br>
            <label>Username: </label>
            <input type="text" id="username" required/><br></br>
            <label>Password: </label>
            <input type="password" id="password" required/><br></br>
            <button type="submit" onClick={register}>Register</button>
        </form>
    </div>
    )
}