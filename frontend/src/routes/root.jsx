import {Outlet, Link} from "react-router-dom";
import '../navbar.css';

export default function Root() {
    return (
        /*This holds the links to other parts of the website,
        Currently displays as a barebones topbar*/
        <>
            <div id="navbar">
                <h2>Navbar</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/login`}>Login</Link>
                        </li>
                        <li>
                            <Link to={`/register`}>Register</Link>
                        </li>
                        <li>
                            <Link to={`/createTask`}>Create Task</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="body">
                <Outlet />
            </div>
        </>
    )
}