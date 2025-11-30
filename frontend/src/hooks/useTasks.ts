import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Task, TaskStatus } from "../types";

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return context.tasks.filter((task) => task.status === status);
  };

  return {
    ...context,
    todoTasks: getTasksByStatus("todo"),
    inProgressTasks: getTasksByStatus("inProgress"),
    doneTasks: getTasksByStatus("done"),
  };
};
