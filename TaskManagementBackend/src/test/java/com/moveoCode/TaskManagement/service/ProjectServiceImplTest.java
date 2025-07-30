package com.moveoCode.TaskManagement.service;

import com.moveoCode.TaskManagement.entity.Project;
import com.moveoCode.TaskManagement.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        System.out.println("=== ProjectServiceImplTest setup complete ===");
    }

    @Test
    void testFindAll_ReturnsAllProjects() {
        // Arrange
        List<Project> projects = Arrays.asList(new Project(), new Project());
        when(projectRepository.findAll()).thenReturn(projects);

        // Act
        List<Project> result = projectService.findAll();

        // Assert
        System.out.println("Expected: 2 projects, Result: " + result.size());
        assertEquals(2, result.size());
        verify(projectRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Found() {
        Project project = new Project();
        project.setId(1);
        when(projectRepository.findById(1)).thenReturn(Optional.of(project));

        Project result = projectService.findById(1);

        System.out.println("Expected: Project with id=1, Result: " + (result != null ? "id=" + result.getId() : "null"));
        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(projectRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_NotFound() {
        when(projectRepository.findById(99)).thenReturn(Optional.empty());

        Project result = projectService.findById(99);

        System.out.println("Expected: null (project not found), Result: " + result);
        assertNull(result);
        verify(projectRepository).findById(99);
    }

    @Test
    void testSave() {
        Project project = new Project();
        project.setName("New Project");

        when(projectRepository.save(project)).thenReturn(project);

        Project saved = projectService.save(project);

        System.out.println("Expected: Project with name='New Project', Result: name=" + saved.getName());
        assertNotNull(saved);
        assertEquals("New Project", saved.getName());
        verify(projectRepository).save(project);
    }

    @Test
    void testDeleteById() {
        doNothing().when(projectRepository).deleteById(1);

        projectService.deleteById(1);

        System.out.println("Expected: deleteById(1) called, Result: Method called with id=1");
        verify(projectRepository, times(1)).deleteById(1);
    }
}
