import axios from "axios";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const taskApi = {
  async fetchTasks(): Promise<Task[]> {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
      }));
    } catch (error) {
      throw error;
    }
  },

  async createTask(taskData: CreateTaskPayload): Promise<Task> {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return {
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        status: response.data.status,
      };
    } catch (error) {
      throw error;
    }
  },

  async updateTask(taskData: UpdateTaskPayload): Promise<Task> {
    try {
      const response = await axios.patch(
        `${API_URL}/tasks/${taskData.id}`,
        taskData
      );
      return {
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        status: response.data.status,
      };
    } catch (error) {
      throw error;
    }
  },

  async deleteTask(taskId: number | string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
    } catch (error) {
      throw error;
    }
  },
};
