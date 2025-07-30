package com.moveoCode.TaskManagement.service;

import com.moveoCode.TaskManagement.repository.ProjectRepository;
import com.moveoCode.TaskManagement.entity.Project;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements  ProjectService{

    private ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository theProjectRepository) {
        projectRepository = theProjectRepository;

    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public Project findById(int theId) {
        Optional<Project> result = projectRepository.findById(theId);

        Project theProject = null;

        if (result.isPresent()) {
            theProject = result.get();
        }
//        else {
//            // we didn't find the employee
//            throw new RuntimeException("Did not find project id - " + theId);
//        }

        return theProject;
    }

    @Override
    public Project save(Project theProject) {
        return projectRepository.save(theProject);
    }

    @Override
    public void deleteById(int theId) {

        projectRepository.deleteById(theId);
    }
}
