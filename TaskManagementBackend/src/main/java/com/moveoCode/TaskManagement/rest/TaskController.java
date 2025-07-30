package com.moveoCode.TaskManagement.rest;

import com.moveoCode.TaskManagement.entity.Project;
import com.moveoCode.TaskManagement.entity.Task;
import com.moveoCode.TaskManagement.exception.BadRequestException;
import com.moveoCode.TaskManagement.exception.ResourceNotFoundException;
import com.moveoCode.TaskManagement.service.ProjectService;
import com.moveoCode.TaskManagement.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private TaskService taskService;
    private ProjectService projectService;

    @Autowired
    public TaskController(TaskService theTaskService, ProjectService theProjectService) {
        this.taskService = theTaskService;
        this.projectService = theProjectService;
    }



    @GetMapping("/tasks")
    public List<Task> findAll() {
        logger.info(" Fetching all tasks");
        List<Task> tasks = taskService.findAll();
        logger.debug("Returned {} tasks", tasks.size());
        return tasks;
    }

    @GetMapping("/tasks/{taskId}")
    public Task getTask(@PathVariable int taskId) {
        logger.info("{} - Fetching task by ID", taskId);
        Task theTask = taskService.findById(taskId);

        if (theTask == null) {
            logger.warn("Task with ID {} not found", taskId);
            throw new ResourceNotFoundException("Task id not found - " + taskId);
        }


        logger.debug("Found task: {}", theTask);
        return theTask;
    }

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task theTask) {


        int projectId = theTask.getProject().getId();
        logger.info(" Adding task for projectId {}", projectId);

        Project project = projectService.findById(projectId);
        if (project == null) {
            logger.error("Project not found: {}", projectId);
            throw new RuntimeException("Project not found: " + projectId);
        }

        theTask.setProject(project);
        Task savedTask = taskService.save(theTask);
        logger.info("Task created with ID {}", savedTask.getId());
        return savedTask;
    }

    @PutMapping("/tasks")
    public Task updateTask(@RequestBody Task theTask) {



        int projectId = theTask.getProject().getId();
        logger.info(" Updating task with ID {}", theTask.getId());

        Project project = projectService.findById(projectId);
        if (project == null) {
            logger.error("Project not found: {}", projectId);
            throw new RuntimeException("Project not found: " + projectId);
        }

        theTask.setProject(project);
        Task updatedTask = taskService.save(theTask);
        logger.info("Task updated: ID {}", updatedTask.getId());
        return updatedTask;
    }

    @DeleteMapping("/tasks/{taskId}")
    public String deleteTask(@PathVariable int taskId) {
        Task tempTask = taskService.findById(taskId);

        if (tempTask == null) {
            logger.warn("Task with ID {} not found for deletion", taskId);
            throw new ResourceNotFoundException("Task id not found - " + taskId);
        }

        taskService.deleteById(taskId);
        logger.info("Task with ID {} successfully deleted", taskId);
        return "Deleted Task id - " + taskId;
    }
}
