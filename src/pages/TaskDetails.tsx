import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function TaskDetails() {
  const taskCtx = useContext(TaskContext)!;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = taskCtx.tasks.find((t) => t.id === id);

  if (!task) return <p style={styles.notFound}>Task not found!</p>;

  const handleFinishEdit = () => {
    navigate("/"); // go back to dashboard after editing
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{task.title}</h2>
      <p style={styles.description}>{task.description}</p>
      <p style={styles.dueDate}>Due: {new Date(task.dueDate).toLocaleString()}</p>

      {/* TaskForm in edit mode */}
      <TaskForm taskToEdit={task} onFinishEdit={handleFinishEdit} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "#1b1b2f",
    padding: "2rem",
    borderRadius: "12px",
    margin: "2rem auto",
    maxWidth: "600px",
    color: "#00fff7",
    textAlign: "center",
    boxShadow: "0 0 20px #ff00ff",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    textShadow: "0 0 10px #ff00ff",
  },
  description: {
    fontSize: "1.5rem",
    margin: "1rem 0",
  },
  dueDate: {
    fontSize: "1.2rem",
    color: "#39ff14",
    marginBottom: "1.5rem",
  },
  notFound: {
    fontSize: "1.8rem",
    color: "#ff004f",
    textAlign: "center",
    marginTop: "5rem",
  },
};
