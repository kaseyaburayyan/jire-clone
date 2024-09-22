package com.kaburayyan.comp495.tasktracker.task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
}
