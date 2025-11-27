import { useDispatch } from "react-redux";
import { updateTaskRemote, deleteTaskRemote } from "../store/tasksSlice";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  const updateStatus = (status) =>
    dispatch(updateTaskRemote({ id: task._id, changes: { status } }));

  const updatePriority = (priority) =>
    dispatch(updateTaskRemote({ id: task._id, changes: { priority } }));

  const remove = () => dispatch(deleteTaskRemote(task._id));

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5>{task.title}</h5>
          <button className="btn btn-sm btn-danger" onClick={remove}>
            Delete
          </button>
        </div>

        <p className="mb-1 text-muted">{task.description}</p>
        <small className="text-secondary">
          {new Date(task.createdAt).toLocaleString()}
        </small>

        <div className="mt-3 row g-2">
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={task.status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={task.priority}
              onChange={(e) => updatePriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
