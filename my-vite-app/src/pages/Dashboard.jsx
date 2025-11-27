// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/tasksSlice";
import { logout } from "../store/authSlice";
import { resetTasks } from "../store/tasksSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StatsPanel from "../components/StatsPanel";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  // ALWAYS fetch tasks when page loads
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetTasks());
  };

  return (
    <div className="container py-4">

      {/* TOP BAR WITH LOGOUT */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">👋 Welcome, {user?.name}</h2>

        <button className="btn btn-danger px-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN TITLE */}
      <h3 className="fw-bold mb-4 text-center">
        📋 Your Interview Prep Board
      </h3>

      <div className="row">

        {/* LEFT COLUMN */}
        <div className="col-lg-4 mb-4">
          <StatsPanel />
          <TaskForm />
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-8">

          {/* Loading State */}
          {status === "loading" && (
            <div className="text-center mb-3">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2">Loading tasks...</p>
            </div>
          )}

          {/* Task List */}
          <TaskList />
        </div>
      </div>
    </div>
  );
}
