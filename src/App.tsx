import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Dashboard</Link>

        {!isAuthenticated ? (
          <button style={styles.button} onClick={() => loginWithRedirect()}>
            Login
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={styles.userText}>Hi, {user?.name || "User"}</span>
            <button
              style={styles.button}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
              <TaskForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundImage: "url('src/images/leyre-71SHXwBLp5w-unsplash.jpg')", // <-- add your image in public/images
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "#00fff7",
    fontFamily: "'Orbitron', sans-serif",
    textAlign: "center",
    padding: "2rem",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
    padding: "0 2rem",
  },
  navLink: {
    color: "#ff00ff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "2rem",
    textShadow: "0 0 10px #ff00ff",
  },
  button: {
    padding: "16px 32px",
    background: "transparent",
    border: "3px solid #39ff14",
    color: "#39ff14",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "0 0 10px #39ff14",
    borderRadius: "10px",
    transition: "all 0.3s ease",
  },
  userText: {
    color: "#ff00ff",
    textShadow: "0 0 10px #ff00ff",
    fontSize: "1.8rem",
  },
};
