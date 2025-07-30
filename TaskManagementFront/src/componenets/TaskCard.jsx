import { useDrag } from "react-dnd";
import { deleteTask, updateTask } from "../api/api";
import { useState } from "react";

// Use same STATUS_OPTIONS as above
const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE"];

export default function TaskCard({ task, projectId, onTaskUpdated, onTaskDeleted }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, fromProjectId: projectId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");
  const [editStatus, setEditStatus] = useState(task.status || STATUS_OPTIONS[0]);

  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      try {
        await deleteTask(task.id);
        onTaskDeleted?.(task.id);
      } catch (err) {
        alert("Failed to delete task.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedTask = {
        ...task,
        title: editTitle,
        description: editDesc,
        status: editStatus,
        project: { id: projectId }
      };
      await updateTask(updatedTask);
      setEditing(false);
      onTaskUpdated?.(updatedTask);
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  return (
    <div
      ref={drag}
      className={`p-2 rounded-xl shadow border flex items-center justify-between gap-2 transition ${
        isDragging ? "opacity-50" : "bg-gray-50"
      }`}
    >
      {editing ? (
        <>
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Title"
          />
          <input
            value={editDesc}
            onChange={e => setEditDesc(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Description"
          />
          <select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={handleUpdate}
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
          <div className="flex-1">
            <span className="block font-semibold">{task.title}</span>
            <span className="block text-sm text-gray-600">{task.description}</span>
            <span className="block text-xs font-bold text-blue-600">{task.status}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded-full font-bold hover:bg-red-700 transition "
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
