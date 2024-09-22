package com.kaburayyan.comp495.tasktracker.task;

import jakarta.persistence.Entity;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import javax.annotation.processing.Generated;

@Entity
public class Task {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID taskId;
    private String taskTitle;
    private String taskDesc;
    private Date taskDueDate;
    private UUID createdUserId;
    private UUID assignedUserId;


    public Task(){}
    public Task(UUID taskId, String taskTitle, String taskDesc, Date taskDueDate, UUID createdUserId, UUID assignedUserId) {
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.taskDesc = taskDesc;
        this.taskDueDate = taskDueDate;
        this.createdUserId = createdUserId;
        this.assignedUserId = assignedUserId;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskDesc() {
        return taskDesc;
    }

    public void setTaskDesc(String taskDesc) {
        this.taskDesc = taskDesc;
    }

    public Date getTaskDueDate() {
        return taskDueDate;
    }

    public void setTaskDueDate(Date taskDueDate) {
        this.taskDueDate = taskDueDate;
    }

    public UUID getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(UUID createdUserId) {
        this.createdUserId = createdUserId;
    }

    public UUID getAssignedUserId() {
        return assignedUserId;
    }

    public void setAssignedUserId(UUID assignedUserId) {
        this.assignedUserId = assignedUserId;
    }
}
