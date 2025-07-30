package com.moveoCode.TaskManagement.service;

import com.moveoCode.TaskManagement.entity.Task;
import com.moveoCode.TaskManagement.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        System.out.println("=== TaskServiceImplTest setup complete ===");
    }

    @Test
    void testFindAll_ReturnsAllTasks() {
        List<Task> tasks = Arrays.asList(new Task(), new Task());
        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> result = taskService.findAll();

        System.out.println("Expected: 2 tasks, Result: " + result.size());
        assertEquals(2, result.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Found() {
        Task task = new Task();
        task.setId(1);
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        Task result = taskService.findById(1);

        System.out.println("Expected: Task with id=1, Result: " + (result != null ? "id=" + result.getId() : "null"));
        assertNotNull(result);
        assertEquals(1, result.getId());
        verify(taskRepository).findById(1);
    }

    @Test
    void testFindById_NotFound() {
        when(taskRepository.findById(42)).thenReturn(Optional.empty());

        Task result = taskService.findById(42);

        System.out.println("Expected: null (task not found), Result: " + result);
        assertNull(result);
        verify(taskRepository).findById(42);
    }

    @Test
    void testSave() {
        Task task = new Task();
        task.setTitle("Unit test task");

        when(taskRepository.save(task)).thenReturn(task);

        Task saved = taskService.save(task);

        System.out.println("Expected: Task with title='Unit test task', Result: title=" + saved.getTitle());
        assertNotNull(saved);
        assertEquals("Unit test task", saved.getTitle());
        verify(taskRepository).save(task);
    }

    @Test
    void testDeleteById() {
        doNothing().when(taskRepository).deleteById(3);

        taskService.deleteById(3);

        System.out.println("Expected: deleteById(3) called, Result: Method called with id=3");
        verify(taskRepository, times(1)).deleteById(3);
    }
}
