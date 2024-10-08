export default function Register(){
    function register(){
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;

        /*Replace these two lines with proper register logic*/
        console.log("Username: ", username);
        console.log("Password: ", password);
    }   

    return(
        /*Displays the register form */
    <div>
        <h1>Registration</h1>
        <form>
            <label>Username: </label>
            <input type="text" id="username"/><br></br>
            <label>Password: </label>
            <input type="password" id="password"/><br></br>
            <button type="submit" onClick={register}>Register</button>
        </form>
    </div>
    )
}