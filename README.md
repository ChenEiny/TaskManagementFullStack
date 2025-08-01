# 🚀 Task Management System – Spring Boot & React

A full-stack task/project management app with **AWS Cognito authentication**, **Spring Boot (Java 21)** backend, and a modern **React** frontend.

---

![Java](https://img.shields.io/badge/Java-21-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Cognito](https://img.shields.io/badge/AWS%20Cognito-purple)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [API Reference](#api-reference)
- [Usage & Pagination](#usage--pagination)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment Suggestion](#deployment-suggestion)
- [Assignment Answers](#assignment-answers)
- [Contact](#contact)

---

## ✨ Features

- 🔐 **User Authentication:** Secure login with AWS Cognito User Pool (OIDC/JWT)
- 🗂️ **Project Management:** Full CRUD for projects (name, description)
- ✅ **Task Management:** Full CRUD for tasks (title, description, status)
- 📄 **Pagination:** Supported in all GET endpoints
- 🛡️ **Role-Based Access (optional):** Admin/User separation
- 🪵 **Logging & Error Handling:** Clean logs and consistent error responses
- 🧪 **Unit Testing:** JUnit/Mockito

---

## 🛠️ Tech Stack

- **Backend:** Java 21, Spring Boot, Spring Security, Spring Data JPA, MySQL, OAuth2 Resource Server, AWS Cognito
- **Frontend:** React (Vite), React Router, Axios
- **Testing:** JUnit, Mockito
- **Other:** Maven, GitHub Actions (CI/CD)

---

## 📁 Project Structure

<details>
  <summary>Click to expand</summary>

```
📦 TaskManagementBackend/
┣ 📂src/
┃ ┣ 📂main/
┃ ┃ ┣ 📂java/com/example/taskmanagement/
┃ ┃ ┃ ┣ 📂config         # Spring/Cognito config
┃ ┃ ┃ ┣ 📂controller     # REST endpoints
┃ ┃ ┃ ┣ 📂service        # Business logic
┃ ┃ ┃ ┣ 📂repository     # JPA Repositories
┃ ┃ ┃ ┗ 📂model          # Entities: Project, Task
┃ ┃ ┗ 📂resources/
┃ ┃   ┗ application.yml  # DB & Cognito config
┃ ┗ 📂test/              # Unit tests
┣ pom.xml

📦 frontend/
┣ 📂src/
┣ package.json
┣ .env                   # API base URL
```

</details>

---

## ⏬ Prerequisites

- **Java 21+**
- **Maven**
- **Node.js 18+**
- **npm/yarn**
- **MySQL** (local or Docker)
- **AWS Cognito** (User Pool + App Client)

---

## 🏁 Setup & Installation

### 1. Clone the Repository

```sh
git clone https://github.com/< ChenEiny >/<https://github.com/ChenEiny/TaskManagementFullStack>.git
cd TaskManagementBackend
```

### 2. Configure Environments

**Backend** (`src/main/resources/application.yml`):

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/taskdb
    username: root
    password: password
  jpa:
    hibernate.ddl-auto: update

aws:
  cognito:
    userPoolId: <user-pool-id>
    region: <region>
    appClientId: <client-id>
```

**Frontend** (`frontend/.env`):

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Start MySQL

**Local:**

```sh
mysql -u root -p
CREATE DATABASE taskdb;
```

**Or Docker:**

```sh
docker run --name mysql-taskdb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=taskdb -p 3306:3306 -d mysql:8
```

### 4. Run Backend

```sh
cd TaskManagementBackend
mvn spring-boot:run
```

### 5. Run Frontend

```sh
cd frontend
npm install
npm run dev
```

---

## 🛣️ API Reference

### Authentication

- **Login:** Handled by redirecting to Cognito login (via frontend)
- **Logout:** `/logout` (frontend/back)

### Projects

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/projects`      | Get paginated projects     |
| GET    | `/api/projects/{id}` | Get a single project by ID |
| POST   | `/api/projects`      | Create a new project       |
| PUT    | `/api/projects/{id}` | Update project details     |
| DELETE | `/api/projects/{id}` | Delete a project           |

**Project Example:**

```json
{
  "id": 1,
  "name": "Project X",
  "description": "Description"
}
```

### Tasks

| Method | Endpoint                               | Description                       |
| ------ | -------------------------------------- | --------------------------------- |
| GET    | `/api/projects/{projectId}/tasks`      | Get paginated tasks in a project  |
| GET    | `/api/projects/{projectId}/tasks/{id}` | Get a task by ID                  |
| POST   | `/api/projects/{projectId}/tasks`      | Create a new task in a project    |
| PUT    | `/api/projects/{projectId}/tasks/{id}` | Update a task (title/desc/status) |
| DELETE | `/api/projects/{projectId}/tasks/{id}` | Delete a task                     |

**Task Example:**

```json
{
  "id": 42,
  "title": "Design DB schema",
  "description": "Create tables",
  "status": "todo" // or "in-progress", "done"
}
```

---

## ⚠️ Error Handling

Standardized error format:

```json
{
  "timestamp": "...",
  "status": 404,
  "error": "Not Found",
  "message": "Project not found",
  "path": "/api/projects/99"
}
```

---

## 🧪 Testing

Unit tests included for core services and controllers.

**Run tests:**

```sh
mvn test
```

---

## 📚 Assignment Answers

### How to Deploy for 10,000 Users/Day and React Client

#### Backend (Spring Boot):

- **Containerization:**  
  Package the app using Docker for reproducible deployments.

- **Cloud Hosting:**  
  Deploy containers to AWS ECS, EKS (Kubernetes), or Elastic Beanstalk.

- **Database:**  
  Use AWS RDS for managed, scalable MySQL with daily backups and multi-AZ support.

- **Environment Variables & Secrets:**  
  Manage all secrets (DB, Cognito IDs, etc.) using AWS Systems Manager Parameter Store or AWS Secrets Manager.

- **API Gateway & Load Balancer:**  
  Place AWS Application Load Balancer or API Gateway in front of your backend for scalability and routing.

- **Security:**  
  Use HTTPS (TLS) everywhere.  
  Restrict backend endpoints using Cognito JWT validation (already integrated).  
  Enable CORS for the deployed frontend domain.

- **Autoscaling:**  
  Set up autoscaling policies to handle traffic spikes automatically.

- **Monitoring:**  
  Use AWS CloudWatch for centralized logging, health checks, and alarms.

- **CI/CD:**  
  Automate build/test/deploy with GitHub Actions or AWS CodePipeline.

#### Frontend (React):

- **Static Site Generation:**  
  Build static files with `npm run build`.

- **Cloud Hosting:**  
  Deploy static files to AWS S3, serving via AWS CloudFront (CDN) for global delivery and SSL.

- **Domain:**  
  Use Route53 (DNS) to route your custom domain to CloudFront/S3.

- **Secure Auth Flow:**  
  Ensure Cognito callback URLs include your deployed frontend domain.

#### Scalability, Reliability, and Maintenance:

- **Stateless API:**  
  The backend is stateless and uses JWT, so scaling horizontally (adding instances) is easy.

- **Rate Limiting & Throttling:**  
  Add rate limiting via AWS API Gateway or custom Spring filters.

- **Cache Layer:**  
  Use Redis (ElastiCache) for session or frequently accessed data if needed.

- **Automated Backups:**  
  Set up regular DB backups and cross-region replication for disaster recovery.

- **Documentation & Monitoring:**  
  Use OpenAPI (Swagger) for API docs, and CloudWatch/Dashboard for real-time health.

#### High-Level Diagram

```
(User) <--> (React on S3/CloudFront) <--> (ALB/API Gateway) <--> (Spring Boot Containers on ECS/EKS/Beanstalk) <--> (RDS MySQL)
                        |
                   (AWS Cognito)
```

**Result:**  
This deployment is fully cloud-native, scalable, secure, and supports a React SPA as the main client. It can reliably handle 10k users a day with headroom to scale higher.

---
