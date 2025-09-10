import { createContext } from "react";
import type { Task } from "../types/task";

export type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
};


// Create the context (no components here)
export const TaskContext = createContext<TaskContextType | undefined>(undefined);
