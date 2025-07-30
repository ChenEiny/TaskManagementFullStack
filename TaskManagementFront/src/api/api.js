import axios from "axios";

const API_BASE = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Include cookies in requests
});

// === INTERCEPTOR: Handle 401 (expired access token) ===
apiClient.interceptors.response.use(
  (response) => response, // Pass through OK responses
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // This POST asks the backend to refresh the access_token using the refresh_token cookie
        await apiClient.post("/refresh");
        // Retry the original request with new token (now in cookie)
        return apiClient(originalRequest);
      } catch (refreshErr) {
        // If refresh also fails, redirect to login page or show message
        window.location.href = "/login"; // Adjust as needed
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

// === API functions ===
export const fetchAllProjects = () => apiClient.get("/projects");
export const fetchProject = (projectId) => apiClient.get(`/projects/${projectId}`);
export const fetchTasks = (projectId) => apiClient.get(`/projects/${projectId}/tasks`);
export const updateTaskProject = (taskId, newProjectId) =>
  apiClient.put(`/tasks/${taskId}`, { project: { id: newProjectId } });

export const createTask = (projectId, task) =>
  apiClient.post("/tasks", { ...task, project: { id: projectId } });

export const updateTask = (task) => apiClient.put("/tasks", task);
export const deleteTask = (taskId) => apiClient.delete(`/tasks/${taskId}`);
export const deleteProject = (projectId) => apiClient.delete(`/projects/${projectId}`);
export const updateProject = (project) => apiClient.put("/projects", project);

export const fetchCurrentUser = () => apiClient.get("/user/me");
export const refreshToken = () => apiClient.post("/refresh");

// Logout (clears access_token cookie)
export const logout = () => apiClient.post("/logout");



export default apiClient;
