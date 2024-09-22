package com.kaburayyan.comp495.tasktracker.task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID>{
}
