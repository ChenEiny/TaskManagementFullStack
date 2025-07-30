package com.moveoCode.TaskManagement.service;

import com.moveoCode.TaskManagement.entity.Project;

import java.util.List;

public interface ProjectService {

    List<Project> findAll();

    Project findById(int theId);

    Project save(Project theProject);

    void deleteById(int theId);
}
