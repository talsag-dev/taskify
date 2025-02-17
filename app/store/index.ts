import { create } from "zustand";
import { Task } from "../dto";

interface TasksStore {
  tasks: Task[];
  setTasks: (tasks: Array<Task>) => void;
}
export const tasksStore = create<TasksStore>()((set) => ({
  setTasks: (tasks) => set({ tasks }),
  tasks: [],
}));
