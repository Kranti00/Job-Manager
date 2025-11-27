// src/utils/localStorage.js

const KEY = "tasks_data";

export function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function loadTasks() {
  try {
    const json = localStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}
