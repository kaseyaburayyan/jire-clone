import {API_URL} from "../constants";
import { useAuth } from "../auth/auth";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ListAllTasks() {
    const {isAuthenticated, userId} = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        listAllTasks();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    function listAllTasks() {
      const listAllTasksApi = `${API_URL}/tasks`;
      fetch(listAllTasksApi)
      .then(response => response.json())
      .then(data => {
          // Create an array of promises for fetching user data
          const taskPromises = data.map(task => {
              if (task.assignedUserId) {
                  const getUserApi = `${API_URL}/user/${task.assignedUserId}`;
                  return fetch(getUserApi)
                      .then(response => response.json())
                      .then(user => {
                          task.username = user.username;
                          return task;
                      })
                      .catch(error => {
                          task.username = "Unknown";
                          return task;
                      });
              }
              return Promise.resolve(task);
          });
  
          // Wait for all promises to resolve
          Promise.all(taskPromises).then(allTasks => {
              setTasks(allTasks);
          });
      });
  }

    function assignTask(task) {
      console.log(task);
      const updatedTask = {
        taskId: task.taskId,
        taskTitle: task.taskTitle,
        taskDesc: task.taskDesc,
        taskDueDate: task.taskDueDate,
        createdUserId: task.createdUserId,
        assignedUserId: userId
      }

      const assignTaskApi = `${API_URL}/task/${task.taskId}`;
      fetch(assignTaskApi, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(data => {
        alert("Task assigned successfully");
        console.log(data);
        listAllTasks();
      })
      .catch(error => alert("error assigning task"));
    }

    return (
        <div>
            <h1>All Tasks</h1>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Assigned To</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.taskId}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.taskTitle}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{task.taskDesc}</td>
                            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                                {task.username}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
                                <button onClick={() => assignTask(task)}>Assign</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}