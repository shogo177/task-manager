import React, { useState } from "react";
import type { ReactNode } from "react";
import { TaskContext } from "./TaskContext";
import type { TaskContextType } from "./TaskContext";
import type { Task } from "../types/task";

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add new task
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  // Remove task by ID
  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Update existing task
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    removeTask,
    updateTask, // new function added
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};
