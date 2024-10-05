package com.kaburayyan.comp495.tasktracker.task;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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
    
    public ResponseEntity<Task> getTask(@PathVariable UUID id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<Task> updateTask(@PathVariable UUID id, @RequestBody Task task) {
        if (task.getTaskTitle() == null || task.getTaskDesc() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Task> existingTask = taskService.getTaskById(id);
        if (existingTask.isPresent()) {
            task.setTaskId(id); // Ensure we are updating the right task
            Task updatedTask = taskService.updateTask(task);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        if (taskService.deleteTask(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
