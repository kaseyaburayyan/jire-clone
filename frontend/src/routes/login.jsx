export default function Login() {
     function login(){
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        /*Replace these two lines with the eventual proper login functionality */
        console.log('Username: ', username);
        console.log('Password: ', password);
    }
    return (
        /*This shows the login form*/
        <div>
            <h1>Login Page!</h1>
            <form> 
                <label>Username: </label>
                <input type="text" id="username" name="username" /><br></br>
                <label>Password: </label>
                <input type="password" id="password" name="password" /><br></br>
                <button type="submit" onClick={login}>Log in</button>

            </form>
        </div>
    )
}