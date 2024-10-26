import {Outlet, Link} from "react-router-dom";
import '../navbar.css';
import { useAuth } from "../auth/auth";

export default function Root() {
  const {isAuthenticated, username, logout} = useAuth();

    return (
        /*This holds the links to other parts of the website,
        Currently displays as a barebones topbar*/
        <>
            <div id="navbar">
                <h2>Task Tracker</h2>
                <nav>
                    <ul>
                      {!isAuthenticated &&
                        <>
                        <li>
                          <Link to={`/login`}>Login</Link>
                        </li>
                        <li>
                          <Link to={`/register`}>Register</Link>
                        </li>
                        </>
                      }
                        {isAuthenticated &&
                        <>
                        <li>
                            <Link to={`/createTask`}>Create Task</Link>
                        </li>
                        <li>
                            <Link to={`/myTasks`}>My Tasks</Link>
                        </li>
                        <li>
                          <Link to={`/listAllTasks`}>All Tasks</Link>
                        </li>
                        <li style={{float: "right"}}>
                          <button onClick={logout}>Logout for: {username}</button>
                        </li>
                        </>
                      }
                    </ul>
                </nav>
            </div>
            <div id="body">
                <Outlet />
            </div>
        </>
    )
}