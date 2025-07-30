import { useEffect, useState } from "react";
import { fetchTasks, updateProject, deleteProject, createTask } from "../api/api";
import { useDrop } from "react-dnd";

import TaskCard from "./TaskCard";

const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE"];

export default function ProjectCard({ project, onProjectUpdated, onProjectDeleted }) {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editDesc, setEditDesc] = useState(project.description || "");


  // Create Task form state
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState(STATUS_OPTIONS[0]);

  const refreshTasks = () => {
    fetchTasks(project.id)
      .then((res) => setTasks(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    refreshTasks();
  }, [project.id]);

  // --- Project Handlers ---
  const handleProjectDelete = async () => {
    if (window.confirm("Delete this project? All tasks will be removed!")) {
      try {
        await deleteProject(project.id);
        onProjectDeleted?.(project.id);
      } catch {
        alert("Failed to delete project.");
      }
    }
  };

 const handleProjectUpdate = async () => {
  try {
    await updateProject({ ...project, name: editName, description: editDesc });
    setEditing(false);
    onProjectUpdated?.();
  } catch {
    alert("Failed to update project.");
  }
};

  // --- Create Task Handler ---
  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await createTask(project.id, {
        title: newTaskTitle,
        description: newTaskDesc,
        status: newTaskStatus,
        project: { id: project.id }
      });
      setNewTaskTitle("");
      setNewTaskDesc("");
      setNewTaskStatus(STATUS_OPTIONS[0]);
      setShowTaskForm(false);
      refreshTasks();
    } catch {
      alert("Failed to create task.");
      setShowTaskForm(false); // Always close the form even on error
    }
  };

return (
  <div className="bg-white shadow rounded-2xl p-4 mb-4">
    <div className="flex items-center justify-between gap-3">
      {editing ? (
        <>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Project Name"
          />
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Project Description"
          />
          <button
            onClick={handleProjectUpdate}
            className="bg-green-600 text-white px-3 py-1 rounded-full font-bold hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full font-bold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-bold">{project.name}</h2>
            {project.description && (
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Update
            </button>
            <button
              onClick={handleProjectDelete}
              className="bg-red-600 text-white px-3 py-1 rounded-full font-bold hover:bg-red-700 "
            >
              Delete
            </button>
            {!showTaskForm && (
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-indigo-600 text-white px-4 py-1 rounded-full font-bold hover:bg-indigo-700 transition"
              >
                + Create Task
              </button>
            )}
          </div>
        </>
      )}
    </div>

    {/* Task Creation Form */}
    {showTaskForm && (
      <div className="flex flex-col md:flex-row md:items-center gap-2 my-3">
        <input
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="Task title"
          className="border px-2 py-1 rounded"
          autoFocus
        />
        <input
          value={newTaskDesc}
          onChange={e => setNewTaskDesc(e.target.value)}
          placeholder="Description"
          className="border px-2 py-1 rounded"
        />
        <select
          value={newTaskStatus}
          onChange={e => setNewTaskStatus(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {STATUS_OPTIONS.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button
          onClick={handleCreateTask}
          className="bg-green-600 text-white px-3 py-1 rounded-full font-bold hover:bg-green-700 transition"
        >
          Create
        </button>
        <button
          onClick={() => {
            setNewTaskTitle("");
            setNewTaskDesc("");
            setShowTaskForm(false);
          }}
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full font-bold hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    )}

    <div className="mt-3 space-y-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          projectId={project.id}
          onTaskUpdated={refreshTasks}
          onTaskDeleted={refreshTasks}
        />
      ))}
    </div>
  </div>
)


}
