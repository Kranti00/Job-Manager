import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import FiltersBar from "./FiltersBar";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks.items);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tasks
      .filter((t) =>
        statusFilter === "all" ? true : t.status === statusFilter
      )
      .filter((t) =>
        priorityFilter === "all" ? true : t.priority === priorityFilter
      )
      .filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "newest")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "oldest")
          return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "priority") {
          const p = { high: 1, medium: 2, low: 3 };
          return p[a.priority] - p[b.priority];
        }
        return 0;
      });
  }, [tasks, statusFilter, priorityFilter, sortBy, search]);

  return (
    <div>
      <FiltersBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      />

      <div className="vstack gap-3">
        {filtered.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}

        {filtered.length === 0 && (
          <div className="alert alert-warning text-center mb-0">
            No tasks match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
