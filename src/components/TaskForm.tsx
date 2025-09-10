import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import type { Task } from "../types/task";
import { v4 as uuid } from "uuid";

type TaskFormProps = {
  taskToEdit?: Task;
  onFinishEdit?: () => void; // optional callback after editing
};

export default function TaskForm({ taskToEdit, onFinishEdit }: TaskFormProps) {
  const taskCtx = useContext(TaskContext);
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [error, setError] = useState("");

  if (!taskCtx) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required!");
      return;
    }

    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : uuid(),
      title,
      description,
      completed: taskToEdit ? taskToEdit.completed : false,
      dueDate: taskToEdit ? taskToEdit.dueDate : new Date().toISOString(),
    };

    if (taskToEdit) {
      taskCtx.updateTask(newTask); // we’ll add this in TaskContext
      onFinishEdit?.();
    } else {
      taskCtx.addTask(newTask);
      setTitle("");
      setDescription("");
    }

    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        type="text"
        value={title}
        placeholder="Task Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={styles.textarea}
        value={description}
        placeholder="Task Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button type="submit" style={styles.button}>
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "500px",
    margin: "1rem auto",
  },
  input: {
    padding: "12px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #ff00ff",
    background: "#0d0d0d",
    color: "#00fff7",
  },
  textarea: {
    padding: "12px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "2px solid #39ff14",
    background: "#0d0d0d",
    color: "#00fff7",
    minHeight: "100px",
  },
  button: {
    padding: "16px",
    fontSize: "1.5rem",
    borderRadius: "10px",
    border: "3px solid #39ff14",
    background: "transparent",
    color: "#39ff14",
    cursor: "pointer",
    textShadow: "0 0 10px #39ff14",
    fontWeight: "bold",
  },
  error: {
    color: "#ff004f",
    fontWeight: "bold",
    textShadow: "0 0 5px #ff004f",
  },
};
