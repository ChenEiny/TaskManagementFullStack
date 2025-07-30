CREATE DATABASE IF NOT EXISTS `task_management`;
USE `task_management`;

DROP TABLE IF EXISTS `tasks`;
DROP TABLE IF EXISTS `projects`;

-- Create `projects` table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

-- Create `tasks` table with project_id FK
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(100),
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
