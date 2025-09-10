import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types/task";

export default function Dashboard() {
  const taskCtx = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (!taskCtx) return null;

  return (
    <div style={{ padding: "2rem" }}>
      {editingTask && (
        <TaskForm
          taskToEdit={editingTask}
          onFinishEdit={() => setEditingTask(null)}
        />
      )}

      <h2 style={{ fontSize: "2rem", color: "#ff00ff", textShadow: "0 0 10px #ff00ff" }}>
        Task List
      </h2>

      {taskCtx.tasks.length === 0 ? (
        <p style={{ color: "#00fff7" }}>No tasks yet!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {taskCtx.tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "2px solid #39ff14",
                padding: "1rem",
                borderRadius: "10px",
                background: "#0d0d0d",
                color: "#00fff7",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p style={{ fontSize: "0.9rem", color: "#ff00ff" }}>
                  Due: {new Date(task.dueDate).toLocaleString()}
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => setEditingTask(task)}
                  style={{
                    padding: "8px 12px",
                    border: "2px solid #ff00ff",
                    background: "transparent",
                    color: "#ff00ff",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => taskCtx.removeTask(task.id)}
                  style={{
                    padding: "8px 12px",
                    border: "2px solid #ff004f",
                    background: "transparent",
                    color: "#ff004f",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
