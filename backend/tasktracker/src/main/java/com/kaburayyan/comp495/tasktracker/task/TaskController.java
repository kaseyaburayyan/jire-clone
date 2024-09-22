package com.kaburayyan.comp495.tasktracker.task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/api/v1")
public class TaskController {
    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @RequestMapping(path = "/task", method = RequestMethod.POST)
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        if (task.getTaskTitle() == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (task.getTaskDesc() == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.taskService.addTask(task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
}
