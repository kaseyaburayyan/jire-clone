package com.kaburayyan.comp495.tasktracker.task;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @RequestMapping(path = "/tasks", method = RequestMethod.GET )
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskService.getTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    @RequestMapping(path = "/task", method = RequestMethod.GET)
    public ResponseEntity<Task> getTask(@PathVariable UUID id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(path = "/task/{id}", method = RequestMethod.PUT)
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

    @RequestMapping(path = "/task", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        if (taskService.deleteTask(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
