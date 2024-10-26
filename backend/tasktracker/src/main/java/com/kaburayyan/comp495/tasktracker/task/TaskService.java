package com.kaburayyan.comp495.tasktracker.task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
@Service
public class TaskService {
    private final TaskRepository repository;

    @Autowired
    public TaskService(TaskRepository repository){
        this.repository = repository;
    }
    public Task addTask(Task task){
        this.repository.save(task);
        return task;
    }
    
    public Optional<Task> getTaskById(UUID id) {
        return this.repository.findById(id);
    }

    public Task updateTask(Task task) {
        return this.repository.save(task);
    }

    public boolean deleteTask(UUID id) {
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return true;
        }
        return false;
    }
}
