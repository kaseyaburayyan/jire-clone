import {API_URL} from "../constants";
import { useAuth } from "../auth/auth";

export default function Login() {
    const {login} = useAuth();
     function tryLogin(event){
        event.preventDefault();
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        /*Replace these two lines with the eventual proper login functionality */
        const loginApi = `${API_URL}/user/login`;
        const credentials = {
          username: username,
          password: password
        }

        fetch(loginApi, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log("It worked!");
          login(data.id, data.username);
        })
        .catch(error => {
          alert("Invalid username or password");
        })

        event.target.reset();
    }
    return (
        /*This shows the login form*/
        <div>
            <h1>Login Page!</h1>
            <form onSubmit={tryLogin}> 
                <label>Username: </label>
                <input type="text" id="username" name="username" required/><br></br>
                <label>Password: </label>
                <input type="password" id="password" name="password" required/><br></br>
                <button type="submit">Log in</button>

            </form>
        </div>
    )
}