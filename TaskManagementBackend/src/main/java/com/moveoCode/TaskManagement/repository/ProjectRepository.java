package com.moveoCode.TaskManagement.repository;

import com.moveoCode.TaskManagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProjectRepository extends JpaRepository<Project,Integer> {
}
