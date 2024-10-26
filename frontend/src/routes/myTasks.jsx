import {API_URL} from "../constants";
import { useAuth } from "../auth/auth";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
export default function MyTasks() {
    const {isAuthenticated, userId} = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        listMyTasks();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    function listMyTasks() {
        const listMyTasksApi = `${API_URL}/tasks`;
        fetch(listMyTasksApi)
        .then(response => response.json())
        .then(data => {
          var myTasks = data.filter(
            task => task.assignedUserId === userId  
          );
          setTasks(myTasks);
        });
    }

    function unassignTask(task) {
      const updatedTask = {
        taskId: task.taskId,
        taskTitle: task.taskTitle,
        taskDesc: task.taskDesc,
        taskDueDate: task.taskDueDate,
        createdUserId: task.createdUserId
      }

      const unassignTaskApi = `${API_URL}/task/${task.taskId}`;
      fetch(unassignTaskApi, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(data => {
        alert("Task unassigned successfully");
        console.log(data);
        listMyTasks();
      })
      .catch(error => alert("error unassigning task"));
    }

    return (
      <div>
            <h1>All Tasks</h1>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Unassign</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.taskId}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.taskTitle}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.taskDesc}</td>
                            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                                <button onClick={() => unassignTask(task)}>Unassign</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
