import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../store/tasksSlice";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(createTask({ title, description, priority }));
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white fw-bold">
        Add New Task
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} className="vstack gap-3">
          <input
            className="form-control"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button className="btn btn-success w-100" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
