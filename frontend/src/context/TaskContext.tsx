import React, { createContext, useState, useEffect } from "react";
import { taskApi } from "../api/taskApi";
import {
  Task,
  TaskContextType,
  CreateTaskPayload,
  UpdateTaskPayload,
  DragEndData,
  TaskStatus,
} from "../types";

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  isLoading: false,
  error: null,
  addTask: async () => { },
  updateTask: async () => { },
  fetchTasks: async () => { },
  moveTask: async () => { },
  reorderTasks: () => { },
  deleteTask: async () => { },
});

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskApi.fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (taskData: CreateTaskPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError("Failed to add task. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskData: UpdateTaskPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await taskApi.updateTask(taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskData.id ? { ...task, ...taskData } : task
        )
      );
    } catch (err) {
      setError("Failed to update task. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: number | string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await taskApi.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const moveTask = async ({
    task,
    destination,
  }: DragEndData): Promise<void> => {
    const updatedTask = { ...task, status: destination };
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
    try {
      await taskApi.updateTask({
        id: task.id,
        status: destination,
      });
    } catch (err) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      setError("Failed to move task. Please try again later.");
    }
  };

  const reorderTasks = (status: TaskStatus, newOrder: Task[]): void => {
    setTasks((prevTasks) => {
      const tasksInOtherColumns = prevTasks.filter(
        (task) => task.status !== status
      );
      return [...tasksInOtherColumns, ...newOrder];
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        fetchTasks,
        moveTask,
        reorderTasks,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
