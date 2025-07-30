package com.moveoCode.TaskManagement.repository;

import com.moveoCode.TaskManagement.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Integer> {
}
