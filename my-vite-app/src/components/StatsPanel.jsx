import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function StatsPanel() {
  const tasks = useSelector((state) => state.tasks.items);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return { total, done, todo, inProgress, percent };
  }, [tasks]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-dark text-white fw-bold">
        Statistics
      </div>

      <div className="card-body">
        <p>Total Tasks: <strong>{stats.total}</strong></p>
        <p>Todo: <strong>{stats.todo}</strong></p>
        <p>In Progress: <strong>{stats.inProgress}</strong></p>
        <p>Completed: <strong>{stats.done}</strong></p>

        <div className="progress mt-3">
          <div
            className="progress-bar bg-success"
            style={{ width: `${stats.percent}%` }}
          >
            {stats.percent}%
          </div>
        </div>
      </div>
    </div>
  );
}
