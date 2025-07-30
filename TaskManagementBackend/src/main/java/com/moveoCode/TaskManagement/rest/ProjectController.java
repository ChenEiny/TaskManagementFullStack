package com.moveoCode.TaskManagement.rest;


import com.moveoCode.TaskManagement.entity.Project;
import com.moveoCode.TaskManagement.entity.Task;
import com.moveoCode.TaskManagement.exception.ResourceNotFoundException;
import com.moveoCode.TaskManagement.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@org.springframework.web.bind.annotation.RestController

public class ProjectController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);


    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService theProjectService) {
        projectService = theProjectService;
    }

    @GetMapping("/projects")
    public List<Project> findAll() {
        logger.info("Get a list of all projects ");
        return projectService.findAll();
    }

    // add mapping for GET /projects/{projectId}

    @GetMapping("/projects/{projectId}")
    public Project getProject(@PathVariable int projectId) {

        Project theProject = projectService.findById(projectId);
        logger.info("Get a Project by id {}",theProject);


        if (theProject == null) {
            throw new ResourceNotFoundException("Project id not found - " + projectId);
        }

        return theProject;
    }

    // add mapping for POST /projects - add new project

    @PostMapping("/projects")
    public Project addProejct(@RequestBody Project theProject) {

        // also just in case they pass an id in JSON ... set id to 0
        // this is to force a save of new item ... instead of update

        theProject.setId(0);

        Project dbProject = projectService.save(theProject);
        logger.info("Adding Project by id {}",dbProject.getId());


        return dbProject;
    }

    // add mapping for PUT /projects - update existing project

    @PutMapping("/projects")
    public Project updateProject(@RequestBody Project theProject) {

        Project deProject = projectService.save(theProject);
        logger.info("Updating Project by id {}",deProject.getId());

        return deProject;
    }

    // add mapping for DELETE /projects/{projectId} - delete project

    @DeleteMapping("/projects/{projectId}")
    public String deleteProject(@PathVariable int projectId) {

        Project tempProject = projectService.findById(projectId);
        logger.info("Deleting Project by id {}",projectId);

        // throw exception if null

        if (tempProject == null) {
            logger.warn("Project with ID {} not found for deletion", projectId);
            throw new ResourceNotFoundException("Project id not found - " + projectId);
        }

        projectService.deleteById(projectId);

        return "Deleted Project id - " + projectId;
    }

    @GetMapping("/projects/{projectId}/tasks")
    public List<Task> getTasksForProject(@PathVariable int projectId) {
        Project project = projectService.findById(projectId);
        logger.info("Get tasks for project by id {} => {}", projectId, project);

        if (project == null) {
            throw new ResourceNotFoundException("Project id not found - " + projectId);
        }
        return project.getTasks();
    }


}
