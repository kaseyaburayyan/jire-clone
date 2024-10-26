import "../form.css";
import {API_URL} from "../constants";
import { useAuth } from "../auth/auth";
import { Navigate } from "react-router-dom";

export default function CreateTask() {
    const {isAuthenticated, userId} = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }


    function createTask(event) {
        event.preventDefault();
        var taskName=document.getElementById("taskName").value;
        var description=document.getElementById("description").value;
        var date=document.getElementById("date").value;

        /*Replace the following lines with proper logic*/
        const createTaskApi = `${API_URL}/task`;
        const task = {
          taskTitle: taskName,
          taskDesc: description,
          taskDueDate: date,
          createdUserId: userId
        }
        // post the task to the API
        fetch(createTaskApi, {
          method: "POST",
          body: JSON.stringify(task),
          headers: {"Content-Type": "application/json"}
        })  
        .then(response => response.json())
        .then(data => {
          alert("Task created successfully");
        })
        .catch(error => {
          alert("Error creating task");
        });

        event.target.reset();
    }
    return (
        /*Displays the create task form */
        <div>
            <h1 id="taskHeader">Create New Task</h1>
            <form onSubmit={createTask}>
                <label>Task Name: </label>
                <input type="text" id="taskName" required/><br></br>
                <label>Description: </label>
                <textarea id="description"></textarea><br></br>
                <label>Due Date: </label>
                <input type="date" id="date" /><br></br>
                <button type="submit">Create task</button>
            </form>
        </div>
    )
}