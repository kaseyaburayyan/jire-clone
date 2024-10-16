import "../form.css";

export default function CreateTask() {
    function createTask() {
        var taskName=document.getElementById("taskName").value;
        var description=document.getElementById("description").value;
        var date=document.getElementById("date").value;
        var assignee=document.getElementById("assignee").value;

        /*Replace the following lines with proper logic*/
        console.log("Task Name: ", taskName);
        console.log("Description: ", description);
        console.log("Due Date: ", date);
        console.log("Assignee: ", assignee);
    }
    return (
        /*Displays the create task form */
        <div>
            <h1 id="taskHeader">Create New Task</h1>
            <form>
                <label>Task Name: </label>
                <input type="text" id="taskName" required/><br></br>
                <label>Description: </label>
                <textarea id="description"></textarea><br></br>
                <label>Due Date: </label>
                <input type="date" id="date" /><br></br>
                <label>Assignee: </label>
                <input type="text" id="assignee" /><br></br>
                <button type="submit" onClick={createTask}>Create task</button>
            </form>
        </div>
    )
}